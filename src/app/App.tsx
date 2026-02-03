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
  PackageCheck, TrendingUp, PieChart, Activity, ChevronLeft
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
    fetch('http://127.0.0.1:8000/api/sliders')
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
            <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap fill="white" className="text-white" size={22} />
              </div>
              <span className="tracking-tighter">CapTured</span>
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
      <div className="py-5" />

      {/* --- HERO SLIDER - خط أكبر --- */}
      <section
        id="home"
        className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        {/* خلفية السلايدر المحسّنة */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {hasSlides && (
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.7, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                <img
                  src={currentImage}
                  className="w-full h-full object-cover"
                  alt="Captured Pro"
                  loading="eager"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* تدرج خلفية محسّن */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-[#F8FAFC]/50" />
          
          {/* دوائر خلفية */}
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-25" />
        </div>

        {/* محتوى Hero - خط أكبر */}
       <div className="relative z-10 container mx-auto px-6 py-24">
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    {/* النص - خط مصغر */}
    <div className="hero-content space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-bold"
      >
        <Sparkles size={18} />
        {isRTL ? 'الحل الأذكى للتوثيق الميداني' : 'Smartest Field Documentation Solution'}
      </motion.div>

      <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
        {isRTL ? (
          <>
            وثّق عملياتك
            <br />
            <span className="text-gradient">بدقة GPS حقيقية</span>
          </>
        ) : (
          <>
            Document Operations
            <br />
            <span className="text-gradient">With Real GPS Accuracy</span>
          </>
        )}
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
        {isRTL
          ? 'منصة متكاملة لتوثيق العمليات الميدانية بالصور الحية والمواقع الجغرافية الدقيقة مع حماية متقدمة ضد التلاعب والتزييف.'
          : 'Complete platform for documenting field operations with live photos and precise GPS locations with advanced anti-tampering protection.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-base hover:shadow-2xl hover:shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
          {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Trial'}
          <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        </button>
        <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-base hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-3">
          <Camera size={20} />
          {isRTL ? 'شاهد العرض' : 'Watch Demo'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-10 pt-8">
        {[
          { icon: <ShieldCheck size={24} />, text: isRTL ? 'حماية متقدمة' : 'Advanced Protection' },
          { icon: <MapPin size={24} />, text: isRTL ? 'GPS دقيق' : 'Precise GPS' },
          { icon: <Lock size={24} />, text: isRTL ? 'بيانات مشفّرة' : 'Encrypted Data' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-blue-600">
              {item.icon}
            </div>
            <span className="font-bold text-slate-700 text-base">{item.text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* صورة السلايدر */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative"
    >
      {hasSlides && (
        <div className="relative">
          {/* السلايدر */}
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-100 to-slate-200 p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full rounded-[2rem] shadow-xl"
              />
            </AnimatePresence>

            {/* أزرار التنقل */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all hover:scale-110`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all hover:scale-110`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* نقاط التنقل */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'w-10 h-3 bg-blue-600' 
                      : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* بادج ديكور */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -top-6 -right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-xs"
          >
            {isRTL ? '✨ تحديث جديد' : '✨ New Update'}
          </motion.div>
        </div>
      )}
    </motion.div>
  </div>
</div>

      </section>

      {/* --- Problem & Solution --- */}
      <section id="problem" className="py-40 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="reveal-up p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-10">
                <XCircle size={30} />
              </div>
              <h2 className="text-4xl font-black mb-8">
                {isRTL ? 'المخاطر الحالية' : 'Current Risks'}
              </h2>
              <ul className="space-y-6">
                {[
                  isRTL
                    ? 'الاعتماد على صور قديمة من الاستوديو.'
                    : 'Reliance on old gallery photos.',
                  isRTL
                    ? 'عدم دقة إحداثيات المواقع عند التوثيق.'
                    : 'Inaccurate location coordinates.',
                  isRTL
                    ? 'ضياع البيانات أو التلاعب بها يدوياً.'
                    : 'Loss of data or manual tampering.',
                  isRTL
                    ? 'صعوبة استرجاع السجلات القديمة بسرعة.'
                    : 'Difficulty retrieving old records quickly.',
                ].map((txt, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-center text-slate-500 font-bold text-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-400" /> {txt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-up p-12 rounded-[3.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="text-4xl font-black mb-8">
                {isRTL ? 'حلول CapTured' : 'CapTured Solutions'}
              </h2>
              <ul className="space-y-6 relative z-10">
                {[
                  isRTL
                    ? 'التصوير الحي الحصري يمنع الغش.'
                    : 'Exclusive live capture prevents fraud.',
                  isRTL
                    ? 'ربط تلقائي بالوقت وموقع GPS الحقيقي.'
                    : 'Auto-link to real time & GPS location.',
                  isRTL
                    ? 'سجلات مشفرة لا تقبل الحذف أو التعديل.'
                    : 'Encrypted records cannot be edited.',
                  isRTL
                    ? 'محرك بحث ذكي للوصول لأي سجل في ثوانٍ.'
                    : 'Smart search to find records in seconds.',
                ].map((txt, i) => (
                  <li key={i} className="flex gap-4 items-center font-bold text-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-200" /> {txt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section id="features" className="py-40 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up text-center mb-24">
            <h2 className="text-5xl font-black mb-6 text-slate-900">
              {isRTL ? 'أدوات احترافية لإدارة فريقك' : 'Professional Management Tools'}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
              Engineered for Reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
            <div className="reveal-up md:col-span-2 bg-white border border-slate-100 rounded-[3rem] p-12 relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <MapPin size={24} />
                  </div>
                  <h4 className="text-3xl font-black mb-4">
                    {isRTL ? 'تتبع المواقع الذكي' : 'Smart GPS Tracking'}
                  </h4>
                  <p className="text-slate-500 font-bold max-w-sm leading-relaxed">
                    {isRTL
                      ? 'نظام حماية متطور يرفض تطبيقات المواقع الوهمية (Mock GPS) لضمان المصداقية.'
                      : 'Advanced protection system rejecting fake location apps to ensure credibility.'}
                  </p>
                </div>
              </div>
              <MapPin
                size={200}
                className="absolute -right-10 -bottom-10 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-700"
              />
            </div>

            <div className="reveal-up bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-center items-center text-center shadow-2xl">
              <div className="mb-8 p-6 bg-white/10 rounded-[2rem] border border-white/10">
                <Lock size={48} className="text-blue-400" />
              </div>
              <h4 className="text-2xl font-black mb-4">
                {isRTL ? 'بيانات غير قابلة للتغيير' : 'Immutable Data'}
              </h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                {isRTL
                  ? 'بمجرد الرفع، تصبح البيانات مستنداً رسمياً لا يمكن لأي مستخدم التلاعب به.'
                  : 'Once uploaded, data becomes an official record that cannot be tampered with.'}
              </p>
            </div>

            <div className="reveal-up bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-center group hover:border-blue-500 transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/30">
                <Search size={28} />
              </div>
              <h4 className="text-2xl font-black mb-4">
                {isRTL ? 'أرشفة ذكية' : 'Smart Archiving'}
              </h4>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                {isRTL
                  ? 'ابحث عن العمليات حسب الموظف، الفرع، أو التاريخ بلمحة بصر.'
                  : 'Search operations by employee, branch, or date instantly.'}
              </p>
            </div>

            <div className="reveal-up md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 text-white flex items-center justify-between overflow-hidden relative group">
              <div className="relative z-10 max-w-md">
                <h4 className="text-3xl font-black mb-6">
                  {isRTL ? 'تقارير PDF احترافية' : 'Pro PDF Reports'}
                </h4>
                <p className="text-blue-100 font-bold text-lg leading-relaxed">
                  {isRTL
                    ? 'استخرج تقارير جاهزة للطباعة والاعتماد بضغطة زر واحدة تشمل كافة تفاصيل العملية.'
                    : 'Export print-ready reports including all operation details with one click.'}
                </p>
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
      <section id="app" className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[-5%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-30" />
        <div className="absolute bottom-20 right-[-5%] w-[350px] h-[350px] bg-purple-100 rounded-full blur-[90px] opacity-30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal-up text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-wider mb-6">
              <Smartphone size={16} />
              {isRTL ? 'تطبيق الموبايل' : 'Mobile Application'}
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              {isRTL ? 'تجربة تطبيق ميدانية سلسة' : 'Smooth Field App Experience'}
            </h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              {isRTL
                ? 'واجهة تطبيق بسيطة وسريعة لموظفي الميدان لرفع التوثيق في ثوانٍ معدودة'
                : 'A simple, fast mobile app for field teams to capture proof in seconds'}
            </p>
          </div>

          <div className="space-y-32">
            {/* صورة التطبيق الأولى مع إطار iPhone */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'lg:order-2' : ''} space-y-8`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
                  <PackageCheck size={18} />
                  {isRTL ? 'الميزة #1' : 'Feature #1'}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {isRTL ? 'عرض وإنشاء الطلبات بسهولة' : 'View & Create Orders Easily'}
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {isRTL
                    ? 'يمكن للموظفين الميدانيين عرض جميع الطلبات المخصصة لهم وإنشاء طلبات جديدة بكل سهولة. واجهة بديهية تعرض تفاصيل كل طلب من حالة، موقع، ووقت التسليم المتوقع.'
                    : 'Field employees can view all assigned orders and create new ones with ease. An intuitive interface displays each order\'s status, location, and expected delivery time.'}
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: <CheckCircle2 size={20} className="text-emerald-600" />,
                      text: isRTL ? 'عرض قائمة الطلبات المخصصة' : 'View assigned order list',
                    },
                    {
                      icon: <CheckCircle2 size={20} className="text-emerald-600" />,
                      text: isRTL ? 'إنشاء طلب جديد بنقرة واحدة' : 'Create new order with one tap',
                    },
                    {
                      icon: <CheckCircle2 size={20} className="text-emerald-600" />,
                      text: isRTL ? 'تفاصيل شاملة لكل طلب' : 'Comprehensive details for each order',
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

                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1">
                  {isRTL ? 'اكتشف المزيد' : 'Discover More'}
                  <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className={`${isRTL ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  {/* إطار iPhone */}
                  <div className="iphone-frame">
                    <div className="power-button" />
                    <div className="volume-button" />
                    <div className="volume-button down" />
                    
                    <div className="iphone-screen">
                      <img
                        src="/public/images/app-1.jpeg"
                        alt={isRTL ? 'عرض وإنشاء الطلبات' : 'View and Create Orders'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* بادج ديكور */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      {isRTL ? 'نشط الآن' : 'Live Now'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* صورة التطبيق الثانية مع إطار iPhone */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-bold">
                  <Activity size={18} />
                  {isRTL ? 'الميزة #2' : 'Feature #2'}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {isRTL ? 'متابعة وتتبع الطلبات لحظياً' : 'Real-Time Order Tracking'}
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {isRTL
                    ? 'تتبع حالة كل طلب من البداية حتى التسليم. يتم تحديث الحالة تلقائياً مع كل خطوة، مع إمكانية إضافة ملاحظات وصور التوثيق المباشرة من موقع العمل.'
                    : 'Track each order status from start to delivery. Status updates automatically with every step, with the ability to add notes and live documentation photos from the work site.'}
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: <CheckCircle2 size={20} className="text-purple-600" />,
                      text: isRTL ? 'تحديثات فورية لحالة الطلب' : 'Instant order status updates',
                    },
                    {
                      icon: <CheckCircle2 size={20} className="text-purple-600" />,
                      text: isRTL ? 'إضافة صور توثيقية مباشرة' : 'Add live documentation photos',
                    },
                    {
                      icon: <CheckCircle2 size={20} className="text-purple-600" />,
                      text: isRTL ? 'ختم الموقع الجغرافي تلقائياً' : 'Auto GPS location stamp',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg shadow-purple-600/20 hover:-translate-y-1">
                  {isRTL ? 'جرّب الآن' : 'Try Now'}
                  <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div>
                <div className="relative">
                  {/* إطار iPhone */}
                  <div className="iphone-frame">
                    <div className="power-button" />
                    <div className="volume-button" />
                    <div className="volume-button down" />
                    
                    <div className="iphone-screen">
                      <img
                        src="/public/images/app-2.jpeg"
                        alt={isRTL ? 'متابعة وتتبع الطلبات' : 'Order Tracking'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* بادج ديكور */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <MapPin size={16} className="text-purple-600" />
                      {isRTL ? 'موقع دقيق' : 'Precise Location'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                        src="/public/images/dashboard-1.png"
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
                        src="/public/images/dashboard-2.png"
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
      <section id="pricing" className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6">
              {isRTL ? 'خطط مرنة لكل الأحجام' : 'Flexible Plans'}
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-stretch">
            <div className="reveal-up bg-[#F8FAFC] p-12 rounded-[4rem] border border-slate-200 hover:border-blue-600 transition-all flex flex-col">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 block">
                Standard
              </span>
              <div className="mb-10">
                <span className="text-6xl font-black text-slate-900">299</span>
                <span className="text-slate-400 font-bold ml-2">SAR / Mo</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {['1 Branch', '5 Users', 'Basic Analytics', 'Cloud Storage 5GB'].map(
                  (t, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-center text-slate-600 font-bold"
                    >
                      <CheckCircle2 size={18} className="text-blue-600" /> {t}
                    </li>
                  ),
                )}
              </ul>
              <button className="w-full py-5 rounded-2xl font-black border-2 border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
                Select Plan
              </button>
            </div>

            <div className="reveal-up bg-white p-12 rounded-[4.5rem] border-2 border-blue-600 shadow-2xl scale-105 relative flex flex-col">
              <div className="absolute top-8 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
                Most Popular
              </div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-10 block">
                Professional
              </span>
              <div className="mb-10">
                <span className="text-6xl font-black text-slate-900">699</span>
                <span className="text-slate-400 font-bold ml-2">SAR / Mo</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  '10 Branches',
                  '20 Users',
                  'Advanced Dashboard',
                  'PDF Export Support',
                  'Cloud Storage 50GB',
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-center text-slate-700 font-bold"
                  >
                    <CheckCircle2 size={18} className="text-blue-600" /> {t}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20">
                Get Started
              </button>
            </div>

            <div className="reveal-up bg-[#F8FAFC] p-12 rounded-[4rem] border border-slate-200 hover:border-blue-600 transition-all flex flex-col">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 block">
                Enterprise
              </span>
              <div className="mb-10">
                <span className="text-6xl font-black text-slate-900">1499</span>
                <span className="text-slate-400 font-bold ml-2">SAR / Mo</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  'Unlimited Branches',
                  'Unlimited Users',
                  'Full White-label',
                  'Dedicated Support',
                  'API Access',
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-center text-slate-600 font-bold"
                  >
                    <CheckCircle2 size={18} className="text-blue-600" /> {t}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl font-black border-2 border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
                Contact Sales
              </button>
            </div>
          </div>
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
                ? 'هل يتطلب التطبيق اتصالاً دائماً بالإنترنت؟'
                : 'Does it require constant internet?',
              a: isRTL
                ? 'لا، يدعم التطبيق وضع العمل دون إنترنت؛ حيث يتم حفظ الصور والبيانات محلياً على الهاتف ثم يتم رفعها تلقائياً بمجرد توفر اتصال بالشبكة.'
                : 'No, it supports offline mode; photos and data are saved locally and synced once internet is available.',
            },
            {
              q: isRTL
                ? 'كيف يتم التأكد من أن الصورة حية وليست قديمة؟'
                : 'How do you ensure photos are live?',
              a: isRTL
                ? 'يعتمد التطبيق على وصول حصري للكاميرا مباشرة عبر واجهته، ويقوم بتعطيل ميزة اختيار الصور من الاستوديو نهائياً لضمان اللحظية.'
                : 'The app uses exclusive camera access and disables gallery selection to guarantee real-time capture.',
            },
            {
              q: isRTL
                ? 'هل يمكنني ربط النظام مع أنظمة شركتي الحالية؟'
                : 'Can I integrate it with my current systems?',
              a: isRTL
                ? 'نعم، توفر باقة Enterprise وصولاً كاملاً للـ API مما يتيح لك ربط بيانات التوثيق مع أنظمة ERP أو CRM الخاصة بك بسهولة.'
                : 'Yes, the Enterprise plan provides full API access for seamless integration with your ERP or CRM systems.',
            },
            {
              q: isRTL
                ? 'ما هي اللغات التي يدعمها التطبيق؟'
                : 'Which languages are supported?',
              a: isRTL
                ? 'يدعم التطبيق اللغتين العربية والإنجليزية بشكل كامل، سواء في واجهة المستخدم أو في التقارير المستخرجة.'
                : 'The app fully supports Arabic and English for both the interface and generated reports.',
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
     <footer
  id="contact"
  className="bg-slate-900 text-white py-40 px-6 relative overflow-hidden"
>
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
      <div>
        <h2 className="text-5xl font-black mb-12 leading-[0.85] tracking-tighter">
          {isRTL ? 'ابدأ التحول الرقمي اليوم' : 'Start Your Digital Journey Today'}
        </h2>
        <div className="flex flex-wrap gap-6">
          <a
            href="mailto:info@ilogic.com.sa"
            className="flex items-center gap-6 bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-blue-600 transition-all group"
          >
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-white group-hover:text-blue-600 transition-all">
              <Mail size={28} />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-slate-400 group-hover:text-blue-100 mb-2">
                Email
              </div>
              <div className="text-lg font-bold">info@ilogic.com.sa</div>
            </div>
          </a>
        </div>
      </div>

      <div className="bg-white/5 p-14 rounded-[4.5rem] border border-white/10 backdrop-blur-xl">
        <div className="text-2xl font-black text-white mb-10 flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={18} fill="white" />
          </div>
          CapTured
        </div>
        <div className="space-y-5 text-slate-400 font-bold text-base mb-14">
          <p>
            {isRTL
              ? 'الرياض – المملكة العربية السعودية'
              : 'Riyadh – Saudi Arabia'}
          </p>
          <p dir="ltr">+966 55 898 6036</p>
        </div>
        <div className="pt-10 border-t border-white/5 flex justify-between items-center text-xs font-black uppercase tracking-[0.4em] text-slate-500">
          <span>© 2026 iLogic Solutions</span>
          <div className="flex gap-5">
            <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition-colors cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}
