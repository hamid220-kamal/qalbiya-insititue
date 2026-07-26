import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, Sparkles, ChevronDown,
  BookOpen, GraduationCap,
  Compass, Users, MessageCircle
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

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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

  // ─── shared classes ──────────────────────────────────────────────────────────
  const navBtn = (active: boolean) =>
    `relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
     ${active
       ? 'text-[#78122B] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-[#78122B]'
       : 'text-[#4A3B3D] hover:text-[#78122B] hover:bg-[#78122B]/5'}`;

  const drawerItem = (active: boolean) =>
    `flex w-full items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer
     ${active ? 'bg-[#78122B]/8 text-[#78122B] font-semibold' : 'text-[#4A3B3D] hover:bg-[#FAF4F5] hover:text-[#78122B]'}`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E8DDD9]/80 shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ─────────────────────────────────────────────────────────── */}
          <button
            onClick={() => go('home')}
            id="navLogo"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Qalbiya Islamic Institute – Home"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-[#78122B]/20 group-hover:ring-[#78122B]/50 transition-all duration-300 shadow-sm bg-[#FAF8F5]">
              <img
                src={qalbiyaLogoImg}
                alt="Qalbiya Islamic Institute"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-[#78122B] tracking-tight group-hover:text-[#630E23] transition-colors">
                Qalbiya
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#8C7A7E] uppercase">
                Islamic Institute
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ───────────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">

            {/* Programs dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('courses')}
                className={navBtn(isCoursesActive || activeDropdown === 'courses')}
                id="navToggleCourses"
                aria-expanded={activeDropdown === 'courses'}
              >
                <BookOpen className="w-[15px] h-[15px]" />
                Programs
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180' : ''}`}
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
                    {/* Women's Programs */}
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

                    {/* Kids' Programs */}
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
                <Sparkles className="w-[15px] h-[15px]" />
                Sacred Knowledge
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sacred' ? 'rotate-180' : ''}`}
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

            {/* Flat links */}
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

          {/* ── Desktop Right Actions ─────────────────────────────────────────── */}
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#78122B] text-white text-sm font-semibold hover:bg-[#630E23] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              id="navRegisterBtn"
            >
              Register
            </a>
          </div>

          {/* ── Mobile Right Actions ──────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSearch(s => !s)}
              className="p-2 rounded-lg text-[#8C7A7E] hover:text-[#78122B] hover:bg-[#78122B]/6 transition-all duration-200 cursor-pointer"
              aria-label="Search"
              id="navSearchBtnMobile"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#78122B] text-white text-xs font-semibold hover:bg-[#630E23] transition-all duration-200 cursor-pointer"
              id="navRegisterBtnMobile"
            >
              Register
            </a>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="p-2 rounded-lg text-[#4A3B3D] hover:text-[#78122B] hover:bg-[#78122B]/6 transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
              id="menuToggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Search Bar ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E8DDD9]/80 bg-white px-4 py-3"
          >
            <div className="mx-auto max-w-xl flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C7A7E] shrink-0" />
              <input
                type="text"
                placeholder="Search courses — Seerah, Tajweed, Noorani Qaida…"
                className="flex-1 bg-transparent text-sm text-[#23181A] placeholder-[#B0A4A7] focus:outline-none"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') { onNavigate('home'); setShowSearch(false); }
                  if (e.key === 'Escape') setShowSearch(false);
                }}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-xs text-[#8C7A7E] hover:text-[#23181A] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 z-[101] w-80 max-w-[92vw] bg-white border-l border-[#E8DDD9] shadow-2xl flex flex-col overflow-y-auto"
              id="mobileNavDrawer"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DDD9]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-[#78122B]/20 bg-[#FAF8F5]">
                    <img src={qalbiyaLogoImg} alt="Qalbiya Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-bold text-[#78122B]">Qalbiya</span>
                    <span className="text-[10px] tracking-widest text-[#8C7A7E] uppercase font-medium">Islamic Institute</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[#8C7A7E] hover:text-[#78122B] hover:bg-[#78122B]/6 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

                {/* Programs & Hubs */}
                <section className="space-y-0.5">
                  <p className="px-1 mb-2 text-[10px] font-bold text-[#78122B] uppercase tracking-widest">
                    Programs & Hubs
                  </p>
                  {[
                    { label: 'Home', route: 'home' as Route, sub: 'Main' },
                    { label: "Women's Programs", route: 'women' as Route, sub: '1:1 & Group' },
                    { label: "Kids' Programs", route: 'kids' as Route, sub: 'Ages 4–15' },
                    { label: 'Free Courses', route: 'freeCourses' as Route, sub: 'Public' },
                  ].map(({ label, route, sub }) => (
                    <button key={route} onClick={() => go(route)} className={drawerItem(currentRoute === route)}>
                      <span>{label}</span>
                      <span className="text-[10px] text-[#8C7A7E]">{sub}</span>
                    </button>
                  ))}
                </section>

                {/* Individual Courses */}
                <section className="space-y-0.5 border-t border-[#E8DDD9] pt-4">
                  <p className="px-1 mb-2 text-[10px] font-bold text-[#78122B] uppercase tracking-widest">
                    Individual Courses
                  </p>
                  {[
                    { slug: 'seerahCourse', label: 'Seerah of Prophet ﷺ', sub: 'Women' },
                    { slug: 'tajweed1on1', label: 'Tajweed 1 on 1', sub: 'Women' },
                    { slug: 'nooraniQaida', label: 'Noorani Qaida', sub: 'Adults' },
                    { slug: 'preDiplomaDeeniyat', label: 'Pre Diploma in Deeniyat', sub: '6 Months' },
                    { slug: 'juniorsDeeniyatMastercourse', label: 'Juniors Deeniyat', sub: 'Kids' },
                    { slug: 'nooraniQaidaKids', label: 'Noorani Qaida (Kids)', sub: 'Kids' },
                  ].map(({ slug, label, sub }) => (
                    <button
                      key={slug}
                      onClick={() => go('courseDetail', slug)}
                      className={drawerItem(selectedCourseSlug === slug)}
                    >
                      <span>{label}</span>
                      <span className="text-[10px] text-[#8C7A7E]">{sub}</span>
                    </button>
                  ))}
                </section>

                {/* Sacred Knowledge */}
                <section className="space-y-0.5 border-t border-[#E8DDD9] pt-4">
                  <p className="px-1 mb-2 text-[10px] font-bold text-[#78122B] uppercase tracking-widest">
                    Sacred Knowledge
                  </p>
                  {[
                    { label: 'Asma Ul Husna (99 Names)', route: 'asmaUlHusna' as Route, sub: '99' },
                    { label: 'The 5 Pillars of Islam', route: 'fivePillars' as Route, sub: '5' },
                  ].map(({ label, route, sub }) => (
                    <button key={route} onClick={() => go(route)} className={drawerItem(currentRoute === route)}>
                      <span>{label}</span>
                      <span className="text-[10px] text-[#8C7A7E]">{sub}</span>
                    </button>
                  ))}
                </section>

                {/* Academy & Info */}
                <section className="space-y-0.5 border-t border-[#E8DDD9] pt-4">
                  <p className="px-1 mb-2 text-[10px] font-bold text-[#78122B] uppercase tracking-widest">
                    Academy & Info
                  </p>
                  {[
                    { label: 'Scholarship Fund', route: 'scholarship' as Route, sub: 'Aid' },
                    { label: 'About Us', route: 'about' as Route, sub: 'Mission' },
                    { label: 'FAQ', route: 'faq' as Route, sub: '' },
                    { label: 'Contact', route: 'contact' as Route, sub: 'Support' },
                  ].map(({ label, route, sub }) => (
                    <button key={route} onClick={() => go(route)} className={drawerItem(currentRoute === route)}>
                      <span>{label}</span>
                      {sub && <span className="text-[10px] text-[#8C7A7E]">{sub}</span>}
                    </button>
                  ))}
                </section>

                {/* Policies */}
                <section className="space-y-0.5 border-t border-[#E8DDD9] pt-4">
                  <p className="px-1 mb-2 text-[10px] font-bold text-[#8C7A7E] uppercase tracking-widest">
                    Policies
                  </p>
                  {[
                    { label: 'Refund Policy', route: 'refundPolicy' as Route },
                    { label: 'Terms & Conditions', route: 'termsAndConditions' as Route },
                    { label: 'Privacy Policy', route: 'privacyPolicy' as Route },
                  ].map(({ label, route }) => (
                    <button key={route} onClick={() => go(route)} className={`flex w-full px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${currentRoute === route ? 'text-[#78122B] font-semibold' : 'text-[#8C7A7E] hover:text-[#4A3B3D]'}`}>
                      {label}
                    </button>
                  ))}
                </section>
              </div>

              {/* Drawer CTA */}
              <div className="px-5 py-4 border-t border-[#E8DDD9]">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#78122B] text-white text-sm font-semibold hover:bg-[#630E23] transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Register via WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
