import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Heart, Sparkles, ArrowRight, Book, GraduationCap, Video, FileText, Globe, CheckCircle2, Users, Quote, Laptop, Calendar, Clock, Compass } from 'lucide-react';
import { Course, Route } from '../types';
import founderWorkspace from '../assets/images/founder_workspace_1784048720294.jpg';
import womensOnlineStudy from '../assets/images/womens_online_study_1784048690815.jpg';
import kidsOnlineStudyGen from '../assets/images/kids_online_study_1784048706942.jpg';

interface HomepageProps {
  courses: Course[];
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars' | 'all') => void;
  onSelectCourse: (slug: string) => void;
}

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
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#23181A] space-y-20 pb-24 transition-colors duration-300">
      
      {/* SECTION 1 — Hero Section (Matching Mockup Layout) */}
      <section className="pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center" id="hero-section">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#23181A] leading-[1.15]">
            Knowledge that reaches the heart. <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#78122B]">Amal is what changes lives.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#5C4D50] max-w-2xl mx-auto leading-relaxed">
            Qalbiya Islamic Institute provides a rigorous academic environment for the study of classical theology, jurisprudence, and spiritual refinement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartJourneyClick}
              className="w-full sm:w-auto bg-[#78122B] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#630E23] transition-colors shadow-xs cursor-pointer"
              id="hero-cta-explore"
            >
              Explore Our Curriculum
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto border border-[#78122B] text-[#78122B] px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#78122B]/5 transition-colors cursor-pointer"
              id="hero-cta-method"
            >
              Learn Our Method
            </button>
          </div>

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

      {/* SECTION 3 — Split-Path Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="split-path-section">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#8C7A7E] flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Your Personal Direction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23181A]">
            Wherever you are in your journey, there's a path for your heart here.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 — For Her */}
          <div className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 space-y-6">
            <div className="space-y-6">
              <div className="w-full h-52 rounded-xl overflow-hidden relative border border-[#E8DDD9]">
                <img 
                  src={womensOnlineStudy} 
                  alt="Women studying online via laptop" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#78122B]/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur-sm px-3.5 py-1 text-xs font-mono font-bold text-[#78122B] border border-[#E8DDD9] shadow-xs">
                  For You
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#23181A]">Women's Academy</h3>
                <p className="text-sm text-[#5C4D50] leading-relaxed">
                  Rebuild your relationship with Allah, one honest step at a time. Designed with sisterhood, patience, and direct teacher connection.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('women')}
                className="w-full flex items-center justify-center space-x-2 rounded-lg bg-[#78122B] text-white py-3.5 text-xs font-semibold tracking-wider uppercase hover:bg-[#630E23] transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Women's Programs →</span>
              </button>
            </div>
          </div>

          {/* Card 2 — For Your Child */}
          <div className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 space-y-6">
            <div className="space-y-6">
              <div className="w-full h-52 rounded-xl overflow-hidden relative border border-[#E8DDD9]">
                <img 
                  src={kidsOnlineStudyGen} 
                  alt="Young learner with online tablet class" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#78122B]/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur-sm px-3.5 py-1 text-xs font-mono font-bold text-[#78122B] border border-[#E8DDD9] shadow-xs">
                  For Them
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#23181A]">Kids' Academy</h3>
                <p className="text-sm text-[#5C4D50] leading-relaxed">
                  Raise a child who loves their deen, not just knows it. Highly interactive classes using beautiful stories, game dynamics, and deep positive reinforcement.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('kids')}
                className="w-full flex items-center justify-center space-x-2 rounded-lg border border-[#78122B] bg-[#FAF8F5] text-[#78122B] py-3.5 text-xs font-semibold tracking-wider uppercase hover:bg-[#78122B]/5 transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Kids' Programs →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Social Proof Strip & Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="social-proof-section">
        <div className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl py-10 px-6 sm:px-10 text-center space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#78122B] flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Trusted globally
            </span>
            <span className="hidden sm:inline text-[#E8DDD9] font-bold">|</span>
            <span className="text-sm sm:text-base font-medium text-[#23181A]">
              Trusted by <span className="text-[#78122B] font-bold">300+ students</span> on their journey back to their deen.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-7xl mx-auto">
            {testimonies.map((testimony, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E8DDD9] rounded-xl p-6 relative flex flex-col justify-between space-y-4 hover:border-[#78122B]/40 hover:shadow-xs transition-all duration-300"
              >
                <Quote className="absolute top-4 right-4 w-5 h-5 text-[#78122B]/15" />
                <p className="text-xs sm:text-sm italic text-[#5C4D50] leading-relaxed relative z-10">
                  "{testimony.text}"
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-[#E8DDD9] text-[11px]">
                  <span className="font-bold text-[#23181A]">{testimony.author}</span>
                  <span className="font-mono font-semibold text-[#78122B] uppercase tracking-wider text-[10px]">{testimony.course}</span>
                </div>
              </div>
            ))}
          </div>
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
                    className="bg-[#FDFBF7] border border-[#E8DDD9] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Category Label & Live Online Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#78122B]">
                          {course.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 rounded-full bg-[#FAF8F5] border border-[#E8DDD9] px-2.5 py-1 text-[#2E6B38]">
                          <Laptop className="w-3 h-3" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider">{course.tag}</span>
                        </div>
                      </div>

                      {/* Badge */}
                      {course.badge && (
                        <div>
                          <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${course.badgeColor}`}>
                            {course.badge}
                          </span>
                        </div>
                      )}

                      {/* Course Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-bold text-[#23181A] hover:text-[#78122B] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed line-clamp-3">
                          {course.desc}
                        </p>
                      </div>

                      {/* Quick Facts */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E8DDD9] text-xs text-[#5C4D50]">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#78122B] shrink-0" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 truncate">
                          <Calendar className="w-3.5 h-3.5 text-[#78122B] shrink-0" />
                          <span className="truncate">{course.format}</span>
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
                        className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-[#78122B] text-white text-xs font-semibold tracking-wide hover:bg-[#630E23] transition-colors shadow-xs cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
