import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Github, Linkedin, Phone, MapPin, Globe, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useCurriculumTranslations } from '../hooks/use-curriculum-translations';
import { motion } from 'framer-motion';

export const Curriculum: React.FC = () => {
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
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4" />
              {curriculumData.actions.back}
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              {curriculumData.actions.print}
            </Button>
            <Button onClick={handleDownload} size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {curriculumData.actions.download}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg print:shadow-none print:bg-white"
        >
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl print:bg-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{curriculumData.header.name}</h1>
                <p className="text-xl opacity-90 mb-4">{curriculumData.header.title}</p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <MapPin className="h-4 w-4" />
                  {curriculumData.header.location}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{curriculumData.header.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{curriculumData.header.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{curriculumData.header.website}</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <a href={`https://${curriculumData.header.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={`https://${curriculumData.header.github}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.summary.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {curriculumData.sections.summary.content}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.experience.title}
              </h2>
              <div className="space-y-6">
                {curriculumData.sections.experience.jobs.map((job, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg text-slate-800 dark:text-slate-200">{job.position}</CardTitle>
                          <p className="text-blue-600 font-semibold">{job.company}</p>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          <div>{job.period}</div>
                          <div>{job.location}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">{job.description}</p>
                      <ul className="space-y-1">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.education.title}
              </h2>
              <div className="space-y-4">
                {curriculumData.sections.education.courses.map((course, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{course.degree}</h3>
                          <p className="text-green-600 font-medium">{course.institution}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{course.location}</p>
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

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.skills.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculumData.sections.skills.categories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-200">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b-2 border-blue-600 pb-2">
                {curriculumData.sections.projects.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {curriculumData.sections.projects.list.map((project, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-200">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm">{project.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tecnologias:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Destaques:</h4>
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
            <div className="grid md:grid-cols-2 gap-8">
              {/* Certifications */}
              <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b-2 border-blue-600 pb-2">
                  {curriculumData.sections.certifications.title}
                </h2>
                <div className="space-y-3">
                  {curriculumData.sections.certifications.list.map((cert, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{cert.name}</h3>
                        <p className="text-orange-600 text-sm">{cert.issuer}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{cert.year}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b-2 border-blue-600 pb-2">
                  {curriculumData.sections.languages.title}
                </h2>
                <div className="space-y-3">
                  {curriculumData.sections.languages.list.map((lang, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{lang.language}</h3>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                            {lang.level}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Curriculum;