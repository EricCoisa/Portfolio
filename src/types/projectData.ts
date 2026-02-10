export interface ProjectItem {
  name: string; // nome identificador único
  urlData: string; // url para fazer o fetch de ProjectData(json)
}

export interface ProjectData {
  metadata: {
    id: string; // identificador único
    title: string; // título do projeto
    slug: string; // slug para URL
    featured: boolean; // se deve aparecer em destaque
    status: 'active' | 'archived' | 'in-progress' | 'paused'; // status atual
    visibility: 'public' | 'private' | 'unlisted'; // visibilidade
    createdAt?: string; // data de criação (ISO)
    updatedAt?: string; // última atualização (ISO)
  };
  
  hero: {
    title: string; // título principal
    subtitle: string; // subtítulo/tagline
    description: string; // descrição curta
    thumbnail?: string; // URL da imagem de capa
    tags: string[]; // tags rápidas
  };
  
  context: {
    title: string; // título da seção de contexto
    problem: {
      title: string; // "O Problema" ou similar
      description: string; // descrição do problema resolvido
      points?: string[]; // pontos-chave do problema
    };
    solution: {
      title: string; // "A Solução" ou similar
      description: string; // descrição da solução implementada
      points?: string[]; // pontos-chave da solução
    };
    target?: {
      title: string; // "Público-Alvo" ou similar
      description: string; // quem utiliza/beneficia
    };
    impact?: {
      title: string; // "Impacto" ou similar
      metrics?: Array<{
        label: string; // ex: "Tempo economizado"
        value: string; // ex: "60%"
        description?: string;
      }>;
      description?: string;
    };
  };
  
  stack: {
    title: string; // título da seção de stack
    description?: string; // descrição geral da arquitetura
    categories: Array<{
      name: string; // ex: "Frontend", "Backend", "DevOps"
      icon?: string; // ícone da categoria (opcional)
      technologies: Array<{
        name: string; // nome da tecnologia
        version?: string; // versão utilizada
        purpose?: string; // para que foi usada
        highlight?: boolean; // destaque especial
      }>;
    }>;
    architecture?: {
      title: string;
      description: string;
      diagram?: string; // URL do diagrama (opcional)
    };
  };
  
  features: {
    title: string; // título da seção de funcionalidades
    description?: string;
    list: Array<{
      title: string; // nome da feature
      description: string; // descrição da feature
      icon?: string; // ícone (opcional)
      image?: string; // screenshot (opcional)
      tags?: string[]; // tags relacionadas
    }>;
  };
  
  demo?: {
    available: boolean; // se tem demo disponível
    type?: 'live' | 'video' | 'iframe'; // tipo de demonstração
    url?: string; // URL da demo
    label?: string; // label para o botão (ex: "Ver Demo", "Watch Demo")
    credentials?: {
      user?: string;
      password?: string;
      note?: string;
    };
    screenshots?: Array<{
      url: string;
      caption?: string;
      thumbnail?: string;
    }>;
  };
  
  links: {
    github?: {
      url: string;
      label?: string;
      public: boolean; // se o repo é público
    };
    live?: {
      url: string;
      label?: string;
    };
    npm?: {
      package: string; // nome do pacote
      command: string; // comando de instalação
      url?: string; // link para npm
    };
    docs?: {
      url: string;
      label?: string;
    };
    other?: Array<{
      label: string;
      url: string;
      icon?: string;
    }>;
  };
  
  highlights?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  
  challenges?: {
    title: string;
    challengeLabel?: string; // label para "Desafio:" ou "Challenge:"
    solutionLabel?: string; // label para "Solução:" ou "Solution:"
    items: Array<{
      challenge: string; // o desafio enfrentado
      solution: string; // como foi resolvido
    }>;
  };
  
  learnings?: {
    title: string;
    items: string[]; // aprendizados do projeto
  };
  
  footer?: {
    callToAction?: {
      title: string;
      description: string;
      buttons: Array<{
        label: string;
        url?: string;
        type: 'github' | 'live' | 'npm' | 'docs' | 'contact' | 'custom';
        variant?: 'default' | 'outline' | 'ghost';
      }>;
    };
    related?: {
      title: string;
      projects: string[]; // IDs de projetos relacionados
    };
  };
  
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
