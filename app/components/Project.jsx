"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const projects = [
  {
    title: "MERN E-Commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product management, shopping cart, wishlist, orders, payments and an admin dashboard.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    github: "https://github.com/theethesh/luxe-frontend",
    demo: "https://luxe-frontend-three.vercel.app",
  },
  {
    title: "Python / Django Web Application",
    description:
      "A Django-based web application with database integration, templates, URL routing and backend functionality.",
    technologies: [
      "Python",
      "Django",
      "MySQL",
      "HTML",
      "CSS",
    ],
    github: "#",
    demo: "#",
  },
];

const ProjectCard = ({ project, index }) => {
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

  const cardParticles = [
    { top: 20, left: 35, moveX: 15, moveY: -25 },
    { top: 45, left: 50, moveX: -12, moveY: -20 },
    { top: 70, left: 40, moveX: 18, moveY: -28 },
  ];

  return (
    <motion.div
      ref={cardRef}
      {...animationProps}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.25, type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)]"
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
        className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div className="absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-cyan-400/30 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]" />
      </div>

      {/* Animated gradient background */}
      <motion.div
        animate={isHovered ? {
          background: [
            "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(34,211,238,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.08) 0%, transparent 50%)",
          ],
        } : {
          background: [
            "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(34,211,238,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Project Image Placeholder */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={hasAnimated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 + 0.2 }}
        className="relative flex h-40 sm:h-48 md:h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-950/40 to-black"
      >
        <motion.span
          animate={hasAnimated ? {
            scale: [1, 1.15, 1],
            rotate: [0, 8, -8, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-400/20 group-hover:text-cyan-400/30 transition-all duration-500"
        >
          {"</>"}
        </motion.span>
        
        {/* Animated glow on image */}
        <motion.div
          animate={isHovered ? {
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          } : {
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-transparent to-purple-400/10"
        />

        {/* Floating particles on image */}
        {cardParticles.map((particle, i) => (
          <motion.div
            key={i}
            animate={isHovered ? {
              y: [0, particle.moveY, 0],
              x: [0, particle.moveX, 0],
              opacity: [0, 0.5, 0],
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
      </motion.div>

      {/* Content */}
      <div className="relative p-4 sm:p-5 md:p-6 lg:p-7">
        <motion.h3
          initial={{ opacity: 0, x: -15 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
          className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-1.5 sm:gap-2"
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + 0.5 + techIndex * 0.06,
                type: "spring",
                bounce: 0.3,
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(34,211,238,0.5)",
                backgroundColor: "rgba(34,211,238,0.15)",
                boxShadow: "0 0 20px rgba(34,211,238,0.1)",
                y: -2,
              }}
              className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-300 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
          className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-3 sm:gap-4"
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.08,
              borderColor: "#22d3ee",
              color: "#22d3ee",
              boxShadow: "0 0 25px rgba(34,211,238,0.15)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/20 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300"
          >
            <motion.span
              animate={isHovered ? {
                x: [0, 5, 0],
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              GitHub
            </motion.span>
          </motion.a>

          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 40px rgba(34,211,238,0.4)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-full bg-cyan-400 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-all duration-300"
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
            <span className="relative flex items-center gap-1">
              Live Demo
              <motion.span
                animate={isHovered ? {
                  x: [0, 5, 0],
                } : {}}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={hasAnimated ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.7 }}
          className="mt-4 sm:mt-5 w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400/50 to-transparent"
        />

        {/* Animated icon */}
        <motion.div
          animate={isHovered ? {
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-cyan-400/10 group-hover:text-cyan-400/20 text-2xl sm:text-3xl transition-all duration-300"
        >
          ✦
        </motion.div>
      </div>

      {/* Spotlight cursor effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 50 + 50}% ${springY.get() * 50 + 50}%, rgba(34,211,238,0.06) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

export default function Projects() {
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
      id="projects"
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
          className="absolute top-1/3 right-1/4 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full bg-cyan-400/5 blur-[100px] sm:blur-[120px] lg:blur-[140px]"
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
            x: [0, 70, -40, 0],
            y: [0, -50, 40, 0],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/3 w-[200px] sm:w-[300px] lg:w-[350px] h-[200px] sm:h-[300px] lg:h-[350px] rounded-full bg-purple-400/3 blur-[60px] sm:blur-[80px] lg:blur-[100px]"
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
            Projects
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
            Things I've{" "}
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
              built.
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
          className="mb-8 sm:mb-10 md:mb-12 max-w-2xl text-sm sm:text-base text-gray-400"
        >
          A selection of projects that demonstrate my experience
          with frontend, backend, databases and full-stack development.
        </motion.p>

        {/* Project Cards */}
        <div className="grid gap-5 sm:gap-6 md:gap-7 lg:gap-8 grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}