import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, BookOpen, GraduationCap, Users, Shield, ArrowRight, Star, 
  Check, MessageCircle, Sparkles, Quote, HelpCircle, ChevronDown, 
  Compass, Lightbulb, Sun, Award, Globe, Phone, Mail, Instagram,
  ChevronRight, ChevronLeft, Laptop, Tablet, Smartphone
} from 'lucide-react';
import { Course, Route } from '../types';
import { CourseCard } from './CourseCard';
import makkahBackground from '../assets/images/makkah_background_1784048674395.jpg';
import womensOnlineStudy from '../assets/images/womens_online_study_1784048690815.jpg';
import kidsOnlineStudyGen from '../assets/images/kids_online_study_1784048706942.jpg';
import heroLearningSetup from '../assets/images/hero_learning_setup_1784226560154.jpg';
import heroQuranSeerahBooks from '../assets/images/hero_quran_seerah_books_1785067645819.jpg';

interface HomepageProps {
  courses: Course[];
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars' | 'all') => void;
  onSelectCourse: (slug: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ 
  courses, 
  onNavigate, 
  onSelectCourse 
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<'asma-ul-husna' | 'pillars'>('asma-ul-husna');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialsHovered, setIsTestimonialsHovered] = useState(false);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTestimonialsHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => {
        const nextIndex = (prev + 1) % 4; // testimonies.length = 4
        if (testimonialScrollRef.current) {
          const firstChild = testimonialScrollRef.current.children[0] as HTMLElement;
          const cardWidth = firstChild ? firstChild.offsetWidth : 380;
          const gap = 24;
          testimonialScrollRef.current.scrollTo({
            left: nextIndex * (cardWidth + gap),
            behavior: 'smooth'
          });
        }
        return nextIndex;
      });
    }, 2500); // 2.5 seconds gap

    return () => clearInterval(interval);
  }, [isTestimonialsHovered]);

  const scrollToTestimonial = (index: number) => {
    setActiveTestimonialIndex(index);
    if (testimonialScrollRef.current) {
      const firstChild = testimonialScrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth : 380;
      const gap = 24;
      testimonialScrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setPhoneSubmitted(true);
    setPhoneNumber('');
    setTimeout(() => setPhoneSubmitted(false), 5000);
  };

  // Sample Names of Allah (4 preview cards)
  const namesOfAllahPreview = [
    {
      arabic: 'الرَّحْمَٰنُ',
      transliteration: 'Ar Rahman',
      meaning: 'The Most Gracious',
      reflection: 'His mercy encompasses all creation before any asking occurs.',
    },
    {
      arabic: 'الرَّحِيمُ',
      transliteration: 'Ar Raheem',
      meaning: 'The Especially Merciful',
      reflection: 'His specific, intimate mercy saved for those who turn to Him in faith.',
    },
    {
      arabic: 'الْوَدُودُ',
      transliteration: 'Al Wadud',
      meaning: 'The Most Loving',
      reflection: 'He loves His righteous servants and fills their hearts with divine affection.',
    },
    {
      arabic: 'الَسَّلَامُ',
      transliteration: 'As Salam',
      meaning: 'The Source of Peace',
      reflection: 'The One who grants true tranquility and safety from all distress.',
    },
  ];

  // Pillars preview (5 cards)
  const pillarsPreview = [
    { number: '1', title: 'Shahada', desc: 'Faith & Monotheism in Allah & His Messenger ﷺ' },
    { number: '2', title: 'Salah', desc: 'Daily 5 Prayers - Direct link to the Creator' },
    { number: '3', title: 'Zakat', desc: 'Purification of Wealth through charity' },
    { number: '4', title: 'Sawm', desc: 'Fasting in Ramadan for Taqwa' },
    { number: '5', title: 'Hajj', desc: 'Pilgrimage to the Sacred House' },
  ];

  const testimonies = [
    {
      quote: "Ms. Mustara created a space so warm and gentle that I actually looked forward to making mistakes because of how lovingly she guided me to fix them. My recitation has completely changed.",
      name: "Sister Aisha M.",
      role: "Tajweed 1 on 1 Student",
      highlight: "Heart-Centered Guidance"
    },
    {
      quote: "The storyteller style and emphasis on loving Allah has changed our home. My 8-year-old son now reads his daily duas entirely on his own without any reminders.",
      name: "Suhail A.",
      role: "Parent of Deeniyat Student",
      highlight: "Home Transformation"
    },
    {
      quote: "The Seerah course was a defining chapter of my life. It brought immense positivity, teaching me the true purpose of living by showing how the Prophet ﷺ faced every hardship with beautiful patience.",
      name: "Sadaf Khurshid",
      role: "Seerah Student",
      highlight: "Life-Changing Perspective"
    },
    {
      quote: "This course didn't just teach us the Seerah; Ms. Mustara taught us how to implement it. My character (akhlaq) has improved and my trust in Allah has deepened.",
      name: "Raukaia Khatoon",
      role: "Seerah Student",
      highlight: "Practical Implementation"
    }
  ];

  const faqs = [
    {
      q: "Are classes live or pre recorded?",
      a: "All our classes are held LIVE online via Google Meet or Zoom, ensuring real time personal feedback, direct student teacher interaction, and active recitation corrections."
    },
    {
      q: "What if I miss a live session?",
      a: "Class recordings, notes, and study slides are uploaded to your dedicated student portal within 24 hours so you can easily catch up on your own schedule."
    },
    {
      q: "How are classes structured for children?",
      a: "Kids' classes are short (30 to 45 minutes), interactive, and engaging. We focus on storytelling, visual aids, positive reinforcement, and gentle encouragement to foster a true love for Islam."
    },
    {
      q: "Is financial aid or scholarship available?",
      a: "Yes! We firmly believe sacred knowledge should never be out of reach. We offer flexible instalment plans and full or partial financial aid through our Qalbiya Scholarship Fund."
    },
    {
      q: "Can I take a 1 on 1 trial class before enrolling?",
      a: "Absolutely. You can schedule a complimentary 1 on 1 evaluation and trial session to experience our teaching methodology firsthand."
    }
  ];

  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#23181A] transition-colors duration-300 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Canvas & Image Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Animated Background Image Layer (Ken Burns Effect) */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.80, 0.95, 0.80],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src={heroQuranSeerahBooks} 
              alt="Open Holy Quran on rehal stand surrounded by Tajweed, Seerah, and classical Islamic study books" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
            />
          </motion.div>

          {/* Soft Tint Overlay for Perfect Contrast & Legibility while keeping image clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/50 via-[#FAF8F5]/30 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px]" />

          {/* Animated Gradient Blob 1 - Top Left Burgundy Glow */}
          <motion.div
            className="absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#78122B]/20 via-[#78122B]/10 to-transparent blur-3xl"
            animate={{
              x: [0, 40, -20, 0],
              y: [0, 30, -10, 0],
              scale: [1, 1.25, 1.1, 1],
              opacity: [0.5, 0.8, 0.6, 0.5],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Gradient Blob 2 - Bottom Right Golden Warm Glow */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-tl from-[#D4AF37]/20 via-[#F3D797]/15 to-transparent blur-3xl"
            animate={{
              x: [0, -50, 20, 0],
              y: [0, -40, 10, 0],
              scale: [1, 1.3, 0.95, 1],
              opacity: [0.4, 0.75, 0.5, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Gradient Blob 3 - Subtle Soft Gold Center Aura */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-[#F3D797]/15 to-[#78122B]/10 blur-3xl pointer-events-none"
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle Grid Accent Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#78122B_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

          {/* Main Title & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 pt-4"
          >
            <h1 className="serif-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#23181A] leading-[1.12] tracking-tight">
              Knowledge That Reaches the Heart. <br className="hidden sm:inline" />
              <span className="text-[#78122B] italic">Amal That Changes the Life.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#5C4D50] max-w-2xl mx-auto font-medium leading-relaxed">
              Structured, compassionate, and authentic online Islamic learning tailored for <span className="font-bold text-[#78122B]">Women</span> and <span className="font-bold text-[#2E6B38]">Children</span> worldwide.
            </p>

            {/* Direct Subject Highlights Tag Bar (Tajweed, Seerah, Quran Books) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-semibold text-[#5C4D50]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8DDD9] text-[#78122B] shadow-2xs">
                <BookOpen className="w-3.5 h-3.5" /> Tajweed & Qur'an Recitation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8DDD9] text-[#2E6B38] shadow-2xs">
                <Heart className="w-3.5 h-3.5" /> Seerah of Prophet ﷺ
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8DDD9] text-[#A37B24] shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" /> Classical Deeniyat & Books
              </span>
            </div>
          </motion.div>

          {/* User-Friendly & Authentic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3"
          >
            {/* Women's Hub CTA */}
            <button
              onClick={() => onNavigate('women')}
              className="w-full sm:w-auto max-w-xs sm:max-w-none min-w-[220px] sm:min-w-[250px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#78122B] hover:bg-[#630E23] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group active:scale-98"
              id="hero-btn-women-hub"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D797]" />
              <span>Explore Women's Classes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Kids' Hub CTA */}
            <button
              onClick={() => onNavigate('kids')}
              className="w-full sm:w-auto max-w-xs sm:max-w-none min-w-[220px] sm:min-w-[250px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#2E6B38] hover:bg-[#25572e] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group active:scale-98"
              id="hero-btn-kids-hub"
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D797]" />
              <span>Explore Kids' Tarbiyah</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust Highlights Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-[#5C4D50]"
          >
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#78122B]" />
              <span>Live 1 on 1, Small Group Classes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#78122B]" />
              <span>Female Qualified Teachers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#78122B]" />
              <span>Flexible Global Timings</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 2: Explore Our Sacred Knowledge Hubs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12" id="sacred-hubs">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B]">
            Sacred Paths
          </span>
          <h2 className="serif-heading text-3xl sm:text-4xl font-bold text-[#23181A]">
            Choose Your Learning Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-[#5C4D50]">
            Dedicated programs designed specifically for the unique spiritual and learning needs of women and children.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Women's Programs Card */}
          <div className="bg-white rounded-3xl border border-[#E8DDD9] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#78122B] transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-64 overflow-hidden border-b border-[#E8DDD9]">
              <img 
                src={womensOnlineStudy} 
                alt="Women's Programs" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/60 via-[#23181A]/20 to-transparent" />
              
              <span className="absolute top-4 left-4 rounded-full bg-[#78122B] text-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                For Women
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="serif-heading text-2xl font-bold text-[#23181A] group-hover:text-[#78122B] transition-colors">
                  Women's Sacred Learning Hub
                </h3>
                <p className="text-sm text-[#5C4D50] leading-relaxed">
                  Deepen your connection with the Qur'an, refine your tajweed, explore the Seerah, and build foundational Islamic knowledge in a supportive, female-led environment.
                </p>
                <ul className="text-xs text-[#5C4D50] space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#78122B] shrink-0" />
                    <span>Seerat-un-Nabi & Character Transformation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#78122B] shrink-0" />
                    <span>Personalized 1 on 1, Tajweed & Quran Recitation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#78122B] shrink-0" />
                    <span>Comprehensive Pre Diploma in Deeniyat</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E8DDD9]">
                <button
                  onClick={() => onNavigate('women')}
                  className="w-full inline-flex h-12 items-center justify-center rounded-xl bg-[#78122B] hover:bg-[#630E23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group/btn gap-2"
                  id="hub-card-btn-women"
                >
                  <span>Explore Women's Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Kids' Programs Card */}
          <div className="bg-white rounded-3xl border border-[#E8DDD9] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2E6B38] transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-64 overflow-hidden border-b border-[#E8DDD9]">
              <img 
                src={kidsOnlineStudyGen} 
                alt="Kids' Programs" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/60 via-[#23181A]/20 to-transparent" />
              
              <span className="absolute top-4 left-4 rounded-full bg-[#2E6B38] text-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                For Kids (Ages 6 to 12)
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="serif-heading text-2xl font-bold text-[#23181A] group-hover:text-[#2E6B38] transition-colors">
                  Kids' Tarbiyah Learning Hub
                </h3>
                <p className="text-sm text-[#5C4D50] leading-relaxed">
                  Interactive, loving, and story driven classes designed to nurture a strong Islamic identity, excellent manners (Akhlaq), and fluent Quranic reading for young minds.
                </p>
                <ul className="text-xs text-[#5C4D50] space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B38] shrink-0" />
                    <span>Juniors Deeniyat Mastercourse (Multi Year)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B38] shrink-0" />
                    <span>Interactive Noorani Qaida & Phonetics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B38] shrink-0" />
                    <span>Engaging Stories of Prophets & Sahaba</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E8DDD9]">
                <button
                  onClick={() => onNavigate('kids')}
                  className="w-full inline-flex h-12 items-center justify-center rounded-xl bg-[#2E6B38] hover:bg-[#25572e] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group/btn gap-2"
                  id="hub-card-btn-kids"
                >
                  <span>Explore Kids' Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Featured Programs Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12" id="featured-courses">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B]">
              Structured Curriculums
            </span>
            <h2 className="serif-heading text-3xl sm:text-4xl font-bold text-[#23181A]">
              Featured Learning Programs
            </h2>
            <p className="text-sm text-[#5C4D50]">
              Handcrafted courses taught by female teachers with love, patience, and sound knowledge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('women')}
              className="text-xs font-bold text-[#78122B] hover:underline cursor-pointer"
            >
              Women's Hub →
            </button>
            <span className="text-[#E8DDD9]">|</span>
            <button
              onClick={() => onNavigate('kids')}
              className="text-xs font-bold text-[#2E6B38] hover:underline cursor-pointer"
            >
              Kids' Hub →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      </section>

      {/* Section 5: Why Qalbiya Institute (Sacred Journey) */}
      <section className="bg-white border-y border-[#E8DDD9] py-16 sm:py-24" id="why-qalbiya">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B]">
              Our Methodology
            </span>
            <h2 className="serif-heading text-3xl sm:text-4xl font-bold text-[#23181A]">
              Knowledge That Transforms The Heart
            </h2>
            <p className="text-sm text-[#5C4D50]">
              We go beyond memorization — cultivating true love for Allah and His Messenger ﷺ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8DDD9] p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="serif-heading text-xl font-bold text-[#23181A]">Heart-Centered Teaching</h3>
              <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
                Gentle, encouraging instruction that removes fear and builds confidence in recitation and practice.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8DDD9] p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="serif-heading text-xl font-bold text-[#23181A]">Safe & Supportive Space</h3>
              <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
                Dedicated female scholars for women, and interactive storytelling environments for kids.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8DDD9] p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="serif-heading text-xl font-bold text-[#23181A]">Authentic & Structured</h3>
              <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
                Progressive curriculums rooted in classical Sunni tradition, adapted for modern learners.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Heartfelt Transformations (Testimonials - Horizontal Auto Scroll) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-10 overflow-hidden" id="testimonials">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9E8EC]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Voices</span>
            </span>
            <h2 className="serif-heading text-3xl sm:text-4xl font-bold text-[#23181A]">
              Heartfelt Transformations
            </h2>
            <p className="text-sm text-[#5C4D50]">
              Hear from sisters and parents who have walked this journey with Qalbiya Institute.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scrollToTestimonial((activeTestimonialIndex - 1 + testimonies.length) % testimonies.length)}
              className="p-3 rounded-full border border-[#E8DDD9] bg-white hover:bg-[#F9E8EC] hover:text-[#78122B] text-[#5C4D50] transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToTestimonial((activeTestimonialIndex + 1) % testimonies.length)}
              className="p-3 rounded-full border border-[#E8DDD9] bg-white hover:bg-[#F9E8EC] hover:text-[#78122B] text-[#5C4D50] transition-colors shadow-2xs cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with cards */}
        <div 
          className="relative"
          onMouseEnter={() => setIsTestimonialsHovered(true)}
          onMouseLeave={() => setIsTestimonialsHovered(false)}
        >
          <div 
            ref={testimonialScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonies.map((item, index) => (
              <div 
                key={index}
                className={`snap-start shrink-0 w-[88vw] sm:w-[460px] bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs hover:shadow-xl ${
                  activeTestimonialIndex === index ? 'border-[#78122B] ring-2 ring-[#78122B]/10' : 'border-[#E8DDD9]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-[#78122B]/40" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#78122B] bg-[#F9E8EC] px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#23181A] italic leading-relaxed font-serif">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DDD9] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#78122B] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-2xs">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#23181A]">{item.name}</h4>
                    <p className="text-xs text-[#5C4D50]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator Bar */}
          <div className="flex justify-center items-center gap-2 pt-6">
            {testimonies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToTestimonial(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeTestimonialIndex === idx 
                    ? 'w-8 bg-[#78122B]' 
                    : 'w-2.5 bg-[#E8DDD9] hover:bg-[#78122B]/40'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Frequently Asked Questions */}
      <section className="bg-white border-y border-[#E8DDD9] py-16 sm:py-24" id="faq-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B]">
              Questions & Answers
            </span>
            <h2 className="serif-heading text-3xl sm:text-4xl font-bold text-[#23181A]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#5C4D50]">
              Everything you need to know about our classes, schedules, and learning environment.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-[#E8DDD9] bg-[#FAF8F5] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#23181A] cursor-pointer"
                    id={`faq-btn-${index}`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#78122B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#5C4D50] leading-relaxed border-t border-[#E8DDD9]/60 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 8: Sacred Guidance Request / Contact Call & Newsletter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16" id="guidance-and-cta">
        <div className="bg-[#78122B] text-white rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-xl relative overflow-hidden">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="serif-heading text-3xl sm:text-4xl font-bold leading-tight">
              Begin Your Journey Back To Deen Today
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium max-w-lg mx-auto leading-relaxed">
              Have questions or need guidance selecting the right program for yourself or your child? Our team is here to assist you with warmth and clarity.
            </p>
          </div>

          {/* Quick Call Back Form */}
          <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div className="relative w-full sm:flex-1">
              <Phone className="w-4 h-4 text-[#8C7A7E] absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-white text-[#23181A] pl-10 pr-4 py-3 rounded-xl text-sm placeholder-[#8C7A7E] focus:outline-none focus:ring-2 focus:ring-[#F3D797]"
                id="homepage-phone-input"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#F3D797] text-[#480117] font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#E2C47E] transition-all duration-300 cursor-pointer shrink-0 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              id="homepage-phone-submit-btn"
            >
              Request Call
            </button>
          </form>

          {phoneSubmitted && (
            <p className="text-xs text-[#F3D797] font-semibold animate-pulse">
              ✓ Jazak Allah Khair! We will contact you shortly to guide your enrollment.
            </p>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 border-t border-white/10">
            <button
              onClick={() => onNavigate('women')}
              className="w-full sm:w-auto max-w-xs sm:max-w-none min-w-[210px] inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-white text-[#78122B] px-6 sm:px-8 text-sm font-bold hover:bg-[#FAF8F5] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 gap-2 cursor-pointer"
              id="homepage-cta-explore-women"
            >
              <span>Explore Women's Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20know%20more%20about%20Qalbiya%20programs."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto max-w-xs sm:max-w-none min-w-[180px] inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-[#25D366] text-white px-6 text-sm font-bold hover:bg-[#20bd5a] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 gap-2 cursor-pointer"
              id="homepage-whatsapp-link"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
