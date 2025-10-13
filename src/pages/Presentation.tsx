import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Linkedin, Github, MapPin, Calendar, Briefcase, FileText, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Curriculum from './Curriculum';

export const Presentation: React.FC = () => {
  const { t } = useTranslation();
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          
          <h1 className="text-xl font-semibold">Carta de Apresentação</h1>
          
          <Button 
            onClick={() => setIsCurriculumModalOpen(true)}
            variant="outline" 
            size="sm" 
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Ver Currículo
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
                  <CardTitle className="text-2xl mb-2">Eric Vinícius da Silva</CardTitle>
                  <p className="text-lg opacity-90">Desenvolvedor Full Stack</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>eric.contact@exemplo.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>São Paulo, SP</span>
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
                Prezados recrutadores,
              </p>
              
              <p className="leading-relaxed">
                É com grande interesse que me dirijo a vocês para expressar meu entusiasmo em fazer parte da equipe de desenvolvimento da empresa. 
                Como desenvolvedor full stack com mais de 7 anos de experiência, tenho me dedicado a criar soluções tecnológicas inovadoras e eficientes.
              </p>
              
              <p className="leading-relaxed">
                Durante minha carreira, desenvolvi expertise em tecnologias modernas como React, Node.js, TypeScript e cloud computing, 
                sempre focando na entrega de produtos de alta qualidade e na experiência do usuário.
              </p>
            </CardContent>
          </Card>

          {/* Key Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Principais Competências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Destaques Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Liderei o desenvolvimento de aplicações web que atendem mais de 100.000 usuários mensais</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Implementei arquiteturas escaláveis que reduziram os tempos de resposta em 40%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Experiência em metodologias ágeis e trabalho colaborativo em equipes multidisciplinares</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Especialista em integração de APIs e desenvolvimento de microsserviços</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Why Choose Me */}
          <Card>
            <CardHeader>
              <CardTitle>Por que me escolher?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Acredito que minha combinação de habilidades técnicas sólidas, experiência prática e paixão por inovação 
                me tornam um candidato ideal para contribuir com os objetivos da empresa.
              </p>
              
              <p className="leading-relaxed">
                Estou sempre em busca de novos desafios e oportunidades de aprendizado, mantendo-me atualizado com as 
                últimas tendências e melhores práticas do desenvolvimento de software.
              </p>
              
              <Separator />
              
              <p className="leading-relaxed font-medium">
                Estou disponível para uma conversa e seria um prazer discutir como posso contribuir para o sucesso da equipe.
              </p>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Vamos conversar?</h3>
                <p className="text-muted-foreground">
                  Entre em contato comigo através dos canais abaixo
                </p>
                
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                  <Button 
                    onClick={() => setIsCurriculumModalOpen(true)}
                    size="sm" 
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Ver Currículo Completo
                  </Button>
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