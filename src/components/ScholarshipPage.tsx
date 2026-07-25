import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Send, Heart, BookOpen, AlertCircle, CheckCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Course, ScholarshipApplication } from '../types';

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
      
      {/* Intro Header */}
      <section className="text-center space-y-4 pt-10" id="scholarship-header">
        <div className="inline-flex items-center space-x-2 rounded-full border border-accent-gold/20 bg-panel-dark px-4.5 py-1.5 text-xs font-semibold text-accent-gold tracking-wide">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Confidential Support Fund</span>
        </div>
        <h1 className="serif-heading text-4xl sm:text-5xl font-bold text-text-cream tracking-tight">
          Sponsor a Student / Apply for Support
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-sage">
          The Qalbiya Sincerity Covenant ensures that no sincere seeker is ever turned away due to financial difficulty. If you are unable to pay the standard fee, please apply for support below.
        </p>
      </section>

      {/* Main Info Box */}
      <section className="p-6 sm:p-8 rounded-2xl border border-brand-border bg-panel-dark/60 space-y-4 text-xs sm:text-sm text-text-sage leading-relaxed" id="scholarship-rules">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="serif-heading text-base font-bold text-text-cream">Our Confidentiality Commitment</h3>
            <p>
              Your application is treated with the highest level of respect and privacy. Only Ms. Mustara and our selection committee will see your application. We will never disclose who is attending on a scholarship to other peers or students.
            </p>
            <p>
              Once your application is submitted, you can also click the quick-link to connect directly on WhatsApp to coordinate batch timings.
            </p>
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
                className="p-8 rounded-2xl border border-emerald-500/30 bg-panel-dark space-y-6 text-center"
                id="scholarship-success-panel"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="serif-heading text-2xl font-bold text-text-cream">Application Submitted Confidentially</h3>
                  <p className="text-sm text-text-sage max-w-md mx-auto leading-relaxed">
                    JazakAllahu Khairan. Your request for <strong>{submittedApp.fullName}</strong> regarding the <strong>{submittedApp.course}</strong> course has been securely saved.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-brand-border bg-bg-deep/50 max-w-lg mx-auto text-xs text-text-sage text-left space-y-2">
                  <p><strong>Seeker:</strong> {submittedApp.fullName} (Age {submittedApp.age})</p>
                  <p><strong>WhatsApp:</strong> {submittedApp.whatsapp}</p>
                  <p><strong>Contribution Capacity:</strong> {submittedApp.partialPayment}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-bg-deep px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    id="success-whatsapp-cta"
                  >
                    <span>Coordinate via WhatsApp</span>
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
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-brand-border bg-panel-dark space-y-6" id="scholarship-application-form">
                <h2 className="serif-heading text-xl sm:text-2xl font-bold text-text-cream border-b border-brand-border pb-3">
                  Sponsorship Request Form
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sister Fatima Ahmed"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-full-name"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Age of the Seeker *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 27"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-age"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      WhatsApp Number *
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
                      Email Address <span className="text-text-sage text-[10px] lowercase italic">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. fatima@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300"
                      id="input-email"
                    />
                  </div>

                  {/* Desired Course */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Desired Program of Study *
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

                  {/* Financial capability payment */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      What portion of the standard monthly contribution can you provide? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'None (Full Sponsorship)',
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
                          id={`payment-opt-${option.toLowerCase().replace(" ", "-").replace("(", "").replace(")", "").replace("/", "")}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Tell us why you are seeking a sponsorship *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please share a brief, sincere outline of your personal financial challenges or why this support will help your studies."
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full rounded-xl border border-brand-border bg-bg-deep px-4 py-3 text-xs sm:text-sm text-text-cream placeholder-text-sage/40 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-all duration-300 resize-none"
                      id="input-reason"
                    />
                  </div>

                  {/* Previous course? */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-cream">
                      Have you studied with Qalbiya before? *
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
                      Additional Information <span className="text-text-sage text-[10px] lowercase italic">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any other helpful details (e.g. batch availability, preferred teacher characteristics, etc.)"
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
                        <span>Filing request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Confidential Application</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>

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
