import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Heart, Sparkles, ArrowRight, Book, GraduationCap, Video, FileText, Globe, CheckCircle2, Users, Quote, Laptop, Calendar, Clock, Compass, RotateCw } from 'lucide-react';
import { Course, Route } from '../types';
import founderWorkspace from '../assets/images/founder_workspace_1784048720294.jpg';
import womensOnlineStudy from '../assets/images/womens_online_study_1784048690815.jpg';
import kidsOnlineStudyGen from '../assets/images/kids_online_study_1784048706942.jpg';
import sacredLearningApproach from '../assets/images/sacred_learning_approach_1784016791330.jpg';
import quranRehalArchedWindow from '../assets/images/quran_rehal_arched_window_1784016809949.jpg';
import onlineLearningTablet from '../assets/images/online_learning_tablet_1784039716228.jpg';
import heroLearningSetup from '../assets/images/hero_learning_setup_1784226560154.jpg';

interface HomepageProps {
  courses: Course[];
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars' | 'all') => void;
  onSelectCourse: (slug: string) => void;
}

interface ProgramFlipCardProps {
  category: 'women' | 'kids';
  title: string;
  badgeText: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  onNavigate: () => void;
}

const ProgramFlipCard: React.FC<ProgramFlipCardProps> = ({
  category,
  title,
  badgeText,
  imageSrc,
  imageAlt,
  description,
  highlights,
  ctaLabel,
  onNavigate,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full [perspective:1200px]">
      <motion.div
        className="relative w-full transition-all duration-700 [transform-style:preserve-3d] min-h-[460px] sm:min-h-[440px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* FRONT SIDE OF THE CARD */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer group"
        >
          <div className="space-y-5">
            <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden relative border border-[#E8DDD9]">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/40 to-transparent" />
              <span className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur-sm px-3.5 py-1 text-xs font-mono font-bold text-[#78122B] border border-[#E8DDD9] shadow-xs">
                {badgeText}
              </span>

              {/* Tap to Flip Badge */}
              <div 
                className="absolute bottom-3 right-3 rounded-full bg-[#78122B] text-white px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md border border-white/20"
              >
                <RotateCw className="w-3 h-3 text-[#F3D797]" />
                <span>Tap to Flip 🔄</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-[#23181A]">{title}</h3>
                <span className="text-[10px] font-mono font-bold text-[#78122B] bg-[#F9E8EC] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Interactive Card
                </span>
              </div>
              <p className="text-sm text-[#5C4D50] leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate();
              }}
              className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-[#78122B] text-white py-3.5 text-xs font-semibold tracking-wider uppercase hover:bg-[#630E23] transition-all cursor-pointer shadow-xs"
            >
              <span>{ctaLabel} →</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="px-4 py-3.5 rounded-lg border border-[#E8DDD9] bg-[#FAF8F5] hover:bg-[#F9E8EC] text-[#78122B] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold"
              title="Flip card for highlights"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flip Details</span>
            </button>
          </div>
        </div>

        {/* BACK SIDE OF THE CARD */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#FAF8F5] border-2 border-[#78122B]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg cursor-pointer"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD9]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
                  {badgeText} Highlights
                </span>
                <h3 className="font-serif text-xl font-bold text-[#23181A]">{title}</h3>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#E8DDD9] text-[#78122B] hover:bg-[#F9E8EC] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Back</span>
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7A7E] block">
                What you will experience:
              </span>
              <ul className="space-y-2 text-xs text-[#23181A]">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E8DDD9] shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#78122B] shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate();
              }}
              className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-[#78122B] text-white py-3.5 text-xs font-semibold tracking-wider uppercase hover:bg-[#630E23] transition-all cursor-pointer shadow-xs"
            >
              <span>{ctaLabel} →</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="p-3.5 rounded-lg border border-[#E8DDD9] bg-white text-[#5C4D50] hover:text-[#78122B] transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title="Flip card back"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Homepage: React.FC<HomepageProps> = ({ courses, onNavigate, onSelectCourse }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'kids'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const handleStartJourneyClick = () => {
    const element = document.getElementById('academic-paths');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('women');
    }
  };

  const testimonies = [
    {
      text: "Ms. Mustara created a space so warm and gentle that I actually looked forward to making mistakes because of how lovingly she guided me to fix them. My recitation has completely changed.",
      author: "Sister Aisha, Delhi",
      course: "Tajweed 1:1 Graduate"
    },
    {
      text: "The storyteller style and emphasis on loving Allah has changed our home. My 8-year-old son now reads his daily duas entirely on his own without any reminders.",
      author: "Suhail, Parent of Farhan",
      course: "Kids' Deeniyat Graduate"
    },
    {
      text: "The Seerat-un-Nabi course was a defining chapter of my life. It brought immense positivity, teaching me the true purpose of living by showing how the Prophet ﷺ faced every hardship with beautiful patience (sabr). It's a true life-changer that connects your heart to Allah.",
      author: "Sadaf Khurshid",
      course: "Seerat un Nabi Graduate"
    },
    {
      text: "Alhamdulillah, this course has completely transformed my life. It didn't just teach us the Seerah; Ms. Mustara taught us how to implement it. My character (akhlaq) has improved, my trust (tawakkul) in Allah has deepened, and I now face hardships with patience (sabr), knowing that ease always follows difficulty.",
      author: "Raukaia Khatoon",
      course: "Seerat un Nabi Graduate"
    },
    {
      text: "This was not a history class — it was a spiritual hospital. It reshaped my marriage, my parenting, and how I treat my parents. I finally understand what character (akhlaq) means.",
      author: "Sister Maryam, London",
      course: "Seerah Course Graduate"
    }
  ];

  const flagshipCourses = [
    {
      slug: 'seerah-course',
      title: 'Seerah of Prophet ﷺ Course',
      category: 'women',
      categoryLabel: "Women's Courses",
      badge: 'Popular — Joined by 50+ students',
      badgeColor: 'bg-[#F9E8EC] text-[#78122B]',
      tag: 'Live Online',
      desc: 'A deep, reflective journey into the beautiful character, mercy, and daily life of the Prophet ﷺ to inspire your personal spiritual transformation.',
      duration: '2 Months',
      format: 'Group Interactive Sessions',
      price: 'Rs. 299',
      priceDetail: 'full course',
      icon: Heart,
      image: sacredLearningApproach,
    },
    {
      slug: 'tajweed-1-1',
      title: 'Tajweed 1:1 Classes',
      category: 'women',
      categoryLabel: "Women's Courses",
      badge: 'Popular',
      badgeColor: 'bg-[#F9E8EC] text-[#78122B]',
      tag: 'Live Online',
      desc: "One-on-one Tajweed classes designed around your pace, your pronunciation, and your journey to reciting the Qur'an with confidence and correctness.",
      duration: '5 Months',
      format: '1-on-1 Personalized Session',
      price: 'Rs. 800',
      priceDetail: 'per month',
      icon: BookOpen,
      image: quranRehalArchedWindow,
    },
    {
      slug: 'noorani-qaida',
      title: 'Noorani Qaida Course',
      category: 'women',
      categoryLabel: "Women's Courses",
      badge: 'Popular — Joined by 200+ students',
      badgeColor: 'bg-[#F9E8EC] text-[#78122B]',
      tag: 'Live Online',
      desc: "Learn the Arabic letters and Noorani Qaida with proper foundational Tajweed rules — the essential first step to reading the Qur'an with confidence.",
      duration: '2 Months',
      format: "Group Sessions or 1-on-1 (Student's choice)",
      price: 'Rs. 299',
      priceDetail: 'per month',
      icon: Book,
      image: womensOnlineStudy,
    },
    {
      slug: 'pre-diploma-deeniyat',
      title: 'Pre-Diploma in Deeniyat',
      category: 'women',
      categoryLabel: "Women's Courses",
      badge: 'Popular',
      badgeColor: 'bg-[#F9E8EC] text-[#78122B]',
      tag: 'Live Online',
      desc: "A structured, six-month journey covering everything from correcting your recitation to understanding your beliefs — so you don't just follow Islam, you understand it, live it, and feel closer to Allah.",
      duration: '6 Months',
      format: 'Group Interactive Sessions or Personal (1-on-1)',
      price: 'Rs. 499',
      priceDetail: 'per month',
      icon: Sparkles,
      image: heroLearningSetup,
    },
    {
      slug: 'juniors-deeniyat-mastercourse',
      title: 'Juniors Deeniyat Mastercourse',
      category: 'kids',
      categoryLabel: "Kids' Courses",
      badge: 'Flagship Program',
      badgeColor: 'bg-[#E2F0D9] text-[#2E6B38]',
      tag: 'Live Online',
      desc: "A structured, age-appropriate program for children ages 6–12 — covering Qur'an, Seerah, Sahaba, daily sunnah, and akhlaq, so your child doesn't just learn Islam, they grow up loving it.",
      duration: '1.5–2 Years',
      format: 'Private (1-on-1) or Group Classes',
      price: 'Rs. 600',
      priceDetail: 'per month',
      icon: GraduationCap,
      image: kidsOnlineStudyGen,
    },
    {
      slug: 'noorani-qaida-kids',
      title: "Noorani Qaida (Kids')",
      category: 'kids',
      categoryLabel: "Kids' Courses",
      badge: 'Foundation Path',
      badgeColor: 'bg-[#E2F0D9] text-[#2E6B38]',
      tag: 'Live Online',
      desc: "A gentle, structured introduction to the Arabic letters and Noorani Qaida — helping your child begin their Qur'an journey with a strong, correct foundation.",
      duration: '4–5 Months',
      format: '1-on-1 Private Sessions',
      price: 'Rs. 500',
      priceDetail: 'per month',
      icon: BookOpen,
      image: onlineLearningTablet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#23181A] space-y-20 pb-24 transition-colors duration-300">
      
      {/* SECTION 1 — Hero Section (Matching Mockup Layout with Animated Background) */}
      <section className="relative overflow-hidden pt-16 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center" id="hero-section">
        {/* Animated Background Canvas */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Animated Gradient Blob 1 - Top Left Burgundy Glow */}
          <motion.div
            className="absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#78122B]/20 via-[#78122B]/10 to-transparent blur-3xl"
            animate={{
              x: [0, 40, -20, 0],
              y: [0, 30, -10, 0],
              scale: [1, 1.25, 1.1, 1],
              opacity: [0.6, 0.9, 0.7, 0.6],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Gradient Blob 2 - Bottom Right Golden Warm Glow */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-tl from-[#D4AF37]/25 via-[#F3D797]/20 to-transparent blur-3xl"
            animate={{
              x: [0, -50, 20, 0],
              y: [0, -40, 10, 0],
              scale: [1, 1.3, 0.95, 1],
              opacity: [0.5, 0.85, 0.6, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Gradient Blob 3 - Center Light Ambient Aura */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-[#FAF8F5] radial-gradient blur-2xl opacity-80"
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rotating Geometric 8-Point Star Accents */}
          <motion.div
            className="absolute top-12 left-[10%] opacity-20 text-[#78122B]"
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
              <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-12 right-[12%] opacity-25 text-[#D4AF37]"
            animate={{ rotate: -360, y: [0, 20, 0] }}
            transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
              <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="0.8" fill="none" />
            </svg>
          </motion.div>

          {/* Floating Light Sparkles / Floating Dust Particles */}
          {[
            { top: "20%", left: "25%", size: 6, delay: 0, duration: 4 },
            { top: "65%", left: "18%", size: 8, delay: 1, duration: 5 },
            { top: "30%", left: "78%", size: 7, delay: 2, duration: 4.5 },
            { top: "75%", left: "82%", size: 5, delay: 0.5, duration: 6 },
            { top: "15%", left: "60%", size: 8, delay: 1.5, duration: 5.5 },
          ].map((particle, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full bg-gradient-to-r from-[#D4AF37] to-[#78122B] shadow-xs"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Subtle Grid Accent Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#78122B_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Main Headline */}
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#23181A] leading-[1.15]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Knowledge that reaches the heart. <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#78122B]">Amal is what changes lives.</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            className="text-base sm:text-lg text-[#5C4D50] max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Qalbiya Islamic Institute provides a rigorous academic environment for the study of classical theology, jurisprudence, and spiritual refinement.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartJourneyClick}
              className="w-full sm:w-auto bg-[#78122B] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#630E23] transition-colors shadow-md cursor-pointer"
              id="hero-cta-explore"
            >
              Explore Our Curriculum
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto border border-[#78122B] text-[#78122B] bg-white/80 backdrop-blur-sm px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#78122B]/5 transition-colors cursor-pointer shadow-xs"
              id="hero-cta-method"
            >
              Learn Our Method
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2 — Hadith Callout Banner (Matching Mockup) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto shadow-xs text-center space-y-4">
          {/* Arabic Calligraphy */}
          <h2 className="font-serif text-3xl sm:text-4xl text-[#78122B] font-normal tracking-wide">
            إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
          </h2>

          {/* Translation */}
          <p className="text-sm sm:text-base text-[#5C4D50] italic font-serif leading-relaxed max-w-xl mx-auto">
            "Actions are but by intentions, and every man shall have only that which he intended."
          </p>

          {/* Source Attribution */}
          <p className="text-xs text-[#8C7A7E] font-mono tracking-widest uppercase pt-1">
            - Sahih al-Bukhari
          </p>
        </div>
      </section>

      {/* SECTION 3 — Split-Path Section with 3D Flip Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="split-path-section">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#8C7A7E] flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Your Personal Direction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23181A]">
            Wherever you are in your journey, there's a path for your heart here.
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7A7E]">
            💡 <span className="font-semibold text-[#78122B]">Pro-Tip:</span> Tap or click cards below to flip and explore program highlights!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Women's Programs Flip Card */}
          <ProgramFlipCard
            category="women"
            title="Women's Programs"
            badgeText="For You"
            imageSrc={womensOnlineStudy}
            imageAlt="Women studying online via laptop"
            description="Rebuild your relationship with Allah, one honest step at a time. Designed with sisterhood, patience, and direct teacher connection."
            highlights={[
              "1:1 & Small Group Tajweed recitations with gentle guidance",
              "Heart-centered Seerah of the Prophet ﷺ & Spiritual Refinement",
              "Classical Deeniyat & Fiqh for everyday practical living",
              "Safe, confidential sisterhood-first space over Google Meet"
            ]}
            ctaLabel="Explore Women's Programs"
            onNavigate={() => onNavigate('women')}
          />

          {/* Kids' Programs Flip Card */}
          <ProgramFlipCard
            category="kids"
            title="Kids' Programs"
            badgeText="For Them"
            imageSrc={kidsOnlineStudyGen}
            imageAlt="Young learner with online tablet class"
            description="Raise a child who loves their deen, not just knows it. Highly interactive classes using beautiful stories, game dynamics, and deep positive reinforcement."
            highlights={[
              "Interactive Noorani Qaida & correct Quranic pronunciation",
              "Engaging Seerah stories, Islamic history, & daily sunnah duas",
              "Age-appropriate pedagogy (Ages 6–12) with positive reinforcement",
              "Small group batches or 1-on-1 private instruction"
            ]}
            ctaLabel="Explore Kids' Programs"
            onNavigate={() => onNavigate('kids')}
          />
        </div>
      </section>

      {/* SECTION 4 — Social Proof Strip & Infinite Horizontal Auto-Scrolling Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="social-proof-section">
        <div className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl py-10 px-4 sm:px-8 text-center space-y-8 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B] flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Trusted globally
            </span>
            <span className="hidden sm:inline text-[#E8DDD9] font-bold">|</span>
            <span className="text-sm sm:text-base font-medium text-[#23181A]">
              Trusted by <span className="text-[#78122B] font-bold">300+ students</span> on their journey back to their deen.
            </span>
          </div>

          {/* Continuous Auto-scrolling Testimonials Carousel */}
          <div className="relative w-full overflow-hidden py-3" id="testimonial-carousel">
            {/* Left/Right Fading Edge Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

            {/* Moving Track */}
            <motion.div
              className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...testimonies, ...testimonies].map((testimony, idx) => (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[380px] shrink-0 bg-[#FAF8F5] border border-[#E8DDD9] rounded-xl p-6 relative flex flex-col justify-between space-y-4 hover:border-[#78122B]/50 hover:shadow-md transition-all duration-300 text-left"
                >
                  <Quote className="absolute top-4 right-4 w-5 h-5 text-[#78122B]/15" />
                  <p className="text-xs sm:text-sm italic text-[#5C4D50] leading-relaxed relative z-10">
                    "{testimony.text}"
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-[#E8DDD9] text-[11px] mt-auto">
                    <span className="font-bold text-[#23181A]">{testimony.author}</span>
                    <span className="font-mono font-semibold text-[#78122B] uppercase tracking-wider text-[10px] bg-[#F9E8EC] px-2 py-0.5 rounded">
                      {testimony.course}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-[11px] font-mono text-[#8C7A7E] flex items-center justify-center gap-1.5">
            <span>✨</span> <span>Auto-scrolling continuous carousel &bull; Hover or touch to pause</span>
          </p>
        </div>
      </section>

      {/* SECTION 5 — Flagship Spotlights / Featured Core Curriculums */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24" id="academic-paths">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B] flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 fill-current text-[#78122B]" /> Flagship Spotlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23181A]">
            Featured Core Curriculums
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4D50]">
            Choose a path suited to you or your children
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center pb-2">
          <div className="inline-flex p-1 bg-[#FDFBF7] border border-[#E8DDD9] rounded-xl shadow-xs">
            {[
              { id: 'all', label: 'All courses' },
              { id: 'women', label: "Women's courses" },
              { id: 'kids', label: "Kids' courses" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'women' | 'kids')}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#78122B] text-white shadow-xs'
                    : 'text-[#5C4D50] hover:text-[#23181A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            {flagshipCourses
              .filter((c) => activeTab === 'all' || c.category === activeTab)
              .map((course) => {
                const IconComponent = course.icon;
                return (
                  <motion.div
                    layout
                    key={course.slug}
                    className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-[#78122B]/50"
                  >
                    {/* Course Image Header */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#FAF8F5] border-b border-[#E8DDD9]">
                      <img
                        src={course.image}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/60 via-transparent to-transparent" />
                      
                      {/* Top Overlay: Category & Tag */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#E8DDD9] shadow-xs">
                          {course.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 rounded-full bg-[#23181A]/85 backdrop-blur-sm px-2.5 py-1 text-white border border-white/20 shadow-xs">
                          <Laptop className="w-3 h-3 text-[#F3D797]" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#F3D797]">{course.tag}</span>
                        </div>
                      </div>

                      {/* Bottom Overlay: Badge */}
                      {course.badge && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs border border-white/30 ${course.badgeColor}`}>
                            {course.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col justify-between flex-1 space-y-5">
                      <div className="space-y-3">
                        <h3 className="font-serif text-xl font-bold text-[#23181A] group-hover:text-[#78122B] transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed line-clamp-3 font-medium">
                          {course.desc}
                        </p>

                        {/* Quick Facts */}
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E8DDD9] text-xs text-[#5C4D50]">
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#78122B] shrink-0" />
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 truncate">
                            <Calendar className="w-3.5 h-3.5 text-[#78122B] shrink-0" />
                            <span className="truncate font-medium">{course.format}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Investment & Action Button */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A7E]">Investment</span>
                          <span className="text-sm font-bold text-[#23181A]">
                            {course.price} <span className="text-[10px] font-normal text-[#5C4D50]">/{course.priceDetail}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            onSelectCourse(course.slug);
                            onNavigate('course-detail');
                          }}
                          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-lg bg-[#78122B] text-white text-xs font-semibold tracking-wide hover:bg-[#630E23] transition-colors shadow-xs cursor-pointer group-hover:bg-[#630E23]"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </section>



      {/* SECTION 5 — Closing Maroon CTA Banner (Matching Mockup) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center" id="scholarly-journey-cta">
        <div className="bg-[#78122B] text-white rounded-2xl p-10 sm:p-16 space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Begin Your Scholarly Journey
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Join over 5,000 students worldwide in a pursuit of knowledge that transforms the heart and mind.
            </p>
          </div>

          {/* Email Subscription Form */}
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:flex-1 bg-white text-[#23181A] px-4 py-3 rounded-lg text-sm placeholder-[#8C7A7E] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#F3D797] text-[#480117] font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#E2C47E] transition-colors cursor-pointer shrink-0"
            >
              Get Started
            </button>
          </form>

          {isSubscribed && (
            <p className="text-xs text-[#F3D797] font-semibold animate-pulse">
              ✓ Thank you! We will reach out to you with enrollment details.
            </p>
          )}

        </div>
      </section>

    </div>
  );
};
