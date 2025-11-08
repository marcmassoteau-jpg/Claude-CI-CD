import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaTerminal, FaGithub, FaCheckCircle } from 'react-icons/fa';

const terminalLines = [
  { type: 'command', text: '$ git push origin claude/new-feature-abc123' },
  { type: 'output', text: 'Enumerating objects: 5, done.' },
  { type: 'output', text: 'Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.' },
  { type: 'success', text: '✓ Branch pushed successfully' },
  { type: 'info', text: '' },
  { type: 'info', text: '🔄 CI/CD Pipeline triggered...' },
  { type: 'output', text: '  ⏳ Running tests...' },
  { type: 'success', text: '  ✅ Tests passed (5/5)' },
  { type: 'output', text: '  ⏳ Building Docker image...' },
  { type: 'success', text: '  ✅ Docker build successful' },
  { type: 'output', text: '  ⏳ Creating pull request...' },
  { type: 'success', text: '  ✅ PR #42 created' },
  { type: 'info', text: '' },
  { type: 'success', text: '🚀 Ready for review!' },
  { type: 'link', text: '📝 https://github.com/your-repo/pull/42' },
];

const Demo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState<'terminal' | 'workflow'>('terminal');

  return (
    <section id="demo" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It In{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch how a simple git push triggers the entire CI/CD pipeline automatically.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'terminal'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaTerminal />
              <span>Terminal Output</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'workflow'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaGithub />
              <span>GitHub Actions</span>
            </div>
          </button>
        </div>

        {/* Terminal demo */}
        {activeTab === 'terminal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-gray-400 text-sm font-mono">
                  terminal
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`mb-1 ${
                      line.type === 'command'
                        ? 'text-purple-400 font-bold'
                        : line.type === 'success'
                        ? 'text-green-400'
                        : line.type === 'link'
                        ? 'text-blue-400 underline cursor-pointer hover:text-blue-300'
                        : line.type === 'info'
                        ? 'text-cyan-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-purple-400 ml-1"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Workflow visualization */}
        {activeTab === 'workflow' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="space-y-6">
                {[
                  { name: 'Setup Labels', time: '5s', status: 'success' },
                  { name: 'Build and Test', time: '1m 23s', status: 'success' },
                  { name: 'Build Docker Image', time: '2m 10s', status: 'success' },
                  { name: 'Create Pull Request', time: '8s', status: 'success' },
                  { name: 'Deploy Application', time: 'skipped', status: 'skipped' },
                ].map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      {job.status === 'success' ? (
                        <FaCheckCircle className="text-green-400 text-xl" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                      )}
                      <span className="text-white font-medium">{job.name}</span>
                    </div>
                    <span className={`text-sm ${job.status === 'skipped' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {job.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 flex items-center gap-2">
                  <FaCheckCircle />
                  <span className="font-medium">Workflow completed successfully</span>
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Total time: 3m 46s • Pull Request #42 is ready for review
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/marcmassoteau-jpg/Claude-CI-CD-wordlow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-300"
          >
            <span>Try It Yourself</span>
            <FaGithub className="text-xl" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
