import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, Mail, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  variant?: 'button' | 'icon' | 'banner' | 'compact';
  className?: string;
  lightTheme?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text = 'Explore knowledge that reaches the heart at Qalbiya Islamic Institute.',
  url,
  variant = 'button',
  className = '',
  lightTheme = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://qalbiya.org');
  const encodedUrl = encodeURIComponent(targetUrl);
  const encodedText = encodeURIComponent(`${title}\n\n${text}`);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: targetUrl,
        });
        return;
      } catch (err) {
        // Fallback to custom share drawer if user cancelled or error
      }
    }
    setIsOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] text-white hover:bg-[#20bd5a]',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] text-white hover:bg-[#1d8dbf]',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: 'X (Twitter)',
      icon: Share2,
      color: 'bg-[#14171A] text-white hover:bg-[#000000]',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#78122B] text-white hover:bg-[#630E23]',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button Variants */}
      {variant === 'button' && (
        <button
          onClick={handleNativeShare}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-xs active:scale-98 ${
            lightTheme
              ? 'bg-[#F9E8EC] text-[#78122B] hover:bg-[#78122B] hover:text-white border border-[#78122B]/20'
              : 'bg-panel-light text-text-cream hover:text-accent-gold border border-brand-border hover:border-accent-gold/40'
          }`}
          id="share-btn"
          aria-label="Share page"
        >
          <Share2 className="w-4 h-4 text-accent-gold shrink-0" />
          <span>Share</span>
        </button>
      )}

      {variant === 'compact' && (
        <button
          onClick={handleNativeShare}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
            lightTheme
              ? 'bg-[#FAF8F5] text-[#5C4D50] hover:bg-[#F9E8EC] hover:text-[#78122B] border border-[#E8DDD9]'
              : 'bg-panel-dark text-text-sage hover:text-text-cream border border-brand-border'
          }`}
          aria-label="Share"
        >
          <Share2 className="w-3.5 h-3.5 text-[#78122B] shrink-0" />
          <span>Share</span>
        </button>
      )}

      {variant === 'icon' && (
        <button
          onClick={handleNativeShare}
          className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            lightTheme
              ? 'bg-[#FAF8F5] text-[#78122B] hover:bg-[#F9E8EC] border border-[#E8DDD9] shadow-2xs'
              : 'bg-panel-light text-text-cream hover:text-accent-gold border border-brand-border'
          }`}
          title="Share this page"
          aria-label="Share icon"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {variant === 'banner' && (
        <div
          onClick={handleNativeShare}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
            lightTheme
              ? 'bg-[#FAF8F5] border-[#E8DDD9] hover:border-[#78122B]/40 hover:bg-[#F9E8EC]/40'
              : 'bg-panel-dark border-brand-border hover:border-accent-gold/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#78122B]/10 text-[#78122B] flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-[#78122B]" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${lightTheme ? 'text-[#23181A]' : 'text-text-cream'}`}>
                Share this Sacred Knowledge
              </h4>
              <p className={`text-[11px] ${lightTheme ? 'text-[#5C4D50]' : 'text-text-sage'}`}>
                Pass on benefit to family and friends
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#78122B] bg-[#F9E8EC] px-3 py-1.5 rounded-xl">
            Share Link
          </span>
        </div>
      )}

      {/* Custom Share Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-[201] w-full max-w-sm rounded-3xl bg-[#FAF8F5] border border-[#E8DDD9] p-6 shadow-2xl space-y-6 text-[#23181A]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD9]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#F9E8EC] text-[#78122B]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#23181A]">Share Page</h3>
                    <p className="text-[11px] text-[#5C4D50]">Spread beneficial knowledge</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-[#E8DDD9] text-[#5C4D50] hover:bg-[#F9E8EC] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title / Description Preview */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8DDD9] space-y-1">
                <h4 className="font-serif font-bold text-xs text-[#78122B] line-clamp-1">{title}</h4>
                <p className="text-[11px] text-[#5C4D50] line-clamp-2 leading-relaxed">{text}</p>
              </div>

              {/* Social Channels Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {shareOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <a
                      key={opt.name}
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer ${opt.color}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{opt.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Copy Link Input Bar */}
              <div className="pt-2 border-t border-[#E8DDD9] space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5C4D50]">
                  Direct Link
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={targetUrl}
                    className="flex-1 bg-white border border-[#E8DDD9] rounded-xl px-3 py-2 text-xs text-[#23181A] truncate focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      copied
                        ? 'bg-[#2E6B38] text-white'
                        : 'bg-[#78122B] text-white hover:bg-[#630E23]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
