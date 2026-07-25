import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  Instagram, 
  Sparkles,
  BookOpen,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { Route } from '../types';

interface FAQPageProps {
  onNavigate?: (route: Route) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: 'general' | 'classes' | 'payment';
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'classes' | 'payment'>('all');

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: 'attendance',
      category: 'classes',
      question: 'Is attendance tracked?',
      answer: 'Yes — attendance is tracked for all our courses to ensure consistent progress, commitment, and quality spiritual learning.'
    },
    {
      id: 'recordings',
      category: 'classes',
      question: 'Do I get a recording if I miss a live class?',
      answer: 'This varies by course — some courses offer recordings and some don\'t. This will be clearly communicated to you at the time of enrollment.'
    },
    {
      id: 'trial',
      category: 'general',
      question: 'Is there a trial or demo class before I enroll?',
      answer: (
        <span>
          Yes — trial classes are available for select courses, including Tajweed 1:1 Classes and the Juniors Deeniyat Mastercourse.{' '}
          <a
            href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20request%20a%20trial%20class."
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold underline hover:text-text-cream transition-colors"
          >
            Message us on WhatsApp
          </a>{' '}
          to ask about a trial for the course you're interested in.
        </span>
      )
    },
    {
      id: 'authenticity',
      category: 'general',
      question: 'Is Qalbiya Islamic Institute authentic / who teaches the courses?',
      answer: (
        <span>
          All our courses are taught by qualified, dedicated teachers rooted in authentic Qur'an and Sunnah teaching. You can read more about our founder and approach on our{' '}
          {onNavigate ? (
            <button
              onClick={() => onNavigate('about')}
              className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
            >
              About
            </button>
          ) : (
            <strong className="text-accent-gold">About</strong>
          )}{' '}
          page.
        </span>
      )
    },
    {
      id: 'enroll',
      category: 'general',
      question: 'How do I enroll in a course?',
      answer: (
        <span>
          Browse our{' '}
          {onNavigate ? (
            <>
              <button
                onClick={() => onNavigate('women')}
                className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
              >
                Women's Courses
              </button>
              {' or '}
              <button
                onClick={() => onNavigate('kids')}
                className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
              >
                Kids' Courses
              </button>
            </>
          ) : (
            <strong className="text-accent-gold">Women's / Kids' Courses</strong>
          )}{' '}
          pages, choose the course that fits, and message us on WhatsApp or Instagram to complete enrollment.
        </span>
      )
    },
    {
      id: 'payment',
      category: 'payment',
      question: 'How do I pay?',
      answer: 'Payment details are shared directly with you once you reach out to enroll. We currently accept standard, convenient methods including bank transfers, UPI (GPay, PhonePe, Paytm), and secure international wire methods.'
    },
    {
      id: 'refunds',
      category: 'payment',
      question: 'Can I get a refund if I change my mind?',
      answer: (
        <span>
          All course fees are non-refundable. Please see our{' '}
          {onNavigate ? (
            <button
              onClick={() => onNavigate('refund-policy')}
              className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
            >
              Refund Policy
            </button>
          ) : (
            <strong className="text-accent-gold">Refund Policy</strong>
          )}{' '}
          for details, and feel free to ask us any questions before enrolling.
        </span>
      )
    },
    {
      id: 'format',
      category: 'classes',
      question: 'Are classes live or pre-recorded?',
      answer: 'All classes are conducted live online via Google Meet — not pre-recorded. This ensures real-time interaction, active correction, and personal teacher-student engagement.'
    },
    {
      id: 'beginners',
      category: 'general',
      question: 'Do you offer classes for beginners?',
      answer: 'Yes — several of our courses, including Noorani Qaida (Women\'s & Kids\') and Pre-Diploma in Deeniyat, are designed specifically for beginners with no prior knowledge required.'
    },
    {
      id: 'missed',
      category: 'classes',
      question: 'What if I have to miss a class?',
      answer: 'This depends on the course format. For 1-on-1 classes, missed content is simply covered in the next session. For group classes, please check the specific course page or contact us for guidance.'
    },
    {
      id: 'free',
      category: 'general',
      question: 'Do you offer free courses or sessions?',
      answer: (
        <span>
          Yes — check our{' '}
          {onNavigate ? (
            <button
              onClick={() => onNavigate('free-courses')}
              className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
            >
              Free Courses
            </button>
          ) : (
            <strong className="text-accent-gold">Free Courses</strong>
          )}{' '}
          page for our current free offerings, including weekly Tarbiyah & Tazkiyah sessions.
        </span>
      )
    },
    {
      id: 'scholarships',
      category: 'payment',
      question: 'Do you offer scholarships?',
      answer: (
        <span>
          Yes — we offer scholarships for students who genuinely cannot afford our courses. Visit our{' '}
          {onNavigate ? (
            <button
              onClick={() => onNavigate('scholarship')}
              className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
            >
              Scholarship
            </button>
          ) : (
            <strong className="text-accent-gold">Scholarship</strong>
          )}{' '}
          page to apply.
        </span>
      )
    },
    {
      id: 'ages',
      category: 'general',
      question: 'Do you offer courses for children younger than 6 or older than 12?',
      answer: (
        <span>
          Our current children's courses are designed for ages 6–12. Please{' '}
          {onNavigate ? (
            <button
              onClick={() => onNavigate('contact')}
              className="text-accent-gold underline hover:text-text-cream transition-colors font-medium inline bg-transparent border-0 p-0 cursor-pointer align-baseline"
            >
              contact us directly
            </button>
          ) : (
            <strong className="text-accent-gold">contact us</strong>
          )}{' '}
          if you have a child outside this range — we're happy to discuss custom options.
        </span>
      )
    }
  ];

  const filteredFaqs = faqItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="space-y-12 pb-24 max-w-3xl mx-auto px-4 sm:px-6 pt-10" id="faq-page-container">
      
      {/* Page Header */}
      <section className="text-center space-y-4" id="faq-header">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4" /> Help Center
        </span>
        <h1 className="serif-heading text-4xl sm:text-5xl font-bold text-text-cream tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-text-sage">
          Find instant answers to common questions about admissions, schedules, format, and fees at Qalbiya Islamic Institute.
        </p>
      </section>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2" id="faq-tabs">
        {(['all', 'general', 'classes', 'payment'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setActiveId(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-accent-gold text-panel-dark border-accent-gold shadow-md'
                : 'bg-panel-dark border-brand-border text-text-sage hover:text-text-cream hover:border-text-sage/30'
            }`}
            id={`faq-tab-btn-${cat}`}
          >
            {cat === 'all' && 'All Questions'}
            {cat === 'general' && 'General Info'}
            {cat === 'classes' && 'Classes & Formats'}
            {cat === 'payment' && 'Fees & Payments'}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <section className="space-y-4" id="faq-accordion-list">
        {filteredFaqs.map((faq) => {
          const isOpen = activeId === faq.id;
          return (
            <div 
              key={faq.id} 
              className="bg-panel-dark border border-brand-border hover:border-accent-gold/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              id={`faq-item-container-${faq.id}`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left text-text-cream font-medium hover:text-accent-gold transition-colors focus:outline-none"
                aria-expanded={isOpen}
                id={`faq-btn-${faq.id}`}
              >
                <span className="serif-heading text-base sm:text-lg pr-4 font-bold">{faq.question}</span>
                <span className={`shrink-0 flex items-center justify-center rounded-lg w-8 h-8 bg-brand-border/40 text-text-sage group-hover:text-accent-gold transition-transform duration-300 ${isOpen ? 'rotate-180 bg-accent-gold/10 text-accent-gold' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 text-sm text-text-sage leading-relaxed border-t border-brand-border/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      {/* Still Have Questions Footer CTA */}
      <section className="text-center p-8 rounded-2xl border border-dashed border-brand-border bg-panel-dark/40 space-y-5" id="faq-further-support">
        <h3 className="serif-heading text-lg font-bold text-text-cream">Still have questions?</h3>
        <p className="text-xs text-text-sage max-w-md mx-auto leading-relaxed">
          If your question isn't answered here, feel free to reach out to our admissions team directly. We're happy to guide you on your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <a
            href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20have%20a%20general%20question%20regarding%20Qalbiya%20Islamic%20Institute."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current text-white" />
            <span>Connect on WhatsApp</span>
          </a>
          <a
            href="https://instagram.com/qalbiya_institute"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-panel-dark hover:bg-panel-light text-text-cream border border-brand-border text-xs font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            <span>DM on Instagram</span>
          </a>
        </div>
      </section>

    </div>
  );
};
