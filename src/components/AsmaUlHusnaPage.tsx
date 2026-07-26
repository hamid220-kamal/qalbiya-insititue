import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, X, Sparkles, Heart, BookOpen, Compass,
  ChevronRight, ArrowLeft, Star, Moon
} from 'lucide-react';
import { asmaUlHusnaList, NameOfAllah } from '../data/asmaUlHusna';
import { Route } from '../types';
import { ShareButton } from './ShareButton';

interface AsmaUlHusnaPageProps {
  onNavigate?: (route: Route) => void;
}

const getCategoriesForName = (id: number): string[] => {
  const cats: string[] = ['all'];
  const mercyIds = [1, 2, 6, 30, 42, 47, 79, 83, 92];
  const mightIds = [3, 8, 9, 10, 15, 20, 22, 24, 25, 33, 36, 37, 41, 48, 53, 54, 61, 69, 70, 78, 81, 84, 85, 88, 90, 91, 96];
  const forgivenessIds = [4, 5, 14, 32, 34, 35, 80, 82, 86, 99];
  const wisdomIds = [19, 26, 27, 28, 29, 31, 43, 46, 50, 51, 57, 93, 94, 98];
  const provisionIds = [7, 11, 12, 13, 16, 17, 18, 21, 23, 38, 39, 40, 44, 45, 49, 52, 55, 56, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 87, 89, 95, 97];
  if (mercyIds.includes(id)) cats.push('mercy');
  if (mightIds.includes(id)) cats.push('might');
  if (forgivenessIds.includes(id)) cats.push('forgiveness');
  if (wisdomIds.includes(id)) cats.push('wisdom');
  if (provisionIds.includes(id)) cats.push('provision');
  return cats;
};

const categories = [
  { id: 'all',        label: 'All 99 Names',      icon: Sparkles },
  { id: 'mercy',     label: 'Mercy & Love',       icon: Heart    },
  { id: 'might',     label: 'Might & Majesty',    icon: Compass  },
  { id: 'forgiveness', label: 'Forgiveness',      icon: Moon     },
  { id: 'wisdom',    label: 'Knowledge & Wisdom', icon: Star     },
  { id: 'provision', label: 'Provision & Care',   icon: BookOpen },
];

export const AsmaUlHusnaPage: React.FC<AsmaUlHusnaPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);

  const filteredNames = asmaUlHusnaList.filter(name => {
    const matchesSearch =
      name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.arabic.includes(searchQuery) ||
      String(name.id).includes(searchQuery);
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && getCategoriesForName(name.id).includes(selectedCategory);
  });

  const getCategoryCount = (catId: string) =>
    catId === 'all' ? asmaUlHusnaList.length : asmaUlHusnaList.filter(n => getCategoriesForName(n.id).includes(catId)).length;

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#23181A]">

      {/* ── Subtle Background Pattern ─────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#78122B_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.035]" />
        {/* Top burgundy blob */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #78122B 0%, transparent 70%)' }} />
        {/* Bottom right gold blob */}
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
      </div>

      {/* ── Page Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-10">

        {/* Breadcrumb */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E8DDD9]">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78122B] hover:text-[#630E23] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-2.5">
              <ShareButton
                title="99 Divine Names of Allah – Qalbiya Institute"
                text="Reflect on the 99 Beautiful Names of Allah with Qalbiya Islamic Institute."
                variant="button"
              />
              <button
                onClick={() => onNavigate('fivePillars')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#78122B]/30 text-[#78122B] hover:bg-[#78122B] hover:text-white transition-all cursor-pointer"
              >
                5 Pillars of Islam <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Hero Section ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          {/* Ornament divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#78122B]/20 bg-[#78122B]/6 text-xs font-semibold uppercase tracking-widest text-[#78122B]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Divine Attributes & Sacred Invocation
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#23181A] leading-tight tracking-tight">
            Asma Ul Husna
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#78122B] italic font-medium">
            The 99 Beautiful Names of Allah ﷻ
          </p>
          <p className="text-sm sm:text-base text-[#5C4D50] leading-relaxed max-w-xl mx-auto">
            Reflect on the sacred attributes of our Creator. Each name is a doorway to deeper faith, peace, and divine connection.
          </p>

          {/* Quran ayah card */}
          <div className="mx-auto max-w-xl p-5 rounded-2xl border border-[#D4AF37]/30 bg-white shadow-sm text-center">
            <p className="font-serif text-base text-[#23181A] italic leading-relaxed">
              "To Allah belong the most beautiful names, so call upon Him by them."
            </p>
            <span className="block mt-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
              Surah Al-A'raf [7:180]
            </span>
          </div>
        </motion.div>

        {/* ── Search & Category Filters ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="rounded-3xl border border-[#E8DDD9] bg-white shadow-sm p-6 sm:p-8 space-y-5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#23181A]">Explore & Search the Names</h3>
              <p className="text-xs text-[#8C7A7E] mt-0.5">Click any name card to reveal spiritual reflection and invocation guidance.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78122B]" />
              <input
                type="text"
                placeholder="Search by name, meaning, or number..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-[#E8DDD9] bg-[#FAF8F5] text-[#23181A] placeholder-[#8C7A7E] focus:outline-none focus:border-[#78122B] focus:ring-1 focus:ring-[#78122B]/30 transition-all"
                id="search-asma-ul-husna-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A7E] hover:text-[#78122B] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8DDD9]">
            {categories.map(cat => {
              const CatIcon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#78122B] text-white shadow-sm scale-105'
                      : 'bg-[#FAF8F5] text-[#5C4D50] border border-[#E8DDD9] hover:border-[#78122B]/40 hover:text-[#78122B]'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#78122B]'}`} />
                  {cat.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-[#78122B]/8 text-[#78122B]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Names Grid ─────────────────────────────────────────────── */}
        {filteredNames.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 rounded-3xl border border-[#E8DDD9] bg-white space-y-4"
          >
            <Sparkles className="w-10 h-10 text-[#78122B] mx-auto" />
            <h4 className="font-serif text-xl font-bold text-[#23181A]">No names found</h4>
            <p className="text-sm text-[#8C7A7E] max-w-md mx-auto">
              No name matches "{searchQuery}". Try English, Arabic script, or a number.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all bg-[#78122B] text-white hover:bg-[#630E23]"
            >
              Reset Search
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-[#8C7A7E] font-mono uppercase tracking-wider">
                Showing <span className="text-[#78122B] font-bold">{filteredNames.length}</span> of {asmaUlHusnaList.length} names
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredNames.map((name, index) => (
                <motion.button
                  key={name.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.35) }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedName(name)}
                  className="relative group text-center flex flex-col justify-between p-4 rounded-2xl border border-[#E8DDD9] bg-white shadow-xs cursor-pointer transition-all duration-300 h-48 hover:border-[#78122B]/40 hover:shadow-md"
                >
                  {/* Number badge */}
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C7A7E] group-hover:text-[#78122B] transition-colors">
                      Name
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#78122B] px-2 py-0.5 rounded-full bg-[#78122B]/8 border border-[#78122B]/20 group-hover:bg-[#78122B] group-hover:text-white transition-all">
                      {String(name.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Arabic text */}
                  <div className="text-3xl sm:text-4xl font-serif text-[#78122B] font-extrabold leading-tight py-1 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                    {name.arabic}
                  </div>

                  {/* Transliteration & translation */}
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#23181A] tracking-wide group-hover:text-[#78122B] transition-colors line-clamp-1">
                      {name.transliteration}
                    </div>
                    <div className="text-[10px] text-[#8C7A7E] line-clamp-1">
                      {name.translation}
                    </div>
                  </div>

                  {/* Reflect prompt */}
                  <div className="flex items-center justify-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#8C7A7E] group-hover:text-[#78122B] transition-colors pt-1">
                    <span>Reflect & Invoke</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}

        {/* Footer info bar */}
        <div className="p-5 rounded-2xl border border-[#E8DDD9] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A7E]">
          <span className="font-mono">Showing {filteredNames.length} / {asmaUlHusnaList.length} Divine Names</span>
          <span className="italic font-serif text-center text-[#5C4D50]">"The most beautiful names belong to Allah; so call on Him by them."</span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('women')}
              className="flex items-center gap-1 font-bold text-[#78122B] hover:underline cursor-pointer whitespace-nowrap"
            >
              Learn Tajweed & Quranic Recitation <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Name Detail Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            style={{ backdropFilter: 'blur(12px)', background: 'rgba(35,24,26,0.55)' }}
            id="name-detail-modal"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedName(null)} />

            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 bg-white border border-[#E8DDD9]"
            >
              {/* Burgundy top stripe */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #78122B, #D4AF37, #78122B)' }} />

              <div className="p-6 sm:p-8 space-y-6 text-center">
                {/* Close */}
                <button
                  onClick={() => setSelectedName(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] hover:bg-[#F9E8EC] text-[#8C7A7E] hover:text-[#78122B] transition-colors cursor-pointer border border-[#E8DDD9]"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Badge */}
                <div className="inline-block px-3 py-1 rounded-full border border-[#78122B]/20 bg-[#78122B]/6 text-[10px] font-mono font-bold text-[#78122B] uppercase tracking-widest">
                  Name #{String(selectedName.id).padStart(2, '0')} of 99
                </div>

                {/* Arabic & name */}
                <div className="space-y-3 py-2">
                  <div className="text-6xl sm:text-7xl font-serif font-extrabold text-[#78122B] leading-tight">
                    {selectedName.arabic}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#23181A]">
                    {selectedName.transliteration}
                  </h3>
                  <p className="text-base text-[#5C4D50] font-medium">
                    {selectedName.translation}
                  </p>
                </div>

                {/* Reflection block */}
                <div className="p-5 rounded-2xl border border-[#E8DDD9] bg-[#FAF8F5] text-left space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Spiritual Reflection & Invocation
                  </div>
                  <p className="text-sm text-[#5C4D50] leading-relaxed font-serif">
                    When invoking Allah by <strong className="text-[#23181A]">{selectedName.transliteration}</strong> — {selectedName.translation} — reflect on this divine attribute in your daily supplications to nurture trust, humility, and inner tranquility.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedName(null)}
                    className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all bg-[#78122B] text-white hover:bg-[#630E23]"
                  >
                    Close Reflection
                  </button>
                  {onNavigate && (
                    <button
                      onClick={() => { setSelectedName(null); onNavigate('women'); }}
                      className="flex-1 py-3 rounded-xl border border-[#E8DDD9] bg-[#FAF8F5] text-[#23181A] text-xs font-bold uppercase tracking-wider hover:bg-[#F9E8EC] hover:text-[#78122B] transition-colors cursor-pointer"
                    >
                      Study in Our Courses →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
