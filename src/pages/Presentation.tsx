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
import { useTheme } from 'next-themes';
import { usePresentation } from '../hooks/use-presentation';
import Curriculum from './Curriculum';

interface PresentationProps {
  companyName?: string;
}

export const Presentation: React.FC<PresentationProps> = ({ companyName = 'default' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { presentationData, isLoading, error } = usePresentation(companyName);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  // Define o tema como light ao carregar a página
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

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
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{presentationData.header.name}</CardTitle>
                  <p className="text-lg opacity-90">{presentationData.header.title}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{presentationData.header.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{presentationData.header.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{presentationData.header.contact.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Apresentação Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {presentationData.introduction.greeting}
              </p>
              
              {presentationData.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Key Skills */}
          <Card>
            <CardHeader>
              <CardTitle>{presentationData.skills.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {presentationData.skills.categories.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-3">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>{presentationData.highlights.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {presentationData.highlights.items.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Why Choose Me */}
          <Card>
            <CardHeader>
              <CardTitle>{presentationData.whyChooseMe.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {presentationData.whyChooseMe.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <Separator />
              
              <p className="leading-relaxed font-medium">
                {presentationData.whyChooseMe.closingStatement}
              </p>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">{presentationData.contact.title}</h3>
                <p className="text-muted-foreground">
                  {presentationData.contact.subtitle}
                </p>
                
                <div className="flex justify-center gap-4 flex-wrap">
                  {presentationData.contact.actions.map((action, index) => {
                    const getIcon = () => {
                      switch (action.type) {
                        case 'email': return <Mail className="h-4 w-4" />;
                        case 'linkedin': return <Linkedin className="h-4 w-4" />;
                        case 'github': return <Github className="h-4 w-4" />;
                        case 'curriculum': return <FileText className="h-4 w-4" />;
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
                        className="gap-2"
                      >
                        {getIcon()}
                        {action.label}
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