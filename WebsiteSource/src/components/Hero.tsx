import { motion } from 'motion/react';
import { useTranslation } from '../context/TranslationContext';
import githubLogo from '../assets/github.svg';
import microsoftLogo from '../assets/microsoft.svg';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[59%] text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-6 tracking-tight">
            {t.hero.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-[#ff5e62] font-oooh-baby text-[0.9em] sm:text-[0.9em] lg:text-[0.9em]">
              {t.hero.subtitle}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-[190px] flex items-center justify-center gap-4 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors">
              <img src={githubLogo} alt="GitHub" className="w-8 h-8 invert dark:invert-0" />
              <div className="text-left flex flex-col justify-center space-y-0.5">
                <div className="text-[10px] leading-tight uppercase font-medium text-white dark:text-black">{t.hero.availableOn}</div>
                <div className="text-base font-semibold leading-tight">GitHub</div>
              </div>
            </button>
            <button className="w-full sm:w-[230px] flex items-center justify-center gap-4 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors">
              <img src={microsoftLogo} alt="Microsoft" className="w-8 h-8 ml-1" />
              <div className="text-left ml-1 flex flex-col justify-center space-y-0.5">
                <div className="text-[10px] leading-tight uppercase font-medium text-white dark:text-black">{t.hero.getFrom}</div>
                <div className="text-base font-semibold leading-tight">Microsoft Store</div>
              </div>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full lg:w-[43%] mt-12 lg:mt-0 lg:ml-10"
        >
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 bg-primary-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-[#ff5e62]/5 rounded-full blur-[100px]"></div>

          {/* App Screen Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden z-10">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
              alt="App Preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
