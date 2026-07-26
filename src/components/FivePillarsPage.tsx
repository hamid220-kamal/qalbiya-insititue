import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, Book, ChevronRight, ArrowLeft, Sparkles,
  CheckCircle2, Heart, Shield, Sun, Users, Award, Quote
} from 'lucide-react';
import { Route } from '../types';
import { ShareButton } from './ShareButton';

interface FivePillarsPageProps {
  onNavigate?: (route: Route) => void;
}

const pillarsOfIslam = [
  {
    id: 1,
    arabic: 'الشهادة',
    name: 'Shahadah',
    english: 'Declaration of Faith',
    icon: Heart,
    significance: 'The gateway and anchor of all faith in Islam. It transforms a person\'s entire worldview by establishing absolute monotheism (Tawhid) and directing all love, reverence, and obedience solely to the Creator.',
    reflection: 'When I declare the Shahadah with sincerity, I remind myself that no hardship, fear, or worldly pursuit is greater than Allah. It centers my daily actions around pleasing the One who created me.',
    practice: 'Recite the Shahadah with presence of heart upon waking and going to sleep. Reflect on Allah\'s oneness in every blessing you witness.',
    qalbiyaIntegration: 'Our Aqeedah and Seerah curriculums anchor students in deep love and understanding of who Allah is and how the Prophet ﷺ lived the Shahadah.',
  },
  {
    id: 2,
    arabic: 'الصلاة',
    name: 'Salah',
    english: 'Daily Obligatory Prayers',
    icon: Sun,
    significance: 'Salah is the supreme direct connection between the slave and their Lord — without any intermediary. Established five times a day, it serves as an unbreakable spiritual lifeline that preserves moral integrity and instills divine structure into life.',
    reflection: 'In the rush of daily demands, Salah is my divine sanctuary. As I place my forehead in Sujud, I surrender my anxieties to the Most Merciful and find profound stillness.',
    practice: 'Prepare for prayer before the adhan by performing calm, attentive Wudu. Create a quiet, dedicated prayer corner in your home.',
    qalbiyaIntegration: 'We teach correct Tajweed for prayer recitation along with the inner dimensions (Khushu) so prayer becomes your rest, not a chore.',
  },
  {
    id: 3,
    arabic: 'الزكاة',
    name: 'Zakat',
    english: 'Obligatory Charity & Purification',
    icon: Shield,
    significance: 'Linguistically meaning "purification and growth", Zakat is the economic and social backbone of Islamic brotherhood. By redistributing wealth to those in need, it eradicates societal neglect and purifies the giver\'s heart from greed.',
    reflection: 'Giving Zakat reminds me that everything I own is a sacred trust from Allah. By letting go of wealth to uplift others, my heart is cured of materialism and filled with genuine gratitude.',
    practice: 'Calculate your zakat annually with gratitude rather than reluctance. Look for those in your immediate family or neighborhood who may be suffering in silence.',
    qalbiyaIntegration: 'Our Islamic studies modules emphasize empathy, social responsibility, and the spiritual beauty of generosity and gratitude.',
  },
  {
    id: 4,
    arabic: 'الصوم',
    name: 'Sawm',
    english: 'Fasting the Month of Ramadan',
    icon: Award,
    significance: 'Sawm is a profound annual school of spiritual rehabilitation. By voluntarily renouncing basic biological needs during daylight hours, the believer asserts the supremacy of the soul over physical appetites and cultivates enduring Taqwa.',
    reflection: 'Fasting strips away the noise of daily life. As hunger softens my pride, my heart becomes attuned to the whispers of prayer and a sincere compassion for those who hunger without choice.',
    practice: 'Practice voluntary fasting on Mondays and Thursdays or the White Days (13th, 14th, 15th of the lunar month) to keep spiritual stamina strong year-round.',
    qalbiyaIntegration: 'We host special Ramadan prep intensives and daily Quranic reflections to help families experience the true spiritual sweetness of fasting.',
  },
  {
    id: 5,
    arabic: 'الحج',
    name: 'Hajj',
    english: 'Pilgrimage to Makkah',
    icon: Users,
    significance: 'The ultimate journey of return to the origins of Abrahamic faith. Hajj unites millions of believers from every corner of the globe in identical white garments, erasing all worldly distinctions of wealth, race, and royalty.',
    reflection: 'Hajj is the journey of a lifetime that mirrors our eternal journey back to God. Wearing two simple unstitched cloths reminds me of my mortal simplicity and fills me with awe.',
    practice: 'Even if you haven\'t performed Hajj yet, learn the history of Prophet Ibrahim (AS) and Hajar (AS) to understand the profound symbolism of sacrifice and trust in Allah.',
    qalbiyaIntegration: 'Our Seerah masterclasses walk students step by step through the Farewell Pilgrimage of the Prophet ﷺ and its enduring lessons.',
  },
];

export const FivePillarsPage: React.FC<FivePillarsPageProps> = ({ onNavigate }) => {
  const [activePillar, setActivePillar] = useState<number | null>(1);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#23181A]">

      {/* ── Subtle background decoration ──────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#78122B_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.035]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #78122B 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
      </div>

      {/* ── Page Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-10">

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
                title="The Five Pillars of Islam – Qalbiya Islamic Institute"
                text="Explore the essential foundation of faith in Islam: Shahadah, Salah, Zakat, Sawm, and Hajj."
                variant="button"
              />
              <button
                onClick={() => onNavigate('asmaUlHusna')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#78122B]/30 text-[#78122B] hover:bg-[#78122B] hover:text-white transition-all cursor-pointer"
              >
                Asma Ul Husna <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          {/* Ornament */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#78122B]/20 bg-[#78122B]/6 text-xs font-semibold uppercase tracking-widest text-[#78122B]">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            Core Fundamentals of Faith
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#23181A] leading-tight tracking-tight">
            The Five Pillars<br />of Islam
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#78122B] italic font-medium">
            The Anchor of a Believer's Heart & Action
          </p>
          <p className="text-sm text-[#5C4D50] leading-relaxed max-w-lg mx-auto">
            Every Qalbiya program is built around these five sacred pillars, connecting outward devotion with inward tranquility and character transformation.
          </p>

          {/* Hadith card */}
          <div className="mx-auto max-w-xl p-5 rounded-2xl border border-[#D4AF37]/30 bg-white shadow-sm text-center">
            <p className="font-serif text-sm text-[#23181A] italic leading-relaxed">
              "Islam is built upon five pillars: testifying that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah, establishing regular prayer, paying zakat, making the pilgrimage to the House, and fasting in Ramadan."
            </p>
            <span className="block mt-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
              Prophet Muhammad ﷺ · Sahih Bukhari & Muslim
            </span>
          </div>
        </motion.div>

        {/* ── 5-dot Visual Navigator ────────────────────────────────── */}
        <div className="flex justify-center items-start gap-4 sm:gap-6">
          {pillarsOfIslam.map(p => {
            const IconComp = p.icon;
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(isActive ? null : p.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#78122B] text-white shadow-md shadow-[#78122B]/30 scale-110'
                    : 'bg-white border border-[#E8DDD9] text-[#78122B] hover:border-[#78122B]/40 hover:bg-[#F9E8EC] group-hover:scale-105'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                  isActive ? 'text-[#78122B] font-bold' : 'text-[#8C7A7E] group-hover:text-[#78122B]'
                }`}>
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Accordion Pillars ─────────────────────────────────────── */}
        <div className="space-y-4">
          {pillarsOfIslam.map((pillar, index) => {
            const isSelected = activePillar === pillar.id;
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08, type: 'spring', stiffness: 110, damping: 18 }}
                className={`rounded-3xl overflow-hidden border transition-all duration-400 ${
                  isSelected
                    ? 'border-[#78122B]/40 bg-white shadow-md shadow-[#78122B]/8'
                    : 'border-[#E8DDD9] bg-white hover:border-[#78122B]/25 hover:shadow-sm'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setActivePillar(isSelected ? null : pillar.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-7 text-left cursor-pointer"
                  id={`pillar-trigger-${pillar.id}`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Number badge */}
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-sm font-mono font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#78122B] text-white scale-105 shadow-sm'
                        : 'bg-[#FAF8F5] border border-[#E8DDD9] text-[#78122B]'
                    }`}>
                      0{pillar.id}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-serif font-bold text-lg sm:text-2xl text-[#23181A]">{pillar.name}</span>
                        <span className="text-sm font-medium font-serif text-[#78122B]">({pillar.english})</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <IconComp className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A7E]">
                          Pillar {pillar.id} of Islam
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Arabic — desktop */}
                    <span className={`font-serif text-3xl sm:text-4xl font-bold hidden md:inline transition-colors duration-300 ${
                      isSelected ? 'text-[#78122B]' : 'text-[#E8DDD9]'
                    }`}>
                      {pillar.arabic}
                    </span>
                    {/* Expand icon */}
                    <div className={`p-2.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#78122B] text-white rotate-90'
                        : 'bg-[#FAF8F5] border border-[#E8DDD9] text-[#8C7A7E]'
                    }`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="px-5 sm:px-7 pb-7 pt-1 space-y-5 border-t border-[#E8DDD9]">

                        {/* Significance */}
                        <div className="p-5 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#78122B] space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                            Significance & Core Meaning
                          </div>
                          <p className="font-serif text-base sm:text-lg text-[#23181A] leading-relaxed">
                            {pillar.significance}
                          </p>
                        </div>

                        {/* Reflection */}
                        <div className="p-5 rounded-2xl border border-[#E8DDD9] bg-white space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8C7A7E]">
                            <Quote className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                            Personal Spiritual Reflection
                          </div>
                          <p className="font-serif text-sm sm:text-base text-[#5C4D50] italic leading-relaxed pl-5 border-l-2 border-[#D4AF37]/50">
                            "{pillar.reflection}"
                          </p>
                        </div>

                        {/* Two columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Daily Practice */}
                          <div className="p-5 rounded-2xl border border-[#E8DDD9] bg-[#F0FDF4] space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              Daily Practice
                            </div>
                            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-serif">
                              {pillar.practice}
                            </p>
                          </div>

                          {/* How we teach */}
                          <div className="p-5 rounded-2xl border border-[#78122B]/15 bg-[#FEF2F2] space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
                              <Book className="w-3.5 h-3.5 shrink-0" />
                              How We Teach This
                            </div>
                            <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed font-serif">
                              {pillar.qalbiyaIntegration}
                            </p>
                          </div>
                        </div>

                        {onNavigate && (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => onNavigate('women')}
                              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer text-[#78122B] hover:underline transition-colors"
                            >
                              Study this pillar in our Academy <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #78122B 0%, #4A0B1B 50%, #78122B 100%)',
            boxShadow: '0 20px 60px rgba(120,18,43,0.25)',
          }}
        >
          {/* Subtle dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] rounded-3xl" />

          <div className="relative z-10 space-y-3 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to Live Your Faith with Purpose?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Our structured online courses integrate these five sacred pillars into daily habits and heart-centered reflection with personal guidance from certified female scholars.
            </p>
          </div>

          {onNavigate && (
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('women')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#78122B] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors shadow-md cursor-pointer"
              >
                Explore Women's Programs →
              </button>
              <button
                onClick={() => onNavigate('kids')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors shadow-md cursor-pointer"
              >
                Explore Kids' Academy →
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};
