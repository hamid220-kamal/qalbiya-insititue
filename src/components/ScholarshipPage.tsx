import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Send, Heart, BookOpen, AlertCircle, CheckCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Course, ScholarshipApplication } from '../types';
import { ShareButton } from './ShareButton';

interface ScholarshipPageProps {
  courses: Course[];
  initialCourseSlug?: string;
}

export const ScholarshipPage: React.FC<ScholarshipPageProps> = ({ courses, initialCourseSlug }) => {
  // Find preselected course
  const preselectedCourse = courses.find(c => c.slug === initialCourseSlug)?.title || '';

  const [form, setForm] = useState<ScholarshipApplication>({
    fullName: '',
    age: '',
    whatsapp: '',
    email: '',
    course: preselectedCourse || (courses.length > 0 ? courses[0].title : ''),
    reason: '',
    partialPayment: 'None (Full Sponsorship)',
    previousCourse: 'No',
    additionalInfo: ''
  });

  const [applications, setApplications] = useState<ScholarshipApplication[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ScholarshipApplication | null>(null);

  // Load existing applications on mount
  useEffect(() => {
    const saved = localStorage.getItem('qalbiya_scholarships');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved scholarships", e);
      }
    }
  }, []);

  // Update preselected course if prop changes
  useEffect(() => {
    if (initialCourseSlug) {
      const matching = courses.find(c => c.slug === initialCourseSlug);
      if (matching) {
        setForm(prev => ({ ...prev, course: matching.title }));
      }
    }
  }, [initialCourseSlug, courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.age.trim() || !form.whatsapp.trim() || !form.reason.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const updated = [form, ...applications];
      setApplications(updated);
      localStorage.setItem('qalbiya_scholarships', JSON.stringify(updated));
      setSubmittedApp(form);
      setIsSubmitting(false);

      // Reset form but keep contact info handy
      setForm({
        fullName: '',
        age: '',
        whatsapp: '',
        email: '',
        course: courses.length > 0 ? courses[0].title : '',
        reason: '',
        partialPayment: 'None (Full Sponsorship)',
        previousCourse: 'No',
        additionalInfo: ''
      });
    }, 1200);
  };

  const clearApplications = () => {
    localStorage.removeItem('qalbiya_scholarships');
    setApplications([]);
  };

  const whatsappMessage = submittedApp 
    ? `Assalamu Alaikum Ms. Mustara, I have just submitted a confidential Scholarship/Sponsorship application for the course "${submittedApp.course}" under the name "${submittedApp.fullName}". I would love to connect and proceed with the verification.`
    : `Assalamu Alaikum Ms. Mustara, I am writing to inquire about the confidential scholarship application process.`;

  const whatsappUrl = `https://wa.me/918145363290?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-16 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-8 sm:pt-12" id="scholarship-hero">
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-accent-gold/20 bg-panel-dark px-4.5 py-1.5 text-xs font-semibold text-accent-gold tracking-wide">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Scholarship Program</span>
          </div>
          <ShareButton 
            title="Qalbiya Islamic Institute - Financial Aid & Scholarships"
            text="Financial support and partial/full sponsorships are available so no sincere student is turned away."
            variant="compact"
          />
        </div>
        <h1 className="serif-heading text-3xl sm:text-5xl font-bold text-text-cream tracking-tight max-w-3xl mx-auto leading-tight">
          No sincere student should be turned away because of money.
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-sage">
          Qalbiya Islamic Institute offers scholarships for students who genuinely cannot afford our courses. Every application is reviewed personally, with care.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="p-6 sm:p-8 rounded-3xl border border-brand-border bg-panel-dark/80 space-y-6 shadow-lg" id="how-scholarship-works">
        <div className="space-y-2 border-b border-brand-border/60 pb-4">
          <h2 className="serif-heading text-xl font-bold text-text-cream">How It Works</h2>
          <p className="text-xs sm:text-sm text-text-sage leading-relaxed">
            We review every scholarship application individually, with no rigid checklist. If you have a genuine need and sincere intention to learn, we want to hear from you.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-bg-deep/60 border border-brand-border/60 space-y-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-gold text-bg-deep text-xs font-extrabold">1</span>
            <p className="text-xs font-semibold text-text-cream">Fill out the scholarship application form below</p>
          </div>

          <div className="p-4 rounded-2xl bg-bg-deep/60 border border-brand-border/60 space-y-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-gold text-bg-deep text-xs font-extrabold">2</span>
            <p className="text-xs font-semibold text-text-cream">Our team reviews your application personally</p>
          </div>

          <div className="p-4 rounded-2xl bg-bg-deep/60 border border-brand-border/60 space-y-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-gold text-bg-deep text-xs font-extrabold">3</span>
            <p className="text-xs font-semibold text-text-cream">We reach out to you directly with a decision</p>
          </div>
        </div>
      </section>

      {/* Grid of Form vs History */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="scholarship-main-content">
        
        {/* Form Column */}
        <div className="lg:col-span-12 space-y-8">
          
          <AnimatePresence mode="wait">
            {submittedApp ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-3xl border border-emerald-500/30 bg-panel-dark space-y-6 text-center shadow-xl"
                id="scholarship-success-panel"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-3 max-w-lg mx-auto">
                  <h3 className="serif-heading text-2xl font-bold text-text-cream">
                    Application Submitted
                  </h3>
                  <p className="text-xs sm:text-sm text-text-sage leading-relaxed">
                    JazakAllahu Khairan for applying. Our team will personally review your application and reach out to you soon.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-brand-border bg-bg-deep/60 max-w-md mx-auto text-xs text-text-sage text-left space-y-2">
                  <p><strong className="text-text-cream">Applicant:</strong> {submittedApp.fullName} (Age {submittedApp.age})</p>
                  <p><strong className="text-text-cream">Course:</strong> {submittedApp.course}</p>
                  <p><strong className="text-text-cream">WhatsApp:</strong> {submittedApp.whatsapp}</p>
                  <p><strong className="text-text-cream">Partial Contribution:</strong> {submittedApp.partialPayment}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-bg-deep px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    id="success-whatsapp-cta"
                  >
                    <span>Notify via WhatsApp</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setSubmittedApp(null)}
                    className="inline-flex items-center justify-center rounded-xl border border-brand-border hover:bg-panel-light text-text-cream px-6 py-3 text-xs font-semibold transition-all duration-300"
                    id="success-dismiss-btn"
                  >
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl border border-brand-border bg-panel-dark space-y-6 shadow-xl" id="scholarship-application-form">
                <div className="border-b border-brand-border/60 pb-4 space-y-1">
                  <h2 className="serif-heading text-xl sm:text-2xl font-bold text-text-cream">
                    Scholarship Application Form
                  </h2>
                  <p className="text-xs text-text-sage">
                    Please complete the form below. Every application is reviewed personally with sincerity and confidentiality.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-full-name"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Enter age"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-age"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Contact Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-whatsapp"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Email <span className="text-text-sage text-[10px] lowercase italic">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. email@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-email"
                    />
                  </div>

                  {/* Desired Course */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Which course are you applying for? *
                    </label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="select-course"
                    >
                      {courses.map((c) => (
                        <option key={c.slug} value={c.title} className="bg-panel-dark text-text-cream">
                          {c.title} ({c.category === 'women' ? "Women's" : "Kids'"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reason */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Why do you need this scholarship? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share the main reason for financial need and your sincere intention to learn."
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300 resize-none"
                      id="input-reason"
                    />
                  </div>

                  {/* Partial Payment */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Are you able to pay any partial amount toward the course fee? If yes, how much? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'None (Full Scholarship)',
                        'Partial (Rs. 100/month)',
                        'Partial (Rs. 250/month)'
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setForm({ ...form, partialPayment: option })}
                          className={`px-4 py-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                            form.partialPayment === option
                              ? 'bg-accent-gold text-bg-deep border-accent-gold'
                              : 'bg-bg-deep text-text-sage border-brand-border hover:border-accent-gold/30'
                          }`}
                          id={`payment-opt-${option.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Previous course? */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Have you taken a course with Qalbiya Islamic Institute before? *
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, previousCourse: opt })}
                          className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                            form.previousCourse === opt
                              ? 'bg-accent-gold text-bg-deep border-accent-gold'
                              : 'bg-bg-deep text-text-sage border-brand-border hover:border-accent-gold/30'
                          }`}
                          id={`prev-opt-${opt.toLowerCase()}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Anything else you'd like us to know? <span className="text-text-sage text-[10px] lowercase italic">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any additional information..."
                      value={form.additionalInfo}
                      onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300 resize-none"
                      id="input-additional-info"
                    />
                  </div>

                </div>

                <div className="pt-4 border-t border-brand-border/60 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-bg-deep px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
                    id="submit-scholarship-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-bg-deep mr-2"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>

      </section>

      {/* Closing Section */}
      <section className="p-8 sm:p-12 rounded-3xl border border-brand-border bg-panel-dark text-center space-y-3 shadow-lg" id="scholarship-closing">
        <h2 className="serif-heading text-xl sm:text-2xl font-bold text-text-cream max-w-2xl mx-auto leading-relaxed">
          If your heart wants to learn and your hands are tied, reach out. That's exactly who this is for.
        </h2>
        <p className="text-xs text-text-sage max-w-xl mx-auto">
          Every inquiry is treated with dignity and total confidentiality.
        </p>
      </section>

      {/* Local Application History Panel */}
      {applications.length > 0 && (
        <section className="p-6 sm:p-8 rounded-2xl border border-brand-border bg-panel-dark/40 space-y-6" id="scholarship-history-section">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div className="flex items-center space-x-2.5">
              <FileText className="w-5 h-5 text-accent-gold" />
              <h3 className="serif-heading text-lg font-bold text-text-cream">Your Applied Requests (Local History)</h3>
            </div>
            <button
              onClick={clearApplications}
              className="text-xs text-text-sage hover:text-rose-400 font-semibold"
              id="clear-history-btn"
            >
              Clear Records
            </button>
          </div>

          <div className="space-y-4">
            {applications.map((app, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl border border-brand-border bg-bg-deep/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                id={`history-item-${index}`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-text-cream">{app.course}</h4>
                  <p className="text-xs text-text-sage mt-0.5">Applied for: {app.fullName} (Age {app.age}) &bull; capacity: {app.partialPayment}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="inline-flex items-center rounded-full bg-accent-gold/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent-gold border border-accent-gold/10">
                    Pending Ms. Verification
                  </span>
                  
                  <a 
                    href={`https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20am%20following%2520up%20on%20my%20sponsorship%20request%20for%20${encodeURIComponent(app.fullName)}%20for%20the%20${encodeURIComponent(app.course)}%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-bg-deep transition-all duration-300"
                    title="Follow up on WhatsApp"
                    id={`history-wa-follow-${index}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
