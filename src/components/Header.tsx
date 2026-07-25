import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Sparkles } from 'lucide-react';
import { Route } from '../types';

interface HeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleNavClick = (route: Route) => {
    onNavigate(route);
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Courses', route: 'home' as Route, isActive: currentRoute === 'home' || currentRoute === 'women' || currentRoute === 'kids' },
    { label: 'Asma Ul Husna', route: 'asma-ul-husna' as Route, isActive: currentRoute === 'asma-ul-husna' || currentRoute === 'sacred-knowledge' },
    { label: '5 Pillars', route: 'five-pillars' as Route, isActive: currentRoute === 'five-pillars' },
    { label: 'About', route: 'about' as Route, isActive: currentRoute === 'about' },
    { label: 'Resources', route: 'free-courses' as Route, isActive: currentRoute === 'free-courses' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8DDD9] bg-[#FAF8F5]/90 text-[#23181A] backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex cursor-pointer items-center space-x-2 group"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#78122B] group-hover:opacity-90 transition-opacity">
              Qalbiya
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.route)}
                className={`relative py-2 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  item.isActive 
                    ? 'text-[#23181A] font-semibold' 
                    : 'text-[#5C4D50] hover:text-[#78122B]'
                }`}
                id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span>{item.label}</span>
                {item.isActive && (
                  <motion.span 
                    layoutId="activeNavIndicator" 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#78122B] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls (Search + Register Button) */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#5C4D50] hover:text-[#78122B] transition-colors rounded-full cursor-pointer"
              aria-label="Search courses"
              id="nav-search-btn"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('asma-ul-husna')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#78122B]/25 bg-[#F9E8EC] text-[#78122B] hover:bg-[#78122B] hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-xs cursor-pointer"
              id="nav-action-btn-asma-ul-husna"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Asma Ul Husna (99 Names)</span>
            </button>

            <a 
              href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#78122B] text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#630E23] transition-all duration-200 shadow-xs cursor-pointer"
              id="nav-register-btn"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#5C4D50] hover:text-[#78122B]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-[#E8DDD9] bg-[#FDFBF7] text-[#23181A]"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Quick Search Overlay bar if toggled */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E8DDD9] bg-[#FDFBF7] px-4 py-3"
          >
            <div className="max-w-xl mx-auto flex items-center space-x-3">
              <Search className="w-4 h-4 text-[#8C7A7E]" />
              <input 
                type="text"
                placeholder="Search courses (e.g. Usul al-Fiqh, Hadith, Tazkiyah, Tajweed)..."
                className="flex-1 bg-transparent text-sm text-[#23181A] placeholder-[#8C7A7E] focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('home');
                    setShowSearch(false);
                  }
                }}
              />
              <button onClick={() => setShowSearch(false)} className="text-xs text-[#8C7A7E] hover:text-[#23181A]">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 h-full w-72 max-w-[85vw] bg-[#FAF8F5] border-l border-[#E8DDD9] p-6 shadow-2xl flex flex-col md:hidden"
              id="mobile-nav-drawer"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD9]">
                <h2 className="font-serif text-xl font-bold text-[#78122B]">Qalbiya</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-[#E8DDD9] text-[#5C4D50]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 py-6 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.route)}
                    className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.isActive 
                        ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' 
                        : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E8DDD9] space-y-2.5">
                <button
                  onClick={() => handleNavClick('asma-ul-husna')}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#78122B]/30 bg-[#F9E8EC] text-[#78122B] text-sm font-semibold text-center hover:bg-[#78122B] hover:text-white transition-all cursor-pointer shadow-xs"
                  id="mobile-action-btn-asma-ul-husna"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Asma Ul Husna (99 Names)</span>
                </button>
                <a 
                  href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center px-4 py-3 rounded-lg bg-[#78122B] text-white text-sm font-semibold text-center"
                >
                  Register
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

