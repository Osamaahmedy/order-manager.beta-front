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
  Boxes,
  Twitter,
  Linkedin,
  Facebook
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
          <div className="flex items-center gap-3">
  <img
    src="/images/logo.avif"
    alt="CapTured Logo"
    className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
  />

  <span className="text-xl md:text-2xl font-extrabold text-primary">
  CapTured
</span>

</div>



            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map(item => (
               <ScrollLink
  key={item}
  to={item}
  smooth={true}
  duration={100}   
  spy
  offset={-100}
  className="text-sm font-bold text-blue-400 hover:text-blue-800 cursor-pointer transition-colors uppercase tracking-widest"
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
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/95" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 py-12 text-center">
    <div className="max-w-4xl mx-auto flex flex-col items-center">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold mb-5 backdrop-blur-sm"
      >
        <Sparkles size={12} />
        <span>
          {isRTL ? 'الحل الأذكى للتوثيق الميداني' : 'Smartest Field Documentation Solution'}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight"
      >
        {isRTL ? (
          <>وثّق عملياتك <span className="text-blue-500">بدقة GPS</span> حقيقية</>
        ) : (
          <>Document Operations With <span className="text-blue-500">Real GPS</span> Accuracy</>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed mb-8"
      >
        {isRTL
          ? 'منصة متكاملة لتوثيق العمليات الميدانية بالصور الحية والمواقع الدقيقة مع حماية متقدمة ضد التلاعب.'
          : 'Complete platform for documenting field operations with live photos and precise GPS locations with anti-tampering protection.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-10"
      >
        <button className="group px-7 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
          {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Trial'}
          <ArrowRight
            size={16}
            className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
          />
        </button>

        <button className="px-7 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
          <Camera size={16} />
          {isRTL ? 'شاهد العرض' : 'Watch Demo'}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {[
          { icon: <ShieldCheck size={16} />, text: isRTL ? 'حماية متقدمة' : 'Advanced Protection' },
          { icon: <MapPin size={16} />, text: isRTL ? 'GPS دقيق' : 'Precise GPS' },
          { icon: <Lock size={16} />, text: isRTL ? 'بيانات مشفّرة' : 'Encrypted Data' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
              {item.icon}
            </div>
            <span className="font-medium text-slate-200 text-xs">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`transition-all duration-300 rounded-full ${
          index === currentSlide
            ? 'w-8 h-2 bg-blue-500'
            : 'w-2 h-2 bg-white/30 hover:bg-white/60'
        }`}
      />
    ))}
  </div>
</section>
<section
  id="problem"
  className="relative py-16 md:py-24 px-6 overflow-hidden bg-white"
>
  {/* Subtle background blobs */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-[5%] top-[20%] w-72 h-72 bg-red-50 blur-[120px] rounded-full opacity-60" />
    <div className="absolute right-[5%] bottom-[20%] w-72 h-72 bg-sky-50 blur-[120px] rounded-full opacity-60" />
  </div>

  <div className="relative max-w-5xl mx-auto">

    {/* Badge + Title */}
    <div className="text-center mb-12">
      <span className="inline-block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
        {isRTL ? 'المشكلة والحل' : 'Problem & Solution'}
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
        {isRTL ? 'لماذا CapTured؟' : 'Why CapTured?'}
      </h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-5 items-stretch">

      {/* Problem Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative bg-white border border-slate-100 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-red-200 to-transparent rounded-full" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-red-50 text-red-400 rounded-xl flex items-center justify-center shrink-0">
            <XCircle size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {isRTL ? 'تحديات العمل الحالي' : 'Current Challenges'}
            </h3>
            <p className="text-xs text-slate-400">
              {isRTL ? 'مشاكل شائعة في التوثيق التقليدي' : 'Common issues with traditional methods'}
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          {[
            { ar: 'عدم وجود توثيق رسمي موحّد.', en: 'Lack of unified documentation.' },
            { ar: 'إرسال صور قديمة بدل التصوير المباشر.', en: 'Using old photos instead of live capture.' },
            { ar: 'اختلاف البيانات بين الفروع والإدارة.', en: 'Data discrepancy between branches.' },
            { ar: 'صعوبة البحث اليدوي في السجلات.', en: 'Difficulty searching manual records.' },
            { ar: 'استهلاك مساحة التخزين بملفات مبعثرة.', en: 'Wasted storage with disorganized files.' }
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div className="mt-1.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              </div>
              <p className="text-slate-500 text-sm leading-snug">
                {isRTL ? item.ar : item.en}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Solution Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="group relative bg-slate-900 rounded-2xl p-7 md:p-8 shadow-lg overflow-hidden"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent rounded-full" />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-900/40 shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isRTL ? 'الحل مع CapTured' : 'The Smart Solution'}
              </h3>
              <p className="text-xs text-slate-400">
                {isRTL ? 'توثيق ذكي وموثوق بالكامل' : 'Fully smart & reliable documentation'}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {[
              { ar: 'توثيق إلزامي ببيانات دقيقة ولحظية.', en: 'Mandatory documentation with real-time data.' },
              { ar: 'دعم رفع وسائط متعددة بجودة عالية.', en: 'High-quality multi-media support.' },
              { ar: 'علامة مائية تلقائية بالوقت و GPS.', en: 'Auto-watermark with Time and GPS.' },
              { ar: 'سجلات محمية وغير قابلة للتلاعب.', en: 'Tamper-proof and secured records.' },
              { ar: 'لوحة تحكم ذكية للبحث والتقارير.', en: 'Smart dashboard for search and reports.' }
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 hover:bg-white/10 hover:border-sky-500/20 transition-all duration-200">
                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                <span className="text-slate-200 text-sm font-medium">
                  {isRTL ? item.ar : item.en}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

    </div>
  </div>
</section>

<section
  id="how-it-works"
  className="relative py-16 px-6 bg-white overflow-hidden"
>
  <div className="max-w-5xl mx-auto">

    {/* Logo + Header */}
    <div className="text-center mb-12">

      {/* شعار الموقع */}
     <div className="flex justify-center mb-5">
  <div className="relative">
    <div className="absolute -inset-4 bg-sky-100/50 blur-2xl rounded-full" />
    <img
      src="/images/logo.avif"
      alt="CapTured Logo"
      className="relative w-[150px] md:w-[180px] object-contain drop-shadow-md"
    />
  </div>
</div>


      {/* Badge */}
      <span className="inline-block text-xs font-semibold text-sky-500 uppercase tracking-widest mb-3 bg-sky-50 px-3 py-1 rounded-full">
        {isRTL ? 'كيف يعمل' : 'How it works'}
      </span>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
        {isRTL ? 'كيف يعمل CapTured؟' : 'How CapTured Works?'}
      </h2>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm mt-2">
        {isRTL ? 'خطوات بسيطة لتوثيق احترافي' : 'Simple steps for professional documentation'}
      </p>
    </div>

    {/* Steps */}
    <div className="relative">

      {/* Connector line */}
      <div className="hidden md:block absolute top-10 left-[12.5%] w-[75%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            step: "01",
            ar: "تسجيل الدخول",
            en: "Login",
            desc_ar: "الدخول بحساب المستخدم المرتبط بفرعه",
            desc_en: "Log in with your branch account",
            icon: <UserCheck size={22} />
          },
          {
            step: "02",
            ar: "إدخال الطلب",
            en: "Enter Order",
            desc_ar: "إدخال رقم الطلب أو مسحه بالباركود",
            desc_en: "Enter order number or scan barcode",
            icon: <Barcode size={22} />
          },
          {
            step: "03",
            ar: "التوثيق الذكي",
            en: "Smart Capture",
            desc_ar: "تحديد الموقع، الوقت، والتصوير المباشر",
            desc_en: "Auto-detects GPS, time & captures media",
            icon: <Camera size={22} />
          },
          {
            step: "04",
            ar: "الاعتماد والرفع",
            en: "Submit & Sync",
            desc_ar: "مراجعة سريعة ثم رفع السجل رسمياً",
            desc_en: "Quick review then upload to cloud",
            icon: <CloudUpload size={22} />
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group"
          >
            {/* Step circle */}
            <div className="relative mb-4 z-10">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-sky-200 shadow-md flex items-center justify-center group-hover:border-sky-400 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-sky-500 text-white text-[11px] font-bold flex items-center justify-center shadow">
                {item.step}
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-800 mb-1">
              {isRTL ? item.ar : item.en}
            </h4>

            <p className="text-slate-400 text-xs leading-relaxed max-w-[170px]">
              {isRTL ? item.desc_ar : item.desc_en}
            </p>

          </motion.div>
        ))}
      </div>
    </div>

  </div>
</section>

<section
  id="full-features"
  className="py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white overflow-hidden"
>
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      <div>
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
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
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="font-semibold text-slate-300">
                {isRTL ? feat.ar : feat.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg p-10 rounded-[3rem] border border-white/10 shadow-xl">
        <h4 className="text-2xl font-bold mb-6 text-blue-300">
          {isRTL ? 'محرك البحث المتقدم' : 'Advanced Search Engine'}
        </h4>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-sm">
            <span className="text-slate-400">
              {isRTL ? 'البحث بواسطة:' : 'Search by:'}
            </span>
            <span className="text-blue-200 font-bold">
              {isRTL ? 'رقم الطلب / التاريخ / المستخدم' : 'Order ID / Date / User'}
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed italic">
            {isRTL
              ? '* يتيح لك النظام استعراض الصور وتكبيرها بدقة عالية وتصديرها كملفات رسمية.'
              : '* View high-res photos with zoom capabilities and export them as official files.'}
          </p>
        </div>
      </div>

    </div>
  </div>
</section><section
  id="sectors"
  className="relative py-16 px-6 overflow-hidden bg-white"
>

  {/* Subtle decorative blur - خفيف جداً */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 
    w-[500px] h-[300px] bg-sky-100/30 rounded-full blur-3xl" />
  </div>

  <div className="max-w-5xl mx-auto text-center relative z-10">

    {/* Badge + Title */}
    <span className="inline-block text-xs font-semibold text-sky-500 uppercase tracking-widest mb-3 bg-sky-50 px-3 py-1 rounded-full">
      {isRTL ? 'القطاعات' : 'Sectors'}
    </span>

    <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-slate-900 tracking-tight">
      {isRTL ? 'القطاعات المناسبة' : 'Ideal Sectors'}
    </h2>

    <div className="flex flex-wrap justify-center gap-4">
      {[
        { ar: 'الخدمات اللوجستية', en: 'Logistics Services', icon: <Truck size={18} /> },
        { ar: 'المطاعم والكافيهات', en: 'Restaurants & Cafes', icon: <Utensils size={18} /> },
        { ar: 'السوبرماركت والمتاجر', en: 'Retail & Supermarkets', icon: <ShoppingBag size={18} /> },
        { ar: 'شركات التوزيع', en: 'Distribution Companies', icon: <Package size={18} /> },
        { ar: 'خدمات التوريد', en: 'Supply Chain', icon: <Boxes size={18} /> }
      ].map((sector, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group flex items-center gap-3 px-6 py-3
          bg-white border border-slate-100
          rounded-full shadow-sm
          hover:shadow-md hover:border-sky-200 hover:-translate-y-1
          transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
            {sector.icon}
          </div>

          <span className="font-medium text-slate-700 text-sm">
            {isRTL ? sector.ar : sector.en}
          </span>
        </motion.div>
      ))}
    </div>

    <p className="mt-10 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
      {isRTL
        ? 'CapTured مصمم ليناسب أي نشاط يحتاج إثبات تسليم رسمي ومؤرشف.'
        : 'CapTured is designed to fit any business requiring official delivery proof and archiving.'}
    </p>

  </div>
</section>

<section
  id="features"
  className="relative py-28 px-6 overflow-hidden 
  bg-gradient-to-b from-blue-50/70 via-white to-white"
>

  {/* Soft Blue Fog */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 
    w-[700px] h-[450px] bg-blue-400/15 rounded-full blur-3xl" />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">

    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">
        {isRTL ? 'تقارير ذكية لاتخاذ القرار' : 'Smart Reporting for Decision Making'}
      </h2>

      <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs">
        {isRTL ? 'بيانات دقيقة لمتابعة أداء فريقك' : 'Accurate Data to Track Team Performance'}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">

      {/* Dashboard */}
      <div className="md:col-span-2 bg-white border border-blue-100 rounded-3xl p-8 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">

          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5">
            <LayoutDashboard size={20} />
          </div>

          <h4 className="text-xl md:text-2xl font-bold mb-3">
            {isRTL ? 'لوحة تحكم تفاعلية' : 'Interactive Dashboard'}
          </h4>

          <ul className="text-slate-600 font-medium space-y-1.5 text-sm leading-relaxed">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {isRTL ? 'متابعة عدد الطلبات يومياً' : 'Track daily documented orders'}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {isRTL ? 'تحليل النشاط حسب الفرع' : 'Analyze activity per branch'}
            </li>
          </ul>
        </div>
      </div>

      {/* Integrity */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg">
        <div className="mb-6 p-4 bg-white/10 rounded-2xl border border-white/10">
          <Lock size={36} className="text-blue-200" />
        </div>

        <h4 className="text-lg font-semibold mb-3">
          {isRTL ? 'موثوقية النتيجة' : 'Verification Integrity'}
        </h4>

        <p className="text-blue-100 text-xs leading-relaxed">
          {isRTL
            ? 'تشمل النتائج: صورة الطلب، خريطة الموقع، والوقت بدقة عالية.'
            : 'Includes order photo, GPS map, and precise timestamp.'}
        </p>
      </div>

      {/* Filtering */}
      <div className="bg-white border border-blue-100 rounded-3xl p-8 hover:border-blue-400 transition-all">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm">
          <Search size={22} />
        </div>

        <h4 className="text-lg font-semibold mb-3">
          {isRTL ? 'فلترة متقدمة' : 'Advanced Filtering'}
        </h4>

        <p className="text-slate-600 font-medium text-xs leading-relaxed">
          {isRTL
            ? 'ابحث حسب التاريخ، الفرع، أو المستخدم بسهولة.'
            : 'Filter by date, branch, or user instantly.'}
        </p>
      </div>

      {/* Export */}
      <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white flex items-center justify-between relative shadow-lg">
        <div className="max-w-md">
          <h4 className="text-xl md:text-2xl font-bold mb-4">
            {isRTL ? 'تصدير التقارير الذكي' : 'Smart Report Export'}
          </h4>

          <p className="text-blue-100 font-medium text-sm leading-relaxed mb-3">
            {isRTL
              ? 'استخرج تقاريرك بصيغ متعددة جاهزة للاعتماد.'
              : 'Export reports in multiple ready-to-use formats.'}
          </p>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-md text-xs font-semibold">EXCEL</span>
            <span className="px-3 py-1 bg-white/20 rounded-md text-xs font-semibold">WORD</span>
            <span className="px-3 py-1 bg-white/20 rounded-md text-xs font-semibold">PDF</span>
          </div>
        </div>

        <FileDown size={120} className="opacity-10" />
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
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="text-center mb-16"
>
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-6 shadow-sm">
    <Smartphone size={14} />
    {isRTL ? 'تطبيق الموبايل' : 'Mobile Application'}
  </div>

  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight leading-tight">
    {isRTL ? 'تجربة تطبيق ميدانية' : 'Smooth Field App'}
    <br />
    <span className="text-gradient">
      {isRTL ? 'سلسة وذكية' : 'Experience'}
    </span>
  </h2>

  <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
  <PackageCheck size={14} />
  {isRTL ? 'الميزة #1' : 'Feature #1'}
</div>

<h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
  {isRTL ? 'عرض وإنشاء الطلبات' : 'View & Create Orders'}
  <br />
  <span className="text-emerald-600">
    {isRTL ? 'بسهولة تامة' : 'Easily'}
  </span>
</h3>

<p className="text-sm md:text-base text-slate-600 leading-relaxed">
  {isRTL
    ? 'يمكن للموظفين عرض الطلبات وإنشاء طلب جديد بسهولة مع تفاصيل واضحة لكل عملية.'
    : 'Employees can view assigned orders and create new ones easily with clear details for each operation.'}
</p>

        <ul className="space-y-3">
  {[
    {
      icon: <CheckCircle2 size={16} className="text-emerald-600" />,
      text: isRTL ? 'عرض قائمة الطلبات' : 'View assigned orders',
      badge: isRTL ? 'فوري' : 'Instant'
    },
    {
      icon: <CheckCircle2 size={16} className="text-emerald-600" />,
      text: isRTL ? 'إنشاء طلب بنقرة واحدة' : 'Create order in one tap',
      badge: isRTL ? 'سريع' : 'Fast'
    },
    {
      icon: <CheckCircle2 size={16} className="text-emerald-600" />,
      text: isRTL ? 'تفاصيل شاملة' : 'Full details',
      badge: isRTL ? 'كامل' : 'Complete'
    },
  ].map((item, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="flex items-center gap-3 text-slate-700 font-medium 
      bg-white/70 p-3 rounded-xl border border-slate-100"
    >
      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
        {item.icon}
      </div>

      <span className="flex-1 text-sm">{item.text}</span>

      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
        {item.badge}
      </span>
    </motion.li>
  ))}
</ul>

<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 px-6 py-2.5 
  bg-emerald-600 text-white rounded-lg 
  font-semibold text-sm hover:bg-emerald-700 transition"
>
  {isRTL ? 'اكتشف المزيد' : 'Discover More'}
  <ArrowRight
    size={16}
    className={`${isRTL ? 'rotate-180' : ''}`}
  />
</motion.button>

        </motion.div>

        <motion.div
  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={`${isRTL ? 'lg:order-1' : ''}`}
>
  <div className="relative">

    {/* iPhone Frame */}
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="iphone-frame mx-auto hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="power-button" />
      <div className="volume-button" />
      <div className="volume-button down" />
      
      <div className="iphone-screen">
        <img
          src="/images/orders1.avif"
          alt={isRTL ? 'عرض وإنشاء الطلبات' : 'View and Create Orders'}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>

    {/* Badge - أقرب + أنميشن أنعم */}
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      animate={{ y: [0, -4, 0] }}
      transition={{
        delay: 1,
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
      className={`absolute -top-4 ${isRTL ? '-left-4' : '-right-4'} 
      bg-white rounded-lg shadow-md px-3 py-1.5 
      border border-slate-100`}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        {isRTL ? 'نشط الآن' : 'Live Now'}
      </div>
    </motion.div>

    {/* Softer Glow */}
    <div className="absolute -z-10 top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2 
    w-[100%] h-[100%] 
    bg-blue-100/40 rounded-full blur-2xl" />
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
         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-semibold">
  <Activity size={14} />
  {isRTL ? 'الميزة #2' : 'Feature #2'}
</div>

<h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
  {isRTL ? 'متابعة وتتبع الطلبات' : 'Real-Time Order'}
  <br />
  <span className="text-purple-600">
    {isRTL ? 'لحظياً' : 'Tracking'}
  </span>
</h3>

<p className="text-sm md:text-base text-slate-600 leading-relaxed">
  {isRTL
    ? 'تتبع حالة الطلب حتى التسليم مع تحديث تلقائي وإضافة صور وملاحظات مباشرة.'
    : 'Track order status until delivery with automatic updates and live notes/photos.'}
</p>

        <ul className="space-y-3">
  {[
    {
      icon: <CheckCircle2 size={16} className="text-purple-600" />,
      text: isRTL ? 'تحديثات فورية' : 'Instant updates',
      badge: isRTL ? 'تلقائي' : 'Auto'
    },
    {
      icon: <CheckCircle2 size={16} className="text-purple-600" />,
      text: isRTL ? 'صور توثيق مباشرة' : 'Live documentation photos',
      badge: isRTL ? 'مباشر' : 'Live'
    },
    {
      icon: <CheckCircle2 size={16} className="text-purple-600" />,
      text: isRTL ? 'ختم GPS تلقائي' : 'Auto GPS stamp',
      badge: isRTL ? 'دقيق' : 'Precise'
    },
  ].map((item, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="flex items-center gap-3 text-slate-700 font-medium 
      bg-white/70 p-3 rounded-xl border border-slate-100"
    >
      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
        {item.icon}
      </div>

      <span className="flex-1 text-sm">{item.text}</span>

      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
        {item.badge}
      </span>
    </motion.li>
  ))}
</ul>


        <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  className="group inline-flex items-center gap-2 
  px-6 py-2.5 
  bg-purple-600 text-white 
  rounded-lg 
  font-semibold text-sm 
  hover:bg-purple-700 
  transition-all"
>
  {isRTL ? 'جرّب الآن' : 'Try Now'}
  <ArrowRight
    size={16}
    className={`transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
  />
</motion.button>

        </motion.div>

       <motion.div
  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div className="relative">

    {/* iPhone Frame - Smaller */}
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="iphone-frame mx-auto scale-95 hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="power-button" />
      <div className="volume-button" />
      <div className="volume-button down" />
      
      <div className="iphone-screen">
        <img
          src="/images/orders2.avif"
          alt={isRTL ? 'متابعة وتتبع الطلبات' : 'Order Tracking'}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
    
    {/* Smaller & Closer Badge */}
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      animate={{ y: [0, 3, 0] }}
      className={`absolute -bottom-4 ${isRTL ? '-right-4' : '-left-4'} 
      bg-white rounded-lg shadow-md px-4 py-2 
      border border-slate-100`}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
        <MapPin size={14} className="text-purple-600" />
        {isRTL ? 'موقع دقيق' : 'Precise Location'}
      </div>
    </motion.div>

    {/* Softer Glow */}
    <div className="absolute -z-10 top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2 
    w-[105%] h-[105%] 
    bg-purple-100/40 rounded-full blur-2xl" />
  </div>
</motion.div>

      </div>
    </div>

   {/* CTA Section - بسيط ونظيف */}
{/* CTA Section - Compact */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="mt-20"
>
  <div className="relative bg-slate-900 rounded-2xl p-6 md:p-8 overflow-hidden">

    <div className="relative z-10 text-center max-w-2xl mx-auto">

      {/* Icon */}
      <div className="inline-flex items-center justify-center 
      w-10 h-10 bg-blue-600 rounded-lg mb-4">
        <Smartphone size={18} className="text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
        {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-6">
        {isRTL
          ? 'حمّل التطبيق وابدأ التوثيق بدقة GPS'
          : 'Download the app and start documenting with real GPS'}
      </p>

      {/* Store Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2 
        bg-white text-slate-900 rounded-md 
        text-xs font-semibold hover:bg-slate-100 transition">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09z"/>
          </svg>
          App Store
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2 
        bg-white text-slate-900 rounded-md 
        text-xs font-semibold hover:bg-slate-100 transition">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"/>
          </svg>
          Google Play
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
          <div className="reveal-up text-center mb-12">
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
  bg-slate-900 text-white text-[11px] font-semibold uppercase tracking-wide mb-4">
    <LayoutDashboard size={14} />
    {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
  </div>

  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
    {isRTL ? 'لوحة تحكم غنية بالبيانات' : 'Data-Rich Admin Dashboard'}
  </h2>

  <p className="text-slate-600 text-sm md:text-base 
  max-w-2xl mx-auto leading-relaxed">
    {isRTL
      ? 'راقب الأداء وتتبع العمليات واستخرج التقارير من لوحة واحدة.'
      : 'Monitor performance, track operations, and export reports from one dashboard.'}
  </p>
</div>


          <div className="space-y-32">
            {/* صورة اللوحة الأولى */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              

              <div className="space-y-5">

  <div className="inline-flex items-center gap-2 px-3 py-1.5 
  rounded-full bg-blue-50 border border-blue-200 
  text-blue-700 text-[11px] font-semibold">
    <BarChart3 size={14} />
    {isRTL ? 'تحليلات #1' : 'Analytics #1'}
  </div>
  
  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
    {isRTL ? 'مراجعة نسب الفروع' : 'Branch Performance Review'}
  </h3>
  
  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
    {isRTL
      ? 'نظرة شاملة لأداء الفروع مع مقارنة الإنجاز والوقت عبر مخططات تفاعلية.'
      : 'Overview of branch performance with completion and time comparison via interactive charts.'}
  </p>

  <ul className="space-y-3">
    {[
      {
        icon: <BarChart3 size={16} className="text-blue-600" />,
        text: isRTL ? 'مخططات تفاعلية متقدمة' : 'Advanced interactive charts',
      },
      {
        icon: <TrendingUp size={16} className="text-blue-600" />,
        text: isRTL ? 'مقارنة الأداء بين الفروع' : 'Compare branch performance',
      },
      {
        icon: <Activity size={16} className="text-blue-600" />,
        text: isRTL ? 'تحليل لحظي للإنجاز' : 'Real-time completion analysis',
      },
    ].map((item, i) => (
      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="text-sm">{item.text}</span>
      </li>
    ))}
  </ul>

  <div className="flex flex-wrap gap-3">
    <button className="inline-flex items-center gap-2 px-5 py-2.5 
    bg-blue-600 text-white rounded-lg 
    font-semibold text-sm hover:bg-blue-700 transition">
      {isRTL ? 'شاهد الديمو' : 'View Demo'}
      <ArrowUpRight size={16} />
    </button>

    <button className="inline-flex items-center gap-2 px-5 py-2.5 
    bg-white border border-slate-200 text-slate-900 
    rounded-lg font-semibold text-sm hover:border-blue-500 transition">
      <FileDown size={16} />
      {isRTL ? 'تحميل تقرير' : 'Download Report'}
    </button>
  </div>

</div>
<div>
  <div className="relative group">
    
    <div className="rounded-2xl bg-slate-900 
    border border-slate-800 
    p-3 md:p-4 overflow-hidden">
      
      <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700">
        <img
          src="/images/web.avif"
          alt={isRTL ? 'مراجعة نسب الفروع' : 'Branch Performance Review'}
          className="w-full rounded-lg"
        />
      </div>

    </div>

    {/* Smaller Badge */}
    <div className="absolute -top-3 -right-3 
    bg-blue-600 
    rounded-lg 
    shadow-md 
    px-3 py-1.5 
    text-white">
      
      <div className="flex items-center gap-1.5 
      text-[11px] font-semibold">
        <TrendingUp size={14} />
        +24.5%
      </div>

    </div>

  </div>
</div>


            </div>

            {/* صورة اللوحة الثانية */}
            <div className="reveal-up grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'lg:order-2' : ''} space-y-5`}>

  <div className="inline-flex items-center gap-2 px-3 py-1.5 
  rounded-full bg-emerald-50 border border-emerald-200 
  text-emerald-700 text-[11px] font-semibold">
    <PieChart size={14} />
    {isRTL ? 'تحليلات #2' : 'Analytics #2'}
  </div>
  
  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
    {isRTL ? 'نسب الطلبات والإحصائيات' : 'Orders Statistics & Ratios'}
  </h3>
  
  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
    {isRTL
      ? 'تتبع نسب الطلبات المكتملة وقيد التنفيذ بمخططات واضحة وتحليل زمني.'
      : 'Track completed and in-progress orders with clear charts and time analysis.'}
  </p>

  <ul className="space-y-3">
    {[
      {
        icon: <PieChart size={16} className="text-emerald-600" />,
        text: isRTL ? 'مخططات دائرية لتوزيع الطلبات' : 'Pie charts for distribution',
      },
      {
        icon: <Database size={16} className="text-emerald-600" />,
        text: isRTL ? 'إحصائيات شاملة لكل حالة' : 'Status-based statistics',
      },
      {
        icon: <TrendingUp size={16} className="text-emerald-600" />,
        text: isRTL ? 'تحليل الاتجاهات عبر الزمن' : 'Trend analysis over time',
      },
    ].map((item, i) => (
      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="text-sm">{item.text}</span>
      </li>
    ))}
  </ul>

  <div className="flex flex-wrap gap-3">
    <button className="inline-flex items-center gap-2 px-5 py-2.5 
    bg-emerald-600 text-white rounded-lg 
    font-semibold text-sm hover:bg-emerald-700 transition">
      {isRTL ? 'اكتشف التحليلات' : 'Explore Analytics'}
      <ArrowRight
        size={16}
        className={`${isRTL ? 'rotate-180' : ''}`}
      />
    </button>

    <button className="inline-flex items-center gap-2 px-5 py-2.5 
    bg-white border border-slate-200 text-slate-900 
    rounded-lg font-semibold text-sm hover:border-emerald-500 transition">
      <Users size={16} />
      {isRTL ? 'إدارة الفريق' : 'Team Management'}
    </button>
  </div>

</div>


             <div className={`${isRTL ? 'lg:order-1' : ''}`}>
  <div className="relative group">

    <div className="rounded-2xl bg-slate-900 shadow-lg 
    border border-slate-800 p-3 md:p-4 overflow-hidden">

      <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
        <img
          src="/images/web1.avif"
          alt={isRTL ? 'نسب الطلبات' : 'Orders Statistics'}
          className="w-full rounded-lg shadow-md"
        />
      </div>

    </div>

    {/* Smaller Badge */}
    <div className="absolute -bottom-4 -left-4 
    bg-emerald-600 rounded-lg shadow-md 
    px-3 py-1.5 text-white">
      
      <div className="flex items-center gap-1.5 text-[11px] font-semibold">
        <CheckCircle2 size={14} />
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
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-wider mb-6"
      >
        <Sparkles size={14} />
        {isRTL ? 'باقات مرنة' : 'Flexible Plans'}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl lg:text-5xl font-black mb-4 tracking-tight text-slate-900"
      >
        {isRTL ? 'خطط بسيطة وشفافة' : 'Simple, Transparent Pricing'}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-500 font-medium text-base"
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
          <h3 className="text-lg font-black text-slate-900 mb-4">
            {isRTL ? 'الأساسية (Starter)' : 'Starter'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">299</span>
            <div className="flex flex-col">
              <span className="text-slate-400 font-bold text-xs">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-400 font-medium text-[10px]">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-emerald-600 text-[11px] font-bold mt-2">
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
            <li key={i} className="flex gap-3 items-start text-slate-600 text-xs font-semibold">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>
        
        <button className="w-full py-4 rounded-2xl font-black text-sm border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm hover:shadow-lg">
          {isRTL ? 'ابدأ الآن' : 'Get Started'}
        </button>
      </motion.div>

      {/* Business Plan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/30 relative scale-105 border-2 border-blue-500/20 flex flex-col"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          {isRTL ? '⭐ الأكثر طلباً' : '⭐ Most Popular'}
        </div>
        
        <div className="mb-8 relative z-10">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
            <Zap size={24} className="text-blue-400" />
          </div>
          <h3 className="text-lg font-black text-blue-400 mb-4">
            {isRTL ? 'الأعمال (Business)' : 'Business'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">699</span>
            <div className="flex flex-col">
              <span className="text-slate-500 font-bold text-xs">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-500 font-medium text-[10px]">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-blue-400 text-[11px] font-bold mt-2">
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
            <li key={i} className="flex gap-3 items-start text-slate-300 text-xs font-semibold">
              <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 relative z-10">
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
          <h3 className="text-lg font-black text-slate-900 mb-4">
            {isRTL ? 'المؤسسات (Enterprise)' : 'Enterprise'}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">1499</span>
            <div className="flex flex-col">
              <span className="text-slate-400 font-bold text-xs">{isRTL ? 'ر.س' : 'SAR'}</span>
              <span className="text-slate-400 font-medium text-[10px]">{isRTL ? '/شهرياً' : '/month'}</span>
            </div>
          </div>
          <p className="text-purple-600 text-[11px] font-bold mt-2">
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
            <li key={i} className="flex gap-3 items-start text-slate-600 text-xs font-semibold">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="leading-tight">{isRTL ? item.ar : item.en}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-4 rounded-2xl font-black text-sm border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm hover:shadow-lg">
          {isRTL ? 'تواصل معنا' : 'Contact Sales'}
        </button>
      </motion.div>
    </div>

    {/* Upsell */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-20 p-8 bg-slate-50 rounded-[2rem] border border-slate-200"
    >
      <h4 className="text-center font-black text-slate-900 mb-8 text-base">
        {isRTL ? 'خدمات وإضافات اختيارية' : 'Optional Add-ons'}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-[11px] text-slate-500 uppercase font-bold">{isRTL ? 'مستخدم إضافي' : 'Extra User'}</p>
          <p className="text-base font-black text-slate-900">25 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase font-bold">{isRTL ? 'فرع إضافي' : 'Extra Branch'}</p>
          <p className="text-base font-black text-slate-900">80 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase font-bold">{isRTL ? 'تخزين 50GB' : '50GB Storage'}</p>
          <p className="text-base font-black text-slate-900">120 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase font-bold">{isRTL ? 'تقارير Power BI' : 'Power BI Reports'}</p>
          <p className="text-sm font-black text-slate-900">500 - 1500 {isRTL ? 'ر.س' : 'SAR'}</p>
        </div>
      </div>
    </motion.div>
  </div>
</section>



      {/* --- FAQ --- */}
     <section className="py-40 px-6 max-w-4xl mx-auto">
  <div className="reveal-up text-center mb-20">
    <h2 className="text-4xl font-black mb-6">
      {isRTL ? 'الأسئلة الشائعة' : 'Common Questions'}
    </h2>
    <p className="text-slate-400 font-bold text-sm">
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
          className="w-full p-8 text-right flex justify-between items-center font-bold text-lg group"
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
              size={18}
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
              <div className="px-8 pb-8 text-slate-500 font-bold text-sm leading-relaxed border-t border-slate-50 pt-6">
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
  className="relative bg-slate-950 text-white py-24 px-6 overflow-hidden"
>

  {/* صورة خلفية ديكورية */}
  <div
    className={`absolute inset-0 opacity-10 pointer-events-none ${
      isRTL ? 'bg-left' : 'bg-right'
    } bg-no-repeat bg-contain`}
    style={{ backgroundImage: "url('/images/footer.png')" }}
  />

  {/* إضاءة ناعمة */}
  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 items-start">

      {/* القسم الأيسر */}
      <div>
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
          {isRTL ? 'ابدأ التحول الرقمي اليوم' : 'Start Your Digital Journey Today'}
        </h2>

        <p className="text-slate-400 text-base font-medium mb-8 leading-relaxed max-w-lg">
          {isRTL
            ? 'انضم إلى الشركات التي تثق في CapTured لتوثيق عملياتها الميدانية باحترافية.'
            : 'Join companies trusting CapTured for professional field documentation.'}
        </p>

        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-600/30 hover:-translate-y-1 transition-all flex items-center gap-3">
          {isRTL ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
          <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </div>

      {/* القسم الأيمن */}
      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">

        {/* اللوجو */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <img
            src="/images/logo.avif"
            alt="CapTured Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-extrabold tracking-wide">CapTured</span>
        </div>

        {/* معلومات الاتصال */}
        <div className="space-y-6 mb-10">

          <a
            href="mailto:info@ilogic.com.sa"
            className={`flex items-center gap-4 group ${
              isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'
            } transition-transform`}
          >
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </div>
              <div className="text-xs font-semibold group-hover:text-blue-400 transition-colors">
                info@ilogic.com.sa
              </div>
            </div>
          </a>

          <a
            href="tel:+966558986036"
            className={`flex items-center gap-4 group ${
              isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'
            } transition-transform`}
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Phone size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">
                {isRTL ? 'الهاتف' : 'Phone'}
              </div>
              <div className="text-xs font-semibold" dir="ltr">
                +966 55 898 6036
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">
                {isRTL ? 'الموقع' : 'Location'}
              </div>
              <div className="text-xs font-semibold">
                {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </div>
            </div>
          </div>

        </div>

        {/* السوشيال والحقوق */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">

          <span className="text-[10px] text-slate-500 font-medium">
            © 2026 CapTured. All rights reserved.
          </span>

          <div className="flex gap-4">

            <a
              href="#"
              className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
            >
              <Twitter size={14} />
            </a>

            <a
              href="#"
              className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
            >
              <Linkedin size={14} />
            </a>

            <a
              href="#"
              className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
            >
              <Facebook size={14} />
            </a>

          </div>
        </div>

      </div>

    </div>
  </div>
</footer>

    </div>
  );
}
