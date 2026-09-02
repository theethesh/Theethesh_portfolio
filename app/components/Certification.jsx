"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const certificates = [
  {
    title: "Full-Stack Developer Internship",
    issuer: "WHY Global Services",
    year: "2026",
    duration: "6 Months",
    file: "/Theetheshwaran.pdf",
    icon: "💼",
  },
  {
    title: "AI-Powered Full Stack Development",
    issuer: "Why Tap",
    year: "2026",
    duration: "July 2026",
    file: "/Theetheshwaran D-16.jpg.jpeg",
    icon: "🤖",
  },
  {
    title: "Python Programming",
    issuer: "CAD DESIGN Training Services, Sriperumbudur",
    year: "2025",
    duration: "12 Jul 2025 - 24 Nov 2025",
    file: "/Theetheshwaran Python certificate.pdf",
    icon: "🐍",
  },
];

const CertificateCard = ({ certificate, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : {};

  const cardParticles = [
    { top: 15, left: 78, moveX: 12, moveY: -25 },
    { top: 35, left: 82, moveX: -10, moveY: -20 },
    { top: 55, left: 75, moveX: 14, moveY: -28 },
    { top: 75, left: 80, moveX: -12, moveY: -22 },
  ];

  return (
    <motion.div
      ref={cardRef}
      {...animationProps}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -14,
        scale: 1.03,
        transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6 lg:p-7 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)] overflow-hidden"
    >
      {/* Animated gradient border */}
      <motion.div
        animate={{
          rotate: isHovered ? [0, 360] : 0,
        }}
        transition={{
          duration: 4,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]" />
      </div>

      {/* Animated background particles */}
      <motion.div
        animate={isHovered ? {
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.2, 0.05],
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-2xl"
      />

      {/* Floating particles inside card */}
      {cardParticles.map((particle, i) => (
        <motion.div
          key={i}
          animate={isHovered ? {
            y: [0, particle.moveY, 0],
            x: [0, particle.moveX, 0],
            opacity: [0, 0.4, 0],
          } : {}}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400/40"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}

      {/* Top */}
      <div className="flex items-start justify-between gap-3 sm:gap-4 relative z-10">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={hasAnimated ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.1 + 0.2,
              type: "spring",
              bounce: 0.6,
              stiffness: 120,
            }}
            className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-lg sm:text-xl md:text-2xl text-cyan-400 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/20 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-300"
          >
            <motion.span
              animate={hasAnimated ? {
                scale: [1, 1.4, 1],
                rotate: [0, 15, -15, 0],
              } : {}}
              transition={{ 
                duration: 1, 
                delay: index * 0.1 + 0.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              {certificate.icon}
            </motion.span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, x: -25 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-base sm:text-lg md:text-xl font-bold leading-6 sm:leading-7 text-white group-hover:text-cyan-100 transition-colors duration-300 break-words"
          >
            {certificate.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 break-words"
          >
            {certificate.issuer}
          </motion.p>
        </div>

        {/* Year */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7, y: -15 }}
          animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.15 }}
          className="shrink-0 rounded-full border border-cyan-400/30 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm text-cyan-400 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
        >
          {certificate.year}
        </motion.span>
      </div>

      {/* Duration */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        className="mt-4 sm:mt-5 md:mt-6 border-t border-white/10 pt-4 sm:pt-5 group-hover:border-white/20 transition-colors duration-300 relative z-10"
      >
        <motion.p
          animate={isHovered ? {
            x: [0, 6, 0],
          } : {}}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
        >
          {certificate.duration}
        </motion.p>
      </motion.div>

      {/* View Certificate */}
      <motion.a
        initial={{ opacity: 0, y: 15 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
        href={certificate.file}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-block mt-4 sm:mt-5 md:mt-6 overflow-hidden rounded-full border border-white/20 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-gray-300 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-black group-hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)] z-10"
      >
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          View Certificate
          <motion.span
            animate={isHovered ? {
              x: [0, 6, 0],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </motion.a>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={hasAnimated ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.7 }}
        className="mt-3 sm:mt-4 w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent"
      />

      {/* Spotlight cursor effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.06) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : {};

  const bgParticles = [
    { top: "12%", left: "18%", moveX: 35, moveY: -45 },
    { top: "28%", left: "82%", moveX: -45, moveY: -38 },
    { top: "48%", left: "28%", moveX: 40, moveY: 45 },
    { top: "62%", left: "72%", moveX: -38, moveY: -55 },
    { top: "78%", left: "12%", moveX: 45, moveY: 50 },
    { top: "88%", left: "88%", moveX: -50, moveY: -32 },
    { top: "38%", left: "52%", moveX: 28, moveY: -48 },
    { top: "68%", left: "42%", moveX: -22, moveY: 42 },
  ];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative bg-black px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
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
          className="absolute top-1/4 right-1/4 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full bg-cyan-400/5 blur-[100px] sm:blur-[120px] lg:blur-[140px]"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(34,211,238,0.15) 1px, transparent 1px)`,
            backgroundSize: '30px 30px sm:40px 40px'
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          animate={hasAnimated ? {
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-cyan-400/3 blur-[70px] sm:blur-[90px] lg:blur-[110px]"
        />

        <motion.div
          animate={hasAnimated ? {
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] rounded-full bg-purple-400/3 blur-[60px] sm:blur-[80px] lg:blur-[90px]"
        />

        {/* Floating particles - hidden on very small screens */}
        <div className="hidden sm:block">
          {bgParticles.map((particle, i) => (
            <motion.div
              key={i}
              animate={hasAnimated ? {
                y: [0, particle.moveY, 0],
                x: [0, particle.moveX, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
              } : {}}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400/30"
              style={{
                top: particle.top,
                left: particle.left,
              }}
            />
          ))}
        </div>

        {/* Custom cursor glow - hidden on touch devices */}
        <motion.div
          animate={{
            x: cursorX - 150,
            y: cursorY - 150,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 0.5,
          }}
          className="fixed w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-cyan-400/3 blur-[60px] sm:blur-[80px] pointer-events-none z-0 hidden md:block"
          style={{ position: "fixed" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-2 sm:px-4">
        {/* Section label with animated underline */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative inline-block"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400">
            Certifications
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={hasAnimated ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent origin-left"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={hasAnimated ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-5 md:mb-6"
        >
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            My{" "}
            <motion.span
              animate={hasAnimated ? {
                textShadow: [
                  "0 0 0px rgba(34,211,238,0)",
                  "0 0 30px sm:0 0 40px rgba(34,211,238,0.25)",
                  "0 0 0px rgba(34,211,238,0)",
                ]
              } : {}}
              transition={{ duration: 3.5, delay: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
              className="text-cyan-400 relative inline-block"
            >
              certifications.
              <motion.span
                animate={hasAnimated ? {
                  scale: [1, 1.8, 1],
                  opacity: [0.05, 0.25, 0.05],
                } : {}}
                transition={{ duration: 3.5, delay: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
                className="absolute -inset-4 sm:-inset-6 blur-2xl sm:blur-3xl bg-cyan-400/10 sm:bg-cyan-400/15 rounded-full"
              />
            </motion.span>
          </h2>
        </motion.div>

        {/* Description with stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <p className="max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-gray-400">
            Certifications and professional experience that support my
            journey as a Full Stack Developer.
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={hasAnimated ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <span className="text-cyan-400 font-bold text-sm sm:text-base">{certificates.length}</span>
            <span className="text-xs sm:text-sm text-gray-400">Certifications</span>
          </motion.div>
        </motion.div>

        {/* Certificate Cards */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}