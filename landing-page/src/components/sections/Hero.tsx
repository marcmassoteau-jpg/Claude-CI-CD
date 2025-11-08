import { motion, useScroll, useTransform } from 'framer-motion';
import { FaMobileAlt, FaRocket, FaGithub } from 'react-icons/fa';
import { SiClaude } from 'react-icons/si';
import { Button } from '../ui/Button';
import { useRef, useState, useCallback } from 'react';
import { Canvas3D } from '../three/Canvas3D';
import { GeometricBackground } from '../three/GeometricBackground';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Three.js setup
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const devicePerf = useDevicePerformance();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    });
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced animated background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 3D Geometric Background */}
        {devicePerf.supportsWebGL && !devicePerf.reducedMotion ? (
          <Canvas3D
            dpr={devicePerf.tier === 'high' ? 1.5 : 1}
            performance={devicePerf.tier}
          >
            <GeometricBackground
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
              performance={devicePerf.tier}
            />
          </Canvas3D>
        ) : (
          /* Fallback: Gradient background with animated blobs */
          <>
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />

            {/* Animated blobs with parallax */}
            <motion.div
              style={{ y: y1 }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              style={{ y: y2 }}
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              style={{ y: y1 }}
              className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
              animate={{
                scale: [1, 1.15, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto text-center px-4"
      >
        {/* Badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.28, 0, 0.21, 1] }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          <span className="text-purple-300 text-sm font-medium">
            Build from Anywhere • Deploy Everywhere
          </span>
        </motion.div>

        {/* Main heading with staggered animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.28, 0, 0.21, 1] }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-display"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
            Code from Your Phone
          </span>
          <br />
          <span className="text-white">Deploy to Production</span>
        </motion.h1>

        {/* Subheading with reveal effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.28, 0, 0.21, 1] }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-sans"
        >
          Harness the power of{' '}
          <span className="text-purple-400 font-semibold">Claude Code Web</span> +{' '}
          <span className="text-blue-400 font-semibold">GitHub Actions</span> to build, test,
          and deploy your applications from any device—even your smartphone.
        </motion.p>

        {/* Tech stack icons with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mb-12 flex-wrap"
        >
          {[
            { icon: SiClaude, label: 'Claude', color: 'text-purple-400' },
            { icon: FaGithub, label: 'GitHub', color: 'text-gray-300' },
            { icon: FaMobileAlt, label: 'Mobile', color: 'text-blue-400' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="flex items-center gap-2"
            >
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 ${item.color}`}
              >
                <item.icon className="text-3xl" />
                <span className="text-lg font-medium">{item.label}</span>
              </div>
              {index < 2 && <div className="text-gray-500 text-2xl">+</div>}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.28, 0, 0.21, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            magnetic
            href="https://github.com/marcmassoteau-jpg/Claude-CI-CD"
            className="group"
          >
            <span>View on GitHub</span>
            <FaGithub className="text-xl group-hover:rotate-12 transition-transform" />
          </Button>

          <Button variant="glass" size="lg" magnetic>
            <a href="#demo" className="flex items-center gap-2">
              <span>See it in Action</span>
              <FaRocket className="text-xl group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-gray-400 hover:text-gray-300 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
