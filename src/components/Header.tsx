import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, Sparkles, ChevronDown, 
  BookOpen, GraduationCap, Heart, Book, Award, 
  HelpCircle, Info, PhoneCall, Gift, Compass, Users 
} from 'lucide-react';
import { Route } from '../types';

interface HeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars') => void;
  selectedCourseSlug?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, selectedCourseSlug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'courses' | 'sacred' | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (route: Route, courseSlug?: string) => {
    onNavigate(route, courseSlug);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: 'courses' | 'sacred') => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const womenCourses = [
    { slug: 'seerah-course', title: 'Seerah of Prophet ﷺ', duration: '2 Months', icon: Heart, tag: 'Popular' },
    { slug: 'tajweed-1-1', title: 'Tajweed 1:1 Classes', duration: '5 Months', icon: BookOpen, tag: '1-on-1' },
    { slug: 'noorani-qaida', title: 'Noorani Qaida Course', duration: '2 Months', icon: Book, tag: 'Beginner' },
    { slug: 'pre-diploma-deeniyat', title: 'Pre-Diploma in Deeniyat', duration: '6 Months', icon: Sparkles, tag: 'Diploma' },
  ];

  const kidsCourses = [
    { slug: 'juniors-deeniyat-mastercourse', title: 'Juniors Deeniyat Mastercourse', duration: '1.5–2 Years', icon: GraduationCap, tag: 'Ages 6–12' },
    { slug: 'noorani-qaida-kids', title: 'Noorani Qaida (Kids)', duration: '4–5 Months', icon: BookOpen, tag: '1-on-1' },
  ];

  const isCoursesActive = currentRoute === 'home' || currentRoute === 'women' || currentRoute === 'kids' || currentRoute === 'course-detail';
  const isSacredActive = currentRoute === 'asma-ul-husna' || currentRoute === 'five-pillars' || currentRoute === 'sacred-knowledge';

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-[#E8DDD9] bg-[#FAF8F5]/95 text-[#23181A] backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2">
          
          {/* Logo */}
          <div 
            className="flex cursor-pointer items-center space-x-2 group shrink-0"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#78122B] group-hover:opacity-90 transition-opacity">
              Qalbiya
            </h1>
          </div>

          {/* Desktop Main Navigation Buttons & Dropdown Toggles */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* 1. Courses Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('courses')}
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isCoursesActive || activeDropdown === 'courses'
                    ? 'bg-[#F9E8EC] text-[#78122B]' 
                    : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
                }`}
                id="nav-toggle-courses"
              >
                <BookOpen className="w-4 h-4 shrink-0 text-[#78122B]" />
                <span>All Courses</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-[#78122B]' : ''}`} />
              </button>

              {/* Courses Toggle Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 w-[540px] rounded-2xl border border-[#E8DDD9] bg-[#FAF8F5] p-5 shadow-2xl z-50 grid grid-cols-2 gap-5"
                    id="dropdown-courses-panel"
                  >
                    {/* Women's Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DDD9]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#78122B] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Women's Courses
                        </span>
                        <button
                          onClick={() => handleNavClick('women')}
                          className="text-[11px] font-semibold text-[#78122B] hover:underline"
                        >
                          View Hub →
                        </button>
                      </div>
                      <div className="space-y-1">
                        {womenCourses.map((c) => {
                          const IconComp = c.icon;
                          const isSelected = currentRoute === 'course-detail' && selectedCourseSlug === c.slug;
                          return (
                            <button
                              key={c.slug}
                              onClick={() => handleNavClick('course-detail', c.slug)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                                isSelected ? 'bg-[#78122B] text-white shadow-xs' : 'hover:bg-[#F9E8EC] text-[#23181A]'
                              }`}
                            >
                              <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#78122B]'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-semibold truncate">{c.title}</span>
                                  {c.tag && (
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F9E8EC] text-[#78122B]'}`}>
                                      {c.tag}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#5C4D50]'}`}>{c.duration}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Kids' Section */}
                    <div className="space-y-3 border-l border-[#E8DDD9] pl-5">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DDD9]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B38] flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" /> Kids' Courses
                        </span>
                        <button
                          onClick={() => handleNavClick('kids')}
                          className="text-[11px] font-semibold text-[#2E6B38] hover:underline"
                        >
                          View Hub →
                        </button>
                      </div>
                      <div className="space-y-1">
                        {kidsCourses.map((c) => {
                          const IconComp = c.icon;
                          const isSelected = currentRoute === 'course-detail' && selectedCourseSlug === c.slug;
                          return (
                            <button
                              key={c.slug}
                              onClick={() => handleNavClick('course-detail', c.slug)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                                isSelected ? 'bg-[#2E6B38] text-white shadow-xs' : 'hover:bg-[#E2F0D9] text-[#23181A]'
                              }`}
                            >
                              <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#2E6B38]'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-semibold truncate">{c.title}</span>
                                  {c.tag && (
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#E2F0D9] text-[#2E6B38]'}`}>
                                      {c.tag}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#5C4D50]'}`}>{c.duration}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Bottom Banner inside Dropdown */}
                      <div className="pt-2">
                        <button
                          onClick={() => handleNavClick('scholarship')}
                          className="w-full text-center py-2 px-3 rounded-lg bg-[#FDFBF7] border border-[#E8DDD9] text-[11px] font-semibold text-[#78122B] hover:bg-[#F9E8EC] transition-colors"
                        >
                          🎁 Apply for Financial Aid / Scholarship
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Sacred Knowledge Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('sacred')}
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isSacredActive || activeDropdown === 'sacred'
                    ? 'bg-[#F9E8EC] text-[#78122B]' 
                    : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
                }`}
                id="nav-toggle-sacred"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-[#78122B]" />
                <span>Sacred Knowledge</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sacred' ? 'rotate-180 text-[#78122B]' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'sacred' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 w-64 rounded-2xl border border-[#E8DDD9] bg-[#FAF8F5] p-3 shadow-2xl z-50 space-y-1"
                    id="dropdown-sacred-panel"
                  >
                    <button
                      onClick={() => handleNavClick('asma-ul-husna')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                        currentRoute === 'asma-ul-husna' ? 'bg-[#78122B] text-white' : 'hover:bg-[#F9E8EC] text-[#23181A]'
                      }`}
                    >
                      <Sparkles className={`w-4 h-4 shrink-0 ${currentRoute === 'asma-ul-husna' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">Asma Ul Husna</div>
                        <div className={`text-[10px] ${currentRoute === 'asma-ul-husna' ? 'text-white/80' : 'text-[#5C4D50]'}`}>99 Beautiful Names of Allah</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('five-pillars')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                        currentRoute === 'five-pillars' ? 'bg-[#78122B] text-white' : 'hover:bg-[#F9E8EC] text-[#23181A]'
                      }`}
                    >
                      <Compass className={`w-4 h-4 shrink-0 ${currentRoute === 'five-pillars' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">The 5 Pillars of Islam</div>
                        <div className={`text-[10px] ${currentRoute === 'five-pillars' ? 'text-white/80' : 'text-[#5C4D50]'}`}>Core Pillars & Practical Guidance</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Direct Menu Bar Page Buttons */}
            <button
              onClick={() => handleNavClick('free-courses')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'free-courses' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="nav-btn-resources"
            >
              Resources
            </button>

            <button
              onClick={() => handleNavClick('scholarship')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'scholarship' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="nav-btn-scholarship"
            >
              Scholarship
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'about' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="nav-btn-about"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'faq' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="nav-btn-faq"
            >
              FAQ
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'contact' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="nav-btn-contact"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls (Search + Action Shortcut + Register Button) */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7] transition-colors rounded-full cursor-pointer"
              aria-label="Search courses"
              id="nav-search-btn"
            >
              <Search className="w-4 h-4" />
            </button>

            <a 
              href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#78122B] text-white text-xs xl:text-sm font-semibold tracking-wide hover:bg-[#630E23] transition-all duration-200 shadow-xs cursor-pointer"
              id="nav-register-btn"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-3 lg:hidden">
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
                placeholder="Search courses (e.g. Seerah, Tajweed, Noorani Qaida, Deeniyat)..."
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
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 h-full w-72 max-w-[85vw] bg-[#FAF8F5] border-l border-[#E8DDD9] p-6 shadow-2xl flex flex-col lg:hidden overflow-y-auto"
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

              <div className="flex-1 py-6 space-y-2">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'home' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Home</span>
                </button>

                <button
                  onClick={() => handleNavClick('women')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'women' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Women's Courses</span>
                </button>

                <button
                  onClick={() => handleNavClick('kids')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'kids' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Kids' Courses</span>
                </button>

                <button
                  onClick={() => handleNavClick('free-courses')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'free-courses' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Free Resources</span>
                </button>

                <button
                  onClick={() => handleNavClick('scholarship')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'scholarship' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Scholarship</span>
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'about' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>About Us</span>
                </button>

                <button
                  onClick={() => handleNavClick('faq')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'faq' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>FAQ</span>
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'contact' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Contact</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#E8DDD9] space-y-2.5">
                <button
                  onClick={() => handleNavClick('asma-ul-husna')}
                  className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'asma-ul-husna' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>Asma Ul Husna (99 Names)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#E8DDD9]">
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


