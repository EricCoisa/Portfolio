import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Play, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ProjectModal from '@/components/ProjectModal';
import projectsBg from '@/assets/projects-bg.webp';

const Projects = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ title: '', url: '' });
  const [copiedProject, setCopiedProject] = useState<string | null>(null);

  // Get projects from translation files
  const projects = t('projects.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
    hasDemo: boolean;
    demoUrl?: string;
    underConstruction?: boolean;
    status?: string;
    npmPackage?: boolean;
    npmCommand?: string;
  }>;

  const handlePlayClick = (title: string, url: string) => {
    setSelectedProject({ title, url });
    setModalOpen(true);
  };

  const handleCopyNpm = async (command: string, projectTitle: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedProject(projectTitle);
      setTimeout(() => setCopiedProject(null), 2000);
    } catch (error) {
      console.error('Failed to copy NPM command:', error);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 px-4 relative scroll-mt-20 md:scroll-mt-24"
      style={{
        backgroundImage: `url(${projectsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0  backdrop-blur-sm" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
            {t('projects.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full flex flex-col relative group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.npmPackage && project.npmCommand && (
                      <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-sm text-slate-600 dark:text-slate-300 flex-1">
                            {project.npmCommand}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyNpm(project.npmCommand!, project.title)}
                            className="h-8 px-2"
                          >
                            {copiedProject === project.title ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {copiedProject === project.title && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            {t('projects.npmCopied')}
                          </p>
                        )}
                      </div>
                    )}
                    {project.underConstruction && (
                      <div className="mt-3 flex justify-center">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30">
                          🚧 {project.status}
                        </span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {project.underConstruction ? (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Github className="h-4 w-4" />
                        {t('projects.comingSoon')}
                      </Button>
                    ) : project.hasDemo ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handlePlayClick(project.title, project.demoUrl!)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>

                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            {t('projects.viewProject')}
                          </a>
                        </Button>

                      </>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={selectedProject.title}
        projectUrl={selectedProject.url}
      />
    </section>
  );
};

export default Projects;
