import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Book, ChevronRight, ArrowLeft, Sparkles, CheckCircle2, Heart, Shield, Sun, Users, Award, Quote } from 'lucide-react';
import makkahBg from '../assets/images/makkah_background_1784214785961.jpg';
import { Route } from '../types';

interface FivePillarsPageProps {
  onNavigate?: (route: Route) => void;
}

export const FivePillarsPage: React.FC<FivePillarsPageProps> = ({ onNavigate }) => {
  const [activePillar, setActivePillar] = useState<number | null>(1); // Default Shahadah expanded

  const pillarsOfIslam = [
    {
      id: 1,
      arabic: "الشهادة",
      name: "Shahadah",
      english: "Declaration of Faith",
      icon: Heart,
      badgeColor: "from-amber-500/20 to-yellow-600/20 text-amber-400 border-amber-500/30",
      desc: "To bear witness with unwavering conviction that there is no deity worthy of worship except Allah, and that Muhammad ﷺ is His final Messenger.",
      significance: "The gateway and anchor of all faith in Islam. It transforms a person's entire worldview by establishing absolute monotheism (Tawhid) and directing all love, reverence, and obedience solely to the Creator, liberating the human spirit from slavery to worldly desires and mortal attachments.",
      reflection: "When I declare the Shahadah with sincerity, I remind myself that no hardship, fear, or worldly pursuit is greater than Allah. It centers my daily actions around pleasing the One who created me and following the beautiful example of His Messenger ﷺ.",
      wisdom: "The foundational pillar and gateway into Islam. It transforms a person's worldview by directing all love, fear, hope, and obedience ultimately to the Creator, liberating the heart from slavery to worldly attachments.",
      practice: "Recite the Shahadah with presence of heart upon waking up and going to sleep. Reflect on Allah's oneness in every blessing you witness.",
      qalbiyaIntegration: "Our Aqeedah and Seerah curriculums anchor students in deep love and understanding of who Allah is and how the Prophet ﷺ lived the Shahadah."
    },
    {
      id: 2,
      arabic: "الصلاة",
      name: "Salah",
      english: "Daily Obligatory Prayers",
      icon: Sun,
      badgeColor: "from-emerald-500/20 to-teal-600/20 text-emerald-400 border-emerald-500/30",
      desc: "Establishing five obligatory prayers daily (Fajr, Dhuhr, Asr, Maghrib, Isha), cultivating constant mindfulness, peace, and spiritual connection with Allah.",
      significance: "Salah is the supreme direct connection between the slave and their Lord without any intermediary. Established five times a day, it serves as an unbreakable spiritual lifeline that preserves moral integrity, cleanses the soul from impurities, and instills divine structure into human life.",
      reflection: "In the rush of life's demands, Salah is my divine sanctuary. As I place my forehead upon the earth in Sujud, I surrender my anxieties to the Most Merciful, finding profound stillness, clarity, and renewed spiritual strength for the journey ahead.",
      wisdom: "Salah is the sanctuary of the believer. It acts as a divine cleansing five times a day, washing away stress, anxiety, and sins, while instilling punctuality, discipline, and humility.",
      practice: "Prepare for prayer before the adhan by performing calm, attentive Wudu. Create a quiet, dedicated prayer corner in your home.",
      qalbiyaIntegration: "We teach correct Tajweed for prayer recitation along with the inner dimensions (Khushu) so prayer becomes your rest, not a chore."
    },
    {
      id: 3,
      arabic: "الزكاة",
      name: "Zakat",
      english: "Obligatory Charity & Purification",
      icon: Shield,
      badgeColor: "from-indigo-500/20 to-blue-600/20 text-indigo-400 border-indigo-500/30",
      desc: "Giving 2.5% of one's accumulated annual wealth and savings to purify wealth and uphold social justice for the poor and vulnerable.",
      significance: "Linguistically meaning 'purification' and 'growth', Zakat is the economic and social backbone of Islamic brotherhood. By redistributing a portion of wealth to those in need, it eradicates societal neglect, purifies the giver's heart from greed, and sanctifies remaining possessions.",
      reflection: "Giving Zakat reminds me that everything I own is a sacred trust from Allah, not a personal triumph. By letting go of wealth to uplift others, my heart is cured of materialism and filled with genuine gratitude for God's endless provision.",
      wisdom: "The word Zakat literally means 'to purify and grow'. By sharing wealth, the believer purifies their heart from greed, materialism, and arrogance, cementing unbreakable bonds of community brotherhood.",
      practice: "Calculate your zakat annually with gratitude rather than reluctance. Look for those in your immediate family or neighborhood who may be suffering in silence.",
      qalbiyaIntegration: "Our Islamic studies modules emphasize empathy, social responsibility, and the spiritual beauty of generosity and gratitude."
    },
    {
      id: 4,
      arabic: "الصوم",
      name: "Sawm",
      english: "Fasting the Month of Ramadan",
      icon: Award,
      badgeColor: "from-rose-500/20 to-pink-600/20 text-rose-400 border-rose-500/30",
      desc: "Abstaining from food, drink, and sensory desires from dawn until sunset throughout the holy month of Ramadan to attain Taqwa (God-consciousness).",
      significance: "Sawm is a profound annual school of spiritual rehabilitation. By voluntarily renouncing basic biological needs during daylight hours, the believer asserts the supremacy of the soul over physical appetites, cultivating enduring Taqwa (God-consciousness) and empathy for the deprived.",
      reflection: "Fasting strips away the noise and habitual distractions of daily life. As hunger softens my pride, my heart becomes attuned to the whispers of prayer, the sweetness of the Quran, and a sincere compassion for those who hunger without choice.",
      wisdom: "Fasting elevates the soul over physical appetites. It teaches mastery over impulses, deep empathy for the hungry, and creates an extraordinary atmosphere of night prayers, Quran recitation, and spiritual rebirth.",
      practice: "Practice voluntary fasting on Mondays and Thursdays or the White Days (13th, 14th, 15th of lunar month) to keep your spiritual stamina strong year-round.",
      qalbiyaIntegration: "We host special Ramadan prep intensives and daily Quranic reflections to help families experience the true spiritual sweetness of fasting."
    },
    {
      id: 5,
      arabic: "الحج",
      name: "Hajj",
      english: "Pilgrimage to Makkah",
      icon: Users,
      badgeColor: "from-cyan-500/20 to-teal-600/20 text-cyan-400 border-cyan-500/30",
      desc: "Performing the sacred pilgrimage to the Holy Kaaba in Makkah at least once in a lifetime for those who are physically and financially capable.",
      significance: "The ultimate journey of return to the origins of Abrahamic faith. Hajj unites millions of believers from every corner of the globe in identical white garments, erasing all worldly distinctions of wealth, race, and royalty in a breathtaking rehearsal of the Day of Standing before Allah.",
      reflection: "Hajj is the journey of a lifetime that mirrors our eternal journey back to God. Wearing two simple unstitched cloths reminds me of my mortal simplicity and fills me with awe at the universal brotherhood of humanity united in worship.",
      wisdom: "Hajj is a supreme demonstration of universal human equality before God. Millions dress in identical simple white garments (Ihram), erasing distinctions of race, wealth, and status, echoing the assembly of the Day of Judgment.",
      practice: "Even if you haven't performed Hajj yet, learn the history of Prophet Ibrahim (AS) and Hajar (AS) to understand the profound symbolism of sacrifice and trust in Allah.",
      qalbiyaIntegration: "Our Seerah masterclasses walk students step by step through the Farewell Pilgrimage of the Prophet ﷺ and its enduring lessons for humanity."
    }
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
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
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

            <button
              onClick={() => onNavigate('asma-ul-husna')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#23181A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-white/20"
            >
              <span>Explore Asma Ul Husna (99 Names)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
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
            <Compass className="w-3.5 h-3.5 animate-pulse" />
            <span>Core Fundamentals of Faith</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            The Five Pillars of Islam
            <span className="block text-xl sm:text-2xl md:text-3xl text-[#D4AF37] font-serif italic mt-2 font-normal">
              The Anchor of a Believer's Heart & Action
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#EAD5D8]/90 leading-relaxed max-w-2xl mx-auto">
            Every Qalbiya educational program is built around these five sacred pillars—connecting outward devotion with inward tranquility and character transformation.
          </p>

          {/* Hadith Quote Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden">
            <p className="relative z-10 font-serif text-base sm:text-lg text-[#fdf5e9] italic leading-relaxed">
              "Islam is built upon five pillars: testifying that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah, establishing regular prayer, paying zakat, making the pilgrimage to the House, and fasting in Ramadan."
            </p>
            <span className="block text-xs text-[#D4AF37] font-mono mt-3 font-bold uppercase tracking-widest">— Prophet Muhammad ﷺ [Sahih Bukhari & Muslim]</span>
          </div>
        </motion.div>

        {/* Interactive Pillars Accordion & Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-white">Explore Each Pillar</h3>
            <p className="text-xs text-[#EAD5D8]/70">Click any pillar card below to uncover its spiritual wisdom and daily practice recommendations.</p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {pillarsOfIslam.map((pillar, index) => {
              const isSelected = activePillar === pillar.id;
              const IconComp = pillar.icon;
              return (
                <motion.div 
                  key={pillar.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.12, type: "spring", stiffness: 90, damping: 15 }}
                  className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isSelected 
                      ? 'border-[#D4AF37] bg-slate-900/95 shadow-2xl ring-1 ring-[#D4AF37]/30' 
                      : 'border-white/15 bg-slate-900/60 hover:bg-slate-900/90 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <button
                    onClick={() => setActivePillar(isSelected ? null : pillar.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors cursor-pointer"
                    id={`pillar-standalone-trigger-${pillar.id}`}
                  >
                    <div className="flex items-center space-x-5 sm:space-x-8">
                      {/* Number Bullet */}
                      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-mono font-bold shrink-0 transition-all duration-300 shadow-md ${
                        isSelected ? 'bg-gradient-to-br from-[#D4AF37] to-[#B38F26] text-[#23181A] scale-110' : 'bg-white/10 border border-white/20 text-[#D4AF37]'
                      }`}>
                        0{pillar.id}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="font-serif font-bold text-xl sm:text-2xl text-white">{pillar.name}</span>
                          <span className="text-sm sm:text-base text-[#D4AF37] font-medium font-serif">({pillar.english})</span>
                        </div>
                        <span className="text-xs font-mono tracking-widest text-[#EAD5D8]/60 uppercase flex items-center gap-1.5 mt-1">
                          <IconComp className="w-3.5 h-3.5 text-[#D4AF37]" /> Pillar {pillar.id} of Islam
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <span className="font-serif text-2xl sm:text-4xl text-[#D4AF37] font-bold opacity-90 hidden md:inline">
                        {pillar.arabic}
                      </span>
                      <div className={`p-2.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-[#D4AF37] text-[#23181A] rotate-90 shadow-md' : 'bg-white/5 text-white/60 hover:text-white'}`}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="px-6 sm:px-8 pb-8 pt-4 space-y-6 text-sm text-[#fdf5e9]/90 border-t border-[#D4AF37]/20 bg-slate-950/60">
                          
                          {/* Core Description & Significance */}
                          <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-transparent border-l-4 border-[#D4AF37]">
                            <span className="text-[#D4AF37] font-mono font-bold uppercase tracking-wider block text-xs flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 shrink-0" /> Significance & Core Meaning
                            </span>
                            <p className="leading-relaxed font-serif text-base sm:text-lg text-white font-medium">
                              {pillar.significance || pillar.desc}
                            </p>
                          </div>

                          {/* Spiritual Reflection Block */}
                          <div className="p-6 rounded-2xl bg-[#78122B]/25 border border-[#EAB1BB]/30 shadow-lg relative overflow-hidden space-y-2">
                            <div className="flex items-center gap-2 text-[#EAB1BB] font-mono font-bold uppercase tracking-widest text-xs">
                              <Quote className="w-4 h-4 text-[#D4AF37] shrink-0" />
                              <span>Spiritual Reflection</span>
                            </div>
                            <p className="font-serif text-sm sm:text-base text-[#fdf5e9] italic leading-relaxed pl-6 border-l-2 border-[#D4AF37]/60">
                              "{pillar.reflection}"
                            </p>
                          </div>

                          {/* Two Columns of Daily Action & Integration */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                            {/* Box 1: Practical Daily Action */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                              <span className="text-emerald-400 font-mono font-bold uppercase tracking-wider block text-xs flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Actionable Daily Practice
                              </span>
                              <p className="text-xs sm:text-sm text-[#EAD5D8]/90 leading-relaxed font-serif">
                                {pillar.practice}
                              </p>
                            </div>

                            {/* Box 2: Qalbiya Integration */}
                            <div className="p-5 rounded-2xl bg-[#78122B]/20 border border-[#78122B]/40 space-y-2">
                              <span className="text-[#EAB1BB] font-mono font-bold uppercase tracking-wider block text-xs flex items-center gap-1.5">
                                <Book className="w-3.5 h-3.5 shrink-0" /> How We Teach This
                              </span>
                              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-serif">
                                {pillar.qalbiyaIntegration}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            {onNavigate && (
                              <button
                                onClick={() => onNavigate('women')}
                                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
                              >
                                <span>Study this pillar in our Academy programs →</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#78122B] via-[#630E23] to-[#78122B] border border-white/15 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 max-w-xl mx-auto relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to Live Your Faith with Purpose?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Our structured online courses integrate these five sacred pillars into daily habits and heart-centered reflection with personal guidance from certified female scholars.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {onNavigate && (
              <>
                <button
                  onClick={() => onNavigate('women')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#78122B] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors shadow-md cursor-pointer"
                >
                  Explore Women's Programs →
                </button>
                <button
                  onClick={() => onNavigate('kids')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors shadow-md cursor-pointer"
                >
                  Explore Kids' Academy →
                </button>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
