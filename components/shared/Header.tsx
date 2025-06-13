"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Mail, Home, Info, Briefcase, Bell, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ホーム', href: '/', icon: <Home className="w-4 h-4 text-gray-600" /> },
    { name: 'Queueとは', href: '/about', icon: <Info className="w-4 h-4 text-gray-600" /> },
    { name: 'サービス', href: '#business', icon: <Briefcase className="w-4 h-4 text-gray-600" /> },
    { name: 'お知らせ', href: '#news', icon: <Bell className="w-4 h-4 text-gray-600" /> },
    { name: 'お問い合わせ', href: '#contact', icon: <Mail className="w-4 h-4 text-gray-600" /> }
  ];

  const headerVariants = {
    initial: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)"
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)"
    }
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300
      }
    },
    tap: { scale: 0.95 }
  };

  const menuItemVariants = {
    initial: { 
      y: 0,
      color: "#374151"
    },
    hover: { 
      y: -2,
      color: "#3b82f6",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50"
      variants={headerVariants}
      animate={isScrolled ? "scrolled" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/Queue.png"
                alt="Queue"
                fill
                className="object-contain"
                priority
              />
            </div>
            <motion.span 
              className="text-2xl font-bold text-gray-900"
              animate={{
                textShadow: isScrolled 
                  ? "0 0 20px rgba(59, 130, 246, 0.3)"
                  : "0 0 0px rgba(59, 130, 246, 0)"
              }}
            >
              Queue
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                variants={menuItemVariants}
                initial="initial"
                whileHover="hover"
                custom={index}
              >
                <motion.span
                  className="relative flex items-center gap-2"
                  whileHover={{
                    scale: 1.05
                  }}
                >
                  {item.icon}
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
            <motion.span className="relative z-10">お問い合わせ</motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-lg mx-2"
                    variants={mobileItemVariants}
                    whileHover={{ 
                      x: 5,
                      backgroundColor: "rgba(59, 130, 246, 0.05)"
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="px-2 pt-2"
                  variants={mobileItemVariants}
                >
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4" />
                    お問い合わせ
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"
        animate={{
          scaleX: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  ); 
} 