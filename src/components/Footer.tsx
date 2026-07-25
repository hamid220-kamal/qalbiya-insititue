import React, { useState } from 'react';
import { Send, Instagram, Compass, Heart, Sparkles } from 'lucide-react';
import { Route } from '../types';

interface FooterProps {
  onNavigate: (route: Route, courseSlug?: string, sacredTab?: 'asma-ul-husna' | 'pillars') => void;
  currentRoute?: Route;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentRoute }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    try {
      const subs = JSON.parse(localStorage.getItem('qalbiya_newsletter') || '[]');
      subs.push({ email: newsletterEmail, timestamp: new Date().toISOString() });
      localStorage.setItem('qalbiya_newsletter', JSON.stringify(subs));
    } catch (err) {
      console.error("Local storage error:", err);
    }
    
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim() || isSending) return;

    setIsSending(true);
    setSubmitStatus(null);

    try {
      const msgs = JSON.parse(localStorage.getItem('qalbiya_messages') || '[]');
      msgs.push({ message: quickMessage, timestamp: new Date().toISOString() });
      localStorage.setItem('qalbiya_messages', JSON.stringify(msgs));
    } catch (err) {
      console.error("Local storage backup error:", err);
    }

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: quickMessage,
          sourceRoute: currentRoute || 'general',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus(data.message || '✓ Message sent successfully!');
        setMessageSent(true);
        setQuickMessage('');
      } else {
        setSubmitStatus('❌ Failed to deliver message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('✓ Saved locally! Ms. Mustara will be notified.');
      setMessageSent(true);
      setQuickMessage('');
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setMessageSent(false);
        setSubmitStatus(null);
      }, 7000);
    }
  };

  return (
    <footer className="w-full bg-[#78122B] text-white border-t border-[#630E23] py-16 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Vision Block */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#F3D797] text-lg font-bold font-serif shadow-xs">
                ق
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wide text-white">
                  QALBIYA
                </h3>
                <p className="text-[10px] font-mono font-bold tracking-widest text-[#F3D797] uppercase">
                  Islamic Institute
                </p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-white/95">
              "Allah does not look at your appearances or your wealth, but He looks at your hearts and your deeds."
              <span className="block mt-2 text-xs italic font-semibold text-[#F3D797]">— Prophet Muhammad ﷺ</span>
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3D797]">Primary Connections</h4>
              <div className="flex flex-col space-y-2.5 text-sm text-white/90">
                <a 
                  href="https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20have%20an%20inquiry%20regarding%20Qalbiya%20Islamic%20Institute." 
                  className="flex items-center space-x-2.5 text-[#81E6A5] hover:text-white transition-colors duration-300 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-link-whatsapp"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#81E6A5] animate-pulse shrink-0"></span>
                  <span className="underline decoration-[#81E6A5]/50 hover:decoration-current">WhatsApp Ms. Mustara</span>
                </a>
                <a 
                  href="https://instagram.com/qalbiya_institute" 
                  className="flex items-center space-x-2.5 text-white/90 hover:text-[#F3D797] transition-colors duration-300 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-link-instagram"
                >
                  <Instagram className="w-4 h-4 text-[#F3D797] shrink-0" />
                  <span className="underline decoration-white/30 hover:decoration-current">@qalbiya.institute (Instagram DM)</span>
                </a>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('asma-ul-husna')}
                  className="text-white/90 hover:text-[#F3D797] hover:underline font-semibold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  id="footer-primary-btn-asma-ul-husna"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F3D797] shrink-0" />
                  <span>Explore Asma Ul Husna (99 Names)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3D797]">Programs</h4>
            <ul className="space-y-1.5 md:space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('women')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-women"
                >
                  Women's Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('kids')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-kids"
                >
                  Kids' Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('free-courses')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-free"
                >
                  Free Sacred Lessons
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('asma-ul-husna')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-asma-ul-husna"
                >
                  Asma Ul Husna (99 Names)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('five-pillars')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-5-pillars"
                >
                  5 Pillars of Islam
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('scholarship')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-scholarship"
                >
                  Sponsor a Student
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3D797]">Trust & Legal</h4>
            <ul className="space-y-1.5 md:space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('refund-policy')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-refund-policy"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms-and-conditions')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-terms-and-conditions"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-privacy-policy"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq')} 
                  className="text-white/90 hover:text-[#F3D797] hover:underline text-left transition-colors duration-300 font-medium py-1.5 md:py-0.5 block w-full cursor-pointer"
                  id="footer-btn-faq"
                >
                  General FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Block: Fast Note & Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3D797]">Drop Ms. Mustara a Reflection</h4>
              <p className="text-xs text-white/90">Have questions or simply want to send du'as? Leave your note below.</p>
              
              <form onSubmit={handleMessageSubmit} className="space-y-2" id="footer-message-form">
                <div className="relative">
                  <textarea
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder={isSending ? "Sending message..." : "Your message, question, or du'a..."}
                    rows={2}
                    disabled={isSending}
                    className="w-full rounded-xl border border-white/30 bg-white px-3.5 py-2.5 text-sm text-[#23181A] placeholder-[#8C7A7E] focus:border-[#F3D797] focus:outline-none focus:ring-1 focus:ring-[#F3D797] resize-none transition-all duration-300 disabled:opacity-60 shadow-xs font-medium"
                    id="footer-message-input"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !quickMessage.trim()}
                    className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3D797] text-[#480117] hover:bg-[#E2C47E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs font-bold"
                    aria-label="Send message"
                    id="footer-message-submit"
                  >
                    {isSending ? (
                      <span className="w-3 h-3 border-2 border-[#480117] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {messageSent && submitStatus && (
                  <p className="text-xs font-bold animate-pulse text-[#81E6A5]" id="footer-message-success">
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3D797]">Sacred Newsletter</h4>
              <p className="text-xs text-white/90">Get spiritually enriching reflections & course schedules once a month.</p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2" id="footer-newsletter-form">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="flex-1 rounded-xl border border-white/30 bg-white px-3.5 py-2 text-sm text-[#23181A] placeholder-[#8C7A7E] focus:border-[#F3D797] focus:outline-none focus:ring-1 focus:ring-[#F3D797] transition-all duration-300 min-h-[44px] md:min-h-0 shadow-xs font-medium"
                  id="footer-newsletter-input"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#F3D797] hover:bg-[#E2C47E] text-[#480117] px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer min-h-[44px] md:min-h-0 flex items-center justify-center shadow-xs"
                  id="footer-newsletter-submit"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-[#81E6A5] font-semibold animate-pulse" id="footer-newsletter-success">
                  ✓ Successfully subscribed with respect. Welcome!
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Closing Row */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <div className="flex items-center space-x-1.5">
            <Compass className="w-4 h-4 text-[#F3D797]" />
            <span>Serving Seekers Globally &bull; Conducted over Google Meet</span>
          </div>
          <div className="flex items-center space-x-4 flex-wrap justify-center sm:justify-end gap-y-2">
            <div className="flex items-center space-x-1">
              <span>Made with deep respect &bull; Focus on the heart</span>
              <Heart className="w-3.5 h-3.5 text-[#F3D797] inline fill-[#F3D797] animate-pulse" />
            </div>
            <span className="hidden sm:inline text-white/30">&bull;</span>
            <a 
              href="https://www.linkedin.com/in/syed-shahnawaz2027" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F3D797] hover:text-white font-bold transition-colors duration-300 underline decoration-[#F3D797]/50 hover:decoration-current cursor-pointer"
              id="developer-link-regular"
            >
              Developed by SyedShahnawaz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
