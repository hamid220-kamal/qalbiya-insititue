import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, Sparkles, ChevronDown,
  BookOpen, GraduationCap, Compass, Users, MessageCircle,
  ChevronRight, Heart, HelpCircle, Info, ShieldCheck, Award
} from 'lucide-react';
import { Route } from '../types';
import qalbiyaLogoImg from '../assets/images/logo.jpeg';

interface HeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars') => void;
  selectedCourseSlug?: string;
}

const WA_LINK =
  'https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20registering%20for%20classes%20at%20Qalbiya%20Islamic%20Institute.';

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, selectedCourseSlug }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'courses' | 'sacred' | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (route: Route, courseSlug?: string) => {
    onNavigate(route, courseSlug);
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const toggle = (name: 'courses' | 'sacred') =>
    setActiveDropdown(prev => (prev === name ? null : name));

  const isCoursesActive =
    currentRoute === 'home' || currentRoute === 'women' ||
    currentRoute === 'kids' || currentRoute === 'courseDetail';
  const isSacredActive =
    currentRoute === 'asmaUlHusna' || currentRoute === 'fivePillars' ||
    currentRoute === 'sacredKnowledge';

  const navBtn = (active: boolean) =>
    `relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
     ${active
       ? 'text-[#78122B] bg-[#78122B]/8 font-semibold'
       : 'text-[#4A3B3D] hover:text-[#78122B] hover:bg-[#78122B]/5'}`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E8DDD9]/80 shadow-xs"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[68px] items-center justify-between gap-2 sm:gap-4">

          {/* ── Brand Logo ─────────────────────────────────────────────────── */}
          <button
            onClick={() => go('home')}
            id="navLogo"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group text-left cursor-pointer"
            aria-label="Qalbiya Islamic Institute – Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-1 ring-[#78122B]/20 group-hover:ring-[#78122B]/40 transition-all duration-300 shadow-xs bg-[#FAF8F5]">
              <img
                src={qalbiyaLogoImg}
                alt="Qalbiya Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-bold text-[#78122B] tracking-tight group-hover:text-[#630E23] transition-colors">
                Qalbiya
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] text-[#8C7A7E] uppercase mt-0.5">
                Islamic Institute
              </span>
            </div>
          </button>

          {/* ── Desktop Main Navigation ───────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">

            {/* Programs dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('courses')}
                className={navBtn(isCoursesActive || activeDropdown === 'courses')}
                id="navToggleCourses"
                aria-expanded={activeDropdown === 'courses'}
              >
                <BookOpen className="w-[15px] h-[15px] text-[#78122B]" />
                Programs
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-[#78122B]' : ''}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-2 w-[400px] rounded-2xl border border-[#E8DDD9] bg-white p-3 shadow-xl z-50 space-y-2"
                    id="dropdownCoursesPanel"
                  >
                    <button
                      onClick={() => go('women')}
                      className={`w-full text-left p-3.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer group/c
                        ${currentRoute === 'women'
                          ? 'bg-[#78122B] text-white'
                          : 'bg-[#FAF8F5] hover:bg-[#F9E8EC] text-[#23181A]'}`}
                      id="dropdownLinkWomensPrograms"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${currentRoute === 'women' ? 'bg-white/15' : 'bg-[#78122B]/10'}`}>
                        <Users className={`w-4 h-4 ${currentRoute === 'women' ? 'text-white' : 'text-[#78122B]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Women's Programs</span>
                          <span className={`text-xs font-medium group-hover/c:translate-x-0.5 transition-transform ${currentRoute === 'women' ? 'text-white/80' : 'text-[#78122B]'}`}>
                            View →
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${currentRoute === 'women' ? 'text-white/75' : 'text-[#8C7A7E]'}`}>
                          Seerah, Tajweed, Noorani Qaida & Pre Diploma
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => go('kids')}
                      className={`w-full text-left p-3.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer group/c
                        ${currentRoute === 'kids'
                          ? 'bg-[#78122B] text-white'
                          : 'bg-[#FAF8F5] hover:bg-[#F9E8EC] text-[#23181A]'}`}
                      id="dropdownLinkKidsPrograms"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${currentRoute === 'kids' ? 'bg-white/15' : 'bg-[#78122B]/10'}`}>
                        <GraduationCap className={`w-4 h-4 ${currentRoute === 'kids' ? 'text-white' : 'text-[#78122B]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Kids' Programs</span>
                          <span className={`text-xs font-medium group-hover/c:translate-x-0.5 transition-transform ${currentRoute === 'kids' ? 'text-white/80' : 'text-[#78122B]'}`}>
                            View →
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${currentRoute === 'kids' ? 'text-white/75' : 'text-[#8C7A7E]'}`}>
                          Juniors Deeniyat Mastercourse & Noorani Qaida
                        </p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sacred Knowledge dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('sacred')}
                className={navBtn(isSacredActive || activeDropdown === 'sacred')}
                id="navToggleSacred"
                aria-expanded={activeDropdown === 'sacred'}
              >
                <Sparkles className="w-[15px] h-[15px] text-[#78122B]" />
                Sacred Knowledge
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sacred' ? 'rotate-180 text-[#78122B]' : ''}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'sacred' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-[#E8DDD9] bg-white p-2.5 shadow-xl z-50 space-y-1"
                    id="dropdownSacredPanel"
                  >
                    <button
                      onClick={() => go('asmaUlHusna')}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer
                        ${currentRoute === 'asmaUlHusna' ? 'bg-[#78122B] text-white' : 'hover:bg-[#FAF4F5] text-[#23181A]'}`}
                    >
                      <Sparkles className={`w-4 h-4 shrink-0 ${currentRoute === 'asmaUlHusna' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">Asma Ul Husna</div>
                        <div className={`text-[10px] ${currentRoute === 'asmaUlHusna' ? 'text-white/75' : 'text-[#8C7A7E]'}`}>
                          99 Beautiful Names of Allah
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => go('fivePillars')}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer
                        ${currentRoute === 'fivePillars' ? 'bg-[#78122B] text-white' : 'hover:bg-[#FAF4F5] text-[#23181A]'}`}
                    >
                      <Compass className={`w-4 h-4 shrink-0 ${currentRoute === 'fivePillars' ? 'text-white' : 'text-[#78122B]'}`} />
                      <div>
                        <div className="text-xs font-semibold">The 5 Pillars of Islam</div>
                        <div className={`text-[10px] ${currentRoute === 'fivePillars' ? 'text-white/75' : 'text-[#8C7A7E]'}`}>
                          Core Pillars & Practical Guidance
                        </div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: 'Free Courses', route: 'freeCourses' as Route },
              { label: 'Scholarship', route: 'scholarship' as Route },
              { label: 'About', route: 'about' as Route },
              { label: 'Contact', route: 'contact' as Route },
            ].map(({ label, route }) => (
              <button
                key={route}
                onClick={() => go(route)}
                className={navBtn(currentRoute === route)}
                id={`navBtn-${route}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Desktop Right CTA ────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSearch(s => !s)}
              className="p-2 rounded-lg text-[#8C7A7E] hover:text-[#78122B] hover:bg-[#78122B]/6 transition-all duration-200 cursor-pointer"
              aria-label="Search"
              id="navSearchBtn"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#78122B] text-white text-sm font-semibold hover:bg-[#630E23] transition-all duration-200 shadow-xs cursor-pointer"
              id="navRegisterBtn"
            >
              Register
            </a>
          </div>

          {/* ── Mobile Right Actions (Search + Register + Hamburger) ─────────── */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setShowSearch(s => !s)}
              className="p-2 rounded-xl text-[#5C4D50] hover:text-[#78122B] hover:bg-[#F9E8EC] transition-colors cursor-pointer"
              aria-label="Search"
              id="navSearchBtnMobile"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#78122B] text-white text-xs font-semibold hover:bg-[#630E23] transition-all cursor-pointer shadow-xs"
              id="navRegisterBtnMobile"
            >
              Register
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg border border-[#E8DDD9] bg-[#FAF8F5] text-[#23181A] hover:bg-[#F9E8EC] hover:text-[#78122B] transition-all cursor-pointer shadow-2xs"
              aria-label="Open menu"
              id="menuToggle"
            >
              <Menu className="w-5 h-5 text-[#78122B]" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Quick Search Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E8DDD9]/80 bg-[#FAF8F5] px-4 py-3"
          >
            <div className="mx-auto max-w-xl flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C7A7E] shrink-0" />
              <input
                type="text"
                placeholder="Search courses (Seerah, Tajweed, Noorani Qaida...)"
                className="flex-1 bg-transparent text-sm text-[#23181A] placeholder-[#8C7A7E] focus:outline-none"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') { onNavigate('home'); setShowSearch(false); }
                  if (e.key === 'Escape') setShowSearch(false);
                }}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-xs text-[#8C7A7E] hover:text-[#23181A] font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu Drawer (Rendered via Portal to document.body) ───────────── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-[9999] flex justify-end font-sans">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setMobileOpen(false)}
              />

              {/* Menu Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="relative z-[10000] w-full sm:w-[380px] h-full bg-[#FAF8F5] flex flex-col shadow-2xl overflow-hidden"
                id="mobileNavDrawer"
              >
                {/* Drawer Sticky Top Header */}
                <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#E8DDD9] bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-[#78122B]/20 bg-[#FAF8F5]">
                      <img src={qalbiyaLogoImg} alt="Qalbiya Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-base font-bold text-[#78122B]">Qalbiya</span>
                      <span className="text-[10px] tracking-widest text-[#8C7A7E] uppercase font-semibold mt-0.5">
                        Islamic Institute
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2.5 rounded-xl border border-[#E8DDD9] bg-white text-[#5C4D50] hover:bg-[#F9E8EC] hover:text-[#78122B] transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-[#78122B]" />
                  </button>
                </div>

                {/* Drawer Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">

                  {/* Section 1: Main Programs & Hubs */}
                  <div>
                    <span className="px-1 text-[11px] font-bold text-[#78122B] uppercase tracking-wider block mb-2">
                      Learning Programs & Hubs
                    </span>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => go('home')}
                        className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          currentRoute === 'home' ? 'bg-[#78122B] text-white shadow-xs' : 'bg-white text-[#23181A] border border-[#E8DDD9] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4" />
                          <span>Home Page</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      </button>

                      <button
                        onClick={() => go('women')}
                        className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          currentRoute === 'women' ? 'bg-[#78122B] text-white shadow-xs' : 'bg-white text-[#23181A] border border-[#E8DDD9] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-[#78122B]" />
                          <span>Women's Programs Hub</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#78122B]/10 text-[#78122B] font-bold">1:1 & Group</span>
                      </button>

                      <button
                        onClick={() => go('kids')}
                        className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          currentRoute === 'kids' ? 'bg-[#78122B] text-white shadow-xs' : 'bg-white text-[#23181A] border border-[#E8DDD9] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-[#2E6B38]" />
                          <span>Kids' Tarbiyah Hub</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#2E6B38]/10 text-[#2E6B38] font-bold">Ages 4-15</span>
                      </button>

                      <button
                        onClick={() => go('freeCourses')}
                        className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          currentRoute === 'freeCourses' ? 'bg-[#78122B] text-white shadow-xs' : 'bg-white text-[#23181A] border border-[#E8DDD9] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-[#A37B24]" />
                          <span>Free Sacred Lessons</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#A37B24] font-bold">Free Access</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 2: Specific Courses */}
                  <div className="pt-2">
                    <span className="px-1 text-[11px] font-bold text-[#78122B] uppercase tracking-wider block mb-2">
                      Individual Courses
                    </span>
                    <div className="bg-white border border-[#E8DDD9] rounded-2xl p-2 space-y-1">
                      {[
                        { slug: 'seerahCourse', label: 'Seerah of Prophet ﷺ', sub: 'Women' },
                        { slug: 'tajweed1on1', label: 'Tajweed 1-on-1 Classes', sub: 'Women' },
                        { slug: 'nooraniQaida', label: 'Noorani Qaida Course', sub: 'Adults' },
                        { slug: 'preDiplomaDeeniyat', label: 'Pre-Diploma in Deeniyat', sub: '6 Months' },
                        { slug: 'juniorsDeeniyatMastercourse', label: 'Juniors Deeniyat Mastercourse', sub: 'Kids' },
                        { slug: 'nooraniQaidaKids', label: 'Noorani Qaida (Kids)', sub: 'Kids' },
                      ].map(({ slug, label, sub }) => (
                        <button
                          key={slug}
                          onClick={() => go('courseDetail', slug)}
                          className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                            selectedCourseSlug === slug ? 'bg-[#F9E8EC] text-[#78122B] font-bold' : 'text-[#5C4D50] hover:bg-[#FAF8F5] hover:text-[#78122B]'
                          }`}
                        >
                          <span>{label}</span>
                          <span className="text-[10px] text-[#8C7A7E] font-medium">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Sacred Knowledge */}
                  <div className="pt-2">
                    <span className="px-1 text-[11px] font-bold text-[#78122B] uppercase tracking-wider block mb-2">
                      Sacred Knowledge
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => go('asmaUlHusna')}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          currentRoute === 'asmaUlHusna' ? 'bg-[#78122B] text-white border-[#78122B]' : 'bg-white border-[#E8DDD9] text-[#23181A] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Asma Ul Husna (99 Names)</span>
                        </div>
                        <span className="text-[10px] opacity-80">99</span>
                      </button>

                      <button
                        onClick={() => go('fivePillars')}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          currentRoute === 'fivePillars' ? 'bg-[#78122B] text-white border-[#78122B]' : 'bg-white border-[#E8DDD9] text-[#23181A] hover:bg-[#F9E8EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4" />
                          <span>The 5 Pillars of Islam</span>
                        </div>
                        <span className="text-[10px] opacity-80">5</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 4: Academy & Support */}
                  <div className="pt-2">
                    <span className="px-1 text-[11px] font-bold text-[#78122B] uppercase tracking-wider block mb-2">
                      Academy & Support
                    </span>
                    <div className="bg-white border border-[#E8DDD9] rounded-2xl p-2 space-y-1">
                      <button
                        onClick={() => go('scholarship')}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentRoute === 'scholarship' ? 'bg-[#F9E8EC] text-[#78122B] font-bold' : 'text-[#5C4D50] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>Scholarship Fund</span>
                        <span className="text-[10px] text-[#78122B] font-bold">Aid</span>
                      </button>

                      <button
                        onClick={() => go('about')}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentRoute === 'about' ? 'bg-[#F9E8EC] text-[#78122B] font-bold' : 'text-[#5C4D50] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>About Qalbiya</span>
                        <span className="text-[10px] text-[#8C7A7E]">Mission</span>
                      </button>

                      <button
                        onClick={() => go('faq')}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentRoute === 'faq' ? 'bg-[#F9E8EC] text-[#78122B] font-bold' : 'text-[#5C4D50] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>FAQ</span>
                        <span className="text-[10px] text-[#8C7A7E]">Help</span>
                      </button>

                      <button
                        onClick={() => go('contact')}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentRoute === 'contact' ? 'bg-[#F9E8EC] text-[#78122B] font-bold' : 'text-[#5C4D50] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>Contact Support</span>
                        <span className="text-[10px] text-[#8C7A7E]">24/7</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 5: Policies */}
                  <div className="pt-2">
                    <span className="px-1 text-[10px] font-bold text-[#8C7A7E] uppercase tracking-wider block mb-1">
                      Policies
                    </span>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#8C7A7E] px-1 pt-1">
                      <button onClick={() => go('refundPolicy')} className="hover:text-[#78122B] underline">Refund Policy</button>
                      <span>•</span>
                      <button onClick={() => go('termsAndConditions')} className="hover:text-[#78122B] underline">Terms & Conditions</button>
                      <span>•</span>
                      <button onClick={() => go('privacyPolicy')} className="hover:text-[#78122B] underline">Privacy Policy</button>
                    </div>
                  </div>

                </div>

                {/* Drawer Bottom Sticky WhatsApp CTA */}
                <div className="shrink-0 p-4 border-t border-[#E8DDD9] bg-white">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#78122B] hover:bg-[#630E23] text-white text-sm font-bold shadow-md cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <span>Register via WhatsApp</span>
                  </a>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};
