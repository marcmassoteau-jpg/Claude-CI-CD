import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaMobileAlt,
  FaRocket,
  FaDocker,
  FaCheckCircle,
  FaRobot,
  FaBolt,
} from 'react-icons/fa';

const features = [
  {
    icon: FaMobileAlt,
    title: 'Mobile-First Development',
    description: 'Write production code from your phone using Claude Code Web. No laptop required.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaRobot,
    title: '@claude Auto-Fix',
    description: 'Comment @claude on any CI failure. Automatic analysis, fix generation, and PR creation.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaBolt,
    title: 'Instant CI/CD',
    description: 'Automated testing, Docker builds, and PR creation. From push to production in minutes.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: FaDocker,
    title: 'Docker Integration',
    description: 'Multi-stage builds with health checks. Optimized containers ready for any platform.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: FaCheckCircle,
    title: 'Automated Testing',
    description: 'Comprehensive test suite runs on every push. Quality gates ensure stable releases.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaRocket,
    title: 'One-Click Deploy',
    description: 'Merge PR and deploy automatically. GitHub Pages, Cloud Run, or any platform.',
    gradient: 'from-purple-500 to-blue-500',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
        style={{
          background: `linear-gradient(to right, var(--tw-gradient-stops))`,
        }}
      />
      <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
          <Icon className="text-3xl text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Simple Workflow
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need for modern, mobile-first development with automated CI/CD pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
