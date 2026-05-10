import React from 'react';
import {
  Folder,
  Image as ImageIcon,
  FileVideo,
  Music,
  Link,
  FileText,
  FileArchive,
  Maximize,
  RefreshCw,
  Share2,
  Command,
  Settings,
  LayoutGrid
} from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import f1Video from '../assets/f1.mp4';
import f3Video from '../assets/h3.mp4';
import f4Video from '../assets/h4.mp4';
import f6Video from '../assets/v6.mp4';

// ── Chip color classes (light + dark) ──────────────────────────
const doc = "bg-blue-500/10   border-blue-500/40   dark:border-blue-400/30   text-blue-700   dark:text-blue-300";
const img = "bg-purple-500/10 border-purple-500/40 dark:border-purple-400/30 text-purple-700 dark:text-purple-400";
const vid = "bg-orange-500/10 border-orange-500/40 dark:border-orange-400/30 text-orange-700 dark:text-orange-400";
const aud = "bg-green-500/10  border-green-500/40  dark:border-green-400/30  text-green-700  dark:text-green-400";
const cod = "bg-cyan-500/10   border-cyan-500/40   dark:border-cyan-400/30   text-cyan-700   dark:text-cyan-400";
const arc = "bg-amber-500/10  border-amber-500/40  dark:border-amber-400/30  text-amber-800  dark:text-amber-400";
const oth = "bg-slate-500/10  border-slate-400/30  dark:border-slate-400/20  text-slate-600  dark:text-slate-400";

type Chip = { ext: string; cls: string; top: string; left: string; d: string; delay: string; tx: string; ty: string; op: number };

const chips: Chip[] = [
  // Documents
  { ext: ".pdf", cls: doc, top: "7%", left: "2%", d: "8s", delay: "0s", tx: "5px", ty: "-12px", op: 0.60 },
  { ext: ".docx", cls: doc, top: "20%", left: "7%", d: "10s", delay: "1.8s", tx: "-7px", ty: "-10px", op: 0.50 },
  { ext: ".xlsx", cls: doc, top: "55%", left: "3%", d: "9s", delay: "3.2s", tx: "8px", ty: "-8px", op: 0.55 },
  { ext: ".pptx", cls: doc, top: "74%", left: "9%", d: "11s", delay: "0.6s", tx: "-5px", ty: "-14px", op: 0.50 },
  { ext: ".txt", cls: doc, top: "89%", left: "17%", d: "7.5s", delay: "4.1s", tx: "6px", ty: "-10px", op: 0.45 },
  { ext: ".csv", cls: doc, top: "13%", left: "81%", d: "9s", delay: "2.4s", tx: "-8px", ty: "-12px", op: 0.55 },
  { ext: ".rtf", cls: doc, top: "68%", left: "88%", d: "10s", delay: "1.1s", tx: "5px", ty: "-10px", op: 0.50 },
  { ext: ".md", cls: doc, top: "38%", left: "91%", d: "8s", delay: "3.8s", tx: "-5px", ty: "-8px", op: 0.45 },
  // Images
  { ext: ".png", cls: img, top: "4%", left: "22%", d: "9.5s", delay: "0.4s", tx: "4px", ty: "-12px", op: 0.55 },
  { ext: ".jpg", cls: img, top: "17%", left: "32%", d: "8s", delay: "2.6s", tx: "-9px", ty: "-10px", op: 0.50 },
  { ext: ".gif", cls: img, top: "81%", left: "24%", d: "11s", delay: "1s", tx: "7px", ty: "-14px", op: 0.55 },
  { ext: ".psd", cls: img, top: "91%", left: "36%", d: "7.5s", delay: "3.7s", tx: "-5px", ty: "-8px", op: 0.45 },
  { ext: ".svg", cls: img, top: "8%", left: "63%", d: "9s", delay: "1.9s", tx: "6px", ty: "-12px", op: 0.50 },
  { ext: ".webp", cls: img, top: "84%", left: "71%", d: "8.5s", delay: "0.2s", tx: "-6px", ty: "-10px", op: 0.55 },
  { ext: ".ai", cls: img, top: "4%", left: "49%", d: "12s", delay: "4.8s", tx: "4px", ty: "-6px", op: 0.35 },
  // Video
  { ext: ".mp4", cls: vid, top: "29%", left: "2%", d: "8.5s", delay: "2.1s", tx: "5px", ty: "-10px", op: 0.60 },
  { ext: ".mov", cls: vid, top: "44%", left: "6%", d: "9.5s", delay: "4.3s", tx: "-7px", ty: "-14px", op: 0.50 },
  { ext: ".avi", cls: vid, top: "93%", left: "54%", d: "7.5s", delay: "0.9s", tx: "5px", ty: "-10px", op: 0.50 },
  { ext: ".mkv", cls: vid, top: "5%", left: "74%", d: "10.5s", delay: "3.1s", tx: "-5px", ty: "-12px", op: 0.55 },
  { ext: ".webm", cls: vid, top: "87%", left: "84%", d: "9s", delay: "2.3s", tx: "7px", ty: "-8px", op: 0.45 },
  { ext: ".flv", cls: vid, top: "54%", left: "94%", d: "8s", delay: "0.7s", tx: "-4px", ty: "-10px", op: 0.50 },
  // Audio
  { ext: ".mp3", cls: aud, top: "37%", left: "13%", d: "9s", delay: "3.3s", tx: "6px", ty: "-12px", op: 0.50 },
  { ext: ".wav", cls: aud, top: "63%", left: "15%", d: "8.5s", delay: "1.3s", tx: "-5px", ty: "-10px", op: 0.50 },
  { ext: ".flac", cls: aud, top: "93%", left: "41%", d: "10.5s", delay: "4.6s", tx: "4px", ty: "-8px", op: 0.40 },
  { ext: ".aac", cls: aud, top: "27%", left: "84%", d: "7.5s", delay: "2.9s", tx: "-6px", ty: "-12px", op: 0.55 },
  { ext: ".ogg", cls: aud, top: "49%", left: "79%", d: "10s", delay: "0.4s", tx: "5px", ty: "-10px", op: 0.50 },
  // Code
  { ext: ".js", cls: cod, top: "11%", left: "41%", d: "8s", delay: "1.2s", tx: "5px", ty: "-10px", op: 0.45 },
  { ext: ".py", cls: cod, top: "86%", left: "29%", d: "9.5s", delay: "3.6s", tx: "-7px", ty: "-14px", op: 0.50 },
  { ext: ".ts", cls: cod, top: "21%", left: "56%", d: "7.5s", delay: "0.1s", tx: "5px", ty: "-10px", op: 0.45 },
  { ext: ".jsx", cls: cod, top: "74%", left: "61%", d: "11s", delay: "2.7s", tx: "-4px", ty: "-8px", op: 0.55 },
  { ext: ".json", cls: cod, top: "39%", left: "75%", d: "9s", delay: "4.2s", tx: "6px", ty: "-12px", op: 0.50 },
  { ext: ".html", cls: cod, top: "61%", left: "71%", d: "7.5s", delay: "1.6s", tx: "-5px", ty: "-10px", op: 0.50 },
  { ext: ".css", cls: cod, top: "7%", left: "35%", d: "10s", delay: "3.1s", tx: "4px", ty: "-6px", op: 0.35 },
  { ext: ".php", cls: cod, top: "95%", left: "77%", d: "8.5s", delay: "0.9s", tx: "5px", ty: "-8px", op: 0.40 },
  // Archives
  { ext: ".zip", cls: arc, top: "49%", left: "17%", d: "8.5s", delay: "2.2s", tx: "5px", ty: "-12px", op: 0.50 },
  { ext: ".rar", cls: arc, top: "79%", left: "47%", d: "9.5s", delay: "4.4s", tx: "-6px", ty: "-10px", op: 0.45 },
  { ext: ".7z", cls: arc, top: "16%", left: "91%", d: "7.5s", delay: "1.6s", tx: "5px", ty: "-8px", op: 0.55 },
  { ext: ".tar", cls: arc, top: "59%", left: "87%", d: "10.5s", delay: "3.2s", tx: "-4px", ty: "-12px", op: 0.45 },
  { ext: ".gz", cls: arc, top: "96%", left: "9%", d: "8s", delay: "0.5s", tx: "6px", ty: "-6px", op: 0.40 },
  // Other
  { ext: ".apk", cls: oth, top: "34%", left: "22%", d: "9.5s", delay: "1.1s", tx: "4px", ty: "-10px", op: 0.35 },
  { ext: ".exe", cls: oth, top: "71%", left: "34%", d: "9s", delay: "3.8s", tx: "-5px", ty: "-8px", op: 0.30 },
  { ext: ".xml", cls: oth, top: "24%", left: "67%", d: "7.5s", delay: "2.1s", tx: "6px", ty: "-12px", op: 0.35 },
  { ext: ".iso", cls: oth, top: "96%", left: "67%", d: "10s", delay: "0.4s", tx: "-4px", ty: "-10px", op: 0.30 },
  { ext: ".dmg", cls: oth, top: "47%", left: "96%", d: "8.5s", delay: "4.1s", tx: "5px", ty: "-8px", op: 0.35 },
  { ext: ".url", cls: oth, top: "3%", left: "57%", d: "11s", delay: "2.7s", tx: "-4px", ty: "-6px", op: 0.30 },
];

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 border-t border-black/5 dark:border-white/5">

      {/* Feature 1 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8 relative rounded-[2.5rem] bg-gray-50/50 dark:bg-[#111111]/50 w-full border border-black/5 dark:border-white/5 p-3 md:p-6 overflow-hidden group">
            <div className="relative w-full rounded-[1.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
              <video src={f1Video} autoPlay muted loop playsInline className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
            <div className="text-primary-600 font-bold tracking-wider uppercase text-lg mb-4">{t.features.feature1.label}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature1.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {t.features.feature1.description}
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {t.features.feature1.description2}
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2 (Banner style) */}
      <div className="relative mt-20 lg:mt-32 w-full overflow-hidden group h-[600px] lg:h-[700px] flex items-center justify-center text-center">

        {/* Background */}
        <div className="absolute inset-0 bg-[#f0f2f7] dark:bg-[#06060e] transition-colors duration-500" />

        {/* Floating file extension chips */}
        {chips.map((chip, i) => (
          <span
            key={i}
            className={`absolute chip-float font-mono font-bold text-[12.5px] tracking-wide border rounded-lg px-[11px] py-[5px] z-[1] transition-colors duration-500 ${chip.cls}`}
            style={{
              top: chip.top,
              left: chip.left,
              '--chip-d': chip.d,
              '--chip-delay': chip.delay,
              '--chip-tx': chip.tx,
              '--chip-ty': chip.ty,
              '--chip-op': chip.op,
            } as React.CSSProperties}
          >
            {chip.ext}
          </span>
        ))}

        {/* Vignette — light mode */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none dark:hidden"
          style={{ background: 'radial-gradient(ellipse 58% 68% at 50% 50%, transparent 25%, rgba(240,242,247,0.72) 100%)' }}
        />
        {/* Vignette — dark mode */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none hidden dark:block"
          style={{ background: 'radial-gradient(ellipse 58% 68% at 50% 50%, transparent 25%, rgba(6,6,14,0.76) 100%)' }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-lg">{t.features.feature2.label}</div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight leading-tight">{t.features.feature2.title}</h2>
          </div>
          <div className="flex flex-col items-center max-w-xl">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-balance">
              {t.features.feature2.description}
            </p>
          </div>

          {/* Glassmorphic icons row */}
          <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-[2.5rem] px-8 py-6 border border-black/5 dark:border-white/10 flex flex-wrap justify-center gap-4 mt-8 opacity-90 group-hover:opacity-100 transition-opacity shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-1"><Folder className="w-6 h-6" /></div>
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-2"><ImageIcon className="w-6 h-6" /></div>
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-3"><FileVideo className="w-6 h-6" /></div>
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-1" style={{ animationDelay: '0.2s' }}><Link className="w-6 h-6" /></div>
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-2" style={{ animationDelay: '0.6s' }}><Music className="w-6 h-6" /></div>
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-inner animate-float-3" style={{ animationDelay: '0.8s' }}><FileText className="w-6 h-6" /></div>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="order-1 lg:order-1 lg:col-span-5 xl:col-span-4">
            <div className="text-primary-600 font-bold tracking-wider uppercase text-lg mb-4">{t.features.feature3.label}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature3.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {t.features.feature3.description}
            </p>
          </div>
          <div className="order-2 lg:order-2 lg:col-span-7 xl:col-span-8 relative rounded-[2.5rem] bg-gray-50/50 dark:bg-[#111111]/50 w-full md:w-[90%] lg:w-full mx-auto border border-black/5 dark:border-white/5 p-3 md:p-6 overflow-hidden group">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] xl:aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
              <video src={f3Video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8 relative rounded-[2.5rem] bg-gray-50/50 dark:bg-[#111111]/50 w-full md:w-[90%] lg:w-full mx-auto border border-black/5 dark:border-white/5 p-3 md:p-6 overflow-hidden group">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] xl:aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
              <video src={f4Video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
            <div className="text-primary-600 font-bold tracking-wider uppercase text-lg mb-4">{t.features.feature4.label}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature4.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {t.features.feature4.description}
            </p>
          </div>
        </div>
      </div>

      {/* Feature 5 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="order-1 lg:order-1 lg:col-span-5 xl:col-span-4">
            <div className="text-primary-600 font-bold tracking-wider uppercase text-lg mb-4">{t.features.feature5.label}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature5.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {t.features.feature5.description}
            </p>
          </div>
          <div className="order-2 lg:order-2 lg:col-span-7 xl:col-span-8 relative rounded-[2.5rem] bg-gray-50/50 dark:bg-[#111111]/50 w-full md:w-[90%] lg:w-full mx-auto border border-black/5 dark:border-white/5 p-3 md:p-6 overflow-hidden group">
            <div className="relative w-full rounded-[1.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
              <video src={f6Video} autoPlay muted loop playsInline className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}