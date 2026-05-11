import { Github, Heart, Ban, Code } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

// Microsoft Store coloured logo — four squares
function MicrosoftIcon() {
  return (
    <div className="grid grid-cols-2 gap-[3px] w-[20px] h-[20px] flex-shrink-0" aria-hidden="true">
      <span className="rounded-[1px] bg-[#f35325]" />
      <span className="rounded-[1px] bg-[#81bc06]" />
      <span className="rounded-[1px] bg-[#05a6f0]" />
      <span className="rounded-[1px] bg-[#ffba08]" />
    </div>
  );
}

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
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Eyebrow */}
        <p className="text-xs font-semibold tracking-widest uppercase text-[#dd2c2f] mb-4">
          {t.cta.eyebrow}
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-5 tracking-tight leading-tight">
          {t.cta.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
          {t.cta.description}
        </p>

        {/* Value prop cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
          {VALUE_PROPS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.04] p-5"
            >
              <Icon className="w-5 h-5 text-[#dd2c2f] mb-3" strokeWidth={1.75} />
              <div className="text-sm font-semibold text-black dark:text-white mb-1">
                {t.cta.props[titleKey]}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {t.cta.props[descKey]}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-black/10 dark:bg-white/10 mx-auto mb-8" />

        {/* OS note */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
          </svg>
          {t.cta.osNote}
        </p>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">

          {/* GitHub */}
          <a
            href="#"
            className="flex items-center justify-center gap-3 bg-[#dd2c2f] hover:bg-[#c4272a] text-white px-7 py-4 rounded-2xl transition-colors font-semibold text-base shadow-lg shadow-[#dd2c2f]/20"
          >
            <Github className="w-5 h-5 flex-shrink-0" />
            <div className="text-left">
              <div className="leading-tight">{t.cta.github}</div>
              <div className="text-xs font-normal opacity-75 mt-0.5">{t.cta.githubSub}</div>
            </div>
          </a>

          {/* Microsoft Store */}
          <a
            href="#"
            className="flex items-center justify-center gap-3 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.10] border border-black/10 dark:border-white/10 text-black dark:text-white px-7 py-4 rounded-2xl transition-colors font-semibold text-base"
          >
            <MicrosoftIcon />
            <div className="text-left">
              <div className="leading-tight">{t.cta.store}</div>
              <div className="text-xs font-normal text-gray-400 dark:text-gray-500 mt-0.5">{t.cta.storeSub}</div>
            </div>
          </a>

        </div>

        {/* Footer hint */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          {t.cta.hint}{' '}
          <a href="#" className="text-[#dd2c2f] underline underline-offset-2 hover:no-underline">
            {t.cta.hintGithub}
          </a>{' '}
          {t.cta.hintMiddle}{' '}
          <a href="#" className="text-[#dd2c2f] underline underline-offset-2 hover:no-underline">
            {t.cta.hintStore}
          </a>{' '}
          {t.cta.hintEnd}
        </p>

      </div>
    </section>
  );
}