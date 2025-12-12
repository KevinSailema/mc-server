// Servicio para obtener datos del leaderboard desde la API de Minecraft
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4567';
const API_KEY = import.meta.env.VITE_API_KEY || '';
const CACHE_TIME = 30 * 1000; // 30 segundos
const STORAGE_KEY = 'minecraft_leaderboard_backup';

let cache = null;
let lastFetch = 0;

// Guardar datos en localStorage como respaldo
function saveBackupData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Could not save backup data to localStorage:', error);
  }
}

// Obtener datos de respaldo de localStorage
function getBackupData() {
  try {
    const backup = localStorage.getItem(STORAGE_KEY);
    if (backup) {
      const { data, timestamp } = JSON.parse(backup);
      console.log('Using backup data from localStorage (saved:', new Date(timestamp).toLocaleString(), ')');
      return data;
    }
  } catch (error) {
    console.warn('Could not retrieve backup data:', error);
  }
  return null;
}

export async function fetchLeaderboardData() {
  const now = Date.now();
  
  if (cache && (now - lastFetch) < CACHE_TIME) {
    return cache;
  }
  
  try {
    console.log('Fetching leaderboard data from API...');

    const response = await fetch(`${API_URL}/v1/leaderboards?limit=5`, {
      headers: { 'key': API_KEY }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Verificar si hay datos (excluyendo lastUpdated del chequeo)
    const { lastUpdated, ...categories } = data;
    const hasData = Object.values(categories).some(arr => Array.isArray(arr) && arr.length > 0);
    
    if (!hasData) {
      console.warn('No data from API, using backup or mock data');
      return getBackupData() || getMockData();
    }

    // Guardar datos exitosos como respaldo
    saveBackupData(data);
    
    cache = data;
    lastFetch = now;
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    // Primero intentar usar datos de respaldo, si no hay usar mock
    return getBackupData() || getMockData();
  }
}

function getMockData() {
  return {
    playtime: [
      { username: "Nattsie", value: 127, avatar: "🦊" },
      { username: "BuildMaster", value: 98, avatar: "🏗️" },
      { username: "MineKing", value: 85, avatar: "⛏️" },
      { username: "CraftyPro", value: 72, avatar: "🔨" },
      { username: "Adventurer", value: 65, avatar: "🗺️" }
    ],
    kills: [
      { username: "WarriorX", value: 342, avatar: "⚔️" },
      { username: "HunterZ", value: 289, avatar: "🏹" },
      { username: "Nattsie", value: 256, avatar: "🦊" },
      { username: "PvPMaster", value: 198, avatar: "💀" },
      { username: "FighterOne", value: 167, avatar: "🛡️" }
    ],
    mined: [
      { username: "MineKing", value: 15420, avatar: "⛏️" },
      { username: "Nattsie", value: 12890, avatar: "🦊" },
      { username: "DeepDigger", value: 11234, avatar: "💎" },
      { username: "CaveFinder", value: 9876, avatar: "🔦" },
      { username: "StoneBreaker", value: 8543, avatar: "🪨" }
    ],
    crafted: [
      { username: "CraftyPro", value: 8934, avatar: "🔨" },
      { username: "Nattsie", value: 7621, avatar: "🦊" },
      { username: "BuildMaster", value: 6543, avatar: "🏗️" },
      { username: "CreatorX", value: 5432, avatar: "✨" },
      { username: "MakerOne", value: 4321, avatar: "🛠️" }
    ],
    fishing: [
      { username: "FisherKing", value: 1234, avatar: "🎣" },
      { username: "OceanMaster", value: 987, avatar: "🌊" },
      { username: "Nattsie", value: 876, avatar: "🦊" },
      { username: "AnglerPro", value: 765, avatar: "🐟" },
      { username: "SeaHunter", value: 654, avatar: "🦈" }
    ]
  };
}

export async function checkApiStatus() {
  try {
    const response = await fetch(`${API_URL}/v1/ping`);
    return response.ok;
  } catch (error) {
    console.error('API not reachable:', error);
    return false;
  }
}
