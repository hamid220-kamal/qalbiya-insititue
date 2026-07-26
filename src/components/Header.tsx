import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, Sparkles, ChevronDown, 
  BookOpen, GraduationCap, Heart, Book, Award, 
  HelpCircle, Info, PhoneCall, Gift, Compass, Users, MessageCircle
} from 'lucide-react';
import { Route } from '../types';
import qalbiyaLogoImg from '../assets/images/qalbiya_official_logo_1785068312120.jpg';

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
    { slug: 'seerahCourse', title: 'Seerah of Prophet ﷺ', duration: '2 Months', icon: Heart, tag: 'Popular' },
    { slug: 'tajweed1on1', title: 'Tajweed 1 on 1 Classes', duration: '5 Months', icon: BookOpen, tag: '1 on 1' },
    { slug: 'nooraniQaida', title: 'Noorani Qaida Course', duration: '2 Months', icon: Book, tag: 'Beginner' },
    { slug: 'preDiplomaDeeniyat', title: 'Pre Diploma in Deeniyat', duration: '6 Months', icon: Sparkles, tag: 'Diploma' },
  ];

  const kidsCourses = [
    { slug: 'juniorsDeeniyatMastercourse', title: 'Juniors Deeniyat Mastercourse', duration: '1.5 to 2 Years', icon: GraduationCap, tag: 'Ages 6 to 12' },
    { slug: 'nooraniQaidaKids', title: 'Noorani Qaida (Kids)', duration: '4 to 5 Months', icon: BookOpen, tag: '1 on 1' },
  ];

  const isCoursesActive = currentRoute === 'home' || currentRoute === 'women' || currentRoute === 'kids' || currentRoute === 'courseDetail';
  const isSacredActive = currentRoute === 'asmaUlHusna' || currentRoute === 'fivePillars' || currentRoute === 'sacredKnowledge';

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-[#E8DDD9] bg-[#FAF8F5]/95 text-[#23181A] backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2">
          
          {/* Logo */}
          <div 
            className="flex cursor-pointer items-center space-x-3 group shrink-0"
            onClick={() => handleNavClick('home')}
            id="navLogo"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#78122B]/20 bg-[#FAF8F5] shadow-xs group-hover:scale-105 transition-transform duration-300">
              <img 
                src={qalbiyaLogoImg} 
                alt="Qalbiya Islamic Institute Emblem" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#78122B] group-hover:text-[#630E23] transition-colors leading-tight">
                Qalbiya
              </h1>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#5C4D50] uppercase">
                Islamic Institute
              </span>
            </div>
          </div>

          {/* Desktop Main Navigation Buttons & Dropdown Toggles */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* 1. Programs Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('courses')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isCoursesActive || activeDropdown === 'courses'
                    ? 'bg-[#F9E8EC] text-[#78122B]' 
                    : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
                }`}
                id="navToggleCourses"
              >
                <BookOpen className="w-4 h-4 shrink-0 text-[#78122B]" />
                <span>Programs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-[#78122B]' : ''}`} />
              </button>

              {/* Programs Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 w-[420px] rounded-2xl border border-[#E8DDD9] bg-[#FAF8F5] p-4 shadow-2xl z-50 space-y-2"
                    id="dropdownCoursesPanel"
                  >
                    {/* Women's Programs Link Card */}
                    <button
                      onClick={() => handleNavClick('women')}
                      className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-3.5 cursor-pointer group/card ${
                        currentRoute === 'women'
                          ? 'bg-[#78122B] border-[#78122B] text-white shadow-md'
                          : 'bg-white hover:bg-[#F9E8EC]/60 border-[#E8DDD9] text-[#23181A]'
                      }`}
                      id="dropdownLinkWomensPrograms"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${
                        currentRoute === 'women' ? 'bg-white/10 text-white' : 'bg-[#F9E8EC] text-[#78122B]'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">Women's Programs</span>
                          <span className={`text-xs font-semibold group-hover/card:translate-x-1 transition-transform ${
                            currentRoute === 'women' ? 'text-white' : 'text-[#78122B]'
                          }`}>
                            View Hub →
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${
                          currentRoute === 'women' ? 'text-white/80' : 'text-[#5C4D50]'
                        }`}>
                          Seerah, Tajweed 1 on 1, Noorani Qaida and Pre Diploma
                        </p>
                      </div>
                    </button>

                    {/* Kids' Programs Link Card */}
                    <button
                      onClick={() => handleNavClick('kids')}
                      className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-3.5 cursor-pointer group/card ${
                        currentRoute === 'kids'
                          ? 'bg-[#8E4B59] border-[#8E4B59] text-white shadow-md'
                          : 'bg-white hover:bg-[#F9E8EC]/60 border-[#E8DDD9] text-[#23181A]'
                      }`}
                      id="dropdownLinkKidsPrograms"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${
                        currentRoute === 'kids' ? 'bg-white/10 text-white' : 'bg-[#F9E8EC] text-[#8E4B59]'
                      }`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">Kids' Programs</span>
                          <span className={`text-xs font-semibold group-hover/card:translate-x-1 transition-transform ${
                            currentRoute === 'kids' ? 'text-white' : 'text-[#8E4B59]'
                          }`}>
                            View Hub →
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${
                          currentRoute === 'kids' ? 'text-white/80' : 'text-[#5C4D50]'
                        }`}>
                          Juniors Deeniyat Mastercourse & Noorani Qaida (Kids)
                        </p>
                      </div>
                    </button>
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
                id="navToggleSacred"
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
                    id="dropdownSacredPanel"
                  >
                    <button
                      onClick={() => handleNavClick('asmaUlHusna')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                        currentRoute === 'asmaUlHusna' ? 'bg-[#78122B] text-white' : 'hover:bg-[#F9E8EC] text-[#23181A]'
                      }`}
                    >
                      <Sparkles className={`w-4 h-4 shrink-0 ${currentRoute === 'asmaUlHusna' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">Asma Ul Husna</div>
                        <div className={`text-[10px] ${currentRoute === 'asmaUlHusna' ? 'text-white/80' : 'text-[#5C4D50]'}`}>99 Beautiful Names of Allah</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('fivePillars')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                        currentRoute === 'fivePillars' ? 'bg-[#78122B] text-white' : 'hover:bg-[#F9E8EC] text-[#23181A]'
                      }`}
                    >
                      <Compass className={`w-4 h-4 shrink-0 ${currentRoute === 'fivePillars' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">The 5 Pillars of Islam</div>
                        <div className={`text-[10px] ${currentRoute === 'fivePillars' ? 'text-white/80' : 'text-[#5C4D50]'}`}>Core Pillars & Practical Guidance</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Direct Menu Bar Page Buttons */}
            <button
              onClick={() => handleNavClick('freeCourses')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'freeCourses' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="navBtnFreeCourses"
            >
              Free Courses
            </button>

            <button
              onClick={() => handleNavClick('scholarship')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'scholarship' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="navBtnScholarship"
            >
              Scholarship
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'about' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="navBtnAbout"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'faq' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="navBtnFaq"
            >
              FAQ
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentRoute === 'contact' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:text-[#78122B] hover:bg-[#FDFBF7]'
              }`}
              id="navBtnContact"
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
              id="navSearchBtn"
            >
              <Search className="w-4 h-4" />
            </button>

            <a 
              href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#78122B] text-white text-xs xl:text-sm font-semibold tracking-wide hover:bg-[#630E23] transition-all duration-200 shadow-xs cursor-pointer"
              id="navRegisterBtn"
            >
              Register
            </a>
          </div>

          {/* Header Action Buttons & Universal Menu Bar Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search & Register shown only on small/medium screens (lg has its own dedicated block) */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#5C4D50] hover:text-[#78122B] transition-colors rounded-lg hover:bg-[#FDFBF7] lg:hidden"
              aria-label="Search"
              id="navSearchBtnMobile"
            >
              <Search className="w-5 h-5" />
            </button>

            <a 
              href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex lg:hidden items-center justify-center px-4 py-2 rounded-xl bg-[#78122B] text-white text-xs font-semibold tracking-wide hover:bg-[#630E23] transition-all duration-200 shadow-xs cursor-pointer"
              id="navRegisterBtnMobile"
            >
              Register
            </a>

            {/* Menu Bar Toggle Button - Always Accessible */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E8DDD9] bg-[#FDFBF7] text-[#23181A] hover:bg-[#F9E8EC] hover:text-[#78122B] hover:border-[#78122B]/30 transition-all duration-200 cursor-pointer shadow-2xs"
              aria-label="Toggle navigation menu"
              id="menuBarToggle"
            >
              {isOpen ? <X className="h-5 w-5 text-[#78122B]" /> : <Menu className="h-5 w-5 text-[#78122B]" />}
              <span className="text-xs font-bold text-[#23181A]">Menu</span>
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

      {/* Slide-out Page Navigation Drawer (Universal for Mobile & Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
            />

            {/* Right Side Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[101] h-full w-80 sm:w-96 max-w-[90vw] bg-[#FAF8F5] border-l border-[#E8DDD9] p-6 shadow-2xl flex flex-col overflow-y-auto"
              id="main-nav-drawer"
            >
              {/* Drawer Top Branding Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#78122B]/20 bg-[#FAF8F5]">
                    <img src={qalbiyaLogoImg} alt="Qalbiya Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#78122B] leading-tight">Qalbiya</h2>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C4D50]">Page Directory</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl border border-[#E8DDD9] bg-white text-[#5C4D50] hover:bg-[#F9E8EC] hover:text-[#78122B] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categorized Pages List */}
              <div className="flex-1 py-4 space-y-6">
                
                {/* Section 1: Main Programs & Hubs */}
                <div className="space-y-1">
                  <span className="px-3 text-[10px] font-bold text-[#78122B] uppercase tracking-wider block mb-1">
                    Programs & Learning Hubs
                  </span>

                  <button
                    onClick={() => handleNavClick('home')}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      currentRoute === 'home' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Home Page</span>
                    <span className="text-xs text-[#8C7A7E]">Main</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('women')}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      currentRoute === 'women' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Women's Programs Hub</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#78122B]/10 text-[#78122B] font-bold">1:1 & Group</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('kids')}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      currentRoute === 'kids' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Kids' Tarbiyah Hub</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#2E6B38]/10 text-[#2E6B38] font-bold">Ages 4-15</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('freeCourses')}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      currentRoute === 'freeCourses' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Free Sacred Lessons</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#A37B24] font-bold">Public</span>
                  </button>
                </div>

                {/* Section 2: Individual Sacred Courses */}
                <div className="space-y-1 pt-3 border-t border-[#E8DDD9]">
                  <span className="px-3 text-[10px] font-bold text-[#78122B] uppercase tracking-wider block mb-1">
                    Specific Courses & Syllabi
                  </span>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'seerahCourse')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'seerahCourse' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Seerah of Prophet ﷺ</span>
                    <span className="text-[10px] text-[#8C7A7E]">Women</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'tajweed1on1')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'tajweed1on1' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Tajweed 1 on 1 Classes</span>
                    <span className="text-[10px] text-[#8C7A7E]">Women</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'nooraniQaida')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'nooraniQaida' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Noorani Qaida Course</span>
                    <span className="text-[10px] text-[#8C7A7E]">Adults</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'preDiplomaDeeniyat')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'preDiplomaDeeniyat' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Pre Diploma in Deeniyat</span>
                    <span className="text-[10px] text-[#8C7A7E]">6 Months</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'juniorsDeeniyatMastercourse')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'juniorsDeeniyatMastercourse' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Juniors Deeniyat Mastercourse</span>
                    <span className="text-[10px] text-[#2E6B38] font-bold">Kids</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('courseDetail', 'nooraniQaidaKids')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCourseSlug === 'nooraniQaidaKids' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Noorani Qaida (Kids)</span>
                    <span className="text-[10px] text-[#2E6B38] font-bold">Kids</span>
                  </button>
                </div>

                {/* Section 3: Sacred Knowledge Center */}
                <div className="space-y-1 pt-3 border-t border-[#E8DDD9]">
                  <span className="px-3 text-[10px] font-bold text-[#78122B] uppercase tracking-wider block mb-1">
                    Sacred Knowledge Center
                  </span>

                  <button
                    onClick={() => handleNavClick('asmaUlHusna')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      currentRoute === 'asmaUlHusna' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Asma Ul Husna (99 Names)</span>
                    <span className="text-[#8C7A7E]">99</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('fivePillars')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      currentRoute === 'fivePillars' ? 'bg-[#F9E8EC] text-[#78122B]' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>The 5 Pillars of Islam</span>
                    <span className="text-[#8C7A7E]">5</span>
                  </button>
                </div>

                {/* Section 4: Academy & Financial Aid */}
                <div className="space-y-1 pt-3 border-t border-[#E8DDD9]">
                  <span className="px-3 text-[10px] font-bold text-[#78122B] uppercase tracking-wider block mb-1">
                    Academy & Financial Aid
                  </span>

                  <button
                    onClick={() => handleNavClick('scholarship')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      currentRoute === 'scholarship' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Scholarship Fund</span>
                    <span className="text-[10px] text-[#78122B] font-bold">Financial Aid</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('about')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      currentRoute === 'about' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>About Qalbiya Institute</span>
                    <span className="text-[#8C7A7E]">Mission</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('faq')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      currentRoute === 'faq' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Frequently Asked Questions</span>
                    <span className="text-[#8C7A7E]">FAQ</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('contact')}
                    className={`flex w-full items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      currentRoute === 'contact' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#5C4D50] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span>Contact Us</span>
                    <span className="text-[#8C7A7E]">Support</span>
                  </button>
                </div>

                {/* Section 5: Institutional Policies & Terms */}
                <div className="space-y-1 pt-3 border-t border-[#E8DDD9]">
                  <span className="px-3 text-[10px] font-bold text-[#8C7A7E] uppercase tracking-wider block mb-1">
                    Policies & Guidelines
                  </span>

                  <button
                    onClick={() => handleNavClick('refundPolicy')}
                    className={`flex w-full items-center justify-between px-3.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentRoute === 'refundPolicy' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#8C7A7E] hover:text-[#23181A]'
                    }`}
                  >
                    <span>Refund Policy</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('termsAndConditions')}
                    className={`flex w-full items-center justify-between px-3.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentRoute === 'termsAndConditions' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#8C7A7E] hover:text-[#23181A]'
                    }`}
                  >
                    <span>Terms & Conditions</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('privacyPolicy')}
                    className={`flex w-full items-center justify-between px-3.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentRoute === 'privacyPolicy' ? 'bg-[#F9E8EC] text-[#78122B] font-semibold' : 'text-[#8C7A7E] hover:text-[#23181A]'
                    }`}
                  >
                    <span>Privacy Policy</span>
                  </button>
                </div>

              </div>

              {/* Drawer Bottom Register CTA */}
              <div className="pt-4 border-t border-[#E8DDD9] space-y-2">
                <a 
                  href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#78122B] hover:bg-[#630E23] text-white text-sm font-semibold text-center shadow-sm cursor-pointer transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#F3D797]" />
                  <span>Register via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


