import { Heart, Ban, Code } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import githubLogo from '../assets/github.svg';
import microsoftLogo from '../assets/microsoft.svg';

const VALUE_PROPS = [
  {
    icon: Heart,
    titleKey: 'free' as const,
    descKey: 'freeDesc' as const,
  },
  {
    icon: Ban,
    titleKey: 'noAds' as const,
    descKey: 'noAdsDesc' as const,
  },
  {
    icon: Code,
    titleKey: 'openSource' as const,
    descKey: 'openSourceDesc' as const,
  },
];

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#111]">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Eyebrow */}
        <p className="text-base font-semibold tracking-widest uppercase text-[#dd2c2f] mb-4">
          {t.cta.eyebrow}
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight max-w-[500px] mx-auto">
          {t.cta.title}
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-14 max-w-[700px] mx-auto leading-relaxed">
          {t.cta.description}
        </p>

        {/* Value prop cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 text-left">
          {VALUE_PROPS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.04] p-6 lg:p-7"
            >
              <Icon className="w-6 h-6 text-[#dd2c2f] mb-3" strokeWidth={1.75} />
              <div className="text-lg font-semibold text-black dark:text-white mb-1">
                {t.cta.props[titleKey]}
              </div>
              <div className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {t.cta.props[descKey]}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          {/* Divider */}
          <div className="w-48 h-[2px] bg-black dark:bg-white mb-8" />

          {/* OS note */}
          <p className="text-sm text-gray-600 dark:text-white mb-6 flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            {t.cta.osNote}
          </p>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full">

            <a
              href="https://github.com/naofunyan/PocketDrop"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[190px] flex items-center justify-center gap-4 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors"
            >
              <img src={githubLogo} alt="GitHub" className="w-8 h-8 invert dark:invert-0" />
              <div className="text-left flex flex-col justify-center space-y-0.5">
                <div className="text-[10px] leading-tight uppercase font-medium text-white dark:text-black">{t.hero.availableOn}</div>
                <div className="text-base font-semibold leading-tight">GitHub</div>
              </div>
            </a>

            <a
              href="https://apps.microsoft.com/detail/9nbxrbxv5xn9?hl=en-US&gl=VN"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[230px] flex items-center justify-center gap-4 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors"
            >
              <img src={microsoftLogo} alt="Microsoft" className="w-8 h-8 ml-1" />
              <div className="text-left ml-1 flex flex-col justify-center space-y-0.5">
                <div className="text-[10px] leading-tight uppercase font-medium text-white dark:text-black">{t.hero.getFrom}</div>
                <div className="text-base font-semibold leading-tight">Microsoft Store</div>
              </div>
            </a>

          </div>
        </div>



      </div>
    </section>
  );
}