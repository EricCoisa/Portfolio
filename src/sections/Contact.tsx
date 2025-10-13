import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const contactLinks = [
    {
      icon: Mail,
      label: t('contact.email'),
      href: 'mailto:ericvitor96@gmail.com',
      value: 'ericvitor96@gmail.com',
    },
    {
      icon: Github,
      label: t('contact.github'),
      href: 'https://github.com/EricCoisa',
      value: '@EricCoisa',
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      href: 'https://linkedin.com/in/eric-vitor',
      value: '/in/eric-vitor',
    },
  ];

  return (
  <section id="contact" className="py-20 px-4 bg-secondary/30 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {contactLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-2">
                    <Button
                      variant="ghost"
                      className="w-full h-auto flex flex-col items-center gap-3 py-2 hover:bg-primary/100 group"
                      asChild
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                        <div className="text-center">
                          <p className="font-semibold">{link.label}</p>
                          <p className="text-sm text-muted-foreground">{link.value}</p>
                        </div>
                      </a>
                    </Button>
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

export default Contact;
