import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaFlask, FaDocker, FaCodeBranch, FaRocket, FaRobot } from 'react-icons/fa';

const steps = [
  {
    icon: FaCode,
    title: 'Write Code',
    description: 'Use Claude Code Web from your phone',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaFlask,
    title: 'Run Tests',
    description: 'Automated test suite with 100% coverage',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaDocker,
    title: 'Build Docker',
    description: 'Multi-stage optimized container',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: FaCodeBranch,
    title: 'Create PR',
    description: 'Auto-generated pull request',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaRocket,
    title: 'Deploy',
    description: 'Automatic deployment to production',
    color: 'from-orange-500 to-red-500',
  },
];

const WorkflowStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex items-start gap-4"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
          className={`p-4 rounded-xl bg-gradient-to-r ${step.color} shadow-lg`}
        >
          <Icon className="text-2xl text-white" />
        </motion.div>
        {index < steps.length - 1 && (
          <div className="absolute left-1/2 top-full w-0.5 h-12 bg-gradient-to-b from-gray-600 to-transparent -translate-x-1/2" />
        )}
      </div>
      <div className="flex-1 pt-2">
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-gray-400">{step.description}</p>
      </div>
    </motion.div>
  );
};

const Workflow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="workflow" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Complete{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              CI/CD Pipeline
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From code to production in 5 minutes. Fully automated, mobile-optimized workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Workflow steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <WorkflowStep key={index} step={step} index={index} />
            ))}
          </div>

          {/* Auto-fix callout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="sticky top-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gray-800/90 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <FaRobot className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">@claude Auto-Fix</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="text-gray-300">Build fails → Issue created automatically</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="text-gray-300">Comment <code className="bg-gray-900 px-2 py-0.5 rounded text-purple-400">@claude</code> on the issue</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="text-gray-300">Auto-fix analyzes logs & creates fix PR</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <p className="text-gray-300">Review & merge if tests pass ✨</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Total time from failure to fix:</p>
                  <p className="text-3xl font-bold text-purple-400">~5 minutes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
