"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const technologies = ["React", "Next.js", "Node.js", "Python", "Django"];

  // Deterministic static particles (no Math.random())
  const particles = [
    { id: 0, x: 10, y: 15, size: 2, duration: 4, delay: 0, moveX: 35, moveY: -45 },
    { id: 1, x: 22, y: 70, size: 3, duration: 5, delay: 1, moveX: -45, moveY: -35 },
    { id: 2, x: 40, y: 32, size: 2, duration: 6, delay: 2, moveX: 28, moveY: 45 },
    { id: 3, x: 55, y: 80, size: 3, duration: 4, delay: 0.5, moveX: -35, moveY: -55 },
    { id: 4, x: 68, y: 18, size: 2, duration: 5, delay: 1.5, moveX: 45, moveY: 35 },
    { id: 5, x: 82, y: 58, size: 3, duration: 6, delay: 2.5, moveX: -28, moveY: -45 },
    { id: 6, x: 14, y: 82, size: 2, duration: 4.5, delay: 0.8, moveX: 32, moveY: 28 },
    { id: 7, x: 42, y: 8, size: 3, duration: 5.5, delay: 1.8, moveX: -40, moveY: 40 },
    { id: 8, x: 72, y: 42, size: 2, duration: 4.2, delay: 0.3, moveX: 22, moveY: -32 },
    { id: 9, x: 88, y: 28, size: 3, duration: 5.8, delay: 2.2, moveX: -32, moveY: 50 },
    { id: 10, x: 6, y: 48, size: 2, duration: 4.8, delay: 1.2, moveX: 40, moveY: -40 },
    { id: 11, x: 32, y: 62, size: 3, duration: 5.2, delay: 0.6, moveX: -22, moveY: 32 },
    { id: 12, x: 52, y: 22, size: 2, duration: 4.6, delay: 1.6, moveX: 35, moveY: -28 },
    { id: 13, x: 78, y: 72, size: 3, duration: 5.4, delay: 2.8, moveX: -35, moveY: 35 },
    { id: 14, x: 62, y: 88, size: 2, duration: 4.4, delay: 0.9, moveX: 28, moveY: -35 },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 sm:pb-14 md:pb-16 pt-24 sm:pt-28 md:pt-32"
    >
      {/* ===== ULTRA PREMIUM BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/4 h-[400px] sm:h-[500px] lg:h-[600px] w-[400px] sm:w-[500px] lg:w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[120px] sm:blur-[150px] lg:blur-[160px]"
        />

        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-10 sm:-right-20 top-10 sm:top-20 h-[250px] sm:h-[350px] lg:h-[400px] w-[250px] sm:w-[350px] lg:w-[400px] rounded-full bg-cyan-400/5 blur-[100px] sm:blur-[120px] lg:blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 70, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-10 sm:-left-20 bottom-10 sm:bottom-20 h-[250px] sm:h-[300px] lg:h-[350px] w-[250px] sm:w-[300px] lg:w-[350px] rounded-full bg-purple-400/5 blur-[100px] sm:blur-[120px] lg:blur-[140px]"
        />

        {/* Subtle Grid */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px sm:50px 50px lg:60px 60px",
          }}
        />

        {/* Floating particles - hidden on very small screens */}
        <div className="hidden sm:block">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={{
                x: [0, particle.moveX, 0],
                y: [0, particle.moveY, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
              className="absolute rounded-full bg-cyan-400/30"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            />
          ))}
        </div>

        {/* Cursor spotlight - hidden on touch devices */}
        <motion.div
          animate={{
            x: cursorX - 200,
            y: cursorY - 200,
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-cyan-400/3 blur-[100px] sm:blur-[120px] pointer-events-none z-0 hidden md:block"
          style={{ position: "fixed" }}
        />

        {/* Animated lines */}
        <motion.div
          animate={{
            x: [0, 200, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        />
        <motion.div
          animate={{
            x: [0, -200, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto flex min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] max-w-7xl items-center"
      >
        <div className="grid w-full items-center gap-10 sm:gap-12 lg:gap-14 xl:gap-20 lg:grid-cols-2">
          
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400"
            >
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-cyan-400"
              />
              Full Stack Developer
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white"
            >
              Hi, I'm{" "}
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px rgba(34,211,238,0)",
                    "0 0 30px sm:0 0 40px rgba(34,211,238,0.2)",
                    "0 0 0px rgba(34,211,238,0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  delay: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="relative inline-block text-cyan-400"
              >
                Theethesh
                <motion.span
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: 0.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute -bottom-2 left-0 h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-cyan-400 to-purple-400 origin-left"
                />
                <motion.span
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    delay: 0.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute -inset-4 sm:-inset-6 blur-2xl sm:blur-3xl bg-cyan-400/15 sm:bg-cyan-400/20 rounded-full"
                />
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200"
            >
              <motion.span
                animate={{
                  background: [
                    "linear-gradient(90deg, #22d3ee, #818cf8)",
                    "linear-gradient(90deg, #818cf8, #22d3ee)",
                    "linear-gradient(90deg, #22d3ee, #818cf8)",
                  ],
                  backgroundSize: ["200% 100%", "200% 100%", "200% 100%"],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-clip-text text-transparent"
              >
                I build modern web applications.
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mx-auto mt-4 sm:mt-5 md:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 lg:mx-0"
            >
              Full Stack Developer passionate about building scalable,
              user-friendly web applications using modern frontend and
              backend technologies.
            </motion.p>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-start"
            >
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + index * 0.06, duration: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(34,211,238,0.5)",
                    backgroundColor: "rgba(34,211,238,0.1)",
                    boxShadow: "0 0 25px rgba(34,211,238,0.1)",
                    y: -2,
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-300 transition-all duration-300 sm:text-sm cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-6 sm:mt-7 md:mt-9 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4"
            >
              {/* Primary Button - View My Work */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#projects"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-black bg-cyan-400 rounded-full transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] overflow-hidden"
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
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  />
                  <span className="relative flex items-center gap-1.5 sm:gap-2 z-10">
                    View My Work
                    <motion.span
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>

              {/* Secondary Button - Download Resume */}
              <motion.a
                href="/Theetheshwaran_D_Resume.pdf"
                download
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(34,211,238,0.6)",
                  backgroundColor: "rgba(34,211,238,0.08)",
                  color: "#22d3ee",
                  boxShadow: "0 0 30px rgba(34,211,238,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white border border-white/20 rounded-full transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-10 sm:mt-12 hidden items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-600 sm:flex"
            >
              <motion.span
                animate={{
                  width: [40, 60, 40],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-px bg-gradient-to-r from-cyan-400 to-transparent"
              />
              Scroll to explore
            </motion.div>
          </motion.div>

          {/* ================= RIGHT PHOTO ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="order-1 flex justify-center items-center lg:order-2"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Outer Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-[-30px] sm:inset-[-40px] rounded-[30px] sm:rounded-[40px] bg-cyan-400/10 blur-[60px] sm:blur-[80px]"
              />

              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-4 sm:-inset-6 rounded-[30px] sm:rounded-[40px] border border-cyan-400/10"
              />

              {/* Second Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-8 sm:-inset-12 rounded-[40px] sm:rounded-[50px] border border-cyan-400/5"
              />

              {/* Image Container */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 60px rgba(34,211,238,0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="relative h-[280px] w-[220px] sm:h-[380px] sm:w-[300px] md:h-[440px] md:w-[340px] lg:h-[500px] lg:w-[380px] xl:h-[540px] xl:w-[410px] overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] p-1.5 sm:p-2 shadow-2xl backdrop-blur-sm"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-[22px]">
                  <img
                    src="/profile.jpg"
                    alt="Professional portrait of Theetheshwaran D"
                    className="h-full w-full object-cover object-top transition duration-700 hover:scale-[1.04]"
                  />

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-cyan-400/5" />
                </div>
              </motion.div>

              {/* Floating Badge - Bottom Left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 rounded-xl sm:rounded-2xl border border-white/10 bg-black/80 px-3 sm:px-4 py-2 sm:py-3 shadow-xl backdrop-blur-xl"
              >
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-500">
                  Currently
                </p>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-cyan-400">
                  Building & Learning
                </p>
              </motion.div>

              {/* Top Right Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute -right-2 sm:-right-3 md:-right-4 top-4 sm:top-6 md:top-8 rounded-lg sm:rounded-xl border border-cyan-400/20 bg-black/80 px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-xl"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(34,211,238,0)",
                      "0 0 20px rgba(34,211,238,0.3)",
                      "0 0 0px rgba(34,211,238,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[10px] sm:text-xs font-medium text-cyan-400"
                >
                  ⚡ Full Stack
                </motion.span>
              </motion.div>

              {/* Bottom Right Badge */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute -right-1 sm:-right-2 md:-right-3 bottom-10 sm:bottom-12 md:bottom-14 rounded-lg sm:rounded-xl border border-purple-400/20 bg-black/80 px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-xl"
              >
                <span className="text-[10px] sm:text-xs font-medium text-purple-400">
                  ✨ 2+ Projects
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}