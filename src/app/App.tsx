import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Menu, X, Globe, CheckCircle2, XCircle, 
  MapPin, BarChart3, Users, Smartphone, 
  ShieldCheck, ArrowRight, Mail, Phone, 
  ChevronRight, Camera, Search, FileDown, 
  LayoutDashboard, Layers, Database, Lock, ArrowUpRight, Zap, Sparkles, Plus,
  PackageCheck, TrendingUp, PieChart, Activity, ChevronLeft,
  CloudUpload,
  Barcode,
  UserCheck,
  Truck,
  Utensils,
  ShoppingBag,
  Package,
  Boxes
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SliderItem = {
  id: number;
  image: string;
};

export default function CapturedPremium() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isRTL = lang === 'ar';

  // مراقبة التمرير
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations المُصلحة - إصلاح مشكلة الظهور المتقطع
  useGSAP(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', moveCursor);

    // Hero animations مع تثبيت الظهور
    gsap.from('.hero-content > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'expo.out',
    });

    // Reveal animations المُصلحة - حل مشكلة الظهور المتقطع
    const revealElements = gsap.utils.toArray('.reveal-up');
    revealElements.forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 80,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
            markers: false,
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'all', // مهم جداً لإزالة الأنميشن بعد الانتهاء
        }
      );
    });

    return () => window.removeEventListener('mousemove', moveCursor);
  }, { scope: mainRef, dependencies: [] });

  // Slider API
  useEffect(() => {
    fetch('https://captured-sa.com/api/sliders')
      .then(res => res.json())
      .then(data => {
        if (data.status && Array.isArray(data.data)) {
          const prepared: SliderItem[] = data.data.map((s: any, index: number) => ({
            id: s.id ?? index,
            image: s.image,
          }));
          setSlides(prepared);
          setCurrentSlide(0);
        } else {
          setSlides([]);
        }
      })
      .catch(() => setSlides([]))
  }, []);

  // Auto slider
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  const navItems = ['home', 'problem', 'features', 'app', 'dashboard', 'pricing', 'contact'];

  const hasSlides = slides.length > 0;
  const currentImage = hasSlides ? slides[currentSlide]?.image : '';

  function goToSlide(index: number): void {
    setCurrentSlide(index);
  }

  function nextSlide(): void {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }

  function prevSlide(): void {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div
      ref={mainRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-[#F8FAFC] text-slate-900 font-cairo overflow-x-hidden selection:bg-blue-600 selection:text-white"
    >
      {/* Import Cairo Font & Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
        .font-cairo { font-family: 'Cairo', sans-serif; }
        .text-gradient {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        html { scroll-behavior: smooth; }
        
        /* إطار iPhone للصور */
        .iphone-frame {
          position: relative;
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
          padding: 18px 14px;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 52px;
          box-shadow: 
            0 0 0 3px rgba(255,255,255,0.12),
            0 35px 70px -18px rgba(0,0,0,0.6),
            inset 0 0 0 1px rgba(255,255,255,0.06);
        }
        
        .iphone-frame::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 130px;
          height: 32px;
          background: #1a1a1a;
          border-radius: 0 0 22px 22px;
          z-index: 10;
        }
        
        .iphone-frame::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 7px;
          background: #333;
          border-radius: 12px;
          z-index: 11;
        }
        
        .iphone-screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 40px;
          overflow: hidden;
          background: #000;
          z-index: 5;
        }
        
        .iphone-frame .power-button {
          position: absolute;
          right: -4px;
          top: 130px;
          width: 4px;
          height: 70px;
          background: linear-gradient(90deg, #2d2d2d, #1a1a1a);
          border-radius: 0 3px 3px 0;
        }
        
        .iphone-frame .volume-button {
          position: absolute;
          left: -4px;
          top: 110px;
          width: 4px;
          height: 40px;
          background: linear-gradient(90deg, #1a1a1a, #2d2d2d);
          border-radius: 3px 0 0 3px;
        }
        
        .iphone-frame .volume-button.down {
          top: 160px;
        }
      `}</style>

      {/* Custom Floating Cursor */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed w-8 h-8 border-2 border-blue-600/30 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
      />

      {/* --- Premium Navigation --- */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex justify-between items-center px-8 py-4 rounded-[2rem] border transition-all duration-500 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-xl'
                : 'bg-white/40 backdrop-blur-lg border-white/40 shadow-md'
            }`}
          >
            <div className="flex items-center">
  <img
    src="/images/logo.png"
    alt="CapTured Logo"
    className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
  />
</div>


            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map(item => (
                <ScrollLink
                  key={item}
                  to={item}
                  smooth
                  spy
                  offset={-100}
                  className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-widest"
                >
                  {item === 'home'
                    ? isRTL ? 'الرئيسية' : 'Home'
                    : item === 'problem'
                    ? isRTL ? 'المشكلة' : 'Problem'
                    : item === 'features'
                    ? isRTL ? 'المميزات' : 'Features'
                    : item === 'app'
                    ? isRTL ? 'التطبيق' : 'App'
                    : item === 'dashboard'
                    ? isRTL ? 'اللوحة' : 'Dashboard'
                    : item === 'pricing'
                    ? isRTL ? 'الباقات' : 'Pricing'
                    : isRTL ? 'اتصل بنا' : 'Contact'}
                </ScrollLink>
              ))}
              <button
                onClick={() => setLang(l => (l === 'ar' ? 'en' : 'ar'))}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Globe size={16} />
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 backdrop-blur-lg p-2 text-slate-700 shadow-sm"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-2xl shadow-2xl px-4 py-3 space-y-1"
              >
                {navItems.map(item => (
                  <ScrollLink
                    key={item}
                    to={item}
                    smooth
                    spy
                    offset={-90}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    {item === 'home'
                      ? isRTL ? 'الرئيسية' : 'Home'
                      : item === 'problem'
                      ? isRTL ? 'المشكلة' : 'Problem'
                      : item === 'features'
                      ? isRTL ? 'المميزات' : 'Features'
                      : item === 'app'
                      ? isRTL ? 'التطبيق' : 'App'
                      : item === 'dashboard'
                      ? isRTL ? 'اللوحة' : 'Dashboard'
                      : item === 'pricing'
                      ? isRTL ? 'الباقات' : 'Pricing'
                      : isRTL ? 'اتصل بنا' : 'Contact'}
                  </ScrollLink>
                ))}

                <div className="pt-2 mt-1 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => setLang(l => (l === 'ar' ? 'en' : 'ar'))}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
                  >
                    <Globe size={16} />
                    {lang === 'ar' ? 'English' : 'العربية'}
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition-colors">
                    {isRTL ? 'ابدأ الآن' : 'Get Started'}
                    <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

  
<section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
>
  {/* Background Slider */}
  <div className="absolute inset-0 z-0">
    <AnimatePresence mode="wait">
      {hasSlides && (
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 py-24 text-center">
    <div className="max-w-5xl mx-auto flex flex-col items-center">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-10 backdrop-blur-sm"
      >
        <Sparkles size={14} />
        <span>
          {isRTL ? 'الحل الأذكى للتوثيق الميداني' : 'Smartest Field Documentation Solution'}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight"
      >
        {isRTL ? (
          <>وثّق عملياتك <span className="text-blue-500">بدقة GPS</span> حقيقية</>
        ) : (
          <>Document Operations With <span className="text-blue-500">Real GPS</span> Accuracy</>
        )}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-14"
      >
        {isRTL
          ? 'منصة متكاملة لتوثيق العمليات الميدانية بالصور الحية والمواقع الدقيقة مع حماية متقدمة ضد التلاعب.'
          : 'Complete platform for documenting field operations with live photos and precise GPS locations with anti-tampering protection.'}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 mb-20"
      >
        <button className="group px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
          {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Trial'}
          <ArrowRight
            size={20}
            className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
          />
        </button>

        <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
          <Camera size={20} />
          {isRTL ? 'شاهد العرض' : 'Watch Demo'}
        </button>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-6"
      >
        {[
          { icon: <ShieldCheck size={20} />, text: isRTL ? 'حماية متقدمة' : 'Advanced Protection' },
          { icon: <MapPin size={20} />, text: isRTL ? 'GPS دقيق' : 'Precise GPS' },
          { icon: <Lock size={20} />, text: isRTL ? 'بيانات مشفّرة' : 'Encrypted Data' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
              {item.icon}
            </div>
            <span className="font-medium text-slate-200 text-sm">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </div>

  {/* Pagination */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`transition-all duration-300 rounded-full ${
          index === currentSlide
            ? 'w-10 h-2 bg-blue-500'
            : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
        }`}
      />
    ))}
  </div>
</section>


      {/* --- Problem & Solution --- */}
     <section id="problem-solution" className="py-40 px-6 relative bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* قسم المشكلة - The Problem */}
        <div className="reveal-up p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all duration-500">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-10">
            <XCircle size={30} />
          </div>
          <h2 className="text-4xl font-black mb-8 text-slate-900">
            {isRTL ? 'المشكلة' : 'The Problem'}
          </h2>
          <ul className="space-y-6">
            {[
              {
                ar: 'عدم وجود توثيق رسمي موحّد لكل عملية تسليم.',
                en: 'Lack of unified official documentation for deliveries.'
              },
              {
                ar: 'إمكانية إرسال صور قديمة بدل التصوير المباشر.',
                en: 'Risk of using old photos instead of live capture.'
              },
              {
                ar: 'اختلاف البيانات بين الفروع والإدارة الرئيسية.',
                en: 'Data discrepancy between branches and management.'
              },
              {
                ar: 'صعوبة البحث اليدوي عند كثرة العمليات.',
                en: 'Difficulty searching records as operations scale.'
              },
              {
                ar: 'استهلاك مساحة التخزين بملفات غير منظمة.',
                en: 'Wasted storage due to disorganized large files.'
              }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-slate-500 font-bold text-lg">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-3 shrink-0" /> 
                <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* قسم الحل - The Solution */}
        <div className="reveal-up p-12 rounded-[3.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20">
            <CheckCircle2 size={30} />
          </div>
          <h2 className="text-4xl font-black mb-8">
            {isRTL ? 'الحل مع CapTured' : 'The CapTured Solution'}
          </h2>
          <ul className="space-y-6 relative z-10">
            {[
              {
                ar: 'توثيق إلزامي لكل عملية تسليم ببيانات دقيقة.',
                en: 'Mandatory documentation with precise data.'
              },
              {
                ar: 'دعم رفع صور وفيديوهات متعددة بجودة عالية.',
                en: 'High-quality multi-photo and video support.'
              },
              {
                ar: 'علامة مائية تلقائية تشمل الوقت والموقع GPS.',
                en: 'Auto-watermark including time and GPS location.'
              },
              {
                ar: 'سجلات غير قابلة للتعديل لضمان النزاهة.',
                en: 'Tamper-proof records ensuring integrity.'
              },
              {
                ar: 'لوحة تحكم ذكية للإدارة والبحث والتصدير.',
                en: 'Smart dashboard for management and exporting.'
              }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start font-bold text-lg">
                <div className="w-2 h-2 rounded-full bg-blue-200 mt-3 shrink-0" /> 
                <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
      
<section id="how-it-works" className="py-32 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-black mb-6 text-slate-900">
        {isRTL ? 'كيف يعمل CapTured؟' : 'How CapTured Works?'}
      </h2>
      <p className="text-slate-500 font-bold italic">
        {isRTL ? 'خطوات بسيطة لتوثيق احترافي' : 'Simple steps for professional documentation'}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
      {[
        {
          step: "01",
          ar: "تسجيل الدخول",
          en: "Login",
          desc_ar: "الدخول بحساب المستخدم المرتبط بفرعه",
          desc_en: "Log in with the account linked to your branch",
          icon: <UserCheck className="text-blue-600" />
        },
        {
          step: "02",
          ar: "إدخال الطلب",
          en: "Enter Order",
          desc_ar: "إدخال رقم الطلب أو مسحه بالباركود",
          desc_en: "Enter order number or scan barcode",
          icon: <Barcode className="text-blue-600" />
        },
        {
          step: "03",
          ar: "التوثيق الذكي",
          en: "Smart Capture",
          desc_ar: "النظام يحدد الموقع، الوقت، والتصوير المباشر",
          desc_en: "System auto-detects GPS, Time, and captures photo/video",
          icon: <Camera className="text-blue-600" />
        },
        {
          step: "04",
          ar: "الاعتماد والرفع",
          en: "Submit & Sync",
          desc_ar: "مراجعة سريعة ثم رفع السجل بشكل رسمي",
          desc_en: "Quick review then official upload to cloud",
          icon: <CloudUpload className="text-blue-600" />
        }
      ].map((item, idx) => (
        <div key={idx} className="relative p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
          <span className="text-6xl font-black text-blue-600/10 absolute top-4 right-6 group-hover:text-blue-600/20 transition-colors">
            {item.step}
          </span>
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10">
            {item.icon}
          </div>
          <h4 className="text-xl font-black mb-3 text-slate-900">
            {isRTL ? item.ar : item.en}
          </h4>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">
            {isRTL ? item.desc_ar : item.desc_en}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
<section id="full-features" className="py-32 px-6 bg-slate-900 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
          {isRTL ? 'مميزات تقنية متكاملة' : 'Integrated Technical Features'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { ar: 'توثيق كامل للعملية', en: 'Full Process Logs' },
            { ar: 'ربط مع تطبيقات التوصيل', en: 'Delivery App Integration' },
            { ar: 'علامة مائية (Watermark)', en: 'Automatic Watermarking' },
            { ar: 'منع التعديل نهائياً', en: 'Tamper-proof Records' },
            { ar: 'ميديا عالية الجودة', en: 'High-Res Media' },
            { ar: 'تحديد الموقع GPS', en: 'Auto GPS Tagging' }
          ].map((feat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="font-bold text-slate-300">{isRTL ? feat.ar : feat.en}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-[3rem] border border-white/10">
        <h4 className="text-2xl font-black mb-6 text-blue-400">
          {isRTL ? 'محرك البحث المتقدم' : 'Advanced Search Engine'}
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center text-sm">
            <span className="text-slate-400">{isRTL ? 'البحث بواسطة:' : 'Search by:'}</span>
            <span className="text-blue-300 font-black">{isRTL ? 'رقم الطلب / التاريخ / المستخدم' : 'Order ID / Date / User'}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed italic">
            {isRTL 
              ? '* يتيح لك النظام استعراض الصور وتكبيرها بدقة عالية وتصديرها كملفات  رسمية.' 
              : '* View high-res photos with zoom capabilities and export them as official  files.'}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<section id="sectors" className="py-32 px-6 bg-[#F8FAFC]">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-black mb-16 text-slate-900">
      {isRTL ? 'القطاعات المناسبة' : 'Ideal Sectors'}
    </h2>
    
    <div className="flex flex-wrap justify-center gap-6">
      {[
        { ar: 'الخدمات اللوجستية', en: 'Logistics Services', icon: <Truck size={20} /> },
        { ar: 'المطاعم والكافيهات', en: 'Restaurants & Cafes', icon: <Utensils size={20} /> },
        { ar: 'السوبرماركت والمتاجر', en: 'Retail & Supermarkets', icon: <ShoppingBag size={20} /> },
        { ar: 'شركات التوزيع', en: 'Distribution Companies', icon: <Package size={20} /> },
        { ar: 'خدمات التوريد', en: 'Supply Chain', icon: <Boxes size={20} /> }
      ].map((sector, i) => (
        <div key={i} className="flex items-center gap-4 px-8 py-5 bg-white border border-slate-200 rounded-full hover:border-blue-500 hover:shadow-lg transition-all cursor-default group">
          <div className="text-blue-600 group-hover:scale-110 transition-transform">{sector.icon}</div>
          <span className="font-black text-slate-700">{isRTL ? sector.ar : sector.en}</span>
        </div>
      ))}
    </div>
    
    <p className="mt-12 text-slate-400 font-bold max-w-2xl mx-auto">
      {isRTL 
        ? 'CapTured مصمم ليناسب أي نشاط يحتاج إثبات تسليم رسمي ومؤرشف.' 
        : 'CapTured is designed to fit any business requiring official delivery proof and archiving.'}
    </p>
  </div>
</section>
      {/* --- Features --- */}
      <section id="features" className="py-40 px-6 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto">
      <div className="reveal-up text-center mb-24">
        <h2 className="text-5xl font-black mb-6 text-slate-900">
          {isRTL ? 'تقارير ذكية لاتخاذ القرار' : 'Smart Reporting for Decision Making'}
        </h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
          {isRTL ? 'بيانات دقيقة لمتابعة أداء فريقك' : 'Accurate Data to Track Team Performance'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
        {/* Dashboard Card */}
        <div className="reveal-up md:col-span-2 bg-white border border-slate-100 rounded-[3rem] p-12 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h4 className="text-3xl font-black mb-4">
                {isRTL ? 'لوحة تحكم تفاعلية (Dashboard)' : 'Interactive Dashboard'}
              </h4>
              <ul className="text-slate-500 font-bold space-y-2 leading-relaxed">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {isRTL ? 'متابعة عدد الطلبات الموثقة يومياً' : 'Track daily documented orders'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {isRTL ? 'تحليل النشاط حسب كل فرع' : 'Analyze activity per branch'}
                </li>
              </ul>
            </div>
          </div>
          <LayoutDashboard
            size={200}
            className="absolute -right-10 -bottom-10 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-700"
          />
        </div>

        {/* Immutable Data Card */}
        <div className="reveal-up bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden">
          <div className="mb-8 p-6 bg-white/10 rounded-[2rem] border border-white/10">
            <Lock size={48} className="text-blue-400" />
          </div>
          <h4 className="text-2xl font-black mb-4">
            {isRTL ? 'موثوقية النتيجة' : 'Verification Integrity'}
          </h4>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            {isRTL
              ? 'تشمل النتائج: صورة الطلب، خريطة الموقع، والوقت بدقة متناهية.'
              : 'Results include: Order photo, GPS map, and precise timestamp.'}
          </p>
        </div>

        {/* Search & Filter Card */}
        <div className="reveal-up bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-center group hover:border-blue-500 transition-all">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/30">
            <Search size={28} />
          </div>
          <h4 className="text-2xl font-black mb-4">
            {isRTL ? 'فلترة متقدمة' : 'Advanced Filtering'}
          </h4>
          <p className="text-slate-500 font-bold text-sm leading-relaxed">
            {isRTL
              ? 'ابحث في السجلات حسب التاريخ، الفرع، أو المستخدم بلمحة بصر.'
              : 'Filter records by date, branch, or user in the blink of an eye.'}
          </p>
        </div>

        {/* Export Card */}
        <div className="reveal-up md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 text-white flex items-center justify-between overflow-hidden relative group">
          <div className="relative z-10 max-w-md">
            <h4 className="text-3xl font-black mb-6">
              {isRTL ? 'تصدير التقارير الذكي' : 'Smart Report Export'}
            </h4>
            <p className="text-blue-100 font-bold text-lg leading-relaxed mb-4">
              {isRTL
                ? 'استخرج تقاريرك بصيغ متعددة جاهزة للاعتماد.'
                : 'Export your reports in multiple ready-to-use formats.'}
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-1 bg-white/20 rounded-lg text-sm font-black italic">EXCEL</span>
              <span className="px-4 py-1 bg-white/20 rounded-lg text-sm font-black italic">WORD</span>
            </div>
          </div>
          <FileDown
            size={180}
            className="absolute -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"
          />
        </div>
      </div>
    </div>
  </section>

      {/* --- سكشن صور التطبيق مع إطار iPhone - إصلاح الظهور المتقطع --- */}
      {/* --- App Section - محسّن --- */}
<section id="app" className="py-32 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
  {/* خلفية ديكورية محسّنة */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-[-8%] w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }} />
    <div className="absolute bottom-20 right-[-8%] w-[450px] h-[450px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-full blur-[110px] opacity-40 animate-pulse" style={{ animationDuration: '5s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full blur-[100px] opacity-20" />
  </div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* العنوان الرئيسي */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-24"
    >
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-xs font-black uppercase tracking-wider mb-8 shadow-sm">
        <Smartphone size={18} className="animate-pulse" />
        {isRTL ? 'تطبيق الموبايل' : 'Mobile Application'}
      </div>
      <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight">
        {isRTL ? 'تجربة تطبيق ميدانية' : 'Smooth Field App'}
        <br />
        <span className="text-gradient">{isRTL ? 'سلسة وذكية' : 'Experience'}</span>
      </h2>
      <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
        {isRTL
          ? 'واجهة تطبيق بسيطة وسريعة لموظفي الميدان لرفع التوثيق في ثوانٍ معدودة'
          : 'A simple, fast mobile app for field teams to capture proof in seconds'}
      </p>
    </motion.div>

    <div className="space-y-40">
      {/* الميزة الأولى */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`${isRTL ? 'lg:order-2' : ''} space-y-8`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-sm font-bold shadow-sm">
            <PackageCheck size={18} />
            {isRTL ? 'الميزة #1' : 'Feature #1'}
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
            {isRTL ? 'عرض وإنشاء الطلبات' : 'View & Create Orders'}
            <br />
            <span className="text-emerald-600">{isRTL ? 'بسهولة تامة' : 'Easily'}</span>
          </h3>
          
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {isRTL
              ? 'يمكن للموظفين الميدانيين عرض جميع الطلبات المخصصة لهم وإنشاء طلبات جديدة بكل سهولة. واجهة بديهية تعرض تفاصيل كل طلب من حالة، موقع، ووقت التسليم المتوقع.'
              : 'Field employees can view all assigned orders and create new ones with ease. An intuitive interface displays each order\'s status, location, and expected delivery time.'}
          </p>

          <ul className="space-y-5">
            {[
              {
                icon: <CheckCircle2 size={22} className="text-emerald-600" />,
                text: isRTL ? 'عرض قائمة الطلبات المخصصة' : 'View assigned order list',
                badge: isRTL ? 'فوري' : 'Instant'
              },
              {
                icon: <CheckCircle2 size={22} className="text-emerald-600" />,
                text: isRTL ? 'إنشاء طلب جديد بنقرة واحدة' : 'Create new order with one tap',
                badge: isRTL ? 'سريع' : 'Fast'
              },
              {
                icon: <CheckCircle2 size={22} className="text-emerald-600" />,
                text: isRTL ? 'تفاصيل شاملة لكل طلب' : 'Comprehensive details for each order',
                badge: isRTL ? 'كامل' : 'Complete'
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-slate-700 font-bold bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                  {item.icon}
                </div>
                <span className="flex-1">{item.text}</span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  {item.badge}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-black text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40"
          >
            {isRTL ? 'اكتشف المزيد' : 'Discover More'}
            <ArrowRight size={22} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`${isRTL ? 'lg:order-1' : ''}`}
        >
          <div className="relative">
            {/* إطار iPhone محسّن */}
            <div className="iphone-frame mx-auto hover:scale-105 transition-transform duration-500">
              <div className="power-button" />
              <div className="volume-button" />
              <div className="volume-button down" />
              
              <div className="iphone-screen">
                <img
                  src="/images/app-1.webp"
                  alt={isRTL ? 'عرض وإنشاء الطلبات' : 'View and Create Orders'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* بادج ديكور محسّن */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className={`absolute -top-8 ${isRTL ? '-left-8' : '-right-8'} bg-white rounded-2xl shadow-2xl px-6 py-4 border border-slate-100 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 text-sm font-black text-slate-900">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                {isRTL ? 'نشط الآن' : 'Live Now'}
              </div>
            </motion.div>

            {/* دوائر ديكورية */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* الميزة الثانية */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/70 text-purple-700 text-sm font-bold shadow-sm">
            <Activity size={18} />
            {isRTL ? 'الميزة #2' : 'Feature #2'}
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
            {isRTL ? 'متابعة وتتبع الطلبات' : 'Real-Time Order'}
            <br />
            <span className="text-purple-600">{isRTL ? 'لحظياً' : 'Tracking'}</span>
          </h3>
          
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {isRTL
              ? 'تتبع حالة كل طلب من البداية حتى التسليم. يتم تحديث الحالة تلقائياً مع كل خطوة، مع إمكانية إضافة ملاحظات وصور التوثيق المباشرة من موقع العمل.'
              : 'Track each order status from start to delivery. Status updates automatically with every step, with the ability to add notes and live documentation photos from the work site.'}
          </p>

          <ul className="space-y-5">
            {[
              {
                icon: <CheckCircle2 size={22} className="text-purple-600" />,
                text: isRTL ? 'تحديثات فورية لحالة الطلب' : 'Instant order status updates',
                badge: isRTL ? 'تلقائي' : 'Auto'
              },
              {
                icon: <CheckCircle2 size={22} className="text-purple-600" />,
                text: isRTL ? 'إضافة صور توثيقية مباشرة' : 'Add live documentation photos',
                badge: isRTL ? 'مباشر' : 'Live'
              },
              {
                icon: <CheckCircle2 size={22} className="text-purple-600" />,
                text: isRTL ? 'ختم الموقع الجغرافي تلقائياً' : 'Auto GPS location stamp',
                badge: isRTL ? 'دقيق' : 'Precise'
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-slate-700 font-bold bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 hover:border-purple-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors flex-shrink-0">
                  {item.icon}
                </div>
                <span className="flex-1">{item.text}</span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {item.badge}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-black text-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40"
          >
            {isRTL ? 'جرّب الآن' : 'Try Now'}
            <ArrowRight size={22} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            {/* إطار iPhone محسّن */}
            <div className="iphone-frame mx-auto hover:scale-105 transition-transform duration-500">
              <div className="power-button" />
              <div className="volume-button" />
              <div className="volume-button down" />
              
              <div className="iphone-screen">
                <img
                  src="/images/app-2.webp"
                  alt={isRTL ? 'متابعة وتتبع الطلبات' : 'Order Tracking'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* بادج ديكور محسّن */}
            <motion.div
              initial={{ scale: 0, rotate: 10 }}
              whileInView={{ scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className={`absolute -bottom-8 ${isRTL ? '-right-8' : '-left-8'} bg-white rounded-2xl shadow-2xl px-6 py-4 border border-slate-100 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 text-sm font-black text-slate-900">
                <MapPin size={18} className="text-purple-600" />
                {isRTL ? 'موقع دقيق' : 'Precise Location'}
              </div>
            </motion.div>

            {/* دوائر ديكورية */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </div>

   {/* CTA Section - بسيط ونظيف */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-32 relative"
>
  <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[3rem] p-12 md:p-16 overflow-hidden">
    {/* خلفية بسيطة */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
    </div>
    
    <div className="relative z-10 text-center max-w-4xl mx-auto">
      {/* الأيقونة */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-8">
        <Smartphone size={32} className="text-white" />
      </div>

      {/* العنوان */}
      <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
        {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
      </h3>
      
      {/* الوصف */}
      <p className="text-slate-300 text-lg font-medium mb-10 leading-relaxed">
        {isRTL
          ? 'حمّل التطبيق الآن وابدأ في توثيق عملياتك الميدانية بدقة GPS حقيقية'
          : 'Download the app now and start documenting your field operations with real GPS accuracy'}
      </p>

      {/* أزرار التحميل */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <button className="inline-flex items-center gap-4 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-lg w-full sm:w-auto">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <div className="text-left">
            <div className="text-[10px] font-medium text-slate-500 uppercase">
              {isRTL ? 'حمّل من' : 'Download on'}
            </div>
            <div className="text-base font-black">App Store</div>
          </div>
        </button>

        <button className="inline-flex items-center gap-4 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-lg w-full sm:w-auto">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
          </svg>
          <div className="text-left">
            <div className="text-[10px] font-medium text-slate-500 uppercase">
              {isRTL ? 'متوفر على' : 'Get it on'}
            </div>
            <div className="text-base font-black">Google Play</div>
          </div>
        </button>
      </div>

    
    </div>
  </div>
</motion.div>

  </div>
</section>


      {/* --- سكشن صور اللوحة - إصلاح الظهور المتقطع --- */}
      <section id="dashboard" className="py-40 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-10 right-[-8%] w-[450px] h-[450px] bg-blue-100 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-10 left-[-8%] w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[110px] opacity-30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal-up text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-wider mb-6">
              <LayoutDashboard size={16} />
              {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              {isRTL ? 'لوحة تحكم غنية بالبيانات' : 'Data-Rich Admin Dashboard'}
            </h2>
            <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              {isRTL
                ? 'راقب الأداء، تتبع العمليات، واستخرج التقارير من لوحة واحدة قوية'
                : 'Monitor performance, track operations, and export reports from one powerful dashboard'}
            </p>
          </div>

          <div className="space-y-32">
            {/* صورة اللوحة الأولى */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative group">
                  <div className="rounded-[3rem] bg-slate-900 shadow-2xl border border-slate-800 p-4 md:p-6 overflow-hidden">
                    <div className="bg-slate-800/50 rounded-[2.5rem] p-4 border border-slate-700">
                      <img
                        src="/images/dashboard-1.webp"
                        alt={isRTL ? 'مراجعة نسب الفروع' : 'Branch Performance Review'}
                        className="w-full rounded-[2rem] shadow-xl"
                      />
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl px-6 py-3 text-white">
                    <div className="flex items-center gap-2 text-sm font-black">
                      <TrendingUp size={18} />
                      {isRTL ? '+24.5%' : '+24.5%'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold">
                  <BarChart3 size={18} />
                  {isRTL ? 'تحليلات #1' : 'Analytics #1'}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {isRTL ? 'مراجعة نسب الفروع' : 'Branch Performance Review'}
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {isRTL
                    ? 'احصل على نظرة شاملة لأداء جميع فروعك من لوحة واحدة. قارن معدلات الإنجاز، عدد الطلبات المكتملة، والوقت المستغرق لكل فرع بمخططات بيانية تفاعلية.'
                    : 'Get a comprehensive view of all branches performance from one dashboard. Compare completion rates, number of completed orders, and time taken for each branch with interactive charts.'}
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: <BarChart3 size={20} className="text-blue-600" />,
                      text: isRTL ? 'مخططات بيانية تفاعلية متقدمة' : 'Advanced interactive data charts',
                    },
                    {
                      icon: <TrendingUp size={20} className="text-blue-600" />,
                      text: isRTL ? 'مقارنة الأداء بين الفروع' : 'Compare performance across branches',
                    },
                    {
                      icon: <Activity size={20} className="text-blue-600" />,
                      text: isRTL ? 'تحليل معدلات الإنجاز بالوقت الفعلي' : 'Real-time completion rate analysis',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1">
                    {isRTL ? 'شاهد الديمو' : 'View Demo'}
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:border-blue-600 transition-all">
                    <FileDown size={20} />
                    {isRTL ? 'تحميل تقرير' : 'Download Report'}
                  </button>
                </div>
              </div>
            </div>

            {/* صورة اللوحة الثانية */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'lg:order-2' : ''} space-y-8`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
                  <PieChart size={18} />
                  {isRTL ? 'تحليلات #2' : 'Analytics #2'}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {isRTL ? 'نسب الطلبات والإحصائيات' : 'Orders Statistics & Ratios'}
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {isRTL
                    ? 'تتبع نسب الطلبات المكتملة، قيد التنفيذ، والمؤجلة بمخططات دائرية ورسوم بيانية واضحة. احصل على رؤى دقيقة حول توزيع الطلبات عبر الفترات الزمنية المختلفة.'
                    : 'Track ratios of completed, in-progress, and postponed orders with clear pie charts and graphs. Get accurate insights into order distribution across different time periods.'}
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: <PieChart size={20} className="text-emerald-600" />,
                      text: isRTL ? 'مخططات دائرية لتوزيع الطلبات' : 'Pie charts for order distribution',
                    },
                    {
                      icon: <Database size={20} className="text-emerald-600" />,
                      text: isRTL ? 'إحصائيات شاملة لكل حالة' : 'Comprehensive statistics for each status',
                    },
                    {
                      icon: <TrendingUp size={20} className="text-emerald-600" />,
                      text: isRTL ? 'تحليل الاتجاهات عبر الزمن' : 'Trend analysis over time',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-1">
                    {isRTL ? 'اكتشف التحليلات' : 'Explore Analytics'}
                    <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:border-emerald-600 transition-all">
                    <Users size={20} />
                    {isRTL ? 'إدارة الفريق' : 'Team Management'}
                  </button>
                </div>
              </div>

              <div className={`${isRTL ? 'lg:order-1' : ''}`}>
                <div className="relative group">
                  <div className="rounded-[3rem] bg-slate-900 shadow-2xl border border-slate-800 p-4 md:p-6 overflow-hidden">
                    <div className="bg-slate-800/50 rounded-[2.5rem] p-4 border border-slate-700">
                      <img
  src="/images/dashboard-2.webp"
  alt={isRTL ? 'نسب الطلبات' : 'Orders Statistics'}
  className="w-full rounded-[2rem] shadow-xl"
/>

                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl px-6 py-3 text-white">
                    <div className="flex items-center gap-2 text-sm font-black">
                      <CheckCircle2 size={18} />
                      {isRTL ? '89% إنجاز' : '89% Complete'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Pricing --- */}
     {/* --- Pricing - عربي/إنجليزي --- */}
{/* --- Pricing Section - محسّن --- */}
<section id="pricing" className="py-32 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
  {/* خلفية ديكورية */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px]" />
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    {/* العنوان */}
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-black uppercase tracking-wider mb-6"
      >
        <Sparkles size={14} />
        {isRTL ? 'باقات مرنة' : 'Flexible Plans'}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl lg:text-6xl font-black mb-4 tracking-tight text-slate-900"
      >
        {isRTL ? 'خطط بسيطة وشفافة' : 'Simple, Transparent Pricing'}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-500 font-medium text-lg"
      >
        {isRTL ? 'اختر الباقة التي تناسب حجم أعمالك مع خصومات على الدفع السنوي' : 'Choose the plan that fits your business with annual payment discounts'}
      </motion.p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 items-stretch">
      {/* Starter Plan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 group flex flex-col"
      >
        <div className="mb-8">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
            <Layers size={24} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-4">
            {isRTL ? 'الأساسية (Starter)' : 'Starter'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-900">299</span>
            <div className="flex flex-col">
              <span className="text-slate-400 font-bold text-sm">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-400 font-medium text-xs">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-emerald-600 text-xs font-bold mt-2">
            {isRTL ? 'أو 2,990 ر.س / سنوياً (خصم شهرين)' : 'Or 2,990 SAR / Year (2 Months Off)'}
          </p>
        </div>
        
        <ul className="space-y-4 mb-10 flex-grow">
          {[
            { ar: 'توثيق الصور + الموقع + الوقت', en: 'Photo + GPS + Time Stamps' },
            { ar: 'لوحة تحكم أساسية', en: 'Basic Dashboard' },
            { ar: 'بحث بسيط (رقم طلب / تاريخ)', en: 'Simple Search (ID/Date)' },
            { ar: 'حتى 3 مستخدمين', en: 'Up to 3 Users' },
            { ar: 'فرع واحد فقط', en: '1 Branch' },
            { ar: 'تخزين 10GB', en: '10GB Storage' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-slate-600 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>
        
        <button className="w-full py-4 rounded-2xl font-black text-base border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm hover:shadow-lg">
          {isRTL ? 'ابدأ الآن' : 'Get Started'}
        </button>
      </motion.div>

      {/* Business Plan - الأكثر مبيعاً */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/30 relative scale-105 border-2 border-blue-500/20 flex flex-col"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
          {isRTL ? '⭐ الأكثر طلباً' : '⭐ Most Popular'}
        </div>
        
        <div className="mb-8 relative z-10">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
            <Zap size={24} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-black text-blue-400 mb-4">
            {isRTL ? 'الأعمال (Business)' : 'Business'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white">699</span>
            <div className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-500 font-medium text-xs">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-blue-400 text-xs font-bold mt-2">
            {isRTL ? 'أو 6,990 ر.س / سنوياً (خصم شهرين)' : 'Or 6,990 SAR / Year (2 Months Off)'}
          </p>
        </div>

        <ul className="space-y-4 mb-10 flex-grow relative z-10">
          {[
            { ar: 'كل مميزات الباقة الأساسية +', en: 'All Starter features +' },
            { ar: 'بحث متقدم + فلترة كاملة', en: 'Advanced Search & Filtering' },
            { ar: 'تقارير  احترافية', en: 'Professional  Reports' },
            { ar: 'التحكم بالحقول الإلزامية والميديا', en: 'Custom Mandatory Fields & Media' },
            { ar: 'حتى 15 مستخدم و 5 فروع', en: 'Up to 15 Users & 5 Branches' },
            { ar: 'تخزين 50GB', en: '50GB Storage' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-slate-300 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-base hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 relative z-10">
          {isRTL ? 'ابدأ تجربة مجانية' : 'Start Free Trial'}
        </button>
      </motion.div>

      {/* Enterprise Plan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300 group flex flex-col"
      >
        <div className="mb-8">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-50 transition-colors">
            <Database size={24} className="text-slate-600 group-hover:text-purple-600 transition-colors" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-4">
            {isRTL ? 'المؤسسات (Enterprise)' : 'Enterprise'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-900">1499</span>
            <div className="flex flex-col">
              <span className="text-slate-400 font-bold text-sm">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-400 font-medium text-xs">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-purple-600 text-xs font-bold mt-2">
            {isRTL ? 'أو 14,990 ر.س / سنوياً (خصم شهرين)' : 'Or 14,990 SAR / Year (2 Months Off)'}
          </p>
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {[
            { ar: 'إدارة كاملة للصلاحيات و Logs', en: 'Full Permissions & Audit Logs' },
            { ar: 'إعداد نماذج مخصصة لكل فرع', en: 'Custom Branch-wise Templates' },
            { ar: 'دعم فني سريع + مدير حساب', en: 'Priority Support + Account Manager' },
            { ar: 'حتى 50 مستخدم و 20 فرع', en: 'Up to 50 Users & 20 Branches' },
            { ar: 'تخزين 200GB', en: '200GB Storage' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-slate-600 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-4 rounded-2xl font-black text-base border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm hover:shadow-lg">
          {isRTL ? 'تواصل معنا' : 'Contact Sales'}
        </button>
      </motion.div>
    </div>

    {/* إضافات اختيارية (Upsell) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-20 p-8 bg-slate-50 rounded-[2rem] border border-slate-200"
    >
      <h4 className="text-center font-black text-slate-900 mb-8">
        {isRTL ? 'خدمات وإضافات اختيارية' : 'Optional Add-ons'}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">{isRTL ? 'مستخدم إضافي' : 'Extra User'}</p>
          <p className="text-lg font-black text-slate-900">25 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">{isRTL ? 'فرع إضافي' : 'Extra Branch'}</p>
          <p className="text-lg font-black text-slate-900">80 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">{isRTL ? 'تخزين 50GB' : '50GB Storage'}</p>
          <p className="text-lg font-black text-slate-900">120 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">{isRTL ? 'تقارير Power BI' : 'Power BI Reports'}</p>
          <p className="text-sm font-black text-slate-900">500 - 1500 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
      </div>
    </motion.div>
  </div>
</section>



      {/* --- FAQ --- */}
      <section className="py-40 px-6 max-w-4xl mx-auto">
        <div className="reveal-up text-center mb-20">
          <h2 className="text-5xl font-black mb-6">
            {isRTL ? 'الأسئلة الشائعة' : 'Common Questions'}
          </h2>
          <p className="text-slate-400 font-bold">
            {isRTL
              ? 'كل ما تريد معرفته عن نظام CapTured'
              : 'Everything you need to know about CapTured'}
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: isRTL
                ? 'هل يمكن تعديل السجل بعد الإرسال؟'
                : 'Can logs be edited after submission?',
              a: isRTL
                ? 'لا، بعد رفع السجل لا يمكن تعديله نهائياً لضمان الموثوقية.'
                : 'No, once a log is uploaded, it cannot be edited to ensure data integrity.',
            },
            {
              q: isRTL
                ? 'هل يمكن رفع صور من الاستوديو؟'
                : 'Can photos be uploaded from the gallery?',
              a: isRTL
                ? 'لا، التصوير يكون من كاميرا التطبيق مباشرة فقط.'
                : 'No, photos must be captured directly through the app camera only.',
            },
            {
              q: isRTL
                ? 'هل يدعم العمل بدون إنترنت؟'
                : 'Does it support offline mode?',
              a: isRTL
                ? 'نعم، عند ضعف الشبكة يظهر "جاري الرفع" أو "تم الحفظ محلياً وسيتم الرفع لاحقاً".'
                : 'Yes, if the connection is weak, it shows "Uploading" or "Saved locally and will sync later".',
            },
            {
              q: isRTL
                ? 'هل التطبيق يرفض المواقع الوهمية؟'
                : 'Does the app reject fake locations?',
              a: isRTL
                ? 'نعم، يتم كشف برامج المواقع الوهمية ورفض تسجيل العملية.'
                : 'Yes, mock location apps are detected and the process will be rejected.',
            },
            {
              q: isRTL
                ? 'هل يمكن التحكم بالميديا المطلوبة؟'
                : 'Can the required media be customized?',
              a: isRTL
                ? 'نعم، مدير النظام يتحكم بالنوع (صور/فيديو) وعدد الملفات المطلوبة والحقول الإلزامية.'
                : 'Yes, the admin controls the type (photo/video), number of files, and mandatory fields.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal-up bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-blue-200"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-8 text-right flex justify-between items-center font-bold text-xl group"
              >
                <span className={`${isRTL ? '' : 'text-left'} leading-snug`}>
                  {item.q}
                </span>
                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    activeFaq === i
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Plus
                    size={20}
                    className={`transition-transform duration-500 ${
                      activeFaq === i ? 'rotate-[135deg]' : ''
                    }`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-slate-500 font-bold leading-relaxed border-t border-slate-50 pt-6">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      

      {/* --- Footer - خط أكبر --- */}
   {/* --- Footer المحسّن --- */}
 {/* --- Footer المحسّن والمختصر --- */}
 
<footer
  id="contact"
  className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden"
>
  {/* خلفية ديكورية */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* القسم الأيسر - العنوان والدعوة للعمل */}
      <div>
        <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[0.95] tracking-tighter">
          {isRTL ? 'ابدأ التحول الرقمي اليوم' : 'Start Your Digital Journey Today'}
        </h2>
        <p className="text-slate-400 text-lg font-medium mb-8 leading-relaxed">
          {isRTL 
            ? 'انضم إلى مئات الشركات التي تثق في CapTured لتوثيق عملياتها الميدانية'
            : 'Join hundreds of companies trusting CapTured for their field operations documentation'}
        </p>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-base hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1 flex items-center gap-3">
          {isRTL ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
          <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </div>

      {/* القسم الأيمن - معلومات الاتصال */}
      <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-xl">
        {/* اللوجو */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap size={20} fill="white" />
          </div>
          <span className="text-2xl font-black">CapTured</span>
        </div>

        {/* معلومات الاتصال */}
        <div className="space-y-5 mb-8">
          {/* البريد الإلكتروني */}
          <a
            href="mailto:info@ilogic.com.sa"
            className={`flex items-center gap-3 group ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'} transition-transform`}
          >
            <div className="w-11 h-11 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                info@ilogic.com.sa
              </div>
            </div>
          </a>

          {/* الهاتف */}
          <a
            href="tel:+966558986036"
            className={`flex items-center gap-3 group ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'} transition-transform`}
          >
            <div className="w-11 h-11 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all flex-shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                {isRTL ? 'الهاتف' : 'Phone'}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors" dir="ltr">
                +966 55 898 6036
              </div>
            </div>
          </a>

          {/* الموقع */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                {isRTL ? 'الموقع' : 'Location'}
              </div>
              <div className="text-sm font-bold text-white">
                {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </div>
            </div>
          </div>
        </div>

        {/* السوشيال ميديا والحقوق */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              © 2026 iLogic Solutions
            </span>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 transition-all flex items-center justify-center group"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 transition-all flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 transition-all flex items-center justify-center group"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}
