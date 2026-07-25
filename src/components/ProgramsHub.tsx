import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Sparkles, MessageCircle, Info, ShieldCheck, Instagram, MessageSquare, ArrowRight, Quote, Laptop, Tablet, Smartphone, SlidersHorizontal, Check, X, Search, Users, User, Clock, RotateCcw, HelpCircle } from 'lucide-react';
import { Course, Route } from '../types';
import { CourseCard } from './CourseCard';

import onlineLearningImg from '../assets/images/online_learning_tablet_1784039716228.jpg';
import quranRehalImg from '../assets/images/quran_rehal_arched_window_1784016809949.jpg';

interface ProgramsHubProps {
  category: 'women' | 'kids';
  courses: Course[];
  onSelectCourse: (slug: string) => void;
  onNavigate: (route: Route) => void;
}

const getCourseFormats = (course: Course): ('1-on-1' | 'Group')[] => {
  const formatStr = course.courseDetails['Format'] || '';
  const formats: ('1-on-1' | 'Group')[] = [];
  if (formatStr.toLowerCase().includes('1-on-1') || formatStr.toLowerCase().includes('personal') || formatStr.toLowerCase().includes('private')) {
    formats.push('1-on-1');
  }
  if (formatStr.toLowerCase().includes('group')) {
    formats.push('Group');
  }
  return formats;
};

interface CourseFilterBarProps {
  category: 'women' | 'kids';
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFormats: ('1-on-1' | 'Group')[];
  onToggleFormat: (format: '1-on-1' | 'Group') => void;
  availableDurations: string[];
  selectedDurations: string[];
  onToggleDuration: (duration: string) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

const CourseFilterBar: React.FC<CourseFilterBarProps> = ({
  category,
  searchQuery,
  setSearchQuery,
  selectedFormats,
  onToggleFormat,
  availableDurations,
  selectedDurations,
  onToggleDuration,
  onReset,
  totalCount,
  filteredCount,
}) => {
  const isKids = category === 'kids';
  const hasActiveFilters = selectedFormats.length > 0 || selectedDurations.length > 0 || searchQuery.trim() !== '';

  return (
    <div className={`rounded-3xl border p-6 sm:p-7 shadow-lg transition-all duration-300 ${
      isKids 
        ? 'bg-[#FDF8F5] border-[#8E4B59]/25 text-[#2E1F21] shadow-sm' 
        : 'bg-panel-dark/90 border-[#D4AF37]/25 text-white shadow-xl backdrop-blur-md'
    }`}>
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className={`w-5 h-5 ${isKids ? 'text-[#8E4B59]' : 'text-[#D4AF37]'}`} />
            <h3 className={`font-serif text-lg sm:text-xl font-bold ${isKids ? 'text-[#480117]' : 'text-white'}`}>
              Filter & Find Your Ideal Program
            </h3>
          </div>
          <p className={`text-xs ${isKids ? 'text-[#5C464A] font-medium' : 'text-[#EAD5D8]/70'}`}>
            Select multiple formats and durations to tailor results to your schedule and learning preferences.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className={`absolute left-3.5 top-3 w-4 h-4 ${isKids ? 'text-[#8E4B59]' : 'text-[#D4AF37]'}`} />
          <input
            type="text"
            placeholder="Search title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none transition-all shadow-inner ${
              isKids
                ? 'bg-white border-[#8E4B59]/30 text-[#480117] placeholder-[#5C464A]/50 focus:border-[#8E4B59] focus:ring-1 focus:ring-[#8E4B59]'
                : 'bg-slate-950/90 border-white/20 text-white placeholder-white/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
            }`}
            id="hub-filter-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-3 cursor-pointer ${isKids ? 'text-[#8E4B59]/60 hover:text-[#8E4B59]' : 'text-white/40 hover:text-white'}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Format Filter Group */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${isKids ? 'text-[#8E4B59]' : 'text-[#D4AF37]'}`}>
              <Users className="w-3.5 h-3.5" />
              <span>Learning Format (Multi-Select)</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {/* 1-on-1 Button */}
            <button
              onClick={() => onToggleFormat('1-on-1')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedFormats.includes('1-on-1')
                  ? isKids
                    ? 'bg-[#8E4B59] text-white shadow-md shadow-[#8E4B59]/20 border border-[#8E4B59] scale-[1.02]'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#23181A] shadow-md shadow-[#D4AF37]/20 border border-[#D4AF37] scale-[1.02]'
                  : isKids
                    ? 'bg-white hover:bg-[#F9E8EC] text-[#5C464A] border border-[#8E4B59]/25 hover:border-[#8E4B59]'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 hover:border-white/30'
              }`}
              id="filter-btn-format-1-on-1"
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>1-on-1 Private</span>
              {selectedFormats.includes('1-on-1') && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>

            {/* Group Button */}
            <button
              onClick={() => onToggleFormat('Group')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedFormats.includes('Group')
                  ? isKids
                    ? 'bg-[#8E4B59] text-white shadow-md shadow-[#8E4B59]/20 border border-[#8E4B59] scale-[1.02]'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#23181A] shadow-md shadow-[#D4AF37]/20 border border-[#D4AF37] scale-[1.02]'
                  : isKids
                    ? 'bg-white hover:bg-[#F9E8EC] text-[#5C464A] border border-[#8E4B59]/25 hover:border-[#8E4B59]'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 hover:border-white/30'
              }`}
              id="filter-btn-format-group"
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Group Interactive</span>
              {selectedFormats.includes('Group') && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Duration Filter Group */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${isKids ? 'text-[#8E4B59]' : 'text-[#D4AF37]'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Course Duration (Multi-Select)</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availableDurations.map((dur) => {
              const isSelected = selectedDurations.includes(dur);
              return (
                <button
                  key={dur}
                  onClick={() => onToggleDuration(dur)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? isKids
                        ? 'bg-[#8E4B59] text-white shadow-md shadow-[#8E4B59]/20 border border-[#8E4B59] scale-[1.02]'
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#23181A] shadow-md shadow-[#D4AF37]/20 border border-[#D4AF37] scale-[1.02]'
                      : isKids
                        ? 'bg-white hover:bg-[#F9E8EC] text-[#5C464A] border border-[#8E4B59]/25 hover:border-[#8E4B59]'
                        : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 hover:border-white/30'
                  }`}
                  id={`filter-btn-duration-${dur.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{dur}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / Active Filters & Results Count */}
      <div className={`mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${isKids ? 'border-[#8E4B59]/15' : 'border-white/10'}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-bold ${isKids ? 'text-[#480117]' : 'text-white'}`}>
            Showing <span className={`px-2 py-0.5 rounded-full font-mono font-extrabold ${isKids ? 'bg-[#8E4B59] text-white' : 'bg-[#D4AF37] text-[#480117]'}`}>{filteredCount}</span> of {totalCount} programs
          </span>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 ml-0 sm:ml-2">
              {selectedFormats.map(f => (
                <span key={f} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${isKids ? 'bg-[#8E4B59]/10 text-[#8E4B59] border border-[#8E4B59]/30' : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'}`}>
                  <span>Format: {f}</span>
                  <button onClick={() => onToggleFormat(f)} className="hover:opacity-75 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {selectedDurations.map(d => (
                <span key={d} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${isKids ? 'bg-[#8E4B59]/10 text-[#8E4B59] border border-[#8E4B59]/30' : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'}`}>
                  <span>Duration: {d}</span>
                  <button onClick={() => onToggleDuration(d)} className="hover:opacity-75 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {searchQuery.trim() !== '' && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${isKids ? 'bg-[#8E4B59]/10 text-[#8E4B59] border border-[#8E4B59]/30' : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'}`}>
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:opacity-75 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className={`inline-flex items-center gap-1.5 font-bold hover:underline cursor-pointer self-start sm:self-auto shrink-0 ${isKids ? 'text-[#8E4B59] hover:text-[#480117]' : 'text-[#D4AF37] hover:text-white'}`}
            id="btn-reset-all-filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const ProgramsHub: React.FC<ProgramsHubProps> = ({ 
  category, 
  courses, 
  onSelectCourse,
  onNavigate 
}) => {
  const filteredCourses = useMemo(() => {
    return courses.filter(c => c.category === category);
  }, [courses, category]);

  const coursesRef = useRef<HTMLDivElement>(null);

  const [selectedFormats, setSelectedFormats] = useState<('1-on-1' | 'Group')[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset filters when changing category
  useEffect(() => {
    setSelectedFormats([]);
    setSelectedDurations([]);
    setSearchQuery('');
  }, [category]);

  const availableDurations = useMemo(() => {
    return Array.from(new Set(filteredCourses.map(c => c.duration)));
  }, [filteredCourses]);

  const handleToggleFormat = (format: '1-on-1' | 'Group') => {
    setSelectedFormats(prev => 
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const handleToggleDuration = (duration: string) => {
    setSelectedDurations(prev => 
      prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]
    );
  };

  const handleResetFilters = () => {
    setSelectedFormats([]);
    setSelectedDurations([]);
    setSearchQuery('');
  };

  const displayedCourses = useMemo(() => {
    return filteredCourses.filter(course => {
      // 1. Format filter
      if (selectedFormats.length > 0) {
        const courseFormats = getCourseFormats(course);
        const matchesFormat = selectedFormats.some(f => courseFormats.includes(f));
        if (!matchesFormat) return false;
      }
      // 2. Duration filter
      if (selectedDurations.length > 0) {
        if (!selectedDurations.includes(course.duration)) return false;
      }
      // 3. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          course.title.toLowerCase().includes(query) ||
          course.hook.toLowerCase().includes(query) ||
          course.sub.toLowerCase().includes(query) ||
          course.badge.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [filteredCourses, selectedFormats, selectedDurations, searchQuery]);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (category === 'kids') {
    return (
      <div className="bg-white text-[#2E1F21] min-h-screen pb-24 transition-colors duration-300">
        
        {/* Hub Hero Banner */}
        <section className="text-center pt-16 pb-12 px-4 space-y-6" id="kids-hub-hero">
          <span className="font-sans text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#8E4B59] mb-2 block">
            NURTURING THE NEXT GENERATION
          </span>

          <h1 className="serif-heading text-3.5xl sm:text-4.5xl md:text-5.5xl font-bold leading-tight text-[#480117] max-w-3xl mx-auto tracking-tight">
            Raise a child who doesn't just know their deen — who loves it.
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#5C464A] font-semibold">
            Age-appropriate, structured, and rooted in authentic teaching — built for children ages 6–12.
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToCourses}
              className="bg-[#8E4B59] hover:bg-[#743C47] text-white font-sans text-xs sm:text-sm font-bold px-6 py-3.5 sm:py-3 rounded-full inline-flex items-center space-x-2 shadow-lg shadow-[#8E4B59]/20 transition-all duration-300 cursor-pointer"
              id="kids-hero-view-programs-btn"
            >
              <span>View Programs</span>
              <span className="text-[14px] font-bold">↓</span>
            </button>
          </div>
        </section>

        {/* Dynamic Dual Programs Grid */}
        <section ref={coursesRef} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20 space-y-8" id="kids-programs-section">
          <CourseFilterBar
            category="kids"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFormats={selectedFormats}
            onToggleFormat={handleToggleFormat}
            availableDurations={availableDurations}
            selectedDurations={selectedDurations}
            onToggleDuration={handleToggleDuration}
            onReset={handleResetFilters}
            totalCount={filteredCourses.length}
            filteredCount={displayedCourses.length}
          />

          {displayedCourses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-[#FDF8F5] rounded-3xl border border-[#8E4B59]/25 space-y-4 shadow-md max-w-3xl mx-auto"
            >
              <HelpCircle className="w-12 h-12 text-[#8E4B59] mx-auto animate-bounce" />
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#480117]">No kids' programs match your selected filters</h4>
              <p className="text-sm text-[#5C464A] max-w-md mx-auto font-medium">
                Try removing some duration or format filters, or clear your search term to view our tarbiyah programs.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8E4B59] text-white hover:bg-[#743C47] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters & Show All Programs</span>
              </button>
            </motion.div>
          ) : (
            <div className={`grid grid-cols-1 ${displayedCourses.length === 1 ? 'max-w-xl mx-auto' : 'md:grid-cols-2'} gap-8`}>
              
              {/* Card 1: Juniors Deeniyat Mastercourse */}
              {displayedCourses.some(c => c.slug === 'juniors-deeniyat-mastercourse') && (
              <div 
              onClick={() => onSelectCourse('juniors-deeniyat-mastercourse')}
              className="bg-panel-dark border border-[#D4AF37]/20 rounded-2xl p-8 sm:p-9 flex flex-col justify-between relative overflow-hidden h-full min-h-[440px] cursor-pointer shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 group"
              id="kids-course-card-deeniyat"
            >
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="bg-[#D4AF37] text-[#480117] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                    1.5-2 YEARS
                  </span>
                  <span className="text-[#D4AF37] font-bold text-[10px] tracking-[0.15em] uppercase">
                    FLAGSHIP PROGRAM
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-md text-[10px] text-[#D4AF37] border border-white/10 font-semibold uppercase tracking-wider">
                    <Laptop className="w-3 h-3 text-[#D4AF37]" />
                    <Tablet className="w-3 h-3 text-[#D4AF37]" />
                    <Smartphone className="w-3 h-3 text-[#D4AF37]" />
                    <span className="ml-0.5">Online</span>
                  </span>
                </div>

                {/* Heading */}
                <h2 className="serif-heading text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                  Juniors Deeniyat Mastercourse
                </h2>

                {/* Paragraph */}
                <p className="text-[#fdf5e9]/95 text-sm leading-relaxed max-w-sm font-medium">
                  A complete Islamic foundation, built to last a lifetime. From foundational Aqeedah to the beauty of Akhlaq.
                </p>
              </div>

              {/* Watermark SVG Islamic Arch */}
              <div className="absolute bottom-0 right-0 h-44 w-44 text-[#D4AF37] opacity-[0.15] pointer-events-none translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M50,10 C45,35 25,45 25,75 L25,95 L75,95 L75,75 C75,45 55,35 50,10 Z" />
                  <path d="M35,95 L35,80 C35,70 65,70 65,80 L65,95" />
                  <path d="M50,10 L50,5" strokeWidth="1"/>
                  <circle cx="50" cy="3" r="1" fill="currentColor"/>
                </svg>
              </div>

              <div className="mt-12 z-10">
                {/* Divider */}
                <div className="border-t border-dashed border-white/10 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold tracking-widest text-[#EAD5D8]/80 block mb-1">
                      MONTHLY INVESTMENT
                    </span>
                    <span className="serif-heading text-xl font-bold text-white">
                      From Rs. 600
                    </span>
                  </div>

                  <a
                    href="https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20am%20sincerely%20interested%20in%20registering%20my%20child%20for%20the%20Juniors%20Deeniyat%20Mastercourse."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-[#D4AF37] hover:bg-white text-[#480117] text-xs font-extrabold px-5 py-3 rounded-xl shadow-sm transition-all duration-300 cursor-pointer inline-flex items-center"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
              )}

            {/* Card 2: Noorani Qaida (Kids') */}
            {displayedCourses.some(c => c.slug === 'noorani-qaida-kids') && (
            <div 
              onClick={() => onSelectCourse('noorani-qaida-kids')}
              className="bg-panel-dark border border-[#D4AF37]/20 rounded-2xl overflow-hidden h-full flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 group"
              id="kids-course-card-qaida"
            >
              {/* Image at top */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                {/* Online Presence Device Indicator Overlay */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 text-white border border-white/10 backdrop-blur-sm shadow-sm">
                  <Laptop className="w-3 h-3 text-[#D4AF37]" />
                  <Tablet className="w-3 h-3 text-[#D4AF37]" />
                  <Smartphone className="w-3 h-3 text-[#D4AF37]" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#D4AF37] ml-1">Live Online</span>
                </div>

                <img 
                  src={quranRehalImg} 
                  alt="Noorani Qaida Qur'an Stand" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content padding */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between bg-panel-dark">
                <div>
                  {/* Badges */}
                  <span className="bg-[#D4AF37] text-[#480117] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md mb-5 inline-block">
                    4-5 MONTHS
                  </span>

                  {/* Title */}
                  <h2 className="serif-heading text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    Noorani Qaida (Kids')
                  </h2>

                  {/* Paragraph */}
                  <p className="text-[#fdf5e9]/95 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    The first step to reading Qur'an. Master Tajweed basics through a nurturing, patient-first approach.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-4">
                  <div>
                    <span className="text-[9px] font-extrabold tracking-widest text-[#EAD5D8]/80 block mb-0.5">
                      INVESTMENT
                    </span>
                    <span className="serif-heading text-base font-bold text-white">
                      Rs. 500/mo
                    </span>
                  </div>

                  <a
                    href="https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20am%20sincerely%20interested%20in%20registering%20my%20child%20for%20the%20Noorani%20Qaida%20Kids%20course."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-[#D4AF37] hover:bg-white text-[#480117] text-xs font-extrabold px-5 py-3 rounded-xl shadow-sm transition-all duration-300 cursor-pointer inline-flex items-center"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
              )}

          </div>
          )}
        </section>

        {/* Social Proof / Testimonials */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10" id="kids-social-proof">
          <div className="rounded-3xl border border-[#D4AF37]/25 bg-panel-dark py-10 px-6 sm:px-10 text-center space-y-8 shadow-lg">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#D4AF37]" /> Trusted globally
              </span>
              <h2 className="serif-heading text-2xl sm:text-3xl font-bold text-white">
                Trusted by 300+ students on their journey back to their deen.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto pt-2">
              
              {/* Testimony 1 */}
              <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                  <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                    "Ms. Mustara created a space so warm and gentle that I actually looked forward to making mistakes because of how lovingly she guided me to fix them. My recitation has completely changed."
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 mt-4">
                  <p className="text-xs font-bold text-white">Sister Aisha, Delhi</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Tajweed 1:1 Graduate</p>
                </div>
              </div>

              {/* Testimony 2 */}
              <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                  <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                    "The storyteller style and emphasis on loving Allah has changed our home. My 8-year-old son now reads his daily duas entirely on his own without any reminders."
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 mt-4">
                  <p className="text-xs font-bold text-white">Suhail, Parent of Farhan</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Kids' Deeniyat Graduate</p>
                </div>
              </div>

              {/* Testimony 3 */}
              <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                  <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                    "This was not a history class — it was a spiritual hospital. It reshaped my marriage, my parenting, and how I treat my parents. I finally understand what character (akhlaq) means."
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 mt-4">
                  <p className="text-xs font-bold text-white">Sister Maryam, London</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Seerah Course Graduate</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 mt-12" id="kids-approach-section">
          <div className="bg-panel-dark rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-14 border border-[#D4AF37]/25 shadow-lg">
            
            {/* Left Column: Text */}
            <div className="md:w-1/2 space-y-6">
              <h2 className="serif-heading text-2.5xl sm:text-3.5xl font-bold leading-tight text-white">
                Our Approach: Sacred Learning
              </h2>
              
              <p className="text-[#fdf5e9]/90 text-sm sm:text-base leading-relaxed font-medium">
                We believe children learn best when they feel safe and loved. Our classes are designed to be conversational, respectful, and deeply engaging, avoiding the rigid structures of traditional schooling.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[#480117]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-[#fdf5e9]/90 font-semibold leading-relaxed">
                    Small class sizes for individual attention
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[#480117]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-[#fdf5e9]/90 font-semibold leading-relaxed">
                    Interactive storytelling & visual aids
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Browser-Style Mockup */}
            <div className="md:w-1/2 w-full">
              <div className="rounded-2xl border border-white/10 bg-panel-dark p-2 sm:p-3 shadow-xl">
                
                {/* Browser Window Header Mockup */}
                <div className="flex items-center space-x-2 px-3 pb-2.5 border-b border-white/10">
                  <div className="flex space-x-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="bg-white/5 text-center py-0.5 rounded-md flex-1 text-[10px] text-white truncate font-medium max-w-[240px] mx-auto">
                    Kids' Programs Hub — Qalbiya
                  </div>
                  <div className="w-10 shrink-0" /> {/* Spacer for balance */}
                </div>

                {/* The beautifully generated image inside the frame */}
                <div className="overflow-hidden rounded-xl mt-3">
                  <img 
                    src={onlineLearningImg} 
                    alt="Online Learning Illustration" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Admissions Dotted Box Card */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 mt-12" id="kids-admissions-cta">
          <div className="border border-dashed border-[#D4AF37]/25 rounded-3xl p-8 sm:p-12 text-center bg-panel-dark shadow-xl">
            <h2 className="serif-heading text-xl sm:text-2xl font-bold text-white leading-relaxed mb-4 max-w-2xl mx-auto">
              Give your child a foundation that grows with them — in knowledge, in akhlaq, in love for their deen.
            </h2>
            
            <p className="font-sans text-xs sm:text-sm text-[#EAD5D8]/90 max-w-lg mx-auto mb-8 leading-relaxed font-medium">
              Our admissions are open year-round for new cohorts. Start their journey today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              {/* WhatsApp Admission */}
              <a 
                href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20enrolling%20my%20child%20in%20Qalbiya%20Islamic%20Institute."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#12D164] hover:bg-[#0FB856] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center space-x-2 shadow-sm transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
                id="kids-cta-whatsapp"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#12D164]" />
                <span>WhatsApp Admission</span>
              </a>

              {/* Instagram Follow */}
              <a 
                href="https://instagram.com/qalbiya_institute"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8E4B59] hover:bg-[#743C47] text-white border border-[#D4AF37]/25 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center space-x-2 shadow-sm transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
                id="kids-cta-instagram"
              >
                <Instagram className="w-4 h-4 text-[#D82D7E]" />
                <span>Follow on Instagram</span>
              </a>
            </div>

            <span className="font-sans text-[11px] italic text-[#EAD5D8]/80 leading-relaxed max-w-md mx-auto block">
              "The best gift a parent can give their child is a good upbringing."
            </span>
          </div>
        </section>

      </div>
    );
  }

  // Fallback to Women's Hub Layout (Dark, Classic style)
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hub Hero Banner */}
      <section className="text-center space-y-4 pt-10" id="hub-hero">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#D4AF37]/25 bg-panel-dark px-4.5 py-1.5 text-xs font-semibold text-[#D4AF37] tracking-wide">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Sisters Academic Circles</span>
        </div>

        <h1 className="serif-heading text-4xl sm:text-5xl font-bold text-[#480117] tracking-tight">
          Women's Sacred Academic Hub
        </h1>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#5C464A]">
          A safe space for adult sisters to learn Tajweed, Seerah, and Deeniyat rules without anxiety. Guided by qualified female scholars who understand your lifestyle.
        </p>

        {/* Swapper between Hubs */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('kids')}
            className="inline-flex items-center space-x-2 rounded-xl bg-[#8E4B59] hover:bg-[#743C47] border border-[#D4AF37]/20 px-4.5 py-3.5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 cursor-pointer"
            id="hub-toggle-btn"
          >
            <span>Switch to Kids' Tarbiyah Hub</span>
          </button>
        </div>
      </section>

      {/* Courses Grid with Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="hub-courses-grid">
        <CourseFilterBar
          category="women"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFormats={selectedFormats}
          onToggleFormat={handleToggleFormat}
          availableDurations={availableDurations}
          selectedDurations={selectedDurations}
          onToggleDuration={handleToggleDuration}
          onReset={handleResetFilters}
          totalCount={filteredCourses.length}
          filteredCount={displayedCourses.length}
        />

        {displayedCourses.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-panel-dark/60 rounded-3xl border border-[#D4AF37]/25 space-y-4 shadow-xl max-w-3xl mx-auto"
          >
            <HelpCircle className="w-12 h-12 text-[#D4AF37] mx-auto animate-bounce" />
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">No courses match your selected filters</h4>
            <p className="text-sm text-[#EAD5D8]/80 max-w-md mx-auto">
              Try removing some duration or format filters, or clear your search term to view more academic circles.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#480117] hover:bg-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Filters & Show All Courses</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map((course) => (
              <CourseCard 
                key={course.slug} 
                course={course} 
                onSelect={onSelectCourse} 
              />
            ))}
          </div>
        )}
      </section>

      {/* Social Proof / Testimonials */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" id="hub-social-proof">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-panel-dark py-10 px-6 sm:px-10 text-center space-y-8 shadow-lg">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Trusted globally
            </span>
            <h2 className="serif-heading text-2xl sm:text-3xl font-bold text-white">
              Trusted by 300+ students on their journey back to their deen.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto pt-2">
            
            {/* Testimony 1 */}
            <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/45 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                  "Ms. Mustara created a space so warm and gentle that I actually looked forward to making mistakes because of how lovingly she guided me to fix them. My recitation has completely changed."
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 mt-4">
                <p className="text-xs font-bold text-white">Sister Aisha, Delhi</p>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Tajweed 1:1 Graduate</p>
              </div>
            </div>

            {/* Testimony 2 */}
            <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/45 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                  "The storyteller style and emphasis on loving Allah has changed our home. My 8-year-old son now reads his daily duas entirely on his own without any reminders."
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 mt-4">
                <p className="text-xs font-bold text-white">Suhail, Parent of Farhan</p>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Kids' Deeniyat Graduate</p>
              </div>
            </div>

            {/* Testimony 3 */}
            <div className="bg-panel-dark/45 border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4 shadow-sm hover:border-[#D4AF37]/45 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#D4AF37]/10" />
                <p className="text-xs sm:text-sm italic text-[#fdf5e9]/90 leading-relaxed font-serif">
                  "This was not a history class — it was a spiritual hospital. It reshaped my marriage, my parenting, and how I treat my parents. I finally understand what character (akhlaq) means."
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 mt-4">
                <p className="text-xs font-bold text-white">Sister Maryam, London</p>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">Seerah Course Graduate</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sincerity Banner */}
      <section className="mx-auto max-w-4xl px-4 text-center space-y-6" id="hub-sincerity">
        <div className="p-8 rounded-3xl border border-[#D4AF37]/20 bg-panel-dark">
          <h3 className="serif-heading text-xl font-bold text-white">Need Financial Accommodation?</h3>
          <p className="text-xs text-[#fdf5e9]/90 mt-2 max-w-xl mx-auto leading-relaxed">
            Allah sees your intention. If your family is facing hardship, or if you can only afford a partial contribution, please do not hesitate to apply for a scholarship. We offer full and partial sponsorships securely and confidentially.
          </p>
          <button
            onClick={() => onNavigate('scholarship')}
            className="mt-4 rounded-xl bg-white hover:bg-[#fdf5e9] text-[#480117] px-5 py-3.5 sm:py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md"
            id="hub-scholarship-btn"
          >
            Apply for Sponsorship
          </button>
        </div>
      </section>

    </div>
  );
};

