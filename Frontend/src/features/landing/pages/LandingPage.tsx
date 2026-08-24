import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Lock, 
  Compass, 
  Zap, 
  Sliders, 
  Building2, 
  Target, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { cn } from '@/lib/cn';
import { HeroBackdrop } from '@/components/visuals/HeroBackdrop';
import { FinancialBackground } from '@/components/visuals';
import { VeyraLockup, VeyraMark } from '@/components/brand/VeyraBrand';

/* Decorative circle field — Start Your Journey card's text half.
   Positions are relative to the card; sizes in px. */
const JOURNEY_CIRCLES: Array<{
  left: string;
  top: string;
  size: number;
  opacity: number;
  ring?: boolean;
}> = [
  { left: "3%", top: "7%", size: 12, opacity: 0.5 },
  { left: "9%", top: "22%", size: 8, opacity: 0.75 },
  { left: "17%", top: "12%", size: 10, opacity: 0.35, ring: true },
  { left: "27%", top: "6%", size: 14, opacity: 0.28 },
  { left: "38%", top: "11%", size: 9, opacity: 0.55, ring: true },
  { left: "45%", top: "24%", size: 7, opacity: 0.65 },
  { left: "33%", top: "30%", size: 16, opacity: 0.2, ring: true },
  { left: "21%", top: "36%", size: 9, opacity: 0.45 },
  { left: "6%", top: "42%", size: 18, opacity: 0.22, ring: true },
  { left: "13%", top: "55%", size: 8, opacity: 0.7 },
  { left: "29%", top: "58%", size: 11, opacity: 0.35 },
  { left: "41%", top: "52%", size: 15, opacity: 0.25, ring: true },
  { left: "4%", top: "68%", size: 10, opacity: 0.6 },
  { left: "18%", top: "74%", size: 7, opacity: 0.8 },
  { left: "34%", top: "78%", size: 12, opacity: 0.3, ring: true },
  { left: "44%", top: "86%", size: 9, opacity: 0.55 },
  { left: "26%", top: "90%", size: 14, opacity: 0.22 },
  { left: "8%", top: "88%", size: 8, opacity: 0.65 },
  { left: "47%", top: "66%", size: 8, opacity: 0.5, ring: true },
  { left: "37%", top: "44%", size: 6, opacity: 0.75 },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Wealth simulator state
  const [monthlyInvest, setMonthlyInvest] = useState<number>(25000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [timeHorizon, setTimeHorizon] = useState<number>(15);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');

  // Floating scroll cue — stays in view until the visitor enters the story
  const [showScrollCue, setShowScrollCue] = useState<boolean>(true);
  useEffect(() => {
    const onScroll = () => setShowScrollCue(window.scrollY < 380);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Future wealth formula: P * (((1 + i)^n - 1) / i) * (1 + i)
  const calculateWealth = () => {
    const r = annualReturn / 100 / 12;
    const n = timeHorizon * 12;
    const futureValue = monthlyInvest * (((Math.pow(1 + r, n) - 1) / r)) * (1 + r);
    const totalInvested = monthlyInvest * n;
    const gain = futureValue - totalInvested;

    return {
      total: Math.round(futureValue),
      invested: Math.round(totalInvested),
      gain: Math.round(gain)
    };
  };

  const wealth = calculateWealth();

  // Growth curve for the sparkline — ~28 sampled points of the same SIP math
  const growthSeries = useMemo<number[]>(() => {
    const r = annualReturn / 100 / 12;
    const n = timeHorizon * 12;
    const steps = Math.min(n, 28);
    if (steps === 0) return [0, 0];
    return Array.from({ length: steps + 1 }, (_, s) => {
      const m = Math.round((n / steps) * s);
      return monthlyInvest * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
    });
  }, [monthlyInvest, annualReturn, timeHorizon]);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/connect');
  };

  return (
      <div
        className="min-h-screen text-[#0B1F3A] font-sans antialiased selection:bg-[#EEF5FD] selection:text-[#1557B0] overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F4FAFE 45%, #E3F2FD 100%)",
        }}
      >

      {/* Floating scroll cue — attention magnet until the visitor scrolls */}
      {showScrollCue && (
        <button
          type="button"
          onClick={() =>
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to know more"
          className="group fixed left-1/2 -translate-x-1/2 bottom-6 z-40 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#2153E6]/30 shadow-[0_16px_40px_-12px_rgba(33,83,230,0.45)] hover:shadow-[0_20px_50px_-12px_rgba(33,83,230,0.6)] hover:border-[var(--color-primary)] transition-shadow cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
        >
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white"
          >
            <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-30" />
            <ChevronDown size={18} strokeWidth={2.5} className="relative animate-bounce" />
          </span>
          <span className="text-sm font-bold text-[#0B1F3A]">
            Scroll to know more
          </span>
        </button>
      )}

      {/* STICKY HEADER */}
      <header
        className="sticky top-3 z-50 mx-auto max-w-7xl rounded-[1.75rem] border border-[#BBDEFB] shadow-[0_12px_32px_-18px_rgba(13,71,161,0.35)] transition-all"
        style={{ background: "#E3F2FD" }}
      >
        <div className="px-5 sm:px-7 h-16 sm:h-[72px] flex items-center justify-between">

          {/* Logo & Brand — emblem + name + slogan on the left */}
          <div className="flex items-center">
            <VeyraLockup tagline />
          </div>

          {/* Desktop Links (Informational & Anchor) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-[#0B1F3A]/80">
            <a href="#how-it-works" className="hover:text-[#0D47A1] transition-colors py-2">How it Works</a>
            <a href="#features" className="hover:text-[#0D47A1] transition-colors py-2">Platform</a>
            <a href="#calculator" className="hover:text-[#0D47A1] transition-colors py-2">Calculator</a>
            <a href="#security" className="hover:text-[#0D47A1] transition-colors py-2">Security</a>
            <a href="#testimonials" className="hover:text-[#0D47A1] transition-colors py-2">Stories</a>
          </nav>

          {/* Desktop Right Actions (App Links + CTAs) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-[#0B1F3A]/85 hover:text-[#0B1F3A] px-3 py-2 transition-colors border-r border-[#0B1F3A]/20 pr-4"
            >
              App Dashboard
            </Link>
            <button
              onClick={() => navigate('/connect')}
              className="text-sm font-semibold text-[#0B1F3A]/85 hover:text-[#0B1F3A] px-3 py-2 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/connect')}
              className="text-sm font-bold text-white bg-[#1565C0] hover:bg-[#0D47A1] px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              Get started for free
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B1F3A] hover:bg-white/70 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3">
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#52647A] py-1.5"
            >
              How it Works
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#52647A] py-1.5"
            >
              Platform
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#52647A] py-1.5"
            >
              Calculator
            </a>
            <a 
              href="#security" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#52647A] py-1.5"
            >
              Security
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#52647A] py-1.5"
            >
              Stories
            </a>
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <Link 
                to="/dashboard"
                className="block text-center text-xs font-bold text-[#0B1F3A] bg-[#EEF5FD] py-2.5 rounded-xl"
              >
                Go to App Dashboard
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/connect'); }}
                className="w-full text-center text-xs font-bold text-white bg-[#0B1F3A] py-2.5 rounded-xl shadow-sm"
              >
                Get started for free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#FAFBFC] to-[#F8FAFC]">
        <HeroBackdrop />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF5FD] border border-[#1557B0]/20 text-[#1557B0] text-xs font-semibold tracking-wide">
                <Sparkles size={14} className="text-[#1557B0]" />
                <span>FINANCIAL CLARITY PLATFORM</span>
                <span className="w-1 h-1 rounded-full bg-[#1557B0]" />
                <span className="text-[#52647A]">UNDERSTAND → ACT → GROW</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.1]">
                Stop guessing your net worth. <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#1557B0] via-[#16835B] to-[#0B1F3A] bg-clip-text text-transparent">
                  Understand every rupee.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-[length:var(--typography-body-lg-size)] leading-[var(--typography-body-lg-line)] text-[var(--color-text-secondary)] max-w-[42ch]">
                Veyra brings together your bank accounts, investments, liabilities, and long-term goals into one unified intelligent dashboard. Designed for clarity, zero clutter, and actionable steps.
              </p>

              {/* Email CTAs Form */}
              <form onSubmit={handleHeroSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1557B0]/30 focus:border-[#1557B0] shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#1557B0] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#52647A] font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#16835B]" />
                  <span>256-Bit Bank Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock size={16} className="text-[#16835B]" />
                  <span>RBI Account Aggregator Protocol</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#16835B]" />
                  <span>No Spam, Read-Only Sync</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Fidelity UI Hero Mockup */}
            <div className="lg:col-span-5 relative">
              
              {/* Background Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1557B0]/10 via-[#16835B]/10 to-transparent rounded-3xl blur-2xl -z-10" />

              {/* Premium Frosted Glass Dashboard Preview Card */}
              <Card
                surface="blue"
                className="bg-white/15 bg-gradient-to-br from-white/45 via-white/20 to-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 ring-1 ring-white/30 shadow-[0_28px_72px_-20px_rgba(11,31,58,0.28)] rounded-3xl space-y-6 text-left"
              >
                <CardContent className="p-6 space-y-6">
                  {/* Top sheen */}
                  <span aria-hidden="true" className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-white/95 to-transparent" />

                  {/* Header inside mockup */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#1557B0] to-[#16835B]" />
                        Total Net Worth
                      </span>
                      <div className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums bg-gradient-to-r from-[#0B1F3A] via-[#1557B0] to-[#16835B] bg-clip-text text-transparent">
                        ₹ 48,25,400
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2.5 py-1 rounded-full border border-[var(--color-success)]/20 shadow-sm">
                      <TrendingUp size={12} />
                      +14.2% YoY
                    </span>
                  </div>

                  {/* Momentum sparkline */}
                  <div aria-hidden="true">
                    <svg viewBox="0 0 320 64" preserveAspectRatio="none" className="h-14 w-full">
                      <defs>
                        <linearGradient id="veyra-hero-spark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#A9CDEA" stopOpacity="0.45" />
                          <stop offset="1" stopColor="#A9CDEA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,52 L45,44 L90,48 L135,34 L180,40 L225,22 L270,30 L320,12 L320,64 L0,64 Z" fill="url(#veyra-hero-spark)" />
                      <polyline points="0,52 45,44 90,48 135,34 180,40 225,22 270,30 320,12" fill="none" stroke="#5E97CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                      <circle cx="270" cy="30" r="4" fill="#FFFFFF" stroke="#5E97CC" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Micro Widgets */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/money" className="group block p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 ring-1 ring-[#1557B0]/5 shadow-sm hover:shadow-md hover:bg-white/55 hover:-translate-y-0.5 hover:border-[#1557B0]/30 transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">Liquid Reserves</div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-[var(--color-text-primary)] tabular-nums group-hover:text-[var(--color-primary)] transition-colors">₹ 8,50,000</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[var(--color-success)]">
                          <TrendingUp size={11} />
                          4.2 mo
                        </span>
                      </div>
                      <div className="text-[10px] text-[var(--color-text-secondary)] font-medium mt-1">4.2 Months Safety</div>
                    </Link>

                    <Link to="/money" className="group block p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 ring-1 ring-[#1557B0]/5 shadow-sm hover:shadow-md hover:bg-white/55 hover:-translate-y-0.5 hover:border-[#1557B0]/30 transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">Investments</div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-[var(--color-text-primary)] tabular-nums group-hover:text-[var(--color-primary)] transition-colors">₹ 39,75,400</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[var(--color-primary)]">SIP ₹45k/mo</span>
                      </div>
                      <div className="text-[10px] text-[var(--color-text-secondary)] font-medium mt-1">Auto-synced daily</div>
                    </Link>
                  </div>

                  {/* Smart Insight Nudge */}
                  <Link to="/insights" className="relative group overflow-hidden block flex items-start gap-3 p-4 pl-5 pr-5 rounded-2xl bg-gradient-to-r from-[#EEF5FD]/80 via-[#EEF5FD]/40 to-transparent border border-[#1557B0]/15 hover:border-[#1557B0]/30 transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]">
                    <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b from-[#1557B0] to-[#16835B]" />
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1557B0] to-[#16835B] text-white shadow-md shadow-[#1557B0]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]">
                      <Zap size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[var(--color-primary)]">Actionable Insight</span>
                        <span className="text-[10px] text-[var(--color-text-secondary)]">Just now</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-primary)] font-medium mt-0.5">
                        You can increase your Retirement Goal probability to 94% by optimizing your idle savings.
                      </p>
                    </div>
                  </Link>

                  {/* Direct App Portal Link */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-[var(--color-text-secondary)] font-medium">Ready to see your real numbers?</span>
                    <Link to="/dashboard" className="group inline-flex items-center gap-1.5 pl-4 pr-3 py-2 rounded-full bg-[#0B1F3A] text-white text-xs font-bold shadow-md shadow-[#0B1F3A]/25 hover:bg-[#1557B0] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)] whitespace-nowrap">
                      Open Dashboard
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
      <section id="how-it-works" className="relative overflow-hidden py-[var(--spacing-5xl)] bg-gradient-to-b from-white via-[#FAFBFC] to-[#EEF5FD]/50">
        {/* Ambient aurora wash + data motif (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#1557B0]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -left-28 w-[26rem] h-[26rem] rounded-full bg-[#16835B]/10 blur-3xl" />
        <FinancialBackground variant="wave" tone="blue" intensity="low" position="bottom" className="[mask-image:linear-gradient(to_top,black,transparent_80%)]" />
        <div className="relative max-w-[var(--container-max)] mx-auto px-[var(--container-padding-mobile)] sm:px-[var(--container-padding-tablet)] lg:px-[var(--container-padding-desktop)]">
        <div className="text-center mx-auto mb-[var(--spacing-2xl)]">
          <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] uppercase tracking-wider">The Veyra Method</span>
          <h2 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)] mt-1 mb-[var(--spacing-md)]">
            Designed around how humans actually make financial choices.
          </h2>
          <p className="text-[length:var(--typography-body-lg-size)] leading-[var(--typography-body-lg-line)] text-[var(--color-text-secondary)] max-w-[42ch] mx-auto">
            No overwhelming spreadsheets or confusing financial jargon. Just three clear steps to total calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-xl)]">
          
          {/* Card 1: Understand */}
          <Link to="/money" className="h-full p-[var(--spacing-xl)] rounded-[var(--radius-xl)] bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-raised)] transition-all group flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-blue)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] uppercase tracking-wider">UNDERSTAND</span>
              <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mt-1 mb-3 group-hover:text-[var(--color-primary)] transition-colors">See the Complete Picture</h3>
              <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
                Connect your accounts via read-only RBI aggregation. Automatically categorize spending, track net worth velocity, and view all assets in one place.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
              <span>View Money Overview</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Card 2: Act */}
          <Link to="/insights" className="h-full p-[var(--spacing-xl)] rounded-[var(--radius-xl)] bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-raised)] transition-all group flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-green)] text-[var(--color-success)] flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-success)] uppercase tracking-wider">ACT</span>
              <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mt-1 mb-3 group-hover:text-[var(--color-success)] transition-colors">Receive Precision Nudges</h3>
              <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
                Identify wasteful subscriptions, uninvested cash drag, and high-interest debt bottlenecks with AI-driven, human-readable alerts.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-success)] group-hover:translate-x-1 transition-transform">
              <span>Explore Smart Insights</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Card 3: Grow */}
          <Link to="/goals" className="h-full p-[var(--spacing-xl)] rounded-[var(--radius-xl)] bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-raised)] transition-all group flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-warm)] text-[var(--color-warning)] flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-warning)] uppercase tracking-wider">GROW</span>
              <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mt-1 mb-3 group-hover:text-[var(--color-warning)] transition-colors">Track Real Life Goals</h3>
              <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
                Connect your monthly cash surplus directly to home purchases, FIRE goals, and emergency funds with dynamic completion dates.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-warning)] group-hover:translate-x-1 transition-transform">
              <span>Manage Goals</span>
              <ArrowRight size={14} />
            </div>
          </Link>

        </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section id="features" className="relative overflow-hidden py-[var(--spacing-5xl)] border-y border-[#E2E8F0]/70 bg-gradient-to-br from-[#EEF5FD]/70 via-white to-[#EFF8F4]/60">
        {/* Ambient aurora wash (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#16835B]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[12%] w-[22rem] h-[22rem] rounded-full bg-[#1557B0]/10 blur-3xl" />
        <div className="relative max-w-[var(--container-max)] mx-auto px-[var(--container-padding-mobile)] sm:px-[var(--container-padding-tablet)] lg:px-[var(--container-padding-desktop)]">
        <div className="text-center mx-auto mb-[var(--spacing-2xl)]">
          <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] uppercase tracking-wider">Platform Capabilities</span>
          <h2 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)] mt-1 mb-[var(--spacing-md)]">
            Everything you need for complete financial clarity.
          </h2>
          <p className="text-[length:var(--typography-body-lg-size)] leading-[var(--typography-body-lg-line)] text-[var(--color-text-secondary)] max-w-[42ch] mx-auto">
            Designed to solve fragmented banking, scattered investments, and manual spreadsheet tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-xl)]">
          <Link to="/money" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-primary)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-blue)] text-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">Unified Net Worth</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Connect bank accounts, Demat, mutual funds, and fixed deposits into one automatically updated statement.
            </p>
          </Link>

          <Link to="/insights" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-success)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-green)] text-[var(--color-success)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-success)] transition-colors">Smart Anomaly Detection</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Detect unusual price increases in subscriptions or unexpected bank fees before they stack up.
            </p>
          </Link>

          <Link to="/goals" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-warning)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-warm)] text-[var(--color-warning)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-warning)] transition-colors">Visual Goal Engine</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Assign real money to specific milestones and track realistic completion dates based on cash flow.
            </p>
          </Link>

          <Link to="/explore" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-primary)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-blue)] text-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">Interactive Calculators</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Simulate FIRE timelines, debt payoff strategies, and SIP growth scenarios in real time.
            </p>
          </Link>

          <Link to="/assistant" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-success)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-green)] text-[var(--color-success)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-success)] transition-colors">AI Financial Assistant</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Ask natural questions like "How much did I spend on dining out this quarter?" and get instant data.
            </p>
          </Link>

          <Link to="/connect" className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-warning)] transition-all group flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-warm)] text-[var(--color-warning)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-warning)] transition-colors">RBI Account Aggregator</h3>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)] flex-1">
              Bank-grade, encrypted, read-only data sync without ever sharing credentials or passwords.
            </p>
          </Link>
        </div>
        </div>
      </section>

      {/* WEALTH SIMULATOR SECTION */}
      <section id="calculator" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-[#F5F8FF] to-[#EAF1FE] text-[#0B1F3A] rounded-3xl p-6 sm:p-9 relative overflow-hidden ring-1 ring-[#2153E6]/15 shadow-[0_40px_100px_-40px_rgba(33,83,230,0.35)]">

          {/* Light aurora glows */}
          <span aria-hidden="true" className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#2153E6]/40 to-transparent" />
          <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] bg-[#2153E6]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-[#10B981]/12 rounded-full blur-[110px] pointer-events-none" />
          <FinancialBackground variant="grid" tone="soft" intensity="low" position="center" className="opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block bg-gradient-to-r from-[#1A42C2] to-[#4D7CF3] bg-clip-text text-transparent text-xs font-bold uppercase tracking-[0.18em]">Interactive Wealth Engine</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-1 mb-3">
                  See how consistency compounds.
                </h2>
                <p className="text-sm text-[#52647A]">
                  Adjust your monthly contribution and timeline to visualize long-term financial growth.
                </p>
              </div>

              {/* Controls — label left, glass value pill right, filled slider below */}
              <div className="space-y-5 pt-3">

                {/* Monthly Investment */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#52647A]">Monthly Contribution</span>
                    <span className="inline-flex items-baseline gap-1 rounded-full bg-white border border-[#D9E1EA] px-4 py-1 text-sm font-bold text-[#0B1F3A] tabular-nums shadow-[0_2px_8px_rgba(11,31,58,0.08)]">
                      ₹ {monthlyInvest.toLocaleString('en-IN')}
                      <span className="text-[#7A8798] font-semibold">/mo</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={150000}
                    step={1000}
                    value={monthlyInvest}
                    onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    aria-label="Monthly contribution"
                    className="we-range"
                    style={{ "--we-fill": `${((monthlyInvest - 2000) / (150000 - 2000)) * 100}%`, "--we-accent": "#2153E6", "--we-track": "rgba(11,31,58,0.08)" } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-[10px] font-medium text-[#7A8798] mt-2 tabular-nums">
                    <span>₹2,000</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#52647A]">Expected Annual Return</span>
                    <span className="inline-flex items-baseline rounded-full bg-[#16835B]/10 border border-[#16835B]/25 px-4 py-1 text-sm font-bold text-[#16835B] tabular-nums">
                      {annualReturn}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={18}
                    step={0.5}
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    aria-label="Expected annual return percentage"
                    className="we-range"
                    style={{ "--we-fill": `${((annualReturn - 6) / (18 - 6)) * 100}%`, "--we-accent": "#4ADE80" } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-[10px] font-medium text-[#7A8798] mt-2">
                    <span>6% · Conservative</span>
                    <span>Aggressive · 18%</span>
                  </div>
                </div>

                {/* Time Horizon */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#52647A]">Time Horizon</span>
                    <span className="inline-flex items-baseline rounded-full bg-white/[0.07] border border-white/10 px-4 py-1 text-sm font-bold text-white tabular-nums shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {timeHorizon} <span className="text-[#7A8798] font-semibold">Years</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(Number(e.target.value))}
                    aria-label="Time horizon in years"
                    className="we-range"
                    style={{ "--we-fill": `${((timeHorizon - 3) / (30 - 3)) * 100}%`, "--we-accent": "#2153E6", "--we-track": "rgba(11,31,58,0.08)" } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-[10px] font-medium text-[#7A8798] mt-2 tabular-nums">
                    <span>3 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Output Box — projection hero, growth sparkline, split bar */}
            <div className="lg:col-span-6 relative bg-white/70 backdrop-blur-xl border border-[#D9E1EA] rounded-2xl p-6 sm:p-8 space-y-6 ring-1 ring-[#2153E6]/20 shadow-[0_24px_60px_-24px_rgba(11,31,58,0.25)]">
              <span aria-hidden="true" className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[#2153E6]/50 to-transparent" />
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.18em] text-[#52647A]">Projected Future Wealth</span>
                <div className="text-3xl sm:text-[2.6rem] leading-none font-extrabold text-[#0B1F3A] mt-2 tabular-nums tracking-tight">
                  ₹ {wealth.total.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Growth curve */}
              <svg
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="w-full h-20"
              >
                <defs>
                  <linearGradient id="weSparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4D7CF3" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#4D7CF3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {(() => {
                  const max = Math.max(...growthSeries, 1);
                  const pts = growthSeries.map((v, i) => {
                    const x = (i / (growthSeries.length - 1)) * 300;
                    const y = 78 - (v / max) * 72;
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  });
                  const line = `M ${pts.join(' L ')}`;
                  return (
                    <>
                      <path d={`${line} L 300,80 L 0,80 Z`} fill="url(#weSparkFill)" stroke="none" />
                      <path d={line} fill="none" stroke="#2153E6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  );
                })()}
              </svg>

              {/* Invested vs Gains — proportional split bar + legend */}
              <div className="space-y-3">
                {(() => {
                  const total = Math.max(wealth.total, 1);
                  const gainPct = Math.min(96, Math.max(4, Math.round((wealth.gain / total) * 100)));
                  return (
                    <>
                      <div className="flex h-2 w-full gap-[3px]" role="img" aria-label={`Invested ${100 - gainPct}% and estimated gains ${gainPct}% of projected wealth`}>
                        <div className="rounded-full bg-[var(--color-primary)]" style={{ width: `${100 - gainPct}%` }} />
                        <div className="rounded-full bg-[#34D399]" style={{ width: `${gainPct}%` }} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold tracking-wide text-[#72648E]">Total Invested</span>
                            <span className="block text-sm sm:text-base font-bold text-[#0B1F3A] tabular-nums truncate">
                              ₹ {wealth.invested.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#16835B] shrink-0" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold tracking-wide text-[#72648E]">Estimated Gains</span>
                            <span className="block text-sm sm:text-base font-bold text-[#16835B] tabular-nums truncate">
                              + ₹ {wealth.gain.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="pt-2">
                <Link
                  to="/explore"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2153E6] to-[#4D7CF3] text-white hover:from-[#1A42C2] hover:to-[#2153E6] transition-all font-bold text-xs shadow-lg shadow-[#2153E6]/40 ring-1 ring-white/20 flex items-center justify-center gap-2"
                >
                  <Sliders size={16} />
                  <span>Open Advanced Calculators in App</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECURITY & TRUST SECTION */}
      <section id="security" className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-[#FAFBFC] to-[#EEF5FD]/40">
        {/* Ambient aurora wash + data motif (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#1557B0]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-28 w-[26rem] h-[26rem] rounded-full bg-[#16835B]/10 blur-3xl" />
        <FinancialBackground variant="trend" tone="navy" intensity="low" position="left" className="opacity-60 [mask-image:linear-gradient(to_right,black,transparent_85%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#16835B] uppercase tracking-wider">Uncompromising Safety</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Bank-grade security. <br />
              Your data never leaves your control.
            </h2>
            <p className="text-base text-[#52647A] leading-relaxed">
              Veyra operates under strict read-only protocols. We never store bank login passwords, we cannot execute transactions, and we never sell user data.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#EFF8F4] text-[#16835B] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">RBI Account Aggregator Ecosystem</h3>
                  <p className="text-xs text-[#52647A] mt-0.5">Consent-based financial data fetch backed by India's central banking infrastructure.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#EFF8F4] text-[#16835B] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">AES 256-Bit Hardware Encryption</h3>
                  <p className="text-xs text-[#52647A] mt-0.5">All sensitive metrics are encrypted both in transit and at rest using modern cryptographic standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#EFF8F4] text-[#16835B] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Zero Transaction Capability</h3>
                  <p className="text-xs text-[#52647A] mt-0.5">Veyra is purely an intelligence platform. Money cannot be moved or withdrawn from your linked accounts.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/connect" className="inline-flex items-center gap-2 text-xs font-bold text-[#16835B] hover:underline">
                <span>Read our complete Security Whitepaper</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FAFBFC] border border-[#E2E8F0] rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#0B1F3A]">Compliance & Encryption Architecture</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <span className="font-semibold text-[#0B1F3A]">Data Storage Standard</span>
                <span className="font-mono text-[11px] text-[#16835B] bg-[#EFF8F4] px-2 py-0.5 rounded">Encrypted AES-256</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <span className="font-semibold text-[#0B1F3A]">Authentication Protocol</span>
                <span className="font-mono text-[11px] text-[#1557B0] bg-[#EEF5FD] px-2 py-0.5 rounded">OAuth 2.0 + MFA</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <span className="font-semibold text-[#0B1F3A]">Third-Party Data Access</span>
                <span className="font-mono text-[11px] text-[#0B1F3A] bg-[#F1F5F9] px-2 py-0.5 rounded">Strictly Zero</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#52647A] leading-relaxed">
              * Veyra complies with national financial privacy guidelines and maintains read-only status across all integrated financial institutions.
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* TESTIMONIALS / STORIES SECTION */}
      <section id="testimonials" className="relative overflow-hidden py-[var(--spacing-5xl)] border-y border-[#E2E8F0]/70 bg-gradient-to-bl from-[#EEF5FD]/70 via-white to-[#EFF8F4]/50">
        {/* Ambient aurora wash (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-36 -left-28 w-[26rem] h-[26rem] rounded-full bg-[#1557B0]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#16835B]/10 blur-3xl" />
        <div className="relative max-w-[var(--container-max)] mx-auto px-[var(--container-padding-mobile)] sm:px-[var(--container-padding-tablet)] lg:px-[var(--container-padding-desktop)]">
        <div className="text-center mx-auto mb-[var(--spacing-2xl)]">
          <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] uppercase tracking-wider">Trusted Stories</span>
          <h2 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)] mt-1 mb-[var(--spacing-md)]">
            Built for people who care about financial progress.
          </h2>
          <p className="text-[length:var(--typography-body-lg-size)] leading-[var(--typography-body-lg-line)] text-[var(--color-text-secondary)] max-w-[42ch] mx-auto">
            See how professionals and families use Veyra to eliminate financial stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-xl)]">
          
          <div className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col space-y-4">
            <div className="flex items-center gap-1 text-[var(--color-warning)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-primary)] font-medium flex-1">
              "Before Veyra, I had money scattered across 3 banks and 2 brokerages. I spent hours updating my Excel sheet every Sunday. Now, I see my exact net worth in 5 seconds."
            </p>
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[length:var(--typography-caption-size)]">
              <div>
                <div className="font-bold text-[var(--color-text-primary)]">Rajesh V.</div>
                <div className="text-[var(--color-text-secondary)]">Senior Tech Lead, Bengaluru</div>
              </div>
              <span className="text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-[var(--radius-full)] font-semibold">Verified User</span>
            </div>
          </div>

          <div className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col space-y-4">
            <div className="flex items-center gap-1 text-[var(--color-warning)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-primary)] font-medium flex-1">
              "The Insights feature caught ₹12,000 in unused annual SaaS subscriptions that I totally forgot about. That alone paid for my interest in this app for years."
            </p>
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[length:var(--typography-caption-size)]">
              <div>
                <div className="font-bold text-[var(--color-text-primary)]">Ananya S.</div>
                <div className="text-[var(--color-text-secondary)]">Product Manager, Mumbai</div>
              </div>
              <span className="text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-[var(--radius-full)] font-semibold">Verified User</span>
            </div>
          </div>

          <div className="h-full p-[var(--spacing-lg)] rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col space-y-4">
            <div className="flex items-center gap-1 text-[var(--color-warning)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-primary)] font-medium flex-1">
              "Setting up our child's higher education goal on Veyra gave us clear numbers. We know exactly how much to allocate each month without sacrificing our lifestyle."
            </p>
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[length:var(--typography-caption-size)]">
              <div>
                <div className="font-bold text-[var(--color-text-primary)]">Vikram & Meera</div>
                <div className="text-[var(--color-text-secondary)]">Design Founders, Hyderabad</div>
              </div>
              <span className="text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-[var(--radius-full)] font-semibold">Verified User</span>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-[var(--spacing-5xl)] max-w-[var(--container-max)] mx-auto px-[var(--container-padding-mobile)] sm:px-[var(--container-padding-tablet)] lg:px-[var(--container-padding-desktop)]">
        <div
          className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] max-w-6xl mx-auto"
          style={{
            background:
              "linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 42%, #E4ECFF 64%, #CBDCFE 86%, #BDD1FD 100%)",
            boxShadow:
              "0 40px 100px -45px rgba(11,31,58,0.35)",
          }}
        >
          <span aria-hidden="true" className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#2153E6]/40 to-transparent" />

          {/* Brand circles — scattered over the text half, brand blue */}
          {JOURNEY_CIRCLES.map((c, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute rounded-full",
                c.ring ? "border-2 border-[#2153E6]" : "bg-[#2153E6]"
              )}
              style={{
                left: c.left,
                top: c.top,
                width: `${c.size}px`,
                height: `${c.size}px`,
                opacity: c.opacity,
              }}
            />
          ))}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-8 sm:px-10 sm:py-10">
            {/* Copy — left column on the white surface */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 text-left">
              <span className="text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-primary-hover)] uppercase tracking-[0.2em] border border-[#2153E6]/25 bg-[var(--color-primary-soft)] px-4 py-1.5 rounded-full">
                Start Your Journey
              </span>

              <h2 className="text-[length:var(--typography-h1-size)] sm:text-[length:var(--typography-display-size)] font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
                Take complete control of your financial future today.
              </h2>
              <p className="text-[length:var(--typography-body-size)] text-[#52647A] leading-relaxed">
                Join thousands who have unlocked absolute financial clarity with Veyra — free to start, no card required.
              </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 w-full">
              <button
                onClick={() => navigate('/connect')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all font-bold text-sm shadow-lg shadow-[var(--color-primary)]/40 flex items-center justify-center gap-2"
              >
                <span>Get Started for Free</span>
                <ArrowRight size={18} />
              </button>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#0B1F3A]/20 text-[#0B1F3A] hover:bg-[var(--color-primary-soft)]/60 transition-all font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Explore the Dashboard</span>
              </Link>
            </div>
            </div>

            {/* Cobalt art panel — right column, hosts the journey line-art */}
            <div className="lg:col-span-5 relative min-h-[230px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[var(--radius-xl)] overflow-hidden"
              >
                <FinancialBackground
                  variant="coins"
                  tone="navy"
                  intensity="low"
                  position="center"
                  className="opacity-25"
                />
                <img
                  src="/assets/journey-start.png"
                  alt=""
                  className="absolute right-[2%] bottom-[2%] h-[94%] w-auto max-w-none object-contain"
                />
                <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="mx-auto w-full max-w-7xl mb-4 rounded-[1.75rem] border border-[#BBDEFB] shadow-[0_12px_32px_-18px_rgba(13,71,161,0.35)] py-7 text-sm text-[#0B1F3A]/85"
        style={{
          background:
            "#E3F2FD",
        }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding-mobile)] sm:px-[var(--container-padding-tablet)] lg:px-[var(--container-padding-desktop)] flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <VeyraMark size={44} />
            <span className="font-bold text-base text-[#0B1F3A] tracking-tight">Veyra</span>
            <span className="text-sm text-[#0B1F3A]/70">© 2026 Veyra Technologies. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link to="/money" className="hover:text-[#0D47A1] transition-colors">Money</Link>
            <Link to="/insights" className="hover:text-[#0D47A1] transition-colors">Insights</Link>
            <Link to="/goals" className="hover:text-[#0D47A1] transition-colors">Goals</Link>
            <Link to="/explore" className="hover:text-[#0D47A1] transition-colors">Calculators</Link>
            <Link to="/connect" className="hover:text-[#0D47A1] transition-colors">Account Aggregator</Link>
          </div>

        </div>
      </footer>

    </div>
  );
};