import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Route } from './types';
import { coursesData } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { AboutPage } from './components/AboutPage';
import { ProgramsHub } from './components/ProgramsHub';
import { FreeCoursesPage } from './components/FreeCoursesPage';
import { ScholarshipPage } from './components/ScholarshipPage';
import { CourseDetailView } from './components/CourseDetailView';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ContactPage } from './components/ContactPage';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { FAQPage } from './components/FAQPage';
import { DirectMentorship } from './components/DirectMentorship';
import { AsmaUlHusnaPage } from './components/AsmaUlHusnaPage';
import { FivePillarsPage } from './components/FivePillarsPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | undefined>(undefined);
  const [scholarshipPreselectSlug, setScholarshipPreselectSlug] = useState<string | undefined>(undefined);

  // Resolve current active course
  const activeCourse = coursesData.find((c) => c.slug === selectedCourseSlug);

  // Dynamic Document Title and Meta Description for SEO & indexing
  useEffect(() => {
    let title = "Qalbiya Islamic Institute - Sacred Online Learning";
    let description = "Interactive, live online Islamic learning programs for women and kids, focusing on Quran, Tarbiyah, and classical sacred sciences under dedicated female mentorship.";

    if (currentRoute === 'course-detail' && activeCourse) {
      title = `${activeCourse.title} - Qalbiya Islamic Institute`;
      description = `${activeCourse.sub || activeCourse.hook || ''} Join this live interactive online class at Qalbiya. Programs designed with high academic standards.`.substring(0, 155) + '...';
    } else {
      switch (currentRoute) {
        case 'about':
          title = "About Our Institute - Qalbiya Islamic Institute";
          description = "Discover the mission, core values, and dedicated female leadership behind Qalbiya Islamic Institute's online sacred learning space.";
          break;
        case 'women':
          title = "Women's Academic Hub - Qalbiya Islamic Institute";
          description = "Structured classical and interactive Islamic study programs designed specifically for sisters, covering Quran, Arabic, Fiqh, and spiritual development.";
          break;
        case 'kids':
          title = "Kids' Tarbiyah Classes - Qalbiya Islamic Institute";
          description = "Safe, engaging, and highly interactive live online Tarbiyah & Islamic lessons designed for kids to build strong character and basic sacred knowledge.";
          break;
        case 'free-courses':
          title = "Free Sacred Lessons - Qalbiya Islamic Institute";
          description = "Access free weekly public lectures, short audio reflections, and essential Islamic study materials compiled by our scholars.";
          break;
        case 'scholarship':
          title = "Sponsor a Student & Financial Aid - Qalbiya Islamic Institute";
          description = "Support deserving female and young seekers of sacred knowledge or apply for our interactive program scholarships to study without financial barriers.";
          break;
        case 'contact':
          title = "Contact Us & WhatsApp Support - Qalbiya Islamic Institute";
          description = "Get in touch with Ms. Mustara and our admissions team. Connect directly via WhatsApp or Instagram DM for fast support.";
          break;
        case 'refund-policy':
          title = "Refund Policy - Qalbiya Islamic Institute";
          description = "Read our official, transparent student satisfaction and refund guidelines for all paid courses at Qalbiya Islamic Institute.";
          break;
        case 'terms-and-conditions':
          title = "Terms & Conditions - Qalbiya Islamic Institute";
          description = "View the official user terms, student code of conduct, and academy guidelines governing our interactive online learning platform.";
          break;
        case 'privacy-policy':
          title = "Privacy Policy - Qalbiya Islamic Institute";
          description = "Understand how we collect, store, and carefully protect student data and details under our robust private hosting guidelines.";
          break;
        case 'faq':
          title = "Frequently Asked Questions (FAQ) - Qalbiya Islamic Institute";
          description = "Get answers to student questions regarding Google Meet schedules, course recordings, class materials, payments, and batch timings.";
          break;
        case 'asma-ul-husna':
        case 'sacred-knowledge':
          title = "Asma Ul Husna (99 Names of Allah) - Qalbiya Islamic Institute";
          description = "Explore the 99 Beautiful Names of Allah (Asma Ul Husna). Reflect on divine attributes, translations, and daily invocations.";
          break;
        case 'five-pillars':
          title = "The 5 Pillars of Islam - Qalbiya Islamic Institute";
          description = "Explore the 5 Foundational Pillars of Islam: Shahadah, Salah, Zakat, Sawm, and Hajj. Discover practical daily guidance and spiritual wisdom.";
          break;
        default:
          break;
      }
    }

    // Apply document title
    document.title = title;

    // Apply meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [currentRoute, activeCourse]);

  const handleNavigate = (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars' | 'all') => {
    if (route === 'sacred-knowledge') {
      if (sacredTab === 'pillars') {
        setCurrentRoute('five-pillars');
      } else {
        setCurrentRoute('asma-ul-husna');
      }
    } else {
      setCurrentRoute(route);
    }

    if (courseSlug) {
      setSelectedCourseSlug(courseSlug);
    } else if (route !== 'course-detail') {
      setSelectedCourseSlug(undefined);
    }
    // Scroll to top for seamless transitions
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (slug: string) => {
    setSelectedCourseSlug(slug);
    setCurrentRoute('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToScholarshipFromCourse = () => {
    if (selectedCourseSlug) {
      setScholarshipPreselectSlug(selectedCourseSlug);
    }
    setCurrentRoute('scholarship');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <Homepage 
            courses={coursesData} 
            onNavigate={handleNavigate} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      case 'about':
        return <AboutPage />;
      case 'women':
        return (
          <ProgramsHub 
            category="women" 
            courses={coursesData} 
            onSelectCourse={handleSelectCourse} 
            onNavigate={handleNavigate} 
          />
        );
      case 'kids':
        return (
          <ProgramsHub 
            category="kids" 
            courses={coursesData} 
            onSelectCourse={handleSelectCourse} 
            onNavigate={handleNavigate} 
          />
        );
      case 'free-courses':
        return <FreeCoursesPage />;
      case 'scholarship':
        return (
          <ScholarshipPage 
            courses={coursesData} 
            initialCourseSlug={scholarshipPreselectSlug} 
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'refund-policy':
        return <RefundPolicyPage />;
      case 'terms-and-conditions':
        return <TermsAndConditionsPage onNavigate={handleNavigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'asma-ul-husna':
      case 'sacred-knowledge':
        return <AsmaUlHusnaPage onNavigate={handleNavigate} />;
      case 'five-pillars':
        return <FivePillarsPage onNavigate={handleNavigate} />;
      case 'course-detail':
        if (activeCourse) {
          return (
            <CourseDetailView 
              course={activeCourse} 
              onBack={() => handleNavigate(activeCourse.category)} 
              onNavigateToScholarship={handleNavigateToScholarshipFromCourse}
            />
          );
        }
        return (
          <Homepage 
            courses={coursesData} 
            onNavigate={handleNavigate} 
            onSelectCourse={handleSelectCourse} 
          />
        );
      default:
        return (
          <Homepage 
            courses={coursesData} 
            onNavigate={handleNavigate} 
            onSelectCourse={handleSelectCourse} 
          />
        );
    }
  };

  const isKids = currentRoute === 'kids';

  return (
    <div className="flex min-h-screen flex-col bg-bg-deep text-text-cream selection:bg-accent-gold/20 selection:text-accent-gold transition-colors duration-500">
      
      {/* Universal Header with responsive links */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main Content Stage with transition animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute + (selectedCourseSlug || '')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
            id={`stage-${currentRoute}`}
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Direct Mentorship Section (Excluding legal policies pages for visual cleanliness) */}
      {!['refund-policy', 'terms-and-conditions', 'privacy-policy'].includes(currentRoute) && (
        <DirectMentorship />
      )}

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} currentRoute={currentRoute} />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />

    </div>
  );
}
