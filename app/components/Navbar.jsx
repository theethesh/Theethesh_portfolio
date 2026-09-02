"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "LeetCode", href: "#leetcode" },
    { name: "Contact", href: "#contact" },
  ];

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navVariants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.08,
      color: "#22d3ee",
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    closed: (i) => ({
      rotate: i === 0 ? 0 : 0,
      y: i === 0 ? 0 : 0,
      opacity: 1,
    }),
    open: (i) => ({
      rotate: i === 0 ? 45 : -45,
      y: i === 0 ? 6 : -6,
      opacity: i === 1 ? 0 : 1,
    }),
  };

  // Handle section highlighting
  useEffect(() => {
    const sections = navItems.map(item => item.href.substring(1));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      {/* Animated background glow */}
      <motion.div
        animate={scrolled ? {
          opacity: [0, 0.3, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: scrolled ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-white"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(34,211,238,0)",
                "0 0 30px rgba(34,211,238,0.3)",
                "0 0 0px rgba(34,211,238,0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-cyan-400"
          >
            Theethesh
          </motion.span>
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(34,211,238,0)",
                "0 0 40px rgba(34,211,238,0.5)",
                "0 0 0px rgba(34,211,238,0)",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-cyan-400 inline-block"
          >
            .
          </motion.span>
          {/* Animated underline */}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          {/* Glow ring */}
          <motion.span
            animate={scrolled ? {
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-full bg-cyan-400/5 blur-xl pointer-events-none"
          />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              custom={index}
              variants={linkVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative text-xs lg:text-sm font-medium transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              
              {/* Active indicator with glow */}
              {activeSection === item.href.substring(1) && (
                <>
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-cyan-400"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    layoutId="activeNavGlow"
                    className="absolute -bottom-2 left-0 h-2 w-full bg-cyan-400/20 blur-md"
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              
              {/* Hover glow effect */}
              <motion.span
                animate={hoveredIndex === index ? {
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.3, 0],
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl pointer-events-none"
              />
            </motion.a>
          ))}

          <motion.a
            href="/Theetheshwaran_D_Resume.pdf"
            target="_blank"
            whileHover={{ 
              scale: 1.06,
              backgroundColor: "#22d3ee",
              color: "#000000",
              boxShadow: "0 0 50px rgba(34,211,238,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-full border border-cyan-400 px-4 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold text-cyan-400 transition-all"
          >
            <motion.span
              animate={{
                x: ["-100%", "100%", "-100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            />
            <span className="relative flex items-center gap-1">
              Resume
              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 sm:h-12 sm:w-12 flex-col items-center justify-center gap-1.5 md:hidden rounded-full hover:bg-white/5 transition-colors duration-300"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {/* Background ring */}
          <motion.span
            animate={menuOpen ? {
              scale: 1.2,
              opacity: 0.2,
            } : {
              scale: 0,
              opacity: 0,
            }}
            className="absolute inset-0 rounded-full bg-cyan-400/20"
          />
          
          <motion.span
            custom={0}
            variants={lineVariants}
            animate={menuOpen ? "open" : "closed"}
            className="block h-0.5 w-5 sm:w-6 bg-white transition-colors rounded-full"
          />
          <motion.span
            custom={1}
            variants={lineVariants}
            animate={menuOpen ? "open" : "closed"}
            className="block h-0.5 w-5 sm:w-6 bg-white transition-colors rounded-full"
          />
          <motion.span
            custom={2}
            variants={lineVariants}
            animate={menuOpen ? "open" : "closed"}
            className="block h-0.5 w-5 sm:w-6 bg-white transition-colors rounded-full"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="border-t border-white/10 bg-black/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 sm:gap-2 px-4 sm:px-6 py-6 sm:py-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={mobileItemVariants}
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ 
                    x: 15,
                    color: "#22d3ee",
                  }}
                  className={`py-3 sm:py-3.5 text-base sm:text-lg font-medium transition-colors border-b border-white/5 ${
                    activeSection === item.href.substring(1)
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    {activeSection === item.href.substring(1) && (
                      <motion.span
                        layoutId="activeMobileNav"
                        className="inline-block h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30"
                      />
                    )}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="/Theetheshwaran_D_Resume.pdf"
                target="_blank"
                variants={mobileItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 sm:mt-6 w-fit rounded-full border border-cyan-400 bg-cyan-400/10 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black shadow-lg shadow-cyan-400/10"
              >
                <span className="flex items-center gap-2">
                  Resume
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}