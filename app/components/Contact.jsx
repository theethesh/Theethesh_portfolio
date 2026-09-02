"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : {};

  const socialLinks = [
    {
      name: "Email Me",
      href: "mailto:theethesh3103@gmail.com",
      icon: "📧",
      primary: true,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/theethesh-d-74a8173a9/",
      icon: "💼",
      primary: false,
    },
    {
      name: "GitHub",
      href: "https://github.com/theethesh",
      icon: "🐙",
      primary: false,
    },
  ];

  const bgParticles = [
    { top: "8%", left: "12%", moveX: 45, moveY: -55 },
    { top: "22%", left: "88%", moveX: -55, moveY: -45 },
    { top: "42%", left: "25%", moveX: 50, moveY: 55 },
    { top: "58%", left: "75%", moveX: -45, moveY: -65 },
    { top: "72%", left: "8%", moveX: 55, moveY: 45 },
    { top: "88%", left: "92%", moveX: -50, moveY: -35 },
    { top: "32%", left: "48%", moveX: 35, moveY: -55 },
    { top: "52%", left: "42%", moveX: -25, moveY: 45 },
    { top: "18%", left: "42%", moveX: 25, moveY: -45 },
    { top: "68%", left: "22%", moveX: -30, moveY: 50 },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] lg:w-[900px] h-[500px] sm:h-[700px] lg:h-[900px] rounded-full bg-cyan-400/5 blur-[120px] sm:blur-[150px] lg:blur-[160px]"
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
            x: [0, 70, -50, 0],
            y: [0, -50, 60, 0],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-cyan-400/3 blur-[70px] sm:blur-[90px] lg:blur-[110px]"
        />
        
        <motion.div
          animate={hasAnimated ? {
            x: [0, -60, 40, 0],
            y: [0, 60, -40, 0],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-purple-400/3 blur-[70px] sm:blur-[90px] lg:blur-[110px]"
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
                scale: [1, 1.8, 1],
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

      <div className="relative mx-auto max-w-4xl px-2 sm:px-4 text-center">
        {/* Section label with animated underline */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative inline-block"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400">
            Contact
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
            Let's work{" "}
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
              together.
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

        {/* Description */}
        <motion.p
          {...animationProps}
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 px-2 sm:px-0"
        >
          I'm currently looking for opportunities to grow as a Full Stack
          Developer. If you have an opportunity or would like to connect,
          feel free to reach out.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 px-2 sm:px-0"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email Me" ? "_blank" : undefined}
              rel={link.name !== "Email Me" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + (index * 0.12),
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ 
                scale: 1.08,
                y: -4,
                transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative group overflow-hidden rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 w-full sm:w-auto ${
                link.primary
                  ? "bg-cyan-400 text-black hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.6)]"
                  : "border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <motion.span
                  animate={hoveredIndex === index ? {
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-base sm:text-lg"
                >
                  {link.icon}
                </motion.span>
                {link.name}
              </span>
              {link.primary && (
                <>
                  <motion.span
                    animate={{
                      x: ["-100%", "100%", "-100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  />
                  <span className="absolute inset-0 bg-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
              {!link.primary && (
                <motion.span
                  animate={hoveredIndex === index ? {
                    scale: [1, 2, 1],
                    opacity: [0.1, 0.4, 0.1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/5 to-purple-400/5"
                />
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* Availability indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-7 md:mt-8 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/30"
          />
          <span className="text-xs sm:text-sm text-gray-400">Available for opportunities</span>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={hasAnimated ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-12 sm:mt-14 md:mt-16 mx-auto w-24 sm:w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />

        {/* Animated decorative elements - hidden on mobile */}
        <div className="hidden md:block">
          <motion.div
            animate={hasAnimated ? {
              rotate: [0, 360],
            } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -right-20 w-40 h-40 border border-cyan-400/5 rounded-full"
          />
          <motion.div
            animate={hasAnimated ? {
              rotate: [360, 0],
            } : {}}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-20 -left-20 w-40 h-40 border border-cyan-400/5 rounded-full"
          />
        </div>

        {/* Animated quote marks - hidden on mobile */}
        <div className="hidden sm:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={hasAnimated ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-6 sm:top-8 md:top-10 left-6 sm:left-8 md:left-10 text-4xl sm:text-5xl md:text-6xl text-cyan-400/10 font-serif"
          >
            "
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={hasAnimated ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 text-4xl sm:text-5xl md:text-6xl text-cyan-400/10 font-serif"
          >
            "
          </motion.div>
        </div>

        {/* Animated glow ring on hover */}
        <motion.div
          animate={hasAnimated ? {
            scale: [1, 1.05, 1],
            opacity: [0, 0.1, 0],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute inset-0 rounded-full border border-cyan-400/5 pointer-events-none"
        />
      </div>
    </section>
  );
}