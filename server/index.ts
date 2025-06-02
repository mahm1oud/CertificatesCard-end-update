/**
 * نقطة الدخول الموحدة - الخادم الكامل لتطبيق واحد
 * يتعامل مع:
 * 1. API (المصادقة، القواعد، قواعد البيانات)
 * 2. تقديم الواجهة الأمامية (React)
 */
/*
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import * as schema from "../shared/schema";
import { setupAuth } from './auth';
import { registerRoutes } from './routes';
import { checkDatabaseConnection, db } from './lib/db-adapter';
import { ensureDefaultAdminExists } from './init-db';

// تحميل متغيرات البيئة
dotenv.config();

// التهيئة العامة
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const PORTS = [Number(process.env.PORT) || 5000, 3000, 80];
const sessionSecret = process.env.SESSION_SECRET || 'change_this_secret_in_production';

// إنشاء تطبيق Express
const app = express();

// إعداد Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// إعداد CORS
app.use(cors({
  origin: isDevelopment ? true : process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
}));

// إعداد الجلسات
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000, // يوم واحد
  }
}));

// إعداد المصادقة
setupAuth(app);

// نقطة تشغيل الخادم
async function startServer() {
  try {
    // تحقق من الاتصال بقاعدة البيانات PostgreSQL
  //  const dbOk = await checkDatabaseConnection();
 //   if (!dbOk) throw new Error('فشل الاتصال بقاعدة البيانات PostgreSQL');
  //  console.log('✅ الاتصال بقاعدة البيانات PostgreSQL ناجح');

    // إنشاء المستخدم admin الافتراضي
    await ensureDefaultAdminExists();
    console.log('✅ تم التأكد من وجود مستخدم admin');

    // تسجيل مسارات API
    await registerRoutes(app);

    // إعداد مجلد الواجهة الأمامية
    const staticPaths = [
      path.resolve(process.cwd(), 'dist/public'),
      path.resolve(process.cwd(), 'client/build'),
      path.resolve(process.cwd(), 'client/dist'),
      path.resolve(process.cwd(), 'client/static'),
    ];

    let publicDir = staticPaths.find(fs.existsSync);

    if (publicDir) {
      console.log(`📂 تقديم الواجهة من: ${publicDir}`);
      app.use(express.static(publicDir, {
        setHeaders(res, filePath) {
          if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
          if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
          if (filePath.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
        }
      }));

      // التوجيه لجميع المسارات للـ index.html (SPA)
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) return next();
        const indexPath = path.join(publicDir!, 'index.html');
        if (fs.existsSync(indexPath)) {
          return res.sendFile(indexPath);
        } else {
          return res.status(404).send('⚠️ لم يتم العثور على واجهة المستخدم');
        }
      });
    } else {
      console.warn('⚠️ لم يتم العثور على مجلد الواجهة الأمامية - وضع API فقط');
    }

    // معالج أخطاء عام
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('❌ خطأ في الخادم:', err);
      res.status(500).json({
        message: 'حدث خطأ في الخادم',
        error: isDevelopment ? err.message : undefined
      });
    });

    // محاولة الاستماع على المنافذ المتاحة
    let serverStarted = false;
    for (const port of PORTS) {
      try {
        await new Promise<void>((resolve, reject) => {
          const server = createServer(app);
          server.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`⚠️ المنفذ ${port} مستخدم، محاولة المنفذ التالي...`);
              reject();
            } else {
              console.error(`❌ خطأ في المنفذ ${port}:`, err);
              reject(err);
            }
          });
          server.listen(port, '0.0.0.0', () => {
            const time = new Date().toLocaleTimeString();
            console.log(`${time} 🚀 الخادم يعمل على http://localhost:${port}`);
            serverStarted = true;
            resolve();
          });
        });
        if (serverStarted) break;
      } catch {
        continue;
      }
    }

    if (!serverStarted) {
      throw new Error('❌ فشل في بدء الاستماع على أي منفذ');
    }

    // التقاط أخطاء غير متوقعة
    process.on('uncaughtException', err => {
      console.error('❌ خطأ غير متوقع:', err);
    });

    process.on('unhandledRejection', reason => {
      console.error('❌ وعد مرفوض غير معالج:', reason);
    });

  } catch (err) {
    console.error('❌ فشل بدء الخادم:', err);
    process.exit(1);
  }
}

// بدء الخادم
startServer();

export { app };
*/

/**
 * نقطة الدخول الموحدة - الخادم الكامل لتطبيق واحد
 * يتعامل مع:
 * 1. API (المصادقة، القواعد، قواعد البيانات)
 * 2. تقديم الواجهة الأمامية (React)
 */

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import * as schema from "../shared/schema";
import { setupAuth } from './auth';
import { registerRoutes } from './routes';
import { checkDatabaseConnection, db } from './lib/db-adapter';
import { ensureDefaultAdminExists } from './init-db';

// تحميل متغيرات البيئة
dotenv.config();

// التهيئة العامة
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const PORTS = [Number(process.env.PORT) || 5000, 3000, 80];
const sessionSecret = process.env.SESSION_SECRET || 'change_this_secret_in_production';

// إنشاء تطبيق Express
const app = express();

// إعداد Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// إعداد CORS
app.use(cors({
  origin: isDevelopment ? true : process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
}));
/*
// إعداد الجلسات
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000, // يوم واحد
  }
}));*/

// إعداد المصادقة
setupAuth(app);

// دالة بدء تشغيل السيرفر
async function startServer() {
  try {
    // تحقق من الاتصال بقاعدة البيانات (اختياري)
    // const dbOk = await checkDatabaseConnection();
    // if (!dbOk) throw new Error('فشل الاتصال بقاعدة البيانات PostgreSQL');
    // console.log('✅ الاتصال بقاعدة البيانات PostgreSQL ناجح');

    // إنشاء المستخدم admin الافتراضي
    await ensureDefaultAdminExists();
    console.log('✅ تم التأكد من وجود مستخدم admin');

    // تسجيل مسارات API
    await registerRoutes(app);

    // إعداد مجلد الواجهة الأمامية
    const staticPaths = [
      path.resolve(process.cwd(), 'dist/public'),
      path.resolve(process.cwd(), 'client/build'),
      path.resolve(process.cwd(), 'client/dist'),
      path.resolve(process.cwd(), 'client/static'),
    ];

    let publicDir = staticPaths.find(fs.existsSync);

    if (publicDir) {
      console.log(`📂 تقديم الواجهة من: ${publicDir}`);
      app.use(express.static(publicDir, {
        setHeaders(res, filePath) {
          if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
          if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
          if (filePath.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
        }
      }));

      // التوجيه لجميع المسارات للـ index.html (SPA)
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) return next();
        const indexPath = path.join(publicDir!, 'index.html');
        if (fs.existsSync(indexPath)) {
          return res.sendFile(indexPath);
        } else {
          return res.status(404).send('⚠️ لم يتم العثور على واجهة المستخدم');
        }
      });
    } else {
      console.warn('⚠️ لم يتم العثور على مجلد الواجهة الأمامية - وضع API فقط');
    }

    // معالج أخطاء عام
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('❌ خطأ في الخادم:', err);
      res.status(500).json({
        message: 'حدث خطأ في الخادم',
        error: isDevelopment ? err.message : undefined
      });
    });

    // محاولة الاستماع على المنافذ المتاحة
    let serverStarted = false;
    for (const port of PORTS) {
      try {
        await new Promise<void>((resolve, reject) => {
          const server = createServer(app);
          server.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`⚠️ المنفذ ${port} مستخدم، محاولة المنفذ التالي...`);
              reject();
            } else {
              console.error(`❌ خطأ في المنفذ ${port}:`, err);
              reject(err);
            }
          });
          server.listen(port, '0.0.0.0', () => {
            const time = new Date().toLocaleTimeString();
            console.log(`${time} 🚀 الخادم يعمل على http://localhost:${port}`);
            serverStarted = true;
            resolve();
          });
        });
        if (serverStarted) break;
      } catch {
        continue;
      }
    }

    if (!serverStarted) {
      throw new Error('❌ فشل في بدء الاستماع على أي منفذ');
    }

    // التقاط أخطاء غير متوقعة
    process.on('uncaughtException', err => {
      console.error('❌ خطأ غير متوقع:', err);
    });

    process.on('unhandledRejection', reason => {
      console.error('❌ وعد مرفوض غير معالج:', reason);
    });

  } catch (err) {
    console.error('❌ فشل بدء الخادم:', err);
    process.exit(1);
  }
}

// بدء الخادم
startServer();

export { app };
