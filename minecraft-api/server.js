const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) || 300 });

// Configuración
const PORT = process.env.PORT || 4567;
const API_KEY = process.env.API_KEY;
const MINECRAFT_PATH = process.env.MINECRAFT_PATH;
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',') || ['*'];

// Middleware
app.use(cors({
  origin: CORS_ORIGINS.includes('*') ? '*' : CORS_ORIGINS,
  credentials: true
}));
app.use(express.json());

// Autenticación
const authenticate = (req, res, next) => {
  const apiKey = req.headers['key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or missing API key' });
  }
  
  next();
};

// ============================================
// UTILIDADES
// ============================================

// Leer archivo JSON de forma segura
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

// Obtener UUID de jugadores
async function getPlayerUUIDs() {
  const usercachePath = path.join(MINECRAFT_PATH, 'usercache.json');
  const usercache = await readJsonFile(usercachePath);
  return usercache || [];
}

// Obtener estadísticas de un jugador
async function getPlayerStats(uuid) {
  const statsPath = path.join(MINECRAFT_PATH, 'world', 'stats', `${uuid}.json`);
  return await readJsonFile(statsPath);
}

// Convertir ticks a horas
function ticksToHours(ticks) {
  return Math.floor(ticks / 72000); // 72000 ticks = 1 hora
}

// ============================================
// ENDPOINTS
// ============================================

// Ping
app.get('/v1/ping', (req, res) => {
  res.json({ status: 'ok', message: 'pong' });
});

// Info del servidor
app.get('/v1/server', authenticate, async (req, res) => {
  const cacheKey = 'server_info';
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const serverPropertiesPath = path.join(MINECRAFT_PATH, 'server.properties');
    const serverProperties = await fs.readFile(serverPropertiesPath, 'utf8');
    
    const info = {
      name: 'Pollitos Craft',
      version: '1.20.1-forge',
      motd: serverProperties.match(/motd=(.+)/)?.[1] || 'Minecraft Server',
      maxPlayers: parseInt(serverProperties.match(/max-players=(\d+)/)?.[1]) || 20,
      onlineMode: serverProperties.includes('online-mode=true')
    };
    
    cache.set(cacheKey, info);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read server info' });
  }
});

// Jugadores online (desde logs - simplificado)
app.get('/v1/players', authenticate, async (req, res) => {
  const cacheKey = 'online_players';
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const players = await getPlayerUUIDs();
    const onlinePlayers = players.slice(0, 5); // Simplificado: últimos 5 jugadores
    
    cache.set(cacheKey, onlinePlayers, 30);
    res.json(onlinePlayers);
  } catch (error) {
    res.json([]);
  }
});

// ============================================
// LEADERBOARDS
// ============================================

app.get('/v1/leaderboard/:category', authenticate, async (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit) || 5;
  
  const cacheKey = `leaderboard_${category}_${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const players = await getPlayerUUIDs();
    const leaderboard = [];

    for (const player of players) {
      const stats = await getPlayerStats(player.uuid);
      if (!stats || !stats.stats) continue;

      let value = 0;
      
      switch (category) {
        case 'playtime':
          value = ticksToHours(stats.stats['minecraft:custom']?.['minecraft:play_time'] || 0);
          break;
        case 'kills':
          const mobKills = stats.stats['minecraft:killed'] || {};
          value = Object.values(mobKills).reduce((sum, kills) => sum + kills, 0);
          break;
        case 'mined':
          const mined = stats.stats['minecraft:mined'] || {};
          value = Object.values(mined).reduce((sum, blocks) => sum + blocks, 0);
          break;
        case 'crafted':
          const crafted = stats.stats['minecraft:crafted'] || {};
          value = Object.values(crafted).reduce((sum, items) => sum + items, 0);
          break;
        case 'fishing':
          value = stats.stats['minecraft:custom']?.['minecraft:fish_caught'] || 0;
          break;
        default:
          value = 0;
      }

      if (value > 0) {
        leaderboard.push({
          username: player.name,
          uuid: player.uuid,
          value: value,
          avatar: getPlayerAvatar(player.name)
        });
      }
    }

    // Ordenar por valor descendente
    leaderboard.sort((a, b) => b.value - a.value);
    const topPlayers = leaderboard.slice(0, limit);

    cache.set(cacheKey, topPlayers);
    res.json(topPlayers);
  } catch (error) {
    console.error('Error generating leaderboard:', error);
    res.status(500).json({ error: 'Failed to generate leaderboard' });
  }
});

// Obtener todos los leaderboards de una vez
app.get('/v1/leaderboards', authenticate, async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const cacheKey = `all_leaderboards_${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const categories = ['playtime', 'kills', 'mined', 'crafted', 'fishing'];
    const results = {};

    for (const category of categories) {
      const leaderboard = await generateLeaderboard(category, limit);
      results[category] = leaderboard;
    }

    cache.set(cacheKey, results);
    res.json(results);
  } catch (error) {
    console.error('Error generating all leaderboards:', error);
    res.status(500).json({ error: 'Failed to generate leaderboards' });
  }
});

// Función auxiliar para generar leaderboard
async function generateLeaderboard(category, limit) {
  const players = await getPlayerUUIDs();
  const leaderboard = [];

  for (const player of players) {
    const stats = await getPlayerStats(player.uuid);
    if (!stats || !stats.stats) continue;

    let value = 0;
    
    switch (category) {
      case 'playtime':
        value = ticksToHours(stats.stats['minecraft:custom']?.['minecraft:play_time'] || 0);
        break;
      case 'kills':
        const mobKills = stats.stats['minecraft:killed'] || {};
        value = Object.values(mobKills).reduce((sum, kills) => sum + kills, 0);
        break;
      case 'mined':
        const mined = stats.stats['minecraft:mined'] || {};
        value = Object.values(mined).reduce((sum, blocks) => sum + blocks, 0);
        break;
      case 'crafted':
        const crafted = stats.stats['minecraft:crafted'] || {};
        value = Object.values(crafted).reduce((sum, items) => sum + items, 0);
        break;
      case 'fishing':
        value = stats.stats['minecraft:custom']?.['minecraft:fish_caught'] || 0;
        break;
    }

    if (value > 0) {
      leaderboard.push({
        username: player.name,
        uuid: player.uuid,
        value: value,
        avatar: getPlayerAvatar(player.name)
      });
    }
  }

  leaderboard.sort((a, b) => b.value - a.value);
  return leaderboard.slice(0, limit);
}

// Avatar por jugador
function getPlayerAvatar(username) {
  const avatars = {
    'Nattsie': '🦊',
    'default': '👤'
  };
  return avatars[username] || avatars.default;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime(),
    minecraft_path: MINECRAFT_PATH 
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Minecraft Stats API running on port ${PORT}`);
  console.log(`📁 Minecraft path: ${MINECRAFT_PATH}`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`🌐 CORS Origins: ${CORS_ORIGINS.join(', ')}`);
});
