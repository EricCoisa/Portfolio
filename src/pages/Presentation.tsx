import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Linkedin, Github, MapPin, Calendar, Briefcase, FileText, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePresentation } from '../hooks/use-presentation';
import { useTemporaryTheme } from '../hooks/use-temporary-theme';
import Curriculum from './Curriculum';

interface PresentationProps {
  companyName?: string;
}

export const Presentation: React.FC<PresentationProps> = ({ companyName = 'default' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { presentationData, isLoading, error } = usePresentation(companyName);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  
  // Aplica tema light temporariamente, restaurando o original ao sair
  useTemporaryTheme('light');

  // Redireciona para NotFound se houver erro ou dados não encontrados
  useEffect(() => {
    if (!isLoading && (error || !presentationData)) {
      console.log('Redirecionando para NotFound - Empresa não encontrada:', companyName);
      navigate('/404', { replace: true });
    }
  }, [isLoading, error, presentationData, navigate, companyName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-lg">Carregando apresentação para {companyName}...</div>
      </div>
    );
  }

  // Se há erro ou dados não encontrados, o useEffect já redireciona para NotFound
  // Este bloco só aparece temporariamente antes do redirecionamento
  if (error || !presentationData) {
    return null; // Retorna null enquanto redireciona
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col gap-2 sm:hidden">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ArrowLeft className="h-4 w-4" />
                  {presentationData.actions.back}
                </Button>
              </Link>
              
              <Button 
                onClick={() => setIsCurriculumModalOpen(true)}
                variant="outline" 
                size="sm" 
                className="gap-1 px-3"
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs">{presentationData.actions.viewCurriculum}</span>
              </Button>
            </div>
            
            <h1 className="text-base font-semibold text-center px-2 leading-tight">
              {presentationData.introduction.title}
              {companyName !== 'default' && (
                <span className="block text-xs font-normal text-muted-foreground mt-1">
                  {companyName}
                </span>
              )}
            </h1>
          </div>

          {/* Desktop: Original horizontal layout */}
          <div className="hidden sm:flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ArrowLeft className="h-4 w-4" />
                {presentationData.actions.back}
              </Button>
            </Link>
            
            <h1 className="text-xl font-semibold">
              {presentationData.introduction.title}
              {companyName !== 'default' && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  - {companyName}
                </span>
              )}
            </h1>
            
            <Button 
              onClick={() => setIsCurriculumModalOpen(true)}
              variant="outline" 
              size="sm" 
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              {presentationData.actions.viewCurriculum}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header Card */}
          <Card className="bg-primary text-primary-foreground border-0">
            <CardHeader className="pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <CardTitle className="text-xl sm:text-2xl mb-2">{presentationData.header.name}</CardTitle>
                  <p className="text-base sm:text-lg opacity-90">{presentationData.header.title}</p>
                </div>
                
                {/* Mobile: Vertical stack, Desktop: Grid layout */}
                <div className="flex flex-col gap-2 text-xs sm:text-sm sm:flex-row sm:gap-6 sm:justify-center md:justify-end">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="break-all sm:break-normal">{presentationData.header.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>{presentationData.header.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>{presentationData.header.contact.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Introduction */}
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                Apresentação Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-3 sm:space-y-4">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {presentationData.introduction.greeting}
              </p>
              
              {presentationData.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Key Skills */}
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg">{presentationData.skills.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {presentationData.skills.categories.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{category.name}</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {category.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs sm:text-sm">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Highlights */}
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg">{presentationData.highlights.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <ul className="space-y-2 sm:space-y-3">
                {presentationData.highlights.items.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base leading-tight sm:leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Why Choose Me */}
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg">{presentationData.whyChooseMe.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-3 sm:space-y-4">
              {presentationData.whyChooseMe.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
              
              <Separator />
              
              <p className="leading-relaxed font-medium text-sm sm:text-base">
                {presentationData.whyChooseMe.closingStatement}
              </p>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
            <CardContent className="px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-6">
              <div className="text-center space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">{presentationData.contact.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {presentationData.contact.subtitle}
                </p>
                
                <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
                  {presentationData.contact.actions.map((action, index) => {
                    const getIcon = () => {
                      switch (action.type) {
                        case 'email': return <Mail className="h-3 w-3 sm:h-4 sm:w-4" />;
                        case 'linkedin': return <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />;
                        case 'github': return <Github className="h-3 w-3 sm:h-4 sm:w-4" />;
                        case 'curriculum': return <FileText className="h-3 w-3 sm:h-4 sm:w-4" />;
                        default: return null;
                      }
                    };

                    const handleClick = () => {
                      if (action.type === 'curriculum') {
                        setIsCurriculumModalOpen(true);
                      } else if (action.url) {
                        window.open(action.url, '_blank');
                      }
                    };

                    return (
                      <Button 
                        key={index}
                        onClick={handleClick}
                        variant={action.type === 'curriculum' ? 'default' : 'outline'}
                        size="sm" 
                        className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                      >
                        {getIcon()}
                        <span className="hidden xs:inline sm:inline">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal do Currículo */}
      <Dialog open={isCurriculumModalOpen} onOpenChange={setIsCurriculumModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
          <DialogHeader className="absolute top-4 right-4 z-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCurriculumModalOpen(false)}
              className="bg-white/90 hover:bg-white text-slate-800 rounded-full p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="w-full h-full overflow-auto">
            <Curriculum hideBackButton={true} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Presentation;