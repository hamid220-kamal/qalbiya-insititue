import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [hoveredWa, setHoveredWa] = useState(false);
  const [hoveredInsta, setHoveredInsta] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Instagram Floating Button */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {hoveredInsta && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.95 }}
              className="hidden sm:block bg-slate-900/95 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/10"
              style={{ pointerEvents: 'none' }}
            >
              Follow on Instagram
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://instagram.com/qalbiya_institute"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredInsta(true)}
          onMouseLeave={() => setHoveredInsta(false)}
          whileHover={{ scale: 1.1, translateY: -2 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-2xl transition-all relative group cursor-pointer"
          aria-label="Follow Qalbiya Institute on Instagram"
          id="floating-instagram-btn"
        >
          {/* Ambient Ring Glow */}
          <span className="absolute inset-0 rounded-full bg-[#ee2a7b] opacity-25 animate-pulse group-hover:scale-105 transition-all" />
          
          {/* Instagram Icon */}
          <Instagram className="w-6 h-6 relative z-10 text-white" />
        </motion.a>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {hoveredWa && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.95 }}
              className="hidden sm:block bg-slate-900/95 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/10"
              style={{ pointerEvents: 'none' }}
            >
              Chat with Ms. Mustara
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/918145363290?text=Assalamu%20Alaikum%2C%20I%20have%20an%20inquiry%20about%20Qalbiya%20Islamic%20Institute."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredWa(true)}
          onMouseLeave={() => setHoveredWa(false)}
          whileHover={{ scale: 1.1, translateY: -2 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition-colors relative group cursor-pointer"
          aria-label="Contact Ms. Mustara on WhatsApp"
          id="floating-whatsapp-btn"
        >
          {/* Ambient Ring Glow */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping group-hover:animate-none group-hover:scale-105 transition-all" />
          
          {/* WhatsApp Icon */}
          <svg
            className="w-7 h-7 fill-current relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053 1.048 12.006 1.048c-5.448 0-9.876 4.373-9.88 9.802-.002 1.81.481 3.578 1.393 5.113L2.533 21.67l5.114-1.316zm10.743-7.142c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
        </motion.a>
      </div>

    </div>
  );
};
