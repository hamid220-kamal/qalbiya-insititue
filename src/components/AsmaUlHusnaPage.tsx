import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Heart, BookOpen, Compass, HelpCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { asmaUlHusnaList, NameOfAllah } from '../data/asmaUlHusna';
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
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#23181A] relative overflow-hidden selection:bg-[#F9E8EC] selection:text-[#78122B]">
      
      {/* Subtle Background Pattern Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-[#78122B]/5_1px,transparent_1px] [background-size:24px_24px]" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
        {/* Navigation Breadcrumb & Back */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DDD9] pb-5">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#78122B] hover:text-[#630E23] transition-colors cursor-pointer"
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
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#F9E8EC] hover:bg-[#78122B] hover:text-white text-[#78122B] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#78122B]/20 shadow-2xs"
              >
                <span>Explore 5 Pillars of Islam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-5 max-w-4xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9E8EC] border border-[#78122B]/20 text-xs font-mono font-bold tracking-widest text-[#78122B] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#78122B]" />
            <span>Divine Attributes & Sacred Invocation</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#78122B] leading-tight">
            Asma Ul Husna
            <span className="block text-xl sm:text-2xl md:text-3xl text-[#630E23] font-serif italic mt-2 font-normal">
              The 99 Beautiful Names of Allah
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#5C4D50] leading-relaxed max-w-2xl mx-auto font-medium">
            Reflect on the sacred attributes of our Creator to find peace, understanding, and divine companionship in your daily life and prayers.
          </p>

          {/* Quranic Quote Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8DDD9] shadow-md max-w-2xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-[0.04] text-8xl font-serif text-[#78122B]">7:180</div>
            <p className="relative z-10 font-serif text-base sm:text-lg text-[#23181A] italic leading-relaxed font-semibold">
              "To Allah belong the best names, so invoke Him by them."
            </p>
            <span className="block text-xs text-[#A37B24] font-mono mt-3 font-bold uppercase tracking-widest">Surah Al-A'raf [7:180]</span>
          </div>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="bg-white border border-[#E8DDD9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#78122B] flex items-center gap-2">
                <span>Explore & Search Divine Attributes</span>
              </h3>
              <p className="text-xs text-[#5C4D50]">
                Click any divine name card below to view deeper spiritual reflection and invocation guidance.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#78122B]" />
              <input
                type="text"
                placeholder="Search by English, Arabic, or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8DDD9] text-[#23181A] placeholder-[#8C7A7E] focus:outline-none focus:border-[#78122B] focus:ring-1 focus:ring-[#78122B] transition-all shadow-inner"
                id="search-asma-ul-husna-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[#8C7A7E] hover:text-[#23181A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="pt-3 border-t border-[#E8DDD9] flex flex-wrap gap-2">
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
                      ? 'bg-[#78122B] text-white shadow-md scale-105'
                      : 'bg-[#FAF8F5] hover:bg-[#F9E8EC] text-[#5C4D50] border border-[#E8DDD9]'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#78122B]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white font-bold' : 'bg-[#E8DDD9] text-[#5C4D50]'}`}>
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
            className="text-center py-20 bg-white rounded-3xl border border-[#E8DDD9] space-y-4 shadow-sm"
          >
            <HelpCircle className="w-12 h-12 text-[#78122B] mx-auto animate-bounce" />
            <h4 className="font-serif text-xl font-bold text-[#23181A]">No attributes match your search</h4>
            <p className="text-sm text-[#5C4D50] max-w-md mx-auto">
              We couldn't find any name matching "{searchQuery}". Try searching by transliteration (e.g. "Rahman"), translation (e.g. "Merciful"), or number.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 rounded-xl bg-[#78122B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#630E23] transition-colors cursor-pointer shadow-sm"
            >
              Reset Filters & Search
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredNames.map((name, index) => (
              <motion.div
                key={name.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.4), ease: "easeOut" }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedName(name)}
                className="p-6 rounded-2xl border border-[#E8DDD9] bg-white hover:border-[#78122B]/40 hover:bg-[#FDFBF7] transition-all duration-300 text-center relative group shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between h-56"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C4D50] group-hover:text-[#78122B] transition-colors">
                    Attribute
                  </span>
                  <span className="text-xs font-mono font-bold text-[#78122B] px-2.5 py-1 rounded-full bg-[#F9E8EC] border border-[#78122B]/20 group-hover:bg-[#78122B] group-hover:text-white transition-all">
                    #{String(name.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="text-4xl font-serif text-[#78122B] font-extrabold py-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs">
                  {name.arabic}
                </div>

                <div>
                  <div className="text-base font-bold text-[#23181A] tracking-wide group-hover:text-[#78122B] transition-colors">
                    {name.transliteration}
                  </div>
                  <div className="text-xs text-[#5C4D50] font-medium mt-1 line-clamp-1">
                    {name.translation}
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E8DDD9] text-[10px] font-mono uppercase tracking-widest text-[#8C7A7E] group-hover:text-[#78122B] flex items-center justify-center gap-1">
                    <span>Reflect & Invoke</span>
                    <ChevronRight className="w-3 h-3 text-[#78122B]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer info bar */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8DDD9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C4D50] shadow-2xs">
          <span>Showing {filteredNames.length} of {asmaUlHusnaList.length} Divine Names</span>
          <span className="italic font-serif text-sm text-[#78122B] font-semibold">"The most beautiful names belong to Allah; so call on Him by them."</span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('women')}
              className="text-[#78122B] hover:text-[#630E23] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
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
            style={{ backdropFilter: "blur(8px)" }}
            id="name-detail-modal"
          >
            <div 
              className="absolute inset-0 bg-black/50 cursor-pointer"
              onClick={() => setSelectedName(null)}
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#E8DDD9] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center z-10"
            >
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white border border-[#E8DDD9] text-[#5C4D50] hover:bg-[#F9E8EC] hover:text-[#78122B] transition-colors cursor-pointer shadow-2xs"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-[#F9E8EC] border border-[#78122B]/30 text-xs font-mono font-bold text-[#78122B] uppercase tracking-widest">
                Attribute #{String(selectedName.id).padStart(2, '0')}
              </div>

              <div className="space-y-2 py-3">
                <div className="text-6xl sm:text-7xl font-serif font-extrabold text-[#78122B] drop-shadow-2xs">
                  {selectedName.arabic}
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#23181A] pt-2">
                  {selectedName.transliteration}
                </h3>
                <p className="text-base sm:text-lg text-[#630E23] font-semibold">
                  {selectedName.translation}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DDD9] text-left space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#78122B]">
                  <Sparkles className="w-4 h-4 text-[#78122B]" />
                  <span>Spiritual Reflection & Invocation</span>
                </div>
                <p className="text-sm text-[#5C4D50] leading-relaxed font-serif">
                  When invoking Allah by <strong className="text-[#23181A] font-sans font-bold">{selectedName.transliteration}</strong> ({selectedName.translation}), remember that His divine grace encompasses all creation. Reflect on this attribute in your daily supplications to nurture trust, humility, and inner tranquility.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedName(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#78122B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#630E23] transition-colors cursor-pointer shadow-md"
                >
                  Close Reflection
                </button>
                {onNavigate && (
                  <button
                    onClick={() => { setSelectedName(null); onNavigate('women'); }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F9E8EC] hover:bg-[#78122B] hover:text-white text-[#78122B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#78122B]/20"
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
