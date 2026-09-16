'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutGrid, FileText, UserCheck, Sparkles, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/programs', label: 'Program Catalog', icon: LayoutGrid },
    { href: '/apply/prog-housing-2026', label: 'Apply Now', icon: FileText },
    { href: '/applications/case-1001', label: 'Applicant Dashboard', icon: Sparkles },
    { href: '/reviewer', label: 'Reviewer Portal', icon: UserCheck, badge: '3 Queue' },
  ];

  return (
    <div className="fixed top-5 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-5 py-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800/80 shadow-2xl hover:border-cyan-500/40 transition-all duration-300"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-violet-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#02040d] rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold tracking-tight text-white font-display hidden sm:inline">
              Civic<span className="text-gradient-nexacore">Path</span>
            </span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/20 hidden md:inline">
              VIBEATHON AI
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillNexacore"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="relative z-10 hidden lg:inline">{item.label}</span>
                {item.badge && (
                  <span className="relative z-10 ml-0.5 px-1.5 py-0.2 text-[9px] font-bold bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Caseworker Login Glowing Capsule Button */}
        <Link
          href="/reviewer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <LogIn className="w-3.5 h-3.5 text-slate-950 font-bold" />
          <span className="hidden sm:inline font-bold">Caseworker Login</span>
        </Link>
      </motion.header>
    </div>
  );
};
