import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2, Rocket, Users } from 'lucide-react';
import { useMemo } from 'react';

const About = () => {
  const { t } = useTranslation();

  const yearsOfExperience = useMemo(() => {
    const startYear = 2017;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }, []);

  const description = useMemo(() => {
    return t('about.description').replace('{years}', yearsOfExperience.toString());
  }, [t, yearsOfExperience]);

  const technologies = t('about.mainTechnologies', { returnObjects: true }) as string[];

  const highlights = useMemo(() => {
    const translatedHighlights = t('about.highlights', { returnObjects: true }) as Array<{
      title: string;
      description: string;
    }>;
    
    const icons = [Code2, Rocket, Users];
    
    return translatedHighlights.map((highlight, index) => ({
      icon: icons[index] || Code2,
      title: highlight.title,
      description: highlight.description,
    }));
  }, [t]);

  return (
  <section id="about" className="py-20 px-4 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t('about.title')}
          </h2>

          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-justify max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
              >
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              {t('about.stack')}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
