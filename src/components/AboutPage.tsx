import React from 'react';
import { Heart, Compass, Sparkles, BookOpen, Quote, ShieldAlert } from 'lucide-react';
import studyCompanionship from '../assets/images/study_companionship_1784048738488.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Intro Header */}
      <section className="text-center space-y-4 pt-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">Our Sacred Vision</span>
        <h1 className="serif-heading text-4xl sm:text-5xl font-bold text-text-cream tracking-tight">
          Sincerity, companionship, <br />and the search for Allah's pleasure.
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-sage">
          Qalbiya is not an online business; it is a spiritual commitment. Discover who we are and why we reject the standard corporate formulas for learning the Deen.
        </p>
      </section>

      {/* Main Narrative Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Story Text */}
        <div className="lg:col-span-7 space-y-6 text-sm leading-relaxed text-text-sage">
          <h2 className="serif-heading text-2xl font-bold text-text-cream">
            The Story Behind the Heart
          </h2>
          <p>
            When I first began seeking sacred knowledge as an adult, I faced immense anxiety. The standard institutes I applied to felt cold, bureaucratic, and demanding. I felt like a statistic rather than a student of the Qur'an. I noticed many sister friends struggling with the same fear of judgment.
          </p>
          <p>
            That is why I founded <strong>Qalbiya Islamic Institute</strong>. I wanted to establish a safe haven — a warm, non-intimidating circle of companions where an adult sister could start her Tajweed journey from the very first letter without a trace of embarrassment.
          </p>
          <p>
            Since our humble beginnings, we have guided hundreds of sisters and children into beautiful, correct recitation and a heart-centered relationship with their Creator. Our teachers are chosen specifically for their patience, gentle hearts, and deep expertise.
          </p>

          <div className="p-6 rounded-2xl border border-brand-border bg-panel-dark/60 italic font-medium text-text-cream relative">
            <Quote className="absolute -top-3 -left-2 w-8 h-8 text-accent-gold/20" />
            "If your deen classes don't make you feel loved by your Creator and your teacher, something in the methodology is broken. We teach to heal, not to stress."
            <span className="block text-xs font-semibold text-accent-gold mt-2.5">— Ms. Mustara, Founder</span>
          </div>
        </div>

        {/* Story Visual Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-brand-border bg-panel-dark shadow-2xl">
            <img
              src={studyCompanionship}
              alt="Cozy sisters interactive online learning setup showing a mobile phone with Arabic studies"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover filter brightness-90 saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest">Our Methodology</span>
              <p className="text-base font-bold text-text-cream mt-0.5">Correct Tajweed & Authentic Belief</p>
              <p className="text-xs text-text-sage mt-1">Grounded in traditional prophetic character.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Convictions */}
      <section className="space-y-10" id="core-convictions">
        <div className="text-center space-y-2">
          <h2 className="serif-heading text-2xl font-bold text-text-cream">Our Pillars of Covenant</h2>
          <p className="text-xs text-text-sage">The principles that separate us from typical corporate setups</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-brand-border bg-panel-dark space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-sage/10 text-accent-gold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="serif-heading text-lg font-bold text-text-cream">Zero Judgement Zone</h3>
            <p className="text-xs leading-relaxed text-text-sage">
              We never rush you, and we never shame you for incorrect letters or delayed homework. Sincerity and step-by-step progress are what we celebrate.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-panel-dark space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-sage/10 text-accent-gold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="serif-heading text-lg font-bold text-text-cream">Spiritual Intimacy</h3>
            <p className="text-xs leading-relaxed text-text-sage">
              We keep our student batches small. Teachers build strong, lasting bonds with their students, becoming mentors in their daily life struggles.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-panel-dark space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-sage/10 text-accent-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="serif-heading text-lg font-bold text-text-cream">Genuine Compassion</h3>
            <p className="text-xs leading-relaxed text-text-sage">
              If a mother needs to bring her newborn to her 1-on-1 session, or if a child needs to learn through drawings and play, we welcome and support that entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Anti-Corporate Manifesto Callout */}
      <section className="p-8 sm:p-12 rounded-3xl border border-dashed border-accent-gold/30 bg-panel-light/30 text-center space-y-6" id="anti-corporate-manifesto">
        <ShieldAlert className="w-10 h-10 text-accent-gold mx-auto" />
        <h3 className="serif-heading text-2xl font-bold text-text-cream">The Anti-Corporate Manifesto</h3>
        <p className="max-w-3xl mx-auto text-sm leading-relaxed text-text-sage">
          We reject automated emails, robotic ticketing systems, and hidden subscription terms. At Qalbiya, your primary contact method is directly WhatsApping or DM'ing the founder, <strong>Ms. Mustara</strong>, or your direct mentor. There are no middlemen. Sincerity and human communication are our baseline.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a 
            href="https://wa.me/918145363290?text=Assalamu%20Alaikum%20Ms.%20Mustara%2C%20I%20am%20interested%20in%20learning%20more%20about%20Qalbiya%20Islamic%20Institute."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-accent-gold hover:bg-accent-gold-light text-bg-deep px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300"
            id="manifesto-wa-btn"
          >
            Direct WhatsApp with Founder
          </a>
        </div>
      </section>

    </div>
  );
};
