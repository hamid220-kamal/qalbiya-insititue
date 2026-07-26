import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Heart, BookOpen, Compass, HelpCircle, ChevronRight, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { asmaUlHusnaList, NameOfAllah } from '../data/asmaUlHusna';
import makkahBg from '../assets/images/makkah_background_1784214785961.jpg';
import { Route } from '../types';
import { ShareButton } from './ShareButton';

interface AsmaUlHusnaPageProps {
  onNavigate?: (route: Route) => void;
}

export const AsmaUlHusnaPage: React.FC<AsmaUlHusnaPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);

  // Categorize helper function for 99 Names
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

  // Filter 99 names based on search query and category
  const filteredNames = asmaUlHusnaList.filter(name => {
    const matchesSearch = 
      name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.arabic.includes(searchQuery) ||
      String(name.id).includes(searchQuery);
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && getCategoriesForName(name.id).includes(selectedCategory);
  });

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return asmaUlHusnaList.length;
    return asmaUlHusnaList.filter(name => getCategoriesForName(name.id).includes(catId)).length;
  };

  const categories = [
    { id: 'all', label: 'All 99 Names', icon: Sparkles },
    { id: 'mercy', label: 'Mercy & Love', icon: Heart },
    { id: 'might', label: 'Might & Majesty', icon: Compass },
    { id: 'forgiveness', label: 'Forgiveness & Peace', icon: BookOpen },
    { id: 'wisdom', label: 'Knowledge & Wisdom', icon: Search },
    { id: 'provision', label: 'Provision & Care', icon: Sparkles },
  ];

  return (
    <div className="w-full min-h-screen bg-[#23181A] text-white relative overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      
      {/* Background with Makkah Image and Dark Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          src={makkahBg} 
          alt="Holy Makkah Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none filter brightness-40 contrast-125"
          animate={{ scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-[#23181A]/95 to-[#23181A] backdrop-blur-[4px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
        {/* Navigation Breadcrumb & Back */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#EAB1BB] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Academy Home</span>
            </button>

            <div className="flex items-center gap-3">
              <ShareButton 
                title="99 Divine Names of Allah (Asma ul Husna) - Qalbiya Institute"
                text="Reflect on and memorize the 99 Divine Names of Allah with translations, explanations, and du'as."
                variant="button"
              />

              <button
                onClick={() => onNavigate('fivePillars')}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#23181A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-white/20"
              >
                <span>Explore 5 Pillars of Islam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6 max-w-4xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Divine Attributes & Sacred Invocation</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Asma Ul Husna
            <span className="block text-xl sm:text-2xl md:text-3xl text-[#D4AF37] font-serif italic mt-2 font-normal">
              The 99 Beautiful Names of Allah
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#EAD5D8]/90 leading-relaxed max-w-2xl mx-auto">
            Reflect on the sacred attributes of our Creator to find peace, understanding, and divine companionship in your daily life and prayers.
          </p>

          {/* Quranic Quote Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-[0.05] text-7xl font-serif">7:180</div>
            <p className="relative z-10 font-serif text-base sm:text-lg text-[#fdf5e9] italic leading-relaxed">
              "To Allah belong the best names, so invoke Him by them."
            </p>
            <span className="block text-xs text-[#D4AF37] font-mono mt-3 font-bold uppercase tracking-widest">Surah Al-A'raf [7:180]</span>
          </div>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Explore & Search the Names</span>
              </h3>
              <p className="text-xs text-[#EAD5D8]/70">
                Click any divine name card below to view deeper spiritual reflection and invocation guidance.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Search by English, Arabic, or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-slate-950/90 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
                id="search-asma-ul-husna-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-white/40 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#23181A] shadow-md shadow-[#D4AF37]/20 scale-105'
                      : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#23181A]' : 'text-[#D4AF37]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-black/30 text-white font-bold' : 'bg-white/10 text-white/60'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Names Grid */}
        {filteredNames.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-900/40 rounded-3xl border border-white/10 space-y-4"
          >
            <HelpCircle className="w-12 h-12 text-[#D4AF37] mx-auto animate-bounce" />
            <h4 className="font-serif text-xl font-bold text-white">No attributes match your search</h4>
            <p className="text-sm text-[#EAD5D8]/70 max-w-md mx-auto">
              We couldn't find any name matching "{searchQuery}". Try searching by transliteration (e.g. "Rahman"), translation (e.g. "Merciful"), or number.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#23181A] text-xs font-bold uppercase tracking-wider hover:bg-[#EAB1BB] transition-colors cursor-pointer"
            >
              Reset Filters & Search
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredNames.map((name, index) => (
              <motion.div
                key={name.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.5), ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedName(name)}
                className="p-6 rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-950/95 hover:border-[#D4AF37] transition-all duration-300 text-center relative group shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between h-56"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#EAB1BB]/80 group-hover:text-[#D4AF37] transition-colors">
                    Attribute
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] px-2.5 py-1 rounded-full bg-white/5 border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-[#23181A] transition-all">
                    #{String(name.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="text-4xl font-serif text-[#D4AF37] font-extrabold py-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                  {name.arabic}
                </div>

                <div>
                  <div className="text-base font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {name.transliteration}
                  </div>
                  <div className="text-xs text-[#EAD5D8] font-medium mt-1 line-clamp-1">
                    {name.translation}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white/90 flex items-center justify-center gap-1">
                    <span>Reflect & Invoke</span>
                    <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer info bar */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAD5D8]/80">
          <span>Showing {filteredNames.length} of {asmaUlHusnaList.length} Divine Names</span>
          <span className="italic font-serif text-sm">"The most beautiful names belong to Allah; so call on Him by them."</span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('women')}
              className="text-[#D4AF37] hover:underline font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Learn Tajweed & Quranic Recitation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* DETAIL MODAL FOR SELECTED NAME */}
      <AnimatePresence>
        {selectedName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ backdropFilter: "blur(12px)" }}
            id="name-detail-modal"
          >
            <div 
              className="absolute inset-0 bg-slate-950/80 cursor-pointer"
              onClick={() => setSelectedName(null)}
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center z-10"
            >
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                Attribute #{String(selectedName.id).padStart(2, '0')}
              </div>

              <div className="space-y-2 py-4">
                <div className="text-6xl sm:text-7xl font-serif font-extrabold text-[#D4AF37] drop-shadow-lg">
                  {selectedName.arabic}
                </div>
                <h3 className="font-serif text-3xl font-bold text-white pt-2">
                  {selectedName.transliteration}
                </h3>
                <p className="text-base sm:text-lg text-[#EAB1BB] font-medium">
                  {selectedName.translation}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/15 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                  <span>Spiritual Reflection & Invocation</span>
                </div>
                <p className="text-sm text-[#EAD5D8]/90 leading-relaxed font-serif">
                  When invoking Allah by <strong className="text-white font-sans">{selectedName.transliteration}</strong> ({selectedName.translation}), remember that His divine grace encompasses all creation. Reflect on this attribute in your daily supplications to nurture trust, humility, and inner tranquility.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedName(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4AF37] text-[#23181A] text-xs font-bold uppercase tracking-wider hover:bg-[#EAB1BB] transition-colors cursor-pointer shadow-md"
                >
                  Close Reflection
                </button>
                {onNavigate && (
                  <button
                    onClick={() => { setSelectedName(null); onNavigate('women'); }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-white/20"
                  >
                    Study in Our Courses →
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
