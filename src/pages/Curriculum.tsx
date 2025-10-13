import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Github, Linkedin, Phone, MapPin, Globe, Printer, Check, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useCurriculumTranslations } from '../hooks/use-curriculum-translations';
import { useTemporaryTheme } from '../hooks/use-temporary-theme';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';

interface CurriculumProps {
  hideBackButton?: boolean;
}

export const Curriculum: React.FC<CurriculumProps> = ({ hideBackButton = false }) => {
  const { i18n } = useTranslation();
  const { curriculumData, isLoading } = useCurriculumTranslations();
  
  // Aplica tema light temporariamente, restaurando o original ao sair
  useTemporaryTheme('light');

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !curriculumData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Print helper styles to force 2-column grids and avoid breaking cards */}
      <style>{`@media print {
          .print-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          .print-grid-card { break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid; box-sizing: border-box; }
          /* Right border for cards in print, except the last column item */
          .print-grid-card { border-right: 1px solid rgba(0,0,0,0.12); padding-right: 0.5rem; }
          /* For a 2-column print grid, remove the right border from every even item (last in the row) */
          .print-grid-card:nth-child(2n) { border-right: none; padding-right: 0; }
          /* Ensure cards don't expand full width in print */
          .print-grid-card > * { box-decoration-break: clone; }

          /* Remove border-radius in print for elements using Tailwind rounded classes */
          .rounded, .rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-t-xl, .rounded-tl-lg, .rounded-tr-lg, .rounded-none {
            border-radius: 0 !important;
          }
          /* Also ensure any element with overflow-hidden doesn't crop when radius removed */
          .overflow-hidden { overflow: visible !important; }
        }`}</style>
      {/* Header - No print */}
      <div className="print:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {!hideBackButton ? (
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Home className="h-4 w-4" />
                {curriculumData.actions.back}
              </Button>
            </Link>
          ) : (
            <div></div> // Espaço vazio para manter o layout
          )}

          <div className="flex gap-2">
            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {curriculumData.actions.print}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('en')}
                  className={`flex items-center justify-between ${i18n.language === 'en' ? 'bg-accent' : ''}`}
                >
                  <span>English</span>
                  {i18n.language === 'en' && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('pt')}
                  className={`flex items-center justify-between ${i18n.language === 'pt' ? 'bg-accent' : ''}`}
                >
                  <span>Português</span>
                  {i18n.language === 'pt' && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-7xl print:max-w-none print:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg print:shadow-none print:bg-white print:rounded-none"
        >
          {/* Header Section */}
          <div className="py-3 px-3 sm:py-2 sm:px-4 print:p-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl print:bg-black print:text-white print:rounded-none">
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 print:gap-2">
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold print:text-white print:font-bold">{curriculumData.header.name}</h1>
                <p className="text-base sm:text-lg opacity-90 -mt-1 print:text-white print:opacity-100 print:font-semibold">{curriculumData.header.title}</p>
              </div>

              {/* Mobile: 2x2 Grid, Desktop: Original Grid layout */}
              <div className="grid grid-cols-2 gap-x-0 gap-y-1 text-xs sm:text-sm sm:grid-cols-[auto_auto_auto_auto_auto] sm:grid-rows-2 sm:items-center sm:gap-x-2 sm:gap-y-0.5 sm:justify-end">
                {/* Linha 1 - Email e Telefone */}
                <div className="flex items-center gap-1 sm:contents">
                  <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:row-start-1 sm:col-start-1 print:text-white" />
                  <span className="sm:row-start-1 sm:col-start-2 truncate text-xs print:text-white print:font-semibold">{curriculumData.header.email}</span>
                </div>

                <div className="flex items-center gap-1 sm:contents">
                  <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:row-start-1 sm:col-start-4 print:text-white" />
                  <span className="sm:row-start-1 sm:col-start-5 text-xs print:text-white print:font-semibold">{curriculumData.header.phone}</span>
                </div>

                {/* Linha 2 - Site e LinkedIn */}
                <div className="flex items-center gap-1 sm:contents">
                  <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:row-start-2 sm:col-start-1 print:text-white" />
                  <span className="sm:row-start-2 sm:col-start-2 truncate text-xs print:text-white print:font-semibold">{curriculumData.header.website}</span>
                </div>
           
                <div className="flex items-center gap-1 sm:contents">
                  <Linkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:row-start-2 sm:col-start-4 print:text-white" />
                  <span className="sm:row-start-2 sm:col-start-5 truncate text-xs print:text-white print:font-semibold">{curriculumData.header.linkedin}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 sm:p-8 print:p-0 space-y-6 sm:space-y-8 print:space-y-2">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.summary.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed print:leading-snug">
                {curriculumData.sections.summary.content}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.skills.title}
              </h2>
              <div className="space-y-3 sm:space-y-2 print:space-y-1">
                {curriculumData.sections.skills.categories.map((category, index) => (
                  <div key={index} className="space-y-1 print:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-baseline">
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 sm:mb-0 sm:min-w-[120px] md:min-w-[180px] print:min-w-[150px] print:text-xs">{category.name}:</h3>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 print:gap-0">
                        {category.items.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 print:p-0 print:after:content-[','] print:after:ml-0.5 last:print:after:content-none"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.experience.title}
              </h2>
              <div className="space-y-4 sm:space-y-6 print:space-y-2">
                {curriculumData.sections.experience.jobs.map((job, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600 print:border-l-0 print:shadow-none print:border-0">
                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6 print:p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg print:text-base text-slate-800 dark:text-slate-200 leading-tight">
                            <span className="block sm:inline">{job.position}</span>
                            <span className="text-blue-600 font-semibold block sm:inline"> - {job.company}</span>
                          </CardTitle>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row gap-1 sm:gap-2 sm:items-center shrink-0">
                          <span>{job.period}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 print:p-0">
                      <p className="text-slate-600 dark:text-slate-300 mb-2 sm:mb-3 text-sm print:mb-1 print:text-sm">{job.description}</p>
                      <ul className="space-y-1 print:space-y-0">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm print:text-xs flex items-start gap-2 print:gap-1">
                            <span className="text-blue-600 mt-0.5 print:mt-0.5">•</span>
                            <span className="leading-tight">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.education.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print-grid">
                {curriculumData.sections.education.courses.map((course, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500 print:border-l-0 print:shadow-none print:border-0 print-grid-card">
                    <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6 pb-3 sm:pb-6 print:p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight">{course.degree}</h3>
                          <p className="text-green-600 font-medium text-sm">{course.institution}</p>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 sm:text-right shrink-0">
                          <div>{course.period}</div>
                          <div className="text-green-600 font-medium">{course.status}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>



            {/* Projects */}
            <section className="print:hidden">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.projects.title}
              </h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2 gap-6 print:gap-4">
                {curriculumData.sections.projects.list.map((project, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500 print:border-l-0 print:shadow-none print:border-0">
                    <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6 pb-3 sm:pb-4 print:p-0">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight mb-2">{project.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm">{project.description}</p>

                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{curriculumData.sections.projects.technologies}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{curriculumData.sections.projects.highlights}:</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="text-slate-600 dark:text-slate-300 text-xs flex items-start gap-2">
                              <span className="text-purple-500 mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Grid layout for remaining sections */}

            {/* Certifications */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.certifications.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print-grid">
                {curriculumData.sections.certifications.list.map((cert, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-500 print:border-l-0 print:shadow-none print:border-0 print-grid-card">
                    <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6 pb-3 sm:pb-4 print:p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight">{cert.name}</h3>
                          <p className="text-orange-600 text-sm">{cert.issuer}</p>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 sm:text-right shrink-0">
                          <div>{cert.year}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.languages.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print-grid">
                {curriculumData.sections.languages.list.map((lang, index) => (
                  <Card key={index} className="border-l-4 border-l-teal-500 print:border-l-0 print:shadow-none print:border-0 print-grid-card">
                    <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6 pb-3 sm:pb-4 print:p-0">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{lang.language}</h3>
                      <p className="text-teal-600 text-sm">{lang.level}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Curriculum;