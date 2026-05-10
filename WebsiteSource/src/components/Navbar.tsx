import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../context/TranslationContext';

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 30" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
    <rect width="120" height="30" fill="#012169" />
    <g transform="translate(43, 0)">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </g>
  </svg>
);

const VNFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 30" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
    <rect width="120" height="30" fill="#da251d" />
    <g transform="translate(50, 15) scale(0.045)">
      <polygon points="0,-186 103,132 -166,-64 166,-64 -103,132" fill="#ffcd00" />
    </g>
  </svg>
);

const LanguageToggle = ({ lang, toggleLanguage }: { lang: 'en' | 'vi', toggleLanguage: () => void }) => {
  return (
    <div className="flex items-center gap-2 font-bold text-[15px] select-none shrink-0 w-max">
      <span className={`transition-colors uppercase shrink-0 ${lang === 'en' ? 'text-[#5d677a] dark:text-white' : 'text-[#ccd0d9] dark:text-[#555]'}`}>EN</span>
      <button
        onClick={toggleLanguage}
        aria-label="Toggle Language"
        className="relative w-[72px] h-[36px] shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)] border-2 border-white/50 dark:border-white/5 p-0"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            initial={false}
            animate={{ opacity: lang === 'en' ? 1 : 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <UKFlag />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: lang === 'vi' ? 1 : 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <VNFlag />
          </motion.div>
        </div>

        {/* Inner shadow overlay for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] pointer-events-none z-20"></div>

        <motion.div
          className="absolute top-[2px] left-[2px] w-7 h-7 bg-gradient-to-b from-white to-[#eaeaea] dark:from-[#f4f4f4] dark:to-[#bcbcbc] rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.4),_inset_0_-3px_4px_rgba(0,0,0,0.15),_inset_0_3px_4px_rgba(255,255,255,0.9)] border border-black/5 dark:border-white/10 z-30"
          animate={{ x: lang === 'en' ? 0 : 37 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`transition-colors uppercase shrink-0 ${lang === 'vi' ? 'text-[#5d677a] dark:text-white' : 'text-[#ccd0d9] dark:text-[#555]'}`}>VI</span>
    </div>
  );
};

const DayBackground = () => (
  <svg viewBox="0 0 72 36" className="w-full h-full absolute inset-0">
    <rect width="72" height="36" fill="#7ba3d8" />
    <circle cx="18" cy="18" r="30" fill="#6992ce" />
    <circle cx="18" cy="18" r="22" fill="#5885c4" />
    <circle cx="18" cy="18" r="14" fill="#4a7bc0" />

    <g fill="#d5e8f5">
      <circle cx="72" cy="22" r="8" />
      <circle cx="60" cy="24" r="10" />
      <circle cx="48" cy="26" r="8" />
      <circle cx="38" cy="30" r="6" />
      <circle cx="28" cy="34" r="4" />
      <rect x="28" y="24" width="44" height="12" />
    </g>
    <g fill="#ebf4fa">
      <circle cx="72" cy="28" r="6" />
      <circle cx="62" cy="26" r="8" />
      <circle cx="52" cy="28" r="6" />
      <circle cx="42" cy="32" r="6" />
      <rect x="42" y="26" width="30" height="10" />
    </g>
    <g fill="#ffffff">
      <circle cx="72" cy="32" r="6" />
      <circle cx="64" cy="30" r="6" />
      <circle cx="54" cy="32" r="4" />
      <rect x="54" y="30" width="18" height="6" />
    </g>
  </svg>
);

const NightBackground = () => (
  <svg viewBox="0 0 72 36" className="w-full h-full absolute inset-0">
    <rect width="72" height="36" fill="#0c1626" />
    <circle cx="54" cy="18" r="28" fill="#1b2839" />
    <circle cx="54" cy="18" r="20" fill="#2b3b4d" />
    <circle cx="54" cy="18" r="12" fill="#3c4c5e" />

    {/* Stars */}
    <path d="M 16 12 Q 18 12 18 9 Q 18 12 21 12 Q 18 12 18 15 Q 18 12 16 12" fill="#fff" />
    <path d="M 27 21 Q 28.5 21 28.5 19.5 Q 28.5 21 30 21 Q 28.5 21 28.5 22.5 Q 28.5 21 27 21" fill="#fff" />
    <path d="M 33 8 Q 35 8 35 6 Q 35 8 37 8 Q 35 8 35 10 Q 35 8 33 8" fill="#fff" />
    <path d="M 43 23 Q 44.5 23 44.5 21.5 Q 44.5 23 46 23 Q 44.5 23 44.5 24.5 Q 44.5 23 43 23" fill="#fff" />
    {/* Small dots */}
    <circle cx="26" cy="10" r="1" fill="#fff" opacity="0.6" />
    <circle cx="10" cy="22" r="1" fill="#fff" opacity="0.8" />
    <circle cx="22" cy="28" r="0.8" fill="#fff" opacity="0.5" />
    <circle cx="38" cy="27" r="1.2" fill="#fff" opacity="0.7" />
  </svg>
);

const ThemeToggle = ({ isDark, toggleDarkMode }: { isDark: boolean, toggleDarkMode: () => void }) => {
  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Theme"
      className="relative w-[72px] h-[36px] rounded-full overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)] border-2 border-white/50 dark:border-white/5 p-0"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <DayBackground />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          className="absolute inset-0 w-full h-full"
        >
          <NightBackground />
        </motion.div>
      </div>

      {/* Inner shadow overlay for depth */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] pointer-events-none z-20"></div>

      <motion.div
        className="absolute top-[2px] left-[2px] w-[28px] h-[28px] rounded-full z-30"
        animate={{ x: isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Sun Circle */}
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          className="absolute inset-0 w-full h-full rounded-full bg-[#fce51a] shadow-[0_2px_4px_rgba(0,0,0,0.3),_inset_0_-2px_4px_rgba(200,180,0,0.6),_inset_0_2px_4px_rgba(255,255,255,0.8)]"
        />
        {/* Moon Circle */}
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          className="absolute inset-0 w-full h-full rounded-full bg-[#9da2ab] shadow-[0_2px_4px_rgba(0,0,0,0.3),_inset_0_-2px_4px_rgba(100,100,100,0.6),_inset_0_2px_4px_rgba(255,255,255,0.4)]"
        >
          {/* Craters */}
          <div className="absolute top-[5px] right-[7px] w-[5px] h-[5px] rounded-full bg-[#6d7179] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-[6px] right-[8px] w-[8px] h-[8px] rounded-full bg-[#6d7179] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-[4px] left-[6px] w-[4px] h-[4px] rounded-full bg-[#6d7179] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-[9px] left-[7px] w-[3px] h-[3px] rounded-full bg-[#6d7179] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
        </motion.div>
      </motion.div>
    </button>
  );
};

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const { lang, toggleLanguage } = useTranslation();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(document.documentElement.classList.contains('dark'));
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex flex-shrink min-w-0 items-center cursor-pointer mr-2">
            <img src="src/assets/PocketDrop.png" alt="PocketDrop Logo" className="w-8 h-8 mr-2 rounded-lg shrink-0" />
            <span className="font-bold text-black dark:text-white text-xl tracking-tight truncate">PocketDrop</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-end shrink-0 pl-1 sm:pl-4">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              <div className="scale-[0.75] sm:scale-90 md:scale-100 origin-right transform-gpu -ml-6 sm:-ml-2">
                <LanguageToggle lang={lang} toggleLanguage={toggleLanguage} />
              </div>
              <div className="scale-[0.8] sm:scale-90 md:scale-100 origin-right transform-gpu -ml-3 sm:-ml-1">
                <ThemeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
