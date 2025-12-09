import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import logoSrc from "../logo.png";

const SERVER_HOST = "play.pollitoscraft.land";
const SERVER_PORT = 25565;
const TWITCH_CHANNEL = "nattsie";

// Traducciones
const translations = {
  es: {
    header: {
      play: "Jugar",
      features: "Características",
      community: "Comunidad",
      join: "Ingresa al Server",
      install: "Instalación",
      live: "🔴 EN VIVO"
    },
    stream: {
      title: "¡Nattsie está en vivo!",
      subtitle: "Únete al stream y diviértete con la comunidad",
      watchNow: "Ver Ahora",
      offlineTitle: "Stream Offline",
      offlineDesc: "¡Síguenos en Twitch para no perderte ningún stream!",
      followButton: "Seguir en Twitch"
    },
    hero: {
      title1: "Pollitos",
      title2: "Craft",
      subtitle: "Servidor Paper optimizado — Sobrevive, construye y comparte aventuras épicas",
      customFeatures: "✨ Características Personalizadas",
      survival: "🌍 Supervivencia",
      online247: "🌍 24/7 En Línea",
      serverOnline: "Servidor En Línea",
      playersOnline: "Jugadores Conectados",
      joinAdventure: "¡Únete a la aventura!",
      minecraftVersion: "Versión de Minecraft",
      copyAlert: "IP copiada: ",
      copyHint: "Copia la IP con el botón 📋 y pégala en Minecraft para jugar!",
      joinCTA: "¡Unirse al Servidor!",
      joinCTADesc: "Completa el formulario y forma parte de nuestra comunidad"
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
    joinForm: {
      title: "¡Únete al Servidor!",
      subtitle: "Completa el formulario para ser parte de nuestra comunidad",
      description: "Rellena la solicitud y nuestro equipo revisará tu aplicación. ¡Te esperamos en Pollitos Craft!",
      loading: "Cargando formulario...",
      openExternal: "Abrir en nueva pestaña →",
      formPill: "📝 Formulario de Aplicación",
      quickPill: "✨ Proceso Rápido"
    },
    status: {
      title: "Estado del servidor",
      checking: "Consultando estado...",
      error: "No se pudo consultar: ",
      online: "Servidor En Línea",
      offline: "Servidor Fuera de Línea",
      players: "Jugadores",
      version: "Versión"
    },
    installation: {
      title: "Instalación del Cliente",
      subtitle: "Descarga todo lo necesario para jugar en Pollitos Craft",
      description: "Sigue estos pasos para instalar el cliente modificado y unirte al servidor",
      serverPack: {
        title: "Server Pack 1.20.1",
        desc: "Cliente completo con mods y configuraciones optimizadas",
        size: "201.72 MB",
        button: "Descargar Cliente"
      },
      shaders: {
        title: "Complementary Shaders v4.7.1",
        desc: "Shaders opcionales para mejorar los gráficos del juego",
        size: "3.30 MB",
        button: "Descargar Shaders"
      },
      forge: {
        title: "Forge 1.20.1-47.4.10",
        desc: "Instalador de Forge requerido para los mods",
        size: "~5 MB",
        button: "Descargar Forge"
      },
      steps: {
        title: "Pasos de Instalación",
        step1: {
          title: "1. Instala Java 17+",
          desc: "Minecraft 1.20.1 requiere Java 17 o superior"
        },
        step2: {
          title: "2. Instala Forge",
          desc: "Ejecuta el instalador de Forge y selecciona 'Install Client'"
        },
        step3: {
          title: "3. Extrae el Server Pack",
          desc: "Descomprime el archivo ZIP en tu carpeta .minecraft"
        },
        step4: {
          title: "4. (Opcional) Instala Shaders",
          desc: "Coloca el archivo ZIP de shaders en .minecraft/shaderpacks"
        },
        step5: {
          title: "5. ¡Listo para Jugar!",
          desc: "Abre Minecraft Launcher, selecciona el perfil Forge y conecta a play.pollitoscraft.land:25565"
        }
      }
    }
  },
  en: {
    header: {
      play: "Play",
      features: "Features",
      community: "Community",
      join: "Join Server",
      install: "Installation",
      live: "🔴 LIVE"
    },
    stream: {
      title: "Nattsie is live!",
      subtitle: "Join the stream and have fun with the community",
      watchNow: "Watch Now",
      offlineTitle: "Stream Offline",
      offlineDesc: "Follow us on Twitch so you don't miss any streams!",
      followButton: "Follow on Twitch"
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
      copyAlert: "IP copied: ",
      copyHint: "Use the 📋 button to copy the server address, then paste it into Minecraft to start playing!",
      joinCTA: "Join the Server!",
      joinCTADesc: "Complete the form and become part of our community"
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
    joinForm: {
      title: "Join the Server!",
      subtitle: "Complete the form to become part of our community",
      description: "Fill out the application and our team will review it. We're waiting for you at Pollitos Craft!",
      loading: "Loading form...",
      openExternal: "Open in new tab →",
      formPill: "📝 Application Form",
      quickPill: "✨ Quick Process"
    },
    status: {
      title: "Server Status",
      checking: "Checking status...",
      error: "Could not check: ",
      online: "Server Online",
      offline: "Server Offline",
      players: "Players",
      version: "Version"
    },
    installation: {
      title: "Client Installation",
      subtitle: "Download everything you need to play on Pollitos Craft",
      description: "Follow these steps to install the modded client and join the server",
      serverPack: {
        title: "Server Pack 1.20.1",
        desc: "Complete client with optimized mods and configurations",
        size: "201.72 MB",
        button: "Download Client"
      },
      shaders: {
        title: "Complementary Shaders v4.7.1",
        desc: "Optional shaders to enhance game graphics",
        size: "3.30 MB",
        button: "Download Shaders"
      },
      forge: {
        title: "Forge 1.20.1-47.4.10",
        desc: "Forge installer required for mods",
        size: "~5 MB",
        button: "Download Forge"
      },
      steps: {
        title: "Installation Steps",
        step1: {
          title: "1. Install Java 17+",
          desc: "Minecraft 1.20.1 requires Java 17 or higher"
        },
        step2: {
          title: "2. Install Forge",
          desc: "Run the Forge installer and select 'Install Client'"
        },
        step3: {
          title: "3. Extract Server Pack",
          desc: "Unzip the file into your .minecraft folder"
        },
        step4: {
          title: "4. (Optional) Install Shaders",
          desc: "Place the shaders ZIP file in .minecraft/shaderpacks"
        },
        step5: {
          title: "5. Ready to Play!",
          desc: "Open Minecraft Launcher, select Forge profile and connect to play.pollitoscraft.land:25565"
        }
      }
    }
  }
};


export default function App() {
  const [lang, setLang] = useState("es");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className={`antialiased ${theme}`}>
        <Routes>
          <Route path="/" element={<HomePage lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />} />
          <Route path="/join" element={<JoinPage lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />} />
          <Route path="/install" element={<InstallPage lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ lang, setLang, theme, setTheme }) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Verificar si el stream está en vivo
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch(`https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`);
        const text = await response.text();
        const live = !text.includes('offline') && !text.includes('error');
        console.log('Twitch status:', text, 'isLive:', live);
        setIsLive(live);
        
        // MODO PRUEBA: Descomentar la línea siguiente para siempre mostrar el stream (para pruebas)
        //setIsLive(true);
      } catch (error) {
        console.log('Error checking Twitch status:', error);
        setIsLive(false);
      }
    };

    checkTwitchStatus();
    const interval = setInterval(checkTwitchStatus, 60000); // Verificar cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} isLive={isLive} />
      <Hero lang={lang} />
      <TwitchStream lang={lang} isLive={isLive} />
      <Features lang={lang} />
      <Cards lang={lang} />
      <Footer lang={lang} />
    </>
  );
}

function JoinPage({ lang, setLang, theme, setTheme }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} isJoinPage={true} />
      <JoinForm lang={lang} />
      <Footer lang={lang} />
    </>
  );
}

function InstallPage({ lang, setLang, theme, setTheme }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} isInstallPage={true} />
      <Installation lang={lang} />
      <Footer lang={lang} />
    </>
  );
}


function Header({ lang, setLang, theme, setTheme, isJoinPage = false, isInstallPage = false, isLive = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].header;
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b border-purple-500/20 shadow-lg header-kawaii`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent hover:scale-105 transition-transform">
            Pollitos Craft
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {!isJoinPage && !isInstallPage ? (
              <>
                {isLive && (
                  <a onClick={() => scrollToSection('stream')} className="relative cursor-pointer group">
                    <span className="px-3 xl:px-4 py-2 rounded-full font-bold text-xs xl:text-sm flex items-center gap-2 transition-all duration-300 hover:scale-110" style={{
                      background: 'linear-gradient(135deg, #ff0050, #ff4d4d)',
                      color: '#ffffff',
                      boxShadow: '0 0 20px rgba(255, 0, 80, 0.6)',
                      animation: 'livePulse 2s ease-in-out infinite'
                    }}>
                      {t.live}
                    </span>
                  </a>
                )}
                <a onClick={() => scrollToSection('play')} className="hover:underline transition cursor-pointer relative group text-sm xl:text-base" style={{ color: 'var(--header-text)' }}>
                  {t.play}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <Link to="/install" className="hover:underline transition relative group text-sm xl:text-base" style={{ color: 'var(--header-text)' }}>
                  {t.install}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/join" className="hover:underline transition relative group text-sm xl:text-base" style={{ color: 'var(--header-text)' }}>
                  {t.join}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            ) : (
              <Link to="/" className="hover:underline transition relative group text-sm xl:text-base" style={{ color: 'var(--header-text)' }}>
                ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            <div className="flex items-center gap-2">
              <ThemeSwitch theme={theme} setTheme={setTheme} lang={lang} />
              <LanguageToggle lang={lang} setLang={setLang} />
            </div>
          </nav>

          {/* Mobile Menu Button & Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeSwitch theme={theme} setTheme={setTheme} lang={lang} />
            <LanguageToggle lang={lang} setLang={setLang} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--header-text)' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-4 pb-2 border-t border-purple-500/20 mt-3 space-y-3">
            {!isJoinPage && !isInstallPage ? (
              <>
                {isLive && (
                  <a onClick={() => scrollToSection('stream')} className="block cursor-pointer">
                    <span className="px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300" style={{
                      background: 'linear-gradient(135deg, #ff0050, #ff4d4d)',
                      color: '#ffffff',
                      boxShadow: '0 0 20px rgba(255, 0, 80, 0.6)'
                    }}>
                      {t.live}
                    </span>
                  </a>
                )}
                <a onClick={() => scrollToSection('play')} className="block py-2 px-4 rounded-lg hover:bg-purple-500/10 transition cursor-pointer text-center font-semibold" style={{ color: 'var(--header-text)' }}>
                  {t.play}
                </a>
                <Link to="/install" className="block py-2 px-4 rounded-lg hover:bg-purple-500/10 transition text-center font-semibold" style={{ color: 'var(--header-text)' }} onClick={() => setMobileMenuOpen(false)}>
                  {t.install}
                </Link>
                <Link to="/join" className="block py-2 px-4 rounded-lg hover:bg-purple-500/10 transition text-center font-semibold" style={{ color: 'var(--header-text)' }} onClick={() => setMobileMenuOpen(false)}>
                  {t.join}
                </Link>
              </>
            ) : (
              <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-purple-500/10 transition text-center font-semibold" style={{ color: 'var(--header-text)' }} onClick={() => setMobileMenuOpen(false)}>
                ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
// Botón kawaii para cambiar tema con traducción
function ThemeSwitch({ theme, setTheme, lang }) {
  const themeNames = {
    es: { dark: "Nocturno", light: "Claro" },
    en: { dark: "Dark", light: "Light" }
  };
  return (
    <button
      className="px-2 sm:px-3 py-1 rounded-full border-2 transition-all duration-300 hover:scale-105 font-semibold text-xs sm:text-sm"
      style={{
        backgroundColor: theme === "dark" ? 'var(--accent)' : '#8b5cf6',
        color: theme === "dark" ? 'var(--bg-main)' : '#ffffff',
        borderColor: theme === "dark" ? 'var(--accent)' : '#8b5cf6'
      }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? themeNames[lang].light : themeNames[lang].dark}
      aria-label="Cambiar modo de color"
    >
      <span className="hidden sm:inline">{theme === "dark" ? "🌞 Claro" : "🌙 Oscuro"}</span>
      <span className="sm:hidden">{theme === "dark" ? "🌞" : "🌙"}</span>
    </button>
  );
}

function LanguageToggle({ lang = "es", setLang }) {
  return (
    <div className="text-xs sm:text-sm">
      <button
        className="px-2 sm:px-3 py-1 rounded-full border-2 transition-all duration-300 hover:scale-105 font-semibold"
        style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-main)',
          borderColor: 'var(--accent)'
        }}
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
        // Usar mcstatus.io API - más rápida y confiable
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_HOST}:${SERVER_PORT}`);
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
    const playersMax = serverData?.players?.max || 50;
    const isOnline = serverData?.online || false;
    const version = serverData?.version?.name_clean || serverData?.version?.name_raw || "1.8.x - 1.21.x";
    const software = serverData?.software || "Minecraft Server";  return (
    <section id="play" className="relative overflow-hidden hero-gradient stars min-h-screen flex items-center pt-16 sm:pt-4">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-2 w-full">
        <div className="text-center mb-4 sm:mb-3">
          <div className="flex items-center justify-center gap-4 mb-3 sm:mb-2">
            <img src={logoSrc} alt="Pollitos Craft" className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain animate-float drop-shadow-2xl" style={{filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.6))'}} onError={(e)=>{e.currentTarget.style.display='none'}} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 sm:mb-2 px-2 animate-fade-in">
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">{t.title1}</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">{t.title2}</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-4 sm:mb-3 px-4 animate-fade-in-delay" style={{ color: 'var(--text-main)' }}>
            {t.subtitle}
          </p>

          <div className="pills mb-5 sm:mb-4 px-2 animate-fade-in-delay-2">
            <span className="pill text-xs sm:text-sm">{t.customFeatures}</span>
            <span className="pill text-xs sm:text-sm">{t.survival}</span>
            <span className="pill text-xs sm:text-sm">{t.online247}</span>
          </div>

          {/* IP Badge moved to top */}
          <div className="flex flex-col items-center mb-5 sm:mb-4 px-2 animate-fade-in-delay-3">
            <p className="text-xs sm:text-sm font-semibold mb-2 text-center px-2" style={{ 
              color: 'var(--text-main)', 
              animation: 'kawaiiPulse 5s ease-in-out infinite'
            }}>
              {t.copyHint}
            </p>
            <div className="ip-badge-large w-full max-w-md mx-auto">
              <code className="text-sm sm:text-base md:text-lg font-mono break-all" style={{ color: 'var(--text-main)' }}>{ip}</code>
              <button className="copy-icon-large flex-shrink-0" onClick={copy} title="Copiar IP">
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="mx-auto max-w-4xl px-2 sm:px-0 animate-slide-up">
          <div className="big-panel">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <span className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              <strong className="text-base sm:text-lg" style={{ color: 'var(--text-main)' }}>
                {isOnline ? translations[lang].status.online : translations[lang].status.offline}
              </strong>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-5">
              <div className="inner-box relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl">👥</span>
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)', opacity: 0.9 }}>{t.playersOnline}</div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black mb-1 sm:mb-2">
                    <span style={{ 
                      background: 'linear-gradient(to right, #34d399, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '900',
                      letterSpacing: '-0.02em'
                    }}>
                      {playersOnline}
                    </span>
                    <span className="text-2xl sm:text-3xl" style={{ 
                      background: 'linear-gradient(to right, #34d399, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.7,
                      fontWeight: '900'
                    }}>/70</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.joinAdventure}</div>
                </div>
              </div>

              <div className="inner-box relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl">🎮</span>
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)', opacity: 0.9 }}>{t.minecraftVersion}</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 break-words" style={{ color: 'var(--text-main)' }}>{version}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold" style={{ 
                      backgroundColor: 'var(--accent)', 
                      color: 'var(--bg-main)'
                    }}>{software}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6 sm:mt-8 px-2 animate-fade-in-delay-3">
          <Link 
            to="/join"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-110 shadow-2xl"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-main)',
              borderColor: 'var(--accent)'
            }}
          >
            <span>🎮</span>
            <span>{t.joinCTA}</span>
            <span>→</span>
          </Link>
          <p className="mt-3 text-xs sm:text-sm px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
            {t.joinCTADesc}
          </p>
        </div>
      </div>
    </section>
  );
}

function TwitchStream({ lang, isLive = false }) {
  const t = translations[lang].stream;
  
  return (
    <section id="stream" className="py-6 sm:py-8 md:py-12 relative overflow-hidden hero-gradient stars" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
        {/* Header con animación */}
        <div className="text-center mb-6 sm:mb-8">
          {isLive ? (
            <>
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full" style={{
                background: 'linear-gradient(135deg, #ff0050, #ff4d4d)',
                boxShadow: '0 0 30px rgba(255, 0, 80, 0.5)',
                animation: 'livePulse 2s ease-in-out infinite'
              }}>
                <span className="text-2xl sm:text-3xl">🔴</span>
                <span className="text-white font-black text-lg sm:text-xl">{t.title}</span>
              </div>
              <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4" style={{ color: 'var(--text-main)', opacity: 0.9 }}>
                {t.subtitle}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-4" style={{ color: 'var(--text-main)' }}>
                {t.offlineTitle}
              </h2>
              <p className="text-xs sm:text-sm max-w-2xl mx-auto px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
                {t.offlineDesc}
              </p>
            </>
          )}
        </div>

        {/* Contenedor del stream con chat */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-4 sm:gap-6">
          {/* Player de Twitch */}
          <div className="big-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <iframe
              src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${window.location.hostname}&muted=false`}
              width="100%"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              style={{ borderRadius: '24px', display: 'block' }}
              className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
              title="Twitch Stream"
            ></iframe>
          </div>

          {/* Chat de Twitch */}
          <div className="big-panel hidden lg:block" style={{ padding: '0', overflow: 'hidden' }}>
            <iframe
              src={`https://www.twitch.tv/embed/${TWITCH_CHANNEL}/chat?parent=${window.location.hostname}&darkpopout&dark-theme=true`}
              width="100%"
              frameBorder="0"
              scrolling="no"
              style={{ borderRadius: '24px', display: 'block' }}
              className="h-[500px]"
              title="Twitch Chat"
            ></iframe>
          </div>
        </div>

        {/* Botón para abrir en Twitch */}
        <div className="text-center mt-6 sm:mt-8 px-2">
          <a
            href={`https://www.twitch.tv/${TWITCH_CHANNEL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-110 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #9146FF, #772CE8)',
              color: '#ffffff',
              borderColor: '#9146FF'
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{ flexShrink: 0 }}
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
            <span>{isLive ? t.watchNow : t.followButton}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Features({ lang }) {
  const t = translations[lang].features;
  
  return (
    <section id="features" className="py-8 sm:py-10 md:py-12 border-t border-white/5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 px-4" style={{ color: 'var(--text-main)' }}>{t.title}</h2>
        <p className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
          {t.subtitle}
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: 'var(--text-main)' }}>{t.paper.title}</h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.paper.desc}</p>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌲</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: 'var(--text-main)' }}>{t.survival.title}</h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.survival.desc}</p>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl glass-panel hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👥</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: 'var(--text-main)' }}>{t.events.title}</h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.events.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function JoinForm({ lang }) {
  const t = translations[lang].joinForm;
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScuvIOzFnsUR7GY_E3tCdosb5_apxxdPHAcZzDdIgCRwclNqw/viewform?embedded=true";
  
  return (
    <section id="join-form" className="py-8 sm:py-12 md:py-16 border-t border-white/5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block mb-3 sm:mb-4 text-4xl sm:text-5xl animate-float">🎮</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4" style={{ color: 'var(--text-main)' }}>{t.title}</h2>
          <p className="max-w-2xl mx-auto mb-3 text-sm sm:text-base px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 px-2">
            <span className="pill text-xs sm:text-sm">{t.formPill}</span>
            <span className="pill text-xs sm:text-sm">{t.quickPill}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="big-panel" style={{ minHeight: '600px', height: 'auto', position: 'relative' }}>
            <div className="mb-4 text-center">
              <p className="mb-3 text-sm sm:text-base px-2" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{t.description}</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScuvIOzFnsUR7GY_E3tCdosb5_apxxdPHAcZzDdIgCRwclNqw/viewform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-main)',
                  borderColor: 'var(--accent)'
                }}
              >
                {t.openExternal}
              </a>
            </div>
            <div className="w-full" style={{ height: '500px', minHeight: '500px', position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
              <iframe 
                src={formUrl}
                width="100%" 
                height="100%"   
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                style={{ 
                  border: 'none',
                  borderRadius: '1rem',
                  minHeight: '500px'
                }}
                className="sm:h-[600px] md:h-[700px]"
                title="Formulario de ingreso al servidor"
              >
                {t.loading}
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards({ lang }) {
  const t = translations[lang].community;
  
  return (
    <section id="community" className="py-8 sm:py-10 md:py-12 border-t border-white/5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 px-4" style={{ color: 'var(--text-main)' }}>{t.title}</h2>
        <p className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
          {t.subtitle}
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-2xl card-gradient hover:scale-105 transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-indigo-600/40 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                💬
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg sm:text-xl mb-2" style={{ color: 'var(--text-main)' }}>{t.discord.title}</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.discord.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm sm:text-base" href="https://discord.com/invite/QgyvxtsgpE" target="_blank" rel="noopener noreferrer">
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
                <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--text-main)' }}>{t.wiki.title}</h3>
                <p className="mb-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.wiki.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold" href="#play">
                  {t.wiki.cta}
                </a>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl card-gradient hover:scale-105 transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-emerald-600/40 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                🛠️
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg sm:text-xl mb-2" style={{ color: 'var(--text-main)' }}>{t.support.title}</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.support.desc}</p>
                <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm sm:text-base" href="https://discord.com/invite/QgyvxtsgpE" target="_blank" rel="noopener noreferrer">
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

function Installation({ lang }) {
  const t = translations[lang].installation;
  
  return (
    <section className="py-8 sm:py-12 md:py-16 min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block mb-3 sm:mb-4 text-4xl sm:text-5xl animate-float">📦</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4" style={{ color: 'var(--text-main)' }}>{t.title}</h2>
          <p className="max-w-2xl mx-auto mb-3 text-sm sm:text-base px-4" style={{ color: 'var(--text-main)', opacity: 0.7 }}>
            {t.subtitle}
          </p>
        </div>

        {/* Archivos descargables */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-14 md:mb-16">
          {/* Server Pack */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">🗂️</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-center" style={{ color: 'var(--text-main)' }}>{t.serverPack.title}</h3>
            <p className="text-xs sm:text-sm mb-3 text-center" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.serverPack.desc}</p>
            <div className="text-xs mb-4 text-center pill inline-block w-full">{t.serverPack.size}</div>
            <a 
              href="/downloads/SERVER_1.20.1.zip" 
              download
              className="block w-full text-center px-3 sm:px-4 py-2 sm:py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-main)',
                borderColor: 'var(--accent)'
              }}
            >
              {t.serverPack.button}
            </a>
          </div>

          {/* Shaders */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">✨</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-center" style={{ color: 'var(--text-main)' }}>{t.shaders.title}</h3>
            <p className="text-xs sm:text-sm mb-3 text-center" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.shaders.desc}</p>
            <div className="text-xs mb-4 text-center pill inline-block w-full">{t.shaders.size}</div>
            <a 
              href="/downloads/ComplementaryShaders_v4.7.1.zip" 
              download
              className="block w-full text-center px-3 sm:px-4 py-2 sm:py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-main)',
                borderColor: 'var(--accent)'
              }}
            >
              {t.shaders.button}
            </a>
          </div>

          {/* Forge */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">⚙️</div>
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-center" style={{ color: 'var(--text-main)' }}>{t.forge.title}</h3>
            <p className="text-xs sm:text-sm mb-3 text-center" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{t.forge.desc}</p>
            <div className="text-xs mb-4 text-center pill inline-block w-full">{t.forge.size}</div>
            <a 
              href="/downloads/forge-1.20.1-47.4.10-installer.jar" 
              download
              className="block w-full text-center px-3 sm:px-4 py-2 sm:py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-main)',
                borderColor: 'var(--accent)'
              }}
            >
              {t.forge.button}
            </a>
          </div>
        </div>

        {/* Pasos de instalación */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 px-4" style={{ color: 'var(--text-main)' }}>{t.steps.title}</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-5 sm:p-6 rounded-xl card-gradient">
              <h4 className="font-bold text-base sm:text-lg mb-2" style={{ color: 'var(--text-main)' }}>{t.steps.step1.title}</h4>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{t.steps.step1.desc}</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl card-gradient">
              <h4 className="font-bold text-base sm:text-lg mb-2" style={{ color: 'var(--text-main)' }}>{t.steps.step2.title}</h4>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{t.steps.step2.desc}</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl card-gradient">
              <h4 className="font-bold text-base sm:text-lg mb-2" style={{ color: 'var(--text-main)' }}>{t.steps.step3.title}</h4>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{t.steps.step3.desc}</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl card-gradient">
              <h4 className="font-bold text-base sm:text-lg mb-2" style={{ color: 'var(--text-main)' }}>{t.steps.step4.title}</h4>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{t.steps.step4.desc}</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl card-gradient" style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)' }}>
              <h4 className="font-bold text-base sm:text-lg mb-2 text-emerald-400">{t.steps.step5.title}</h4>
              <p className="text-emerald-300 text-sm sm:text-base" style={{ opacity: 0.9 }}>{t.steps.step5.desc}</p>
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
    <footer className="py-8 sm:py-10 md:py-12 border-t border-white/5" style={{ backgroundColor: 'var(--bg-panel)' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Pollitos Craft" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div>
              <div className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>Pollitos Craft</div>
              <div className="text-xs sm:text-sm" style={{ color: 'var(--text-main)', opacity: 0.6 }}>{t.serverName}</div>
            </div>
          </div>
          <div className="text-center md:text-right text-xs sm:text-sm">
            <p style={{ color: 'var(--text-main)', opacity: 0.7 }}>© {new Date().getFullYear()} {t.copyright}</p>
            <p className="mt-1" style={{ color: 'var(--text-main)', opacity: 0.5 }}>{t.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
