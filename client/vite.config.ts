import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// دالة لتكوين إعدادات Vite بناءً على بيئة التشغيل
export default defineConfig(({ mode }) => {
  // تحميل متغيرات البيئة من ملف .env المناسب
  const env = loadEnv(mode, process.cwd());
  
  // تحديد ما إذا كنا في بيئة تطوير أو إنتاج
  const isDevelopment = mode === 'development';
  
  // قاعدة URL للـ API، من متغيرات البيئة أو القيمة الافتراضية
 // const apiUrl = env.VITE_API_URL || '/api';
  
  // إعدادات أساسية مشتركة
  const config = {
 plugins: [react()],
    optimizeDeps: {
      include: ['fabric'],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "../shared"),
        "@assets": path.resolve(__dirname, "../attached_assets"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      // تمكين source maps في بيئة التطوير فقط
      sourcemap: isDevelopment,
      // تحسينات بناء الإنتاج
      minify: !isDevelopment,
      // زيادة الحد المسموح به لحجم الملفات قبل ظهور تحذير
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            // فصل مكتبات React الرئيسية
            react: ['react', 'react-dom'],
            // فصل مكتبات React Query
            'react-query': ['@tanstack/react-query'],
            // فصل مكتبات UI المشتركة - مقسمة إلى مجموعات صغيرة
            'ui-core': [
              'class-variance-authority',
              'clsx',
              'tailwind-merge'
            ],
            'ui-radix-1': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-popover',
              '@radix-ui/react-toast'
            ],
            'ui-radix-2': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-tabs'
            ],
            'ui-radix-3': [
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-label'
            ],
            'ui-icons': ['lucide-react'],
            // فصل مكتبات معالجة النماذج
            form: ['react-hook-form', '@hookform/resolvers', 'zod'],
            // فصل مكتبات الرسم والصور
            konva: ['konva', 'react-konva'],
            fabric: ['fabric']
          },
          // تحسين أسماء الملفات
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port: 3000,
      // استخدام وكيل في بيئة التطوير فقط
      proxy: undefined
    }
  };
  
  return config;
});
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Your App Name',
        short_name: 'App',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    }
  }
});



*/