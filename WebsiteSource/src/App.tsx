import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  X,
  Smartphone,
  Download,
  ChevronRight,
  ChevronLeft,
  Github,
  Monitor,
  Moon,
  Sun,
  Globe,
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
  LayoutGrid,
  ShoppingBag
} from 'lucide-react';
import { translations, Language } from './translations';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'vi' : 'en');
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    // Check if we are at the end (with a small 10px buffer)
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
      setActiveSlide(2);
      return;
    }
    
    const itemWidth = (carouselRef.current.querySelector('div')?.clientWidth || 800) + 24;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(index);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-500 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center mr-2">
                <Smartphone className="w-5 h-5 text-black dark:text-white" />
              </div>
              <span className="font-bold text-black dark:text-white text-xl tracking-tight uppercase">PocketDrop</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white font-medium uppercase text-xs tracking-wider" aria-label="Toggle Language">
                <Globe className="w-4 h-4" />
                {lang}
              </button>
              <button onClick={toggleDarkMode} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors" aria-label="Toggle Theme">
                <Moon className="w-5 h-5 hidden dark:block" />
                <Sun className="w-5 h-5 block dark:hidden" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:text-white font-medium uppercase text-xs tracking-wider" aria-label="Toggle Language">
                <Globe className="w-4 h-4" />
                {lang}
              </button>
              <button onClick={toggleDarkMode} className="text-black/60 dark:text-white/60 hover:text-black dark:text-white focus:outline-none" aria-label="Toggle Theme">
                <Moon className="w-5 h-5 hidden dark:block" />
                <Sun className="w-5 h-5 block dark:hidden" />
              </button>
              <button onClick={toggleMenu} className="text-black/60 dark:text-white/60 hover:text-black dark:text-white focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-50 dark:bg-[#161616] border-b border-black/5 dark:border-white/5"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {/* Menu items removed as per request */}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-6 tracking-tight">
              {t.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-[#ff5e62]">{t.hero.subtitle}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors">
                <Github className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight uppercase font-medium text-gray-500">{t.hero.availableOn}</div>
                  <div className="text-base font-semibold leading-tight">GitHub</div>
                </div>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3.5 rounded-xl transition-colors">
                <Monitor className="w-5 h-5 ml-1" />
                <div className="text-left ml-1">
                  <div className="text-[10px] leading-tight uppercase font-medium text-gray-500">{t.hero.getFrom}</div>
                  <div className="text-base font-semibold leading-tight">Microsoft Store</div>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full lg:max-w-none mt-12 lg:mt-0 lg:ml-10"
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

      {/* Features Section */}
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
          <div className="snap-start shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#1D1D1F] border border-black/5 dark:border-white/5 group relative">
            <div className="px-6 pt-6 md:px-10 md:pt-10 shrink-0 h-[35%] relative z-20 flex flex-col justify-start">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black dark:text-white w-full md:w-5/6 leading-tight tracking-tight">{t.highlights.card1}</h3>
            </div>
            <div className="relative h-[65%] w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80" alt="Highlight 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="snap-start shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#222225] border border-black/5 dark:border-white/5 group relative">
            <div className="px-6 pt-6 md:px-10 md:pt-10 shrink-0 h-[35%] relative z-20 flex flex-col justify-start">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black dark:text-white w-full md:w-5/6 leading-tight tracking-tight">{t.highlights.card2}</h3>
            </div>
            <div className="relative h-[65%] w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Highlight 2" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="snap-start shrink-0 w-[85vw] md:w-[60vw] lg:w-[800px] aspect-[4/3] md:aspect-[16/10] flex flex-col rounded-[2rem] overflow-hidden bg-gray-200 dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 group relative">
            <div className="px-6 pt-6 md:px-10 md:pt-10 shrink-0 h-[35%] relative z-20 flex flex-col justify-start">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black dark:text-white w-full md:w-5/6 leading-tight tracking-tight">{t.highlights.card3}</h3>
            </div>
            <div className="relative h-[65%] w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80" alt="Highlight 3" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-6">
          <div className="bg-gray-200 dark:bg-[#1c1c1e] px-4 py-3 rounded-full flex items-center gap-3 border border-black/5 dark:border-white/5 mr-2">
             {[0, 1, 2].map(idx => (
               <div 
                 key={idx}
                 className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-gray-300' : 'w-2 bg-gray-600'}`}
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

      {/* How it Works / Features */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-black/5 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative rounded-[2.5rem] bg-gray-50 dark:bg-[#111111] aspect-square lg:aspect-auto lg:h-[500px] border border-black/5 dark:border-white/5 flex items-center justify-center p-6 md:p-12 overflow-hidden group">
              {/* The animation container */}
              <div className="relative w-full h-full border border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-[#1D1D1F] shadow-xl flex items-center justify-center overflow-hidden">
                 {/* Grid background */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Abstract item being dragged */}
                 <div className="absolute top-[20%] lg:top-[30%] w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 rotate-[-10deg] shadow-2xl animate-[wiggle_1s_ease-in-out_infinite] group-hover:animate-wiggle flex items-center justify-center z-10 backdrop-blur-sm transition-transform duration-1000 group-hover:translate-y-8 group-hover:rotate-0">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg opacity-80" />
                 </div>
                 
                 {/* The Pocket popping in */}
                 <div className="absolute bottom-16 w-56 h-16 bg-black dark:bg-[#222225] rounded-[1.25rem] border border-black/10 dark:border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex items-center px-4 gap-4 animate-pop-in [animation-delay:1s] opacity-0 z-20 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 bg-white rounded-md" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-2 w-24 bg-white/20 rounded-full" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                 </div>
                 
                 {/* Cursor */}
                 <div className="absolute top-[25%] lg:top-[35%] right-[40%] text-black dark:text-white z-30 animate-[wiggle_1s_ease-in-out_infinite] group-hover:animate-wiggle transition-transform duration-1000 group-hover:translate-y-8">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="drop-shadow-lg text-black dark:text-white stroke-white dark:stroke-black">
                     <path d="M4 2v20l5-4h9l-14-16z" />
                   </svg>
                 </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">{t.features.feature1.label}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature1.title}</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {t.features.feature1.description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-20 lg:mt-32 w-full overflow-hidden group h-[500px] lg:h-[600px] flex items-center justify-center text-center">
          {/* Background Image */}
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80" alt="Abstract liquid background" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 transition-colors duration-500"></div>
          
          {/* Content */}
          <div className="relative z-10 px-6 max-w-3xl mx-auto flex flex-col items-center">
            <div className="text-white/80 font-bold tracking-wider uppercase text-sm mb-4">{t.features.feature2.label}</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">{t.features.feature2.title}</h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              {t.features.feature2.description}
            </p>
            
            {/* Glassmorphic icons row */}
            <div className="flex flex-wrap justify-center gap-4 mt-12 opacity-90 group-hover:opacity-100 transition-opacity">
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-1"><Folder className="w-6 h-6" /></div>
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-2"><ImageIcon className="w-6 h-6" /></div>
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-3"><FileVideo className="w-6 h-6" /></div>
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-1" style={{ animationDelay: '0.2s' }}><Link className="w-6 h-6" /></div>
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-2" style={{ animationDelay: '0.6s' }}><Music className="w-6 h-6" /></div>
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl animate-float-3" style={{ animationDelay: '0.8s' }}><FileText className="w-6 h-6" /></div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-1">
              <div className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">{t.features.feature3.label}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature3.title}</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {t.features.feature3.description}
              </p>
            </div>
            <div className="order-2 lg:order-2 relative rounded-[2.5rem] bg-gray-50 dark:bg-[#111111] aspect-square lg:aspect-auto lg:h-[500px] border border-black/5 dark:border-white/5 flex items-center justify-center p-6 md:p-12 overflow-hidden group">
              {/* Animation container */}
              <div className="relative w-full h-full border border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-[#1D1D1F] shadow-xl flex flex-col items-center justify-center overflow-hidden gap-3 p-8">
                 {/* Grid background */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Visual items */}
                 <div className="w-full max-w-sm bg-white dark:bg-[#2A2A2D] p-3 rounded-xl shadow-lg border border-gray-100 dark:border-[#333] flex items-center gap-3 relative z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-60">
                   <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                     <Folder className="w-5 h-5 text-blue-500" />
                   </div>
                   <div className="flex-1">
                     <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
                     <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                   </div>
                   <div className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 cursor-pointer transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </div>
                 </div>
                 
                 <div className="w-full max-w-sm bg-white dark:bg-[#2A2A2D] p-3 rounded-xl shadow-2xl border border-primary-200 dark:border-primary-800/50 flex items-center gap-3 relative z-20 scale-105 transition-all duration-500 shadow-primary-500/10 group-hover:scale-110">
                   <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                     <ImageIcon className="w-5 h-5 text-primary-500" />
                   </div>
                   <div className="flex-1">
                     <div className="h-2.5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
                     <div className="h-2 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                   </div>
                   <div className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 cursor-pointer transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </div>
                 </div>
                 
                 <div className="w-full max-w-sm bg-white dark:bg-[#2A2A2D] p-3 rounded-xl shadow-lg border border-gray-100 dark:border-[#333] flex items-center gap-3 relative z-10 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-60">
                   <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                     <Link className="w-5 h-5 text-green-500" />
                   </div>
                   <div className="flex-1">
                     <div className="h-2.5 w-28 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
                     <div className="h-2 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
                   </div>
                   <div className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 cursor-pointer transition-colors text-red-500 bg-red-50 dark:bg-red-500/10 dark:text-red-400 group-hover:scale-110">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </div>
                 </div>
                 
                 {/* Cursor moving to delete icon */}
                 <div className="absolute bottom-[20%] right-[30%] text-black dark:text-white z-30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-10 group-hover:-translate-y-8 group-hover:translate-x-6">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="drop-shadow-lg text-black dark:text-white stroke-white dark:stroke-black">
                     <path d="M4 2v20l5-4h9l-14-16z" />
                   </svg>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative rounded-[2.5rem] bg-gray-50 dark:bg-[#111111] aspect-square lg:aspect-auto lg:h-[500px] border border-black/5 dark:border-white/5 flex items-center justify-center p-6 md:p-12 overflow-hidden group">
              {/* Animation container */}
              <div className="relative w-full h-full border border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-[#1D1D1F] shadow-xl flex items-center justify-center overflow-hidden">
                 {/* Grid background */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Central File Item */}
                 <div className="absolute z-20 w-24 h-24 bg-white dark:bg-[#2A2A2D] rounded-2xl border border-gray-200 dark:border-[#444] shadow-2xl flex flex-col items-center justify-center gap-2 group-hover:scale-95 transition-transform duration-500">
                   <ImageIcon className="w-10 h-10 text-primary-500" />
                   <div className="h-1.5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                 </div>

                 {/* Tools Orbiting */}
                 <div className="absolute z-30 w-14 h-14 bg-blue-500 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 -translate-x-32 -translate-y-32 group-hover:-translate-x-24 group-hover:-translate-y-24 rotate-[-10deg] group-hover:rotate-0">
                   <FileArchive className="w-6 h-6" />
                 </div>
                 
                 <div className="absolute z-30 w-14 h-14 bg-purple-500 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 translate-x-32 -translate-y-32 group-hover:translate-x-24 group-hover:-translate-y-24 rotate-[10deg] group-hover:rotate-0">
                   <Maximize className="w-6 h-6" />
                 </div>
                 
                 <div className="absolute z-30 w-14 h-14 bg-emerald-500 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 -translate-x-32 translate-y-32 group-hover:-translate-x-24 group-hover:translate-y-24 rotate-[15deg] group-hover:rotate-0">
                   <RefreshCw className="w-6 h-6" />
                 </div>
                 
                 <div className="absolute z-30 w-14 h-14 bg-amber-500 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 translate-x-32 translate-y-32 group-hover:translate-x-24 group-hover:translate-y-24 rotate-[-15deg] group-hover:rotate-0">
                   <Share2 className="w-6 h-6" />
                 </div>

                 {/* Connecting Lines */}
                 <svg className="absolute inset-0 w-full h-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 pointer-events-none">
                   <line x1="50%" y1="50%" x2="calc(50% - 96px)" y2="calc(50% - 96px)" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-600 animate-[pulse_2s_ease-in-out_infinite]" />
                   <line x1="50%" y1="50%" x2="calc(50% + 96px)" y2="calc(50% - 96px)" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-600 animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
                   <line x1="50%" y1="50%" x2="calc(50% - 96px)" y2="calc(50% + 96px)" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-600 animate-[pulse_2s_ease-in-out_infinite_1s]" />
                   <line x1="50%" y1="50%" x2="calc(50% + 96px)" y2="calc(50% + 96px)" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-600 animate-[pulse_2s_ease-in-out_infinite_1.5s]" />
                 </svg>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">{t.features.feature4.label}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature4.title}</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {t.features.feature4.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-1">
              <div className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">{t.features.feature5.label}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight leading-tight">{t.features.feature5.title}</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {t.features.feature5.description}
              </p>
            </div>
            <div className="order-2 lg:order-2 relative rounded-[2.5rem] bg-gray-50 dark:bg-[#111111] aspect-square lg:aspect-auto lg:h-[500px] border border-black/5 dark:border-white/5 flex items-center justify-center p-6 md:p-12 overflow-hidden group">
              {/* Animation container */}
              <div className="relative w-full h-full border border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-[#1D1D1F] shadow-xl overflow-hidden flex flex-col pt-12">
                 {/* Grid background */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                 
                 {/* Mac-like menubar simulation */}
                 <div className="absolute top-0 inset-x-0 h-8 bg-white/80 dark:bg-black/40 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-end px-4 gap-4 z-20">
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-5 h-5 flex items-center justify-center text-primary-500 scale-110 drop-shadow-md cursor-pointer transition-transform duration-300 hover:scale-125">
                       <Folder className="w-4 h-4 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400" />
                    </div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                 </div>

                 {/* Dropdown Menu - appears on hover */}
                 <div className="absolute top-10 right-4 w-64 bg-white/80 dark:bg-[#2A2A2D]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-30 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex flex-col gap-1">
                   <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm font-medium text-black dark:text-white transition-colors">
                     <LayoutGrid className="w-4 h-4 text-gray-500" />
                     <span>My Pockets</span>
                     <span className="ml-auto text-xs text-gray-400 font-mono flex gap-1">
                       <Command className="w-3 h-3" /> P
                     </span>
                   </div>
                   <div className="h-px w-full bg-black/5 dark:bg-white/5 my-1" />
                   <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-600 dark:text-gray-300 transition-colors">
                     <Settings className="w-4 h-4 text-gray-500" />
                     <span>Settings</span>
                   </div>
                   <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-600 dark:text-gray-300 transition-colors">
                     <RefreshCw className="w-4 h-4 text-gray-500" />
                     <span>Check for Updates</span>
                   </div>
                   <div className="h-px w-full bg-black/5 dark:bg-white/5 my-1" />
                   <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-sm text-red-500 transition-colors">
                     <span>Quit Pocket</span>
                     <span className="ml-auto text-xs text-red-500/50 font-mono flex gap-1">
                       <Command className="w-3 h-3" /> Q
                     </span>
                   </div>
                 </div>
                 
                 {/* Keyboard Shortcut Toast */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black dark:bg-[#333] text-white px-6 py-3 rounded-full flex items-center gap-4 shadow-xl border border-white/10 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 translate-y-4 group-hover:translate-y-0">
                    <span className="text-sm font-medium">Quick Summon</span>
                    <div className="flex gap-1.5">
                       <kbd className="bg-white/20 px-2 py-1 rounded-md text-xs font-mono font-semibold flex items-center"><Command className="w-3 h-3 mr-1" /> Space</kbd>
                    </div>
                 </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0a0a0a] pt-16 pb-8 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div className="max-w-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center mr-2">
                  <Smartphone className="w-5 h-5 text-black dark:text-white" />
                </div>
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
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.footer.rights.replace('{year}', new Date().getFullYear().toString())}</p>
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
    </div>
  );
}
