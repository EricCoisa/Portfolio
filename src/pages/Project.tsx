import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Package, FileText, Home, Code, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { motion } from 'framer-motion';
import { useProject } from '../hooks/use-project';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectProps {
  projectName: string;
}

export const Project: React.FC<ProjectProps> = ({ projectName }) => {
  const navigate = useNavigate();
  const { projectData, isLoading, error } = useProject(projectName);

  // Redireciona para NotFound se houver erro ou dados não encontrados
  useEffect(() => {
    if (!isLoading && (error || !projectData)) {
      navigate('/404', { replace: true });
    }
  }, [isLoading, error, projectData, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !projectData) {
    return null;
  }

  const hasDemo = projectData.demo?.available && projectData.demo?.url;
  const hasGithub = projectData.links?.github?.url && projectData.links.github.public;
  const hasLive = projectData.links?.live?.url;
  const hasNpm = projectData.links?.npm?.package;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Home className="h-4 w-4" />
                Portfólio
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              {projectData.metadata.featured && (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                  ⭐ Destaque
                </Badge>
              )}
              <Badge variant="outline">
                {projectData.metadata.status === 'active' ? '✓ Ativo' : 
                 projectData.metadata.status === 'in-progress' ? '🚧 Em Desenvolvimento' :
                 projectData.metadata.status === 'paused' ? '⏸️ Pausado' : 
                 '📦 Arquivado'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {projectData.hero.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {projectData.hero.subtitle}
            </motion.p>
            <motion.p 
              className="text-base md:text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {projectData.hero.description}
            </motion.p>

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 justify-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {projectData.hero.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {hasDemo && (
                <Button size="lg" asChild>
                  <a href={projectData.demo!.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {projectData.demo!.label || 'Ver Demo'}
                  </a>
                </Button>
              )}
              {hasGithub && (
                <Button size="lg" variant="outline" asChild>
                  <a href={projectData.links!.github!.url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    {projectData.links!.github!.label || 'Ver Código'}
                  </a>
                </Button>
              )}
              {hasLive && !hasDemo && (
                <Button size="lg" variant="outline" asChild>
                  <a href={projectData.links!.live!.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {projectData.links!.live!.label || 'Acessar'}
                  </a>
                </Button>
              )}
              {hasNpm && (
                <Button size="lg" variant="outline" asChild>
                  <a href={projectData.links!.npm!.url || `https://www.npmjs.com/package/${projectData.links!.npm!.package}`} target="_blank" rel="noopener noreferrer">
                    <Package className="h-5 w-5 mr-2" />
                    {projectData.links!.npm!.label || 'NPM'}
                  </a>
                </Button>
              )}
            </motion.div>
          </div>

          {/* Context Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {projectData.context.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Problem */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
                  {projectData.context.problem.title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {projectData.context.problem.description}
                </p>
                {projectData.context.problem.points && projectData.context.problem.points.length > 0 && (
                  <ul className="space-y-2">
                    {projectData.context.problem.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Separator />

              {/* Solution */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                  {projectData.context.solution.title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {projectData.context.solution.description}
                </p>
                {projectData.context.solution.points && projectData.context.solution.points.length > 0 && (
                  <ul className="space-y-2">
                    {projectData.context.solution.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Impact */}
              {projectData.context.impact && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {projectData.context.impact.title}
                    </h3>
                    {projectData.context.impact.metrics && projectData.context.impact.metrics.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {projectData.context.impact.metrics.map((metric, index) => (
                          <Card key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {metric.value}
                            </div>
                            <div className="text-sm font-semibold mt-1">
                              {metric.label}
                            </div>
                            {metric.description && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}
                    {projectData.context.impact.description && (
                      <p className="text-muted-foreground">
                        {projectData.context.impact.description}
                      </p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Stack Tecnológica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                {projectData.stack.title}
              </CardTitle>
              {projectData.stack.description && (
                <CardDescription>{projectData.stack.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.stack.categories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {category.icon && <span>{category.icon}</span>}
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.technologies.map((tech, techIndex) => (
                        <div 
                          key={techIndex} 
                          className={`p-3 rounded-lg border ${
                            tech.highlight 
                              ? 'bg-primary/5 border-primary/20 dark:bg-primary/10' 
                              : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{tech.name}</span>
                            {tech.version && (
                              <Badge variant="outline" className="text-xs">
                                {tech.version}
                              </Badge>
                            )}
                          </div>
                          {tech.purpose && (
                            <p className="text-sm text-muted-foreground">
                              {tech.purpose}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {projectData.stack.architecture && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">{projectData.stack.architecture.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {projectData.stack.architecture.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {projectData.features.title}
              </CardTitle>
              {projectData.features.description && (
                <CardDescription>{projectData.features.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectData.features.list.map((feature, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3">
                      {feature.icon && (
                        <span className="text-2xl">{feature.icon}</span>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {feature.description}
                        </p>
                        {feature.tags && feature.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {feature.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlights, Challenges, Learnings - Tabs */}
          {(projectData.highlights || projectData.challenges || projectData.learnings) && (
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue={projectData.highlights ? "highlights" : projectData.challenges ? "challenges" : "learnings"}>
                  {(() => {
                    const tabCount = [projectData.highlights, projectData.challenges, projectData.learnings].filter(Boolean).length;
                    const gridCols = tabCount === 1 ? 'grid-cols-1' : tabCount === 2 ? 'grid-cols-2' : 'grid-cols-3';
                    return (
                      <TabsList className={`grid w-full ${gridCols}`}>
                        {projectData.highlights && (
                          <TabsTrigger value="highlights">{projectData.highlights.title}</TabsTrigger>
                        )}
                        {projectData.challenges && (
                          <TabsTrigger value="challenges">{projectData.challenges.title}</TabsTrigger>
                        )}
                        {projectData.learnings && (
                          <TabsTrigger value="learnings">{projectData.learnings.title}</TabsTrigger>
                        )}
                      </TabsList>
                    );
                  })()}

                  {projectData.highlights && (
                    <TabsContent value="highlights" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold">{projectData.highlights.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectData.highlights.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            {item.icon && <span className="text-xl">{item.icon}</span>}
                            <div>
                              <h4 className="font-medium mb-1">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {projectData.challenges && (
                    <TabsContent value="challenges" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold">{projectData.challenges.title}</h3>
                      {projectData.challenges.items.map((item, index) => (
                        <div key={index} className="space-y-2 p-4 rounded-lg border">
                          <div className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">⚠️</span>
                            <div>
                              <span className="font-medium text-red-600 dark:text-red-400">{projectData.challenges.challengeLabel || 'Desafio:'} </span>
                              <span>{item.challenge}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <div>
                              <span className="font-medium text-green-600 dark:text-green-400">{projectData.challenges.solutionLabel || 'Solução:'} </span>
                              <span>{item.solution}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  )}

                  {projectData.learnings && (
                    <TabsContent value="learnings" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold">{projectData.learnings.title}</h3>
                      <ul className="space-y-2">
                        {projectData.learnings.items.map((learning, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <span className="text-blue-500 mt-1">💡</span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Footer CTA */}
          {projectData.footer?.callToAction && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-6 text-center space-y-4">
                <h3 className="text-2xl font-bold">{projectData.footer.callToAction.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {projectData.footer.callToAction.description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {projectData.footer.callToAction.buttons.map((button, index) => (
                    <Button 
                      key={index}
                      variant={button.variant || 'default'}
                      size="lg"
                      asChild
                    >
                      <a href={button.url} target="_blank" rel="noopener noreferrer">
                        {button.type === 'github' && <Github className="h-5 w-5 mr-2" />}
                        {button.type === 'live' && <ExternalLink className="h-5 w-5 mr-2" />}
                        {button.type === 'npm' && <Package className="h-5 w-5 mr-2" />}
                        {button.type === 'docs' && <FileText className="h-5 w-5 mr-2" />}
                        {button.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
