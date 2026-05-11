import { Github, Tag, Bug, ShieldCheck, EyeOff, Heart } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import logoSrc from '../assets/PocketDrop.png';

const GITHUB_URL = 'https://github.com/naofunyan/PocketDrop';
const RELEASES_URL = 'https://github.com/naofunyan/PocketDrop/releases';
const ISSUES_URL = 'https://github.com/naofunyan/PocketDrop/issues';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top row — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start mb-10">

          {/* Left — brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={logoSrc} alt="PocketDrop Logo" className="w-7 h-7 rounded-lg" />
              <span className="font-bold text-black dark:text-white text-base tracking-tight">
                PocketDrop
              </span>
            </div>
            <p className="font-oooh-baby text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-[#ff5e62] pl-9">
              {t.footer.tagline}
            </p>
          </div>

          {/* Center — GitHub links */}
          <nav className="flex flex-col items-start md:items-center gap-1" aria-label="Footer navigation">
            <a
              href={GITHUB_URL}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 flex-shrink-0" />
              {t.footer.viewGithub}
            </a>
            <a
              href={RELEASES_URL}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
            >
              <Tag className="w-4 h-4 flex-shrink-0" />
              {t.footer.releases}
            </a>
            <a
              href={ISSUES_URL}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#dd2c2f] transition-colors"
            >
              <Bug className="w-4 h-4 flex-shrink-0" />
              {t.footer.reportBug}
            </a>
          </nav>

          {/* Right — trust badges */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              <span>{t.footer.noData}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <EyeOff className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              <span>{t.footer.noTracking}</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t.footer.rights.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>

      </div>
    </footer>
  );
}