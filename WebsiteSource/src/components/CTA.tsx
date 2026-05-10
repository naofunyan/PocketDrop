import { Github, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#111]">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">{t.cta.title}</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.cta.description}
        </p>
    
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-[1.25rem] transition-colors font-semibold text-lg shadow-lg">
            <Github className="w-6 h-6" />
            {t.cta.github}
          </a>
          <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[1.25rem] transition-colors font-semibold text-lg shadow-lg shadow-blue-600/20">
            <ShoppingBag className="w-6 h-6" />
            {t.cta.store}
          </a>
        </div>
      </div>
    </section>
  );
}
