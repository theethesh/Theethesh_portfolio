"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedNumber = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && value !== "∞") {
      const numValue = parseInt(value);
      let start = 0;
      const duration = 1500;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = numValue / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  if (value === "∞") {
    return (
      <motion.h3
        ref={ref}
        initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
        transition={{ 
          delay: delay + 0.2, 
          duration: 1, 
          type: "spring", 
          bounce: 0.6,
          stiffness: 120,
        }}
        className="text-3xl sm:text-4xl font-bold text-cyan-400"
      >
        ∞
      </motion.h3>
    );
  }

  return (
    <motion.h3
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.7 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        delay, 
        duration: 0.8, 
        type: "spring", 
        bounce: 0.5,
        stiffness: 90,
      }}
      className="text-3xl sm:text-4xl font-bold text-cyan-400"
    >
      {count}+
    </motion.h3>
  );
};

const StatCard = ({ value, label, index, totalCards }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);

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

  const delay = index * 0.12;

  const cardParticles = [
    { top: 18, left: 75, moveX: 12, moveY: -22, delay: 0 },
    { top: 40, left: 80, moveX: -10, moveY: -18, delay: 0.3 },
    { top: 65, left: 72, moveX: 15, moveY: -25, delay: 0.6 },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -14,
        scale: 1.04,
        transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_0_60px_-20px_rgba(34,211,238,0.3)] overflow-hidden"
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
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.18) 0%, transparent 70%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)]" />
      </div>

      {/* Animated background particles */}
      <motion.div
        animate={isHovered ? {
          scale: [1, 1.4, 1],
          opacity: [0.05, 0.3, 0.05],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/5 rounded-2xl"
      />

      {/* Floating particles inside card */}
      {cardParticles.map((particle, i) => (
        <motion.div
          key={i}
          animate={isHovered ? {
            y: [0, particle.moveY, 0],
            x: [0, particle.moveX, 0],
            opacity: [0, 0.6, 0],
          } : {}}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}

      <div className="relative z-10">
        <AnimatedNumber value={value} label={label} delay={delay} />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium"
        >
          {label}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: delay + 0.35, duration: 0.8, ease: "easeOut" }}
          className="mt-2 sm:mt-3 h-0.5 w-8 sm:w-12 bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent group-hover:w-16 sm:group-hover:w-24 transition-all duration-500"
        />

        {/* Animated icon */}
        <motion.div
          animate={isHovered ? {
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.9, 0.3],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 text-cyan-400/20 group-hover:text-cyan-400/50 text-lg sm:text-2xl transition-all duration-300"
        >
          ✦
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
          className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] uppercase tracking-wider text-cyan-400/30 group-hover:text-cyan-400/50 transition-colors duration-300"
        >
          {label.split(" ")[0]}
        </motion.div>
      </div>

      {/* Spotlight cursor effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.1) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

export default function About() {
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
    { top: 10, left: 15, moveX: 35, moveY: -45 },
    { top: 25, left: 85, moveX: -45, moveY: -55 },
    { top: 45, left: 30, moveX: 55, moveY: 35 },
    { top: 60, left: 70, moveX: -35, moveY: -65 },
    { top: 75, left: 10, moveX: 45, moveY: 55 },
    { top: 85, left: 90, moveX: -55, moveY: -35 },
    { top: 35, left: 50, moveX: 25, moveY: -55 },
    { top: 55, left: 45, moveX: -25, moveY: 45 },
    { top: 20, left: 40, moveX: 40, moveY: -50 },
    { top: 70, left: 25, moveX: -30, moveY: 50 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <motion.div
          animate={hasAnimated ? {
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[800px] h-[500px] sm:h-[700px] lg:h-[800px] rounded-full bg-cyan-400/5 blur-[120px] sm:blur-[150px] lg:blur-[160px]"
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
            x: [0, 80, -50, 0],
            y: [0, -70, 50, 0],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full bg-cyan-400/3 blur-[80px] sm:blur-[110px] lg:blur-[130px]"
        />

        <motion.div
          animate={hasAnimated ? {
            x: [0, -60, 40, 0],
            y: [0, 60, -40, 0],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-purple-400/3 blur-[70px] sm:blur-[90px] lg:blur-[110px]"
        />

        {/* Animated floating particles - hidden on very small screens */}
        <div className="hidden sm:block">
          {bgParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-400/30"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
              }}
              animate={
                hasAnimated
                  ? {
                    x: [0, particle.moveX, 0],
                    y: [0, particle.moveY, 0],
                    opacity: [0.2, 0.7, 0.2],
                    scale: [1, 1.8, 1],
                  }
                  : {}
              }
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
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

        {/* Animated decorative rings - hidden on small screens */}
        <div className="hidden lg:block">
          <motion.div
            animate={hasAnimated ? {
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 right-1/4 w-[150px] lg:w-[200px] h-[150px] lg:h-[200px] border border-cyan-400/5 rounded-full"
          />
          <motion.div
            animate={hasAnimated ? {
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 left-1/4 w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] border border-purple-400/5 rounded-full"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-2 sm:px-4">
        {/* Section label */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative inline-block"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400">
            About Me
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={hasAnimated ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent origin-left"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          {...animationProps}
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={hasAnimated ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            Building things with{" "}
            <motion.span
              animate={hasAnimated ? {
                textShadow: [
                  "0 0 0px rgba(34,211,238,0)",
                  "0 0 30px sm:0 0 40px lg:0 0 50px rgba(34,211,238,0.3)",
                  "0 0 0px rgba(34,211,238,0)",
                ]
              } : {}}
              transition={{ duration: 4, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
              className="text-cyan-400 relative inline-block"
            >
              code.
              <motion.span
                animate={hasAnimated ? {
                  scale: [1, 1.8, 1],
                  opacity: [0.05, 0.3, 0.05],
                } : {}}
                transition={{ duration: 4, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
                className="absolute -inset-4 sm:-inset-6 lg:-inset-8 blur-2xl sm:blur-3xl bg-cyan-400/15 sm:bg-cyan-400/20 rounded-full"
              />
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          {/* About Text */}
          <motion.div
            {...animationProps}
            initial={{ opacity: 0, y: 35 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300"
              >
                I'm Theethesh, a Full Stack Developer passionate about
                building modern and user-friendly web applications.
                I enjoy working with both frontend and backend technologies
                and continuously improving my problem-solving skills.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400"
              >
                I have hands-on experience with the MERN stack and have
                worked on real-world projects including an e-commerce
                application. I'm also exploring Python and Django to
                strengthen my full-stack development skills.
              </motion.p>
            </motion.div>

            {/* Decorative animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={hasAnimated ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
              className="w-24 sm:w-32 lg:w-40 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent"
            />

            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 sm:px-4 py-1.5 sm:py-2 w-fit"
            >
              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.4, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400 shadow-lg shadow-green-400/30"
              />
              <span className="text-[10px] sm:text-xs text-gray-400">Open to opportunities</span>
            </motion.div>
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {[
              { value: "6", label: "Months Internship" },
              { value: "10", label: "Technologies" },
              { value: "1", label: "Full Stack Projects" },
              { value: "∞", label: "Learning Mindset" },
            ].map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                index={index}
                totalCards={4}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}