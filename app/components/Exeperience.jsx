"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : {};

  const technologies = [
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "JavaScript",
    "REST API",
  ];

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

  const cardParticles = [
    { top: 10, left: 85, moveX: 10, moveY: -20 },
    { top: 30, left: 88, moveX: -8, moveY: -18 },
    { top: 50, left: 82, moveX: 12, moveY: -22 },
    { top: 70, left: 86, moveX: -10, moveY: -16 },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          className="absolute top-1/3 left-1/4 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full bg-cyan-400/5 blur-[100px] sm:blur-[120px] lg:blur-[140px]"
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
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
          } : {}}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-cyan-400/3 blur-[70px] sm:blur-[90px] lg:blur-[110px]"
        />

        <motion.div
          animate={hasAnimated ? {
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
          } : {}}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/3 w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] rounded-full bg-purple-400/3 blur-[60px] sm:blur-[80px] lg:blur-[90px]"
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
            Experience
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
          className="mb-10 sm:mb-12 md:mb-14"
        >
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            My professional{" "}
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
              journey.
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

        {/* Experience Card */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, x: -40 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="relative border-l-2 border-white/10 pl-5 sm:pl-6 md:pl-8 lg:pl-10">
            {/* Animated pulse dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.6 }}
              className="absolute -left-[9px] top-2"
            >
              <div className="relative">
                <div className="h-3 w-3 sm:h-3.5 md:h-4 rounded-full bg-cyan-400 shadow-[0_0_30px_sm:0_0_40px_rgba(34,211,238,0.7)]" />
                <motion.div
                  animate={hasAnimated ? {
                    scale: [1, 2, 1],
                    opacity: [1, 0.2, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-1 rounded-full bg-cyan-400/30"
                />
                <motion.div
                  animate={hasAnimated ? {
                    scale: [1, 3, 1],
                    opacity: [0.5, 0, 0.5],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-2 rounded-full bg-cyan-400/15"
                />
                <motion.div
                  animate={hasAnimated ? {
                    scale: [1, 4, 1],
                    opacity: [0.3, 0, 0.3],
                  } : {}}
                  transition={{
                    duration: 3,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-3 rounded-full bg-cyan-400/10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-7 lg:p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)] overflow-hidden"
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
                  background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.12) 0%, transparent 70%)`,
                }}
              />

              {/* Subtle border glow on hover */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]" />
              </div>

              {/* Animated background */}
              <motion.div
                animate={isHovered ? {
                  scale: [1, 1.06, 1],
                  opacity: [0.05, 0.2, 0.05],
                } : {}}
                transition={{
                  duration: 2,
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

              <div className="flex flex-col justify-between gap-3 sm:gap-4 md:flex-row md:items-start relative z-10">
                <div className="flex-1 min-w-0">
                  <motion.h3
                    initial={{ opacity: 0, x: -25 }}
                    animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300 break-words"
                  >
                    MERN Stack Intern
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={hasAnimated ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-1 sm:mt-2 text-base sm:text-lg text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    WHY Global Services
                  </motion.p>
                </div>

                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: -15 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.15 }}
                  className="shrink-0 h-fit rounded-full border border-white/10 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-400 group-hover:border-cyan-400/40 group-hover:text-gray-300 group-hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <motion.span
                    animate={isHovered ? {
                      x: [0, 4, 0],
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block"
                  >
                    6 Months
                  </motion.span>
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10"
              >
                Worked on full-stack web development using the MERN stack.
                Gained hands-on experience in developing responsive user
                interfaces, building REST APIs, database integration and
                implementing application features.
              </motion.p>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-3 relative z-10"
              >
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + (index * 0.06),
                      type: "spring",
                      bounce: 0.3,
                    }}
                    whileHover={{ 
                      scale: 1.12,
                      backgroundColor: "rgba(34, 211, 238, 0.18)",
                      borderColor: "rgba(34, 211, 238, 0.5)",
                      boxShadow: "0 0 25px rgba(34, 211, 238, 0.15)",
                      y: -2,
                    }}
                    className="rounded-full border border-white/5 bg-white/5 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-300 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hasAnimated ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="mt-4 sm:mt-5 md:mt-6 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent relative z-10"
              />

              {/* Animated icon */}
              <motion.div
                animate={isHovered ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear",
                }}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-cyan-400/10 group-hover:text-cyan-400/20 text-2xl sm:text-3xl md:text-4xl transition-all duration-300"
              >
                ⚡
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}