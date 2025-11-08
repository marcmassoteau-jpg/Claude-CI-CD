import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaMobileAlt,
  FaRocket,
  FaDocker,
  FaCheckCircle,
  FaRobot,
  FaBolt,
} from 'react-icons/fa';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../animations/ScrollReveal';

const features = [
  {
    icon: FaMobileAlt,
    title: 'Mobile-First Development',
    description:
      'Write production code from your phone using Claude Code Web. No laptop required.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'purple' as const,
  },
  {
    icon: FaRobot,
    title: '@claude Auto-Fix',
    description:
      'Comment @claude on any CI failure. Automatic analysis, fix generation, and PR creation.',
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'blue' as const,
  },
  {
    icon: FaBolt,
    title: 'Instant CI/CD',
    description:
      'Automated testing, Docker builds, and PR creation. From push to production in minutes.',
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'pink' as const,
  },
  {
    icon: FaDocker,
    title: 'Docker Integration',
    description:
      'Multi-stage builds with health checks. Optimized containers ready for any platform.',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'blue' as const,
  },
  {
    icon: FaCheckCircle,
    title: 'Automated Testing',
    description:
      'Comprehensive test suite runs on every push. Quality gates ensure stable releases.',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'blue' as const,
  },
  {
    icon: FaRocket,
    title: 'One-Click Deploy',
    description:
      'Merge PR and deploy automatically. GitHub Pages, Cloud Run, or any platform.',
    gradient: 'from-purple-500 to-blue-500',
    glowColor: 'purple' as const,
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className="h-full"
    >
      <Card
        variant="gradient-border"
        hover3d={true}
        glow={false}
        glowColor={feature.glowColor}
        className="h-full group hover:shadow-2xl"
      >
        {/* Icon with gradient background */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}
        >
          <Icon className="text-3xl text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">{feature.description}</p>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="features" className="py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal mode="slideUp">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.28, 0, 0.21, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                FEATURES
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
              Powerful Features,{' '}
              <span className="text-gradient">Simple Workflow</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need for modern, mobile-first development with automated CI/CD
              pipelines.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
