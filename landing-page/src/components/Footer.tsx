import { FaGithub, FaHeart } from 'react-icons/fa';
import { SiClaude } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-400">
            <span>Built with</span>
            <FaHeart className="text-red-500" />
            <span>using</span>
            <SiClaude className="text-purple-400" />
            <span className="font-semibold text-purple-400">Claude Code Web</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/marcmassoteau-jpg/Claude-CI-CD-wordlow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="text-xl" />
              <span>View Source</span>
            </a>
            <a
              href="https://github.com/marcmassoteau-jpg/Claude-CI-CD-wordlow/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 Claude CI/CD Demo. Open source under MIT License.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
