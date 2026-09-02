"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentYear, setCurrentYear] = useState("");
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/theethesh",
      icon: "🐙",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/theethesh-d-74a8173a9/",
      icon: "💼",
    },
    {
      name: "LeetCode",
      href: "#",
      icon: "⚡",
    },
  ];

  // Fixed deterministic particles (no Math.random())
  const particles = [
    { id: 0, x: 12, y: 82, moveY: 30, moveX: 18, duration: 4, delay: 0 },
    { id: 1, x: 30, y: 88, moveY: 40, moveX: -22, duration: 5, delay: 0.5 },
    { id: 2, x: 50, y: 85, moveY: 28, moveX: 25, duration: 6, delay: 1 },
    { id: 3, x: 70, y: 90, moveY: 45, moveX: -18, duration: 5, delay: 1.5 },
    { id: 4, x: 42, y: 92, moveY: 35, moveX: 12, duration: 4.5, delay: 2 },
    { id: 5, x: 82, y: 83, moveY: 32, moveX: -28, duration: 5.5, delay: 2.5 },
  ];

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative border-t border-white/10 bg-black px-4 sm:px-6 py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={hasAnimated ? {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[150px] sm:h-[180px] md:h-[200px] bg-cyan-400/5 blur-[80px] sm:blur-[100px] md:blur-[120px]"
        />
        
        {/* Floating particles - deterministic */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={hasAnimated ? {
              y: [0, -particle.moveY, 0],
              x: [0, particle.moveX, 0],
              opacity: [0.1, 0.4, 0.1],
            } : {}}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-cyan-400/30"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:gap-5 md:gap-6 lg:flex-row">
        {/* Logo */}
        <motion.a
          href="#home"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.06,
            transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.95 }}
          className="text-lg sm:text-xl font-bold text-white transition-colors duration-300 hover:text-cyan-100"
        >
          Theethesh
          <motion.span
            animate={isHovered ? {
              textShadow: [
                "0 0 0px rgba(34,211,238,0)",
                "0 0 30px sm:0 0 40px rgba(34,211,238,0.5)",
                "0 0 0px rgba(34,211,238,0)",
              ],
              scale: [1, 1.12, 1],
            } : {
              textShadow: "0 0 0px rgba(34,211,238,0)",
              scale: 1,
            }}
            transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
            className="text-cyan-400 relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            .
            <motion.span
              animate={isHovered ? {
                scale: [1, 2, 1],
                opacity: [0.1, 0.4, 0.1],
              } : {}}
              transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
              className="absolute -inset-2 sm:-inset-3 blur-lg sm:blur-xl bg-cyan-400/20 sm:bg-cyan-400/30 rounded-full"
            />
          </motion.span>
        </motion.a>

        {/* Copyright */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-gray-500 text-center"
        >
          © {currentYear} Theethesh. All rights reserved.
        </motion.p>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-3 sm:gap-4 md:gap-5 text-xs sm:text-sm text-gray-400 flex-wrap justify-center"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.7, y: 15 }}
              animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + (index * 0.12),
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ 
                scale: 1.15,
                color: "#22d3ee",
                y: -3,
                transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.9 }}
              className="relative flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 group"
            >
              <motion.span
                animate={hasAnimated ? {
                  rotate: [0, 15, -15, 0],
                } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + (index * 0.12),
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
                className="text-sm sm:text-base"
              >
                {link.icon}
              </motion.span>
              <span className="hidden sm:inline">{link.name}</span>
              <span className="sm:hidden">{link.name.charAt(0)}</span>
              
              {/* Underline animation */}
              <motion.span
                initial={{ width: 0 }}
                animate={hasAnimated ? { width: 0 } : {}}
                whileHover={{ width: "100%" }}
                className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 transition-all duration-300"
              />
              
              {/* Dot indicator */}
              <motion.span
                initial={{ scale: 0 }}
                animate={hasAnimated ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + (index * 0.12), duration: 0.4, type: "spring", bounce: 0.5 }}
                className="absolute -top-1 -right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-cyan-400/30"
              />
              
              {/* Glow ring on hover */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.3 }}
                className="absolute inset-0 rounded-full bg-cyan-400/10"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Decorative line animation */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={hasAnimated ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-cyan-400/30 sm:via-cyan-400/40 to-transparent"
      />

      {/* Animated decorative dots - hidden on mobile */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.6 + (i * 0.1),
            type: "spring",
            bounce: 0.5
          }}
          className="absolute hidden md:block"
          style={{
            bottom: `${15 + i * 25}%`,
            right: `${5 + i * 20}%`,
          }}
        >
          <motion.div 
            animate={isHovered ? {
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400/20 sm:bg-cyan-400/30"
          />
        </motion.div>
      ))}

      {/* Animated border glow on hover */}
      <motion.div
        animate={isHovered ? {
          opacity: [0, 0.3, 0],
          scale: [1, 1.02, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 border border-cyan-400/5 rounded-none pointer-events-none"
      />

      {/* Premium separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={hasAnimated ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/10 sm:via-cyan-400/15 to-transparent"
      />

      {/* Animated gradient line at bottom */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={hasAnimated ? { x: "100%" } : {}}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 h-px w-20 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-cyan-400/15 sm:via-cyan-400/20 to-transparent"
      />
    </motion.footer>
  );
}