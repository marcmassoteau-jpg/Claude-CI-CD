import { Navigation } from './components/ui/Navigation';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Workflow from './components/Workflow';
import Demo from './components/Demo';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <Workflow />
      <Demo />
      <Footer />
    </div>
  );
}

export default App;
