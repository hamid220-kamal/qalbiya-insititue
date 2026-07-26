import React from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import founderWorkspace from '../assets/images/founder_workspace_1784048720294.jpg';
import { ShareButton } from './ShareButton';

interface AboutPageProps {
  onNavigate?: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* SECTION 1 — Opening Hook & Share */}
      <section className="text-center pt-10 sm:pt-14 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F9E8EC] text-[#78122B] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Purpose</span>
          </span>
          <ShareButton 
            title="About Qalbiya Islamic Institute - Our Purpose & Story"
            text="Qalbiya exists to connect knowledge to the heart — not through guilt, but through a slow, honest, and rooted return."
            variant="compact"
            lightTheme
          />
        </div>
        <h1 className="serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23181A] leading-[1.25] tracking-tight">
          Qalbiya wasn't built because the world needed another Islamic page. It was built because so many of us needed a way back.
        </h1>
      </section>

      {/* SECTION 2 — The Gap / The Why */}
      <section className="max-w-2xl mx-auto text-center space-y-6 bg-[#FDFBF7] p-8 sm:p-10 rounded-3xl border border-[#E8DDD9] shadow-xs">
        <p className="text-base sm:text-lg leading-relaxed text-[#5C4D50] font-normal">
          So many of us grew up knowing the rules of our deen, but never really knowing the heart of it. We memorized without meaning. We prayed without presence. And somewhere between the noise of the dunya and the pressure to keep up, our connection with Allah became something we performed — not something we felt.
        </p>
        <div className="w-12 h-0.5 bg-[#78122B]/20 mx-auto" />
        <p className="text-base sm:text-lg leading-relaxed text-[#23181A] font-semibold italic">
          Qalbiya exists to change that. Not through guilt. Not through more information. But through a return — slow, honest, and rooted.
        </p>
      </section>

      {/* SECTION 3 — Founder Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
        {/* Founder Image Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-[#E8DDD9] bg-[#FAF8F5] shadow-xl group">
            <img
              src={founderWorkspace}
              alt="Ms. Mustara, Founder of Qalbiya Islamic Institute"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/5] object-cover filter brightness-[0.97] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/80 via-[#23181A]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[11px] font-bold text-[#F3D797] uppercase tracking-widest block">Founder & Lead Mentor</span>
              <p className="text-xl font-serif font-bold tracking-tight">Ms. Mustara</p>
              <p className="text-xs text-white/80 font-medium">Qalbiya Islamic Institute</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F9E8EC]/60 border border-[#E8DDD9] text-center">
            <p className="text-xs font-serif italic text-[#78122B]">
              "If ilm never reaches our character and daily life — what was the point?"
            </p>
          </div>
        </div>

        {/* Story Text Column */}
        <div className="lg:col-span-7 space-y-5 text-sm sm:text-base leading-relaxed text-[#5C4D50] max-w-prose">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78122B] block">Founder's Journey</span>
          <h2 className="serif-heading text-2xl sm:text-3xl font-bold text-[#23181A]">
            The Story Behind the Heart
          </h2>

          <p>
            My own perspective has always been simple: knowledge without action is of no benefit. If we gain ilm, but that ilm never reaches our character, never reaches our daily life — what was the point?
          </p>

          <p>
            Early in my own learning journey, I remember sitting through Seerah class after Seerah class — learning the life of the Prophet <span className="font-serif text-[#78122B] font-semibold">ﷺ</span>, his patience, his mercy, his character in the hardest moments. It was beautiful ilm. But slowly, a frustration started building in me. We were taught the story, but never asked to become it. No one paused to say, <em>"here's how you carry his sabr into your own hard days,"</em> or <em>"here's what his akhlaq looks like in your home, your relationships, your reactions."</em> The seerah stayed a story on a page, when it was meant to be a mirror.
          </p>

          <p>
            That disappointment built up over time — not from one class, but from realizing this was the pattern everywhere. Information was abundant. Structure was nowhere. And the people willing to actually walk students through <em>"here's how you apply this"</em> — they were almost impossible to find.
          </p>

          <div className="py-2">
            <p className="text-lg sm:text-xl font-serif font-bold text-[#78122B] border-l-4 border-[#78122B] pl-4 py-1">
              That gap is where Qalbiya began.
            </p>
          </div>

          <p>
            I didn't want to build another place that fills your mind and leaves your life untouched. I wanted to build a place where every lesson comes with a next step — where ilm is never separated from amal, where growth isn't a feeling, it's a practice.
          </p>

          <p className="font-medium text-[#23181A]">
            That's why every program at Qalbiya is built around one question: not <em>"what did you learn,"</em> but <strong>"what changed?"</strong>
          </p>
        </div>
      </section>

      {/* SECTION 4 — Mission Statement */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#78122B] to-[#540B1D] text-white p-8 sm:p-14 text-center shadow-2xl space-y-4">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-[#F3D797]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 text-[#F3D797] mb-2">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        
        <span className="block text-xs font-bold uppercase tracking-widest text-[#F3D797]/90">
          Our Core Mission
        </span>
        
        <blockquote className="serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto leading-tight tracking-tight text-white">
          "Qalbiya Islamic Institute exists to help hearts return — women to their Lord, and children to a faith they'll carry with love, not obligation."
        </blockquote>

        <p className="text-xs text-white/70 pt-2 font-mono uppercase tracking-wider">
          — Qalbiya Islamic Institute
        </p>
      </section>

      {/* SECTION 5 — What Makes Qalbiya Different */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78122B]">Methodology</span>
          <h2 className="serif-heading text-2xl sm:text-3xl font-bold text-[#23181A]">
            What Makes Qalbiya Different
          </h2>
          <p className="text-sm text-[#5C4D50]">
            Three foundational commitments guiding every class, mentorship, and curriculum we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Item 1 */}
          <div className="p-8 rounded-3xl border border-[#E8DDD9] bg-[#FAF8F5] hover:bg-white hover:border-[#78122B]/30 hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="serif-heading text-xl font-bold text-[#23181A]">
              Rooted in Authentic Knowledge
            </h3>
            <p className="text-sm text-[#5C4D50] leading-relaxed">
              Every lesson is grounded in authentic Qur'an and Sunnah — no diluted, trend-based Islam.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-8 rounded-3xl border border-[#E8DDD9] bg-[#FAF8F5] hover:bg-white hover:border-[#78122B]/30 hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="serif-heading text-xl font-bold text-[#23181A]">
              Heart-Centered Learning
            </h3>
            <p className="text-sm text-[#5C4D50] leading-relaxed">
              We teach for transformation, not just information — the heart is engaged, not just the mind.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-8 rounded-3xl border border-[#E8DDD9] bg-[#FAF8F5] hover:bg-white hover:border-[#78122B]/30 hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F9E8EC] text-[#78122B] flex items-center justify-center font-serif text-xl font-bold group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="serif-heading text-xl font-bold text-[#23181A]">
              Built for Real Life
            </h3>
            <p className="text-sm text-[#5C4D50] leading-relaxed">
              Designed for real, busy, imperfect lives — not idealized ones.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Closing CTA */}
      <section className="text-center bg-[#FDFBF7] p-10 sm:p-14 rounded-3xl border border-[#E8DDD9] space-y-6 shadow-sm">
        <h3 className="serif-heading text-2xl sm:text-3xl font-bold text-[#23181A] max-w-xl mx-auto leading-snug">
          If your heart has been quietly asking for a way back — you're in the right place.
        </h3>
        <div>
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#78122B] hover:bg-[#630E23] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};
