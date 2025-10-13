import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Github, Linkedin, Phone, MapPin, Globe, Printer, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useCurriculumTranslations } from '../hooks/use-curriculum-translations';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CurriculumProps {
  hideBackButton?: boolean;
}

export const Curriculum: React.FC<CurriculumProps> = ({ hideBackButton = false }) => {
  const { i18n } = useTranslation();
  const { curriculumData, isLoading } = useCurriculumTranslations();

  const handleDownload = () => {
    window.open('https://drive.google.com/file/d/1rIDMk3DUay16XtNpHPUM0ufaFYV2obRY/view?usp=drive_link', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !curriculumData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header - No print */}
      <div className="print:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {!hideBackButton ? (
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ArrowLeft className="h-4 w-4" />
                {curriculumData.actions.back}
              </Button>
            </Link>
          ) : (
            <div></div> // Espaço vazio para manter o layout
          )}

          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              {curriculumData.actions.print}
            </Button>
            <Button onClick={handleDownload} size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {curriculumData.actions.download}
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
      <div className="container mx-auto px-6 py-8 max-w-7xl print:max-w-none print:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg print:shadow-none print:bg-white print:rounded-none"
        >
          {/* Header Section */}
          <div className="py-2 px-4 print:p-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl print:bg-slate-900 print:rounded-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-2">
              <div>
                <h1 className="text-2xl font-bold">{curriculumData.header.name}</h1>
                <p className="text-lg opacity-90 -mt-1">{curriculumData.header.title}</p>
              </div>

              <div className="grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 text-sm sm:text-left items-center gap-x-2 gap-y-0.5 whitespace-nowrap sm:justify-end">
                <Mail className="h-3.5 w-3.5 row-start-1 col-start-1" />
                <span className="row-start-1 col-start-2">{curriculumData.header.email}</span>

                <Phone className="h-3.5 w-3.5 row-start-1 col-start-4" />
                <span className="row-start-1 col-start-5">{curriculumData.header.phone}</span>

                <Globe className="h-3.5 w-3.5 row-start-2 col-start-1" />
                <span className="row-start-2 col-start-2">{curriculumData.header.website}</span>
           
                <Linkedin className="h-3.5 w-3.5 row-start-2 col-start-4" />
                <span className="row-start-2 col-start-5">{curriculumData.header.linkedin}</span>
              </div>

            </div>
          </div>

          <div className="p-8 print:p-0 space-y-8 print:space-y-2">
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.skills.title}
              </h2>
              <div className="space-y-2 print:space-y-1">
                {curriculumData.sections.skills.categories.map((category, index) => (
                  <div key={index} className="space-y-1 print:space-y-0">
                    <div className="flex gap-2 items-baseline">
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 min-w-[180px] print:min-w-[150px] print:text-xs">{category.name}:</h3>
                      <div className="flex flex-wrap gap-1.5 print:gap-0">
                        {category.items.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs print:p-0 print:after:content-[','] print:after:ml-0.5 last:print:after:content-none"
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.experience.title}
              </h2>
              <div className="space-y-6 print:space-y-2">
                {curriculumData.sections.experience.jobs.map((job, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600 print:border-l-0 print:shadow-none print:border-0">
                    <CardHeader className="pb-3 print:p-0">
                      <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg print:text-base text-slate-800 dark:text-slate-200 truncate">
                            {job.position} <span className="text-blue-600 font-semibold">- {job.company}</span>
                          </CardTitle>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex gap-2 items-center shrink-0">
                          <span>{job.period}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="print:p-0">
                      <p className="text-slate-600 dark:text-slate-300 mb-3 print:mb-1 print:text-sm">{job.description}</p>
                      <ul className="space-y-1 print:space-y-0">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-slate-600 dark:text-slate-300 text-sm print:text-xs flex items-start gap-2 print:gap-1">
                            <span className="text-blue-600 mt-1 print:mt-0.5">•</span>
                            <span>{achievement}</span>
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.education.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {curriculumData.sections.education.courses.map((course, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500 flex-1 min-w-[300px] print:border-l-0 print:shadow-none print:border-0">
                    <CardContent className="pt-6 print:p-0">
                      <div className="flex flex-row items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{course.degree}</h3>
                          <p className="text-green-600 font-medium">{course.institution}</p>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.projects.title}
              </h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2 gap-6 print:gap-4">
                {curriculumData.sections.projects.list.map((project, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500 print:border-l-0 print:shadow-none print:border-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-200">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
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
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.certifications.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {curriculumData.sections.certifications.list.map((cert, index) => (
                  <Card key={index} className="flex-1 min-w-[200px] border-l-4 border-l-orange-500 print:border-l-0 print:shadow-none print:border-0">
                    <CardContent className="pt-4 print:p-0">
                      <div className="flex flex-row items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{cert.name}</h3>
                          <p className="text-orange-600 text-sm">{cert.issuer}</p>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
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
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b-2 border-blue-600 pb-2 print:text-base print:mb-1 print:border-b print:border-slate-400 print:pb-0.5">
                {curriculumData.sections.languages.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {curriculumData.sections.languages.list.map((lang, index) => (
                  <Card key={index} className="flex-1 min-w-[200px] border-l-4 border-l-teal-500 print:border-l-0 print:shadow-none print:border-0">
                    <CardContent className="pt-4 print:p-0">
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