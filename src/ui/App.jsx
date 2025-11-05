import React, { useEffect, useState } from "react";
import logoSrc from "../logo.png";

const SERVER_HOST = "play.pollitoscraft.land";
const SERVER_PORT = 25565;

// Traducciones
const translations = {
  es: {
    header: {
      play: "Jugar",
      features: "Características",
      community: "Comunidad"
    },
    hero: {
      title1: "Pollitos",
      title2: "Craft",
      subtitle: "Servidor Paper optimizado — Sobrevive, construye y comparte aventuras épicas",
      customFeatures: "✨ Custom Features",
      survival: "🌍 Survival",
      online247: "🌍 24/7 Online",
      serverOnline: "Server Online",
      playersOnline: "Players Online",
      joinAdventure: "Join the adventure!",
      minecraftVersion: "Minecraft Version",
      copyAlert: "IP copiada: "
    },
    features: {
      title: "Características del Servidor",
      subtitle: "Experiencia vanilla mejorada con protecciones y herramientas para la comunidad",
      paper: {
        title: "Servidor Paper",
        desc: "Rendimiento optimizado y mejor experiencia sin lag para todos los jugadores."
      },
      survival: {
        title: "Survival Puro",
        desc: "Modo supervivencia vanilla con protecciones de terreno y anti-griefing."
      },
      events: {
        title: "Comunidad Activa",
        desc: "Eventos especiales, construcciones colaborativas y una comunidad amigable."
      }
    },
    community: {
      title: "Únete a la Comunidad",
      subtitle: "Conecta con otros jugadores y mantente informado",
      discord: {
        title: "Discord",
        desc: "Únete al Discord oficial para chatear y recibir noticias del servidor.",
        cta: "Unirse →"
      },
      wiki: {
        title: "Guías",
        desc: "Aprende comandos, reglas y tips para mejorar tu experiencia.",
        cta: "Ver guías →"
      },
      support: {
        title: "Soporte",
        desc: "¿Necesitas ayuda? Reporta bugs o pide asistencia al staff.",
        cta: "Obtener ayuda →"
      }
    },
    footer: {
      serverName: "Servidor Paper de Minecraft",
      copyright: "Pollitos Craft. No afiliado con Mojang.",
      madeWith: "By Nattsie"
    },
    status: {
      title: "Estado del servidor",
      checking: "Consultando estado...",
      error: "No se pudo consultar: ",
      online: "Online",
      offline: "Offline",
      players: "Jugadores",
      version: "Versión"
    }
  },
  en: {
    header: {
      play: "Play",
      features: "Features",
      community: "Community"
    },
    hero: {
      title1: "Pollitos",
      title2: "Craft",
      subtitle: "Optimized Paper Server — Survive, build and share epic adventures",
      customFeatures: "✨ Custom Features",
      survival: "🌍 Survival",
      online247: "🌍 24/7 Online",
      serverOnline: "Server Online",
      playersOnline: "Players Online",
      joinAdventure: "Join the adventure!",
      minecraftVersion: "Minecraft Version",
      copyAlert: "IP copied: "
    },
    features: {
      title: "Server Features",
      subtitle: "Enhanced vanilla experience with protections and community tools",
      paper: {
        title: "Paper Server",
        desc: "Optimized performance and better lag-free experience for all players."
      },
      survival: {
        title: "Pure Survival",
        desc: "Vanilla survival mode with land protection and anti-griefing features."
      },
      events: {
        title: "Active Community",
        desc: "Special events, collaborative builds and a friendly community."
      }
    },
    community: {
      title: "Join the Community",
      subtitle: "Connect with other players and stay informed",
      discord: {
        title: "Discord",
        desc: "Join the official Discord to chat and receive server news.",
        cta: "Join →"
      },
      wiki: {
        title: "Guides",
        desc: "Learn commands, rules and tips to improve your experience.",
        cta: "View guides →"
      },
      support: {
        title: "Support",
        desc: "Need help? Report bugs or ask staff for assistance.",
        cta: "Get help →"
      }
    },
    footer: {
      serverName: "Minecraft Paper Server",
      copyright: "Pollitos Craft. Not affiliated with Mojang.",
      madeWith: "By Nattsie"
    },
    status: {
      title: "Server Status",
      checking: "Checking status...",
      error: "Could not check: ",
      online: "Online",
      offline: "Offline",
      players: "Players",
      version: "Version"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState("es");

  return (
    <div className="antialiased">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Features lang={lang} />
      <Cards lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

function Header({ lang, setLang }) {
  const t = translations[lang].header;
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-purple-500/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">Pollitos Craft</span>
        <nav className="flex items-center gap-6">
          <a onClick={() => scrollToSection('play')} className="text-slate-300 hover:text-white transition cursor-pointer relative group">
            {t.play}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white transition cursor-pointer relative group">
            {t.features}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a onClick={() => scrollToSection('community')} className="text-slate-300 hover:text-white transition cursor-pointer relative group">
            {t.community}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <LanguageToggle lang={lang} setLang={setLang} />
        </nav>
      </div>
    </header>
  );
}

function LanguageToggle({ lang = "es", setLang }) {
  return (
    <div className="text-sm">
      <button
        className="px-3 py-1 rounded-md bg-white/5 text-slate-200 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5 hover:border-emerald-400/30"
        onClick={() => setLang(l => (l === "es" ? "en" : "es"))}
        title="Cambiar idioma"
      >
        {lang === "es" ? "🇪🇸 ES" : "🇬🇧 EN"}
      </button>
    </div>
  );
}

function Hero({ lang }) {
  const ip = `${SERVER_HOST}:${SERVER_PORT}`;
  const t = translations[lang].hero;
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        // Usar API v3 que tiene mejor detección
        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_HOST}`);
        const data = await response.json();
        console.log("Server data:", data); // Debug
        setServerData(data);
      } catch (error) {
        console.error("Error fetching server status:", error);
      }
    };
    
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000); // actualizar cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      alert(t.copyAlert + ip);
    } catch {
      /* no-op */
    }
  };

  const playersOnline = serverData?.players?.online || 0;
  const playersMax = serverData?.players?.max || 100;
  const isOnline = serverData?.online || false;
  const version = serverData?.version || "1.8.x - 1.21.x";

  return (
    <section id="play" className="relative overflow-hidden hero-gradient stars min-h-screen flex items-center pt-4">
      <div className="max-w-6xl mx-auto px-4 py-2 w-full">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src={logoSrc} alt="Pollitos Craft" className="h-24 w-24 md:h-32 md:w-32 object-contain animate-float drop-shadow-2xl" style={{filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.6))'}} onError={(e)=>{e.currentTarget.style.display='none'}} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2 animate-fade-in">
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">{t.title1}</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">{t.title2}</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mb-3 animate-fade-in-delay">
            {t.subtitle}
          </p>

          <div className="pills mb-4 animate-fade-in-delay-2">
            <span className="pill">{t.customFeatures}</span>
            <span className="pill">{t.survival}</span>
            <span className="pill">{t.online247}</span>
          </div>

          {/* IP Badge moved to top */}
          <div className="flex justify-center mb-4 animate-fade-in-delay-3">
            <div className="ip-badge-large">
              <code className="text-slate-100 text-lg font-mono">{ip}</code>
              <button className="copy-icon-large" onClick={copy} title="Copiar IP">
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="mx-auto max-w-4xl animate-slide-up">
          <div className="big-panel">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className={`h-3 w-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              <strong className="text-lg">{t.serverOnline}</strong>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="inner-box">
                <div className="text-sm text-slate-400 uppercase mb-2">{t.playersOnline}</div>
                <div className="text-4xl font-extrabold text-emerald-400 animate-number-glow">{playersOnline}/{playersMax}</div>
                <div className="text-xs text-slate-500 mt-1">{t.joinAdventure}</div>
              </div>

              <div className="inner-box">
                <div className="text-sm text-slate-400 uppercase mb-2">{t.minecraftVersion}</div>
                <div className="text-xl font-semibold text-slate-200">{version}</div>
                <div className="text-xs text-slate-500 mt-1">BungeeCord</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features({ lang }) {
  const t = translations[lang].features;
  
  return (
    <section id="features" className="py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t.title}</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-xl mb-3">{t.paper.title}</h3>
            <p className="muted">{t.paper.desc}</p>
          </div>
          <div className="p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🌲</div>
            <h3 className="font-bold text-xl mb-3">{t.survival.title}</h3>
            <p className="muted">{t.survival.desc}</p>
          </div>
          <div className="p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-bold text-xl mb-3">{t.events.title}</h3>
            <p className="muted">{t.events.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards({ lang }) {
  const t = translations[lang].community;
  
  return (
    <section id="community" className="py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t.title}</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl card-gradient hover:scale-105 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-indigo-600/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                💬
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{t.discord.title}</h3>
                <p className="muted mb-4">{t.discord.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold" href="https://discord.com/invite/QgyvxtsgpE" target="_blank" rel="noopener noreferrer">
                  {t.discord.cta}
                </a>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl card-gradient hover:scale-105 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-cyan-600/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                �
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{t.wiki.title}</h3>
                <p className="muted mb-4">{t.wiki.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold" href="#play">
                  {t.wiki.cta}
                </a>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl card-gradient hover:scale-105 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-emerald-600/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🛠️
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{t.support.title}</h3>
                <p className="muted mb-4">{t.support.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold" href="https://discord.com/invite/QgyvxtsgpE" target="_blank" rel="noopener noreferrer">
                  {t.support.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const t = translations[lang].footer;
  
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Pollitos Craft" className="h-10 w-10 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div>
              <div className="font-bold">Pollitos Craft</div>
              <div className="text-sm text-slate-500">{t.serverName}</div>
            </div>
          </div>
          <div className="text-center md:text-right text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} {t.copyright}</p>
            <p className="text-slate-500 mt-1">{t.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
