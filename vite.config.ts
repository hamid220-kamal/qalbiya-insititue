import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks to reduce main bundle
            'vendor-motion': ['motion/react'],
            'vendor-lucide': ['lucide-react'],
            
            // Route-specific chunks
            'route-programs': ['./src/components/ProgramsHub'],
            'route-courses': ['./src/components/FreeCoursesPage', './src/components/CourseDetailView'],
            'route-sacred': ['./src/components/AsmaUlHusnaPage', './src/components/FivePillarsPage'],
            'route-info': ['./src/components/FAQPage', './src/components/RefundPolicyPage', './src/components/TermsAndConditionsPage', './src/components/PrivacyPolicyPage'],
            'route-contact': ['./src/components/ContactPage', './src/components/ScholarshipPage'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify – file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
