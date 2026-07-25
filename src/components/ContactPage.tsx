import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Instagram, Clock, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 max-w-2xl mx-auto px-4 sm:px-6 pt-12 text-center" id="contact-page-container">
      
      {/* Page Header */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
        id="contact-header"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Trust & Legal
        </span>
        <h1 className="serif-heading text-4xl sm:text-5xl font-bold text-text-cream tracking-tight">
          Get in Touch
        </h1>
        <p className="max-w-md mx-auto text-sm sm:text-base leading-relaxed text-text-sage">
          Have a question before enrolling, or need help with an existing course? We're here to help.
        </p>
      </motion.section>

      {/* Main Buttons Card */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-panel-dark border border-brand-border rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl"
        id="contact-methods-card"
      >
        <div className="grid grid-cols-1 gap-5">
          
          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20have%20a%20question%20regarding%20Qalbiya%20Islamic%20Institute."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 text-text-cream"
            id="contact-whatsapp-block"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 fill-current text-emerald-600" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <h3 className="font-semibold text-lg text-text-cream group-hover:text-emerald-700 transition-colors">
                  WhatsApp Support
                </h3>
                <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-sm text-text-sage">
                Connect directly for batch enrollments, 1-on-1 programs, and general student support.
              </p>
              <div className="pt-1 font-mono text-sm text-emerald-700 font-bold">
                +91 81453 63290
              </div>
            </div>
          </a>

          {/* Instagram Action Button */}
          <a
            href="https://instagram.com/qalbiya_institute"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 p-6 rounded-2xl border border-brand-border bg-panel-dark/40 hover:bg-panel-light/60 hover:border-pink-500/40 transition-all duration-300 text-text-cream"
            id="contact-instagram-block"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-700 group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 text-pink-600" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <h3 className="font-semibold text-lg text-text-cream group-hover:text-pink-700 transition-colors">
                  DM on Instagram
                </h3>
                <span className="hidden sm:inline-block text-[11px] font-bold text-pink-700 bg-pink-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Updates
                </span>
              </div>
              <p className="text-sm text-text-sage">
                Follow our handle, browse our course announcements, and send us a direct message anytime.
              </p>
              <div className="pt-1 font-mono text-sm text-pink-700 font-bold">
                @qalbiya_institute
              </div>
            </div>
          </a>

        </div>

        {/* Response Time and Info */}
        <div className="pt-2 border-t border-brand-border/40 flex items-center justify-center gap-2 text-xs text-text-sage" id="contact-response-time-info">
          <Clock className="w-4 h-4 text-accent-gold shrink-0" />
          <span>Response time: <strong className="text-text-cream">We aim to respond within 24 hours.</strong></span>
        </div>
      </motion.section>

    </div>
  );
};
