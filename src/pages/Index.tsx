import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';

// Lazy load sections for better performance
const Hero = lazy(() => import('@/sections/Hero'));
const About = lazy(() => import('@/sections/About'));
const Projects = lazy(() => import('@/sections/Projects'));
const Skills = lazy(() => import('@/sections/Skills'));
const Contact = lazy(() => import('@/sections/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Section loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4">
      <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 bg-gray-100 dark:bg-gray-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
