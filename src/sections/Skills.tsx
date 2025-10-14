import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const { t } = useTranslation();

  // Get skills from translation files
  const skillCategories = t('skills.list', { returnObjects: true }) as Array<{
    title: string;
    skills: string[];
  }>;

  const mainTechnologies = t('about.mainTechnologies', { returnObjects: true }) as string[];
  return (
  <section id="skills" className="py-20 px-4 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t('skills.title')}
          </h2>
          <div className="grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoFlow: 'row dense' }}>
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="col-span-1"
              >
                <Card className="h-full group overflow-hidden bg-gradient-to-br from-background to-muted/20 border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className={`${categoryIndex === 0 ? 'text-xl md:text-2xl' : 'text-lg'} font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent`}>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                          whileHover={{ scale: 1.1 }}
                          className={`
                            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                            transition-all duration-200 cursor-default
                            ${mainTechnologies.includes(skill)
                              ? 'bg-primary/20 text-primary border border-primary/30' 
                              : 'bg-secondary/50 text-secondary-foreground border border-border'
                            }
                            hover:shadow-md hover:bg-primary/30 hover:text-primary-foreground
                          `}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
