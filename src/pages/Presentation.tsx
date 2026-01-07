import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Linkedin, Github, MapPin, Calendar, Briefcase, FileText, X, Home } from 'lucide-react';
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
import { LoadingSpinner } from '@/components/ui/loadingSpinner';

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

  const handlePrint = () => {
    window.print();
  };

  // Redireciona para NotFound se houver erro ou dados não encontrados
  useEffect(() => {
    if (!isLoading && (error || !presentationData)) {
      navigate('/404', { replace: true });
    }
  }, [isLoading, error, presentationData, navigate, companyName]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se há erro ou dados não encontrados, o useEffect já redireciona para NotFound
  // Este bloco só aparece temporariamente antes do redirecionamento
  if (error || !presentationData) {
    return null; // Retorna null enquanto redireciona
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 print:bg-white print:bg-none">
      {/* Print helper styles */}
      <style>{`@media print {
          @page {
            margin: 0;
            size: A4;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
          }
          * {
            box-sizing: border-box;
          }
          .rounded, .rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-t-xl {
            border-radius: 0 !important;
          }
          .print-avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
            margin: 0.5rem 0 !important;
     
          }
          .shadow-lg, .shadow-md, .shadow-sm {
            box-shadow: none !important;
          }
          .container {
            padding: 1cm !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          p, h1, h2, h3, h4, h5, h6 {
            orphans: 3;
            widows: 3;
          }
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
        }`}</style>
      {/* Header */}
      <div className="print:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col gap-2 sm:hidden">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Home className="h-4 w-4" />
                  {presentationData.actions.back}
                </Button>
              </Link>

              <div className="flex gap-2">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  className="gap-1 px-3"
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">Imprimir</span>
                </Button>
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
            </div>

            <h1 className="text-base font-semibold text-center px-2 leading-tight flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span>
                {companyName !== 'default' ? `Carta de Apresentação` : 'Apresentação Profissional'}
                {companyName !== 'default' && (
                  <span className="block text-xs font-normal text-muted-foreground mt-1">
                    {companyName}
                  </span>
                )}
              </span>
            </h1>
          </div>

          {/* Desktop: Original horizontal layout */}
          <div className="hidden sm:flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Home className="h-4 w-4" />
                {presentationData.actions.back}
              </Button>
            </Link>

            <h1 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              {presentationData.introduction.title}
            </h1>

            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Imprimir
              </Button>
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
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-4xl print:max-w-none print:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8 print:space-y-3"
        >

          {/* Introduction */}
          <Card className="border-l-2 border-l-slate-700 dark:border-l-slate-300 print:border-l-0 print:shadow-none print:border-0 print-avoid-break">
            <CardContent className="px-3 sm:px-6 pt-3 sm:pt-6 pb-3 sm:pb-6 space-y-3 sm:space-y-4 print:p-0 print:space-y-2">
              <CardTitle className="text-base sm:text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                {presentationData.introduction.greeting}
              </CardTitle>
              {presentationData.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          {companyName !== 'default' && (
            <Card className="border-l-2 border-l-slate-700 dark:border-l-slate-300 print:border-l-0 print:shadow-none print:border-0 print-avoid-break">
              <CardContent className="px-3 sm:px-6 pt-3 sm:pt-6 pb-3 sm:pb-6 print:p-0">
                <CardTitle className="text-base sm:text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                  {presentationData.introduction.companySpecific.title.replace('{companyName}', companyName)}
                </CardTitle>

                <p className="text-sm sm:text-base leading-relaxed">
                  {presentationData.introduction.companySpecific.content.replace('{companyName}', companyName)}
                </p>

              </CardContent>
            </Card>
          )}

          {/* Key Skills */}
          <Card className="border-l-2 border-l-slate-700 dark:border-l-slate-300 print:border-l-0 print:shadow-none print:border-0 print-avoid-break">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3 print:p-0">
              <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
                {presentationData.skills.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 print:p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 print:gap-3">
                {presentationData.skills.categories.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{category.name}</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {category.items.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          title={String(skill)}
                          role="listitem"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Highlights */}
          <Card className="border-l-2 border-l-slate-700 dark:border-l-slate-300 print:border-l-0 print:shadow-none print:border-0 print-avoid-break">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3 print:p-0">
              <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
                {companyName !== 'default'
                  ? `Como posso agregar valor à ${companyName}`
                  : presentationData.highlights.title
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 print:p-0">
              <div className="space-y-3 sm:space-y-3">
                {presentationData.highlights.items.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                    <span className="text-slate-400 dark:text-slate-600 mt-1">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>

          {/* Why Choose Me */}
          <Card className="border-l-2 border-l-slate-700 dark:border-l-slate-300 print:border-l-0 print:shadow-none print:border-0 print-avoid-break">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3 print:p-0">
              <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
                {presentationData.whyChooseMe.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-3 sm:space-y-4 print:p-0 print:space-y-2">
              {presentationData.whyChooseMe.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}


              <Separator className="my-4" />

              <div className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-5 border-l-4 border-l-slate-700 dark:border-l-slate-400">
                <p className="leading-relaxed font-medium text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  {presentationData.whyChooseMe.closingStatement}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="print:hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
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

                    const isPrimary = action.type === 'email' || action.type === 'curriculum';

                    return (
                      <Button
                        key={index}
                        onClick={handleClick}
                        variant={isPrimary ? 'default' : 'outline'}
                        size="sm"
                        className={`gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 transform transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-md ${isPrimary ? 'shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-primary/90 dark:bg-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        aria-label={action.label}
                      >
                        <span className="flex items-center gap-2">
                          {getIcon()}
                          <span className="hidden xs:inline sm:inline">{action.label}</span>
                        </span>
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
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
          <div className="w-full h-full overflow-auto">
            <Curriculum hideBackButton={true} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Presentation;