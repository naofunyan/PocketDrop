import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-500 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Highlights />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}


