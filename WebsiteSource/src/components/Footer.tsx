import { useTranslation } from '../context/TranslationContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] pt-16 pb-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-sm">
            <div className="flex items-center mb-4">
              <img src="/logo.svg" alt="PocketDrop Logo" className="w-8 h-8 mr-2 rounded-lg" />
              <span className="font-bold text-black dark:text-white text-xl tracking-tight uppercase">PocketDrop</span>
            </div>
            <p className="text-gray-500 pr-4">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">{t.footer.support}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-black/60 dark:text-white/60 hover:text-primary-600 transition-colors">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t.footer.rights.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className="flex gap-4">
            {['GitHub'].map(social => (
               <a key={social} href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-600 font-medium text-sm">
                 {social}
               </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
