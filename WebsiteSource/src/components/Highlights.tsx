import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import v1Video from '../assets/h1.mp4';
import v2Video from '../assets/h2.png';
import v3Video from '../assets/h3.mp4';
import v4Video from '../assets/h4.mp4';
import v5Video from '../assets/h5.png';

export default function Highlights() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    // Check if we are at the end (with a small 10px buffer)
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
      setActiveSlide(4);
      return;
    }

    const itemWidth = (carouselRef.current.querySelector('div')?.clientWidth || 800) + 24;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(index);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const itemWidth = (carouselRef.current.querySelector('div')?.clientWidth || 800) + 24;
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = (carouselRef.current.querySelector('div')?.clientWidth || 800) + 24;
      carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight">{t.highlights.title}</h2>
      </div>

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Card 1 */}
        <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1D1D1F] border border-black dark:border-white/20 group relative">
          <div className="px-6 md:px-10 shrink-0 h-[25%] relative z-20 flex flex-col justify-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-[2rem] [@media(max-height:850px)_and_(orientation:portrait)]:!text-xl font-medium text-black dark:text-white w-full md:w-[94%] leading-tight tracking-tight">{t.highlights.card1}</h3>
          </div>
          <div className="relative h-[75%] w-full overflow-hidden mt-auto z-10">
            <video src={v1Video} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1D1D1F] border border-black dark:border-white/20 group relative">
          <div className="px-6 md:px-10 shrink-0 h-[25%] relative z-20 flex flex-col justify-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-[2rem] [@media(max-height:850px)_and_(orientation:portrait)]:!text-xl font-medium text-black dark:text-white w-full md:w-[94%] leading-tight tracking-tight">{t.highlights.card2}</h3>
          </div>
          <div className="relative h-[75%] w-full overflow-hidden mt-auto z-10">
            <img src={v2Video} alt="Highlight 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1D1D1F] border border-black dark:border-white/20 group relative">
          <div className="px-6 md:px-10 shrink-0 h-[25%] relative z-20 flex flex-col justify-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-[2rem] [@media(max-height:850px)_and_(orientation:portrait)]:!text-xl font-medium text-black dark:text-white w-full md:w-[94%] leading-tight tracking-tight">{t.highlights.card3}</h3>
          </div>
          <div className="relative h-[75%] w-full overflow-hidden mt-auto z-10">
            <video src={v3Video} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1D1D1F] border border-black dark:border-white/20 group relative">
          <div className="px-6 md:px-10 shrink-0 h-[25%] relative z-20 flex flex-col justify-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-[2rem] [@media(max-height:850px)_and_(orientation:portrait)]:!text-xl font-medium text-black dark:text-white w-full md:w-[94%] leading-tight tracking-tight">{t.highlights.card4}</h3>
          </div>
          <div className="relative h-[75%] w-full overflow-hidden mt-auto z-10">
            <video src={v4Video} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1D1D1F] border border-black dark:border-white/20 group relative">
          <div className="px-6 md:px-10 shrink-0 h-[25%] relative z-20 flex flex-col justify-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-[2rem] [@media(max-height:850px)_and_(orientation:portrait)]:!text-xl font-medium text-black dark:text-white w-full md:w-[94%] leading-tight tracking-tight">{t.highlights.card5}</h3>
          </div>
          <div className="relative h-[75%] w-full overflow-hidden mt-auto z-10">
            <img src={v5Video} alt="Highlight 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mt-6">
        <div className="bg-gray-200 dark:bg-[#1c1c1e] px-4 py-3 rounded-full flex items-center gap-3 border border-black/5 dark:border-white/5 mr-2">
          {[0, 1, 2, 3, 4].map(idx => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-black dark:bg-white' : 'w-2 bg-black/30 dark:bg-white/30'}`}
            />
          ))}
        </div>
        <button onClick={scrollLeft} className="w-12 h-12 rounded-full bg-black/5 dark:bg-black dark:bg-white/5 hover:bg-black/10 dark:bg-black dark:bg-white/10 flex items-center justify-center text-black dark:text-white transition-colors border border-black/10 dark:border-white/10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={scrollRight} className="w-12 h-12 rounded-full bg-black/5 dark:bg-black dark:bg-white/5 hover:bg-black/10 dark:bg-black dark:bg-white/10 flex items-center justify-center text-black dark:text-white transition-colors border border-black/10 dark:border-white/10">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
