export interface PresentationCompany {
  name: string; //nome
  urlData: string; //url para fazer o fetch de PresentationData(json)
}

export interface PresentationData {
  header: {
    name: string;
    title: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
  };
  introduction: {
    title: string;
    greeting: string;
    paragraphs: string[];
    companySpecific: {
      title: string;
      content: string;
    };
  };
  skills: {
    title: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  highlights: {
    title: string;
    items: string[];
  };
  whyChooseMe: {
    title: string;
    paragraphs: string[];
    closingStatement: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nextSteps: {
      title: string;
      defaultMessage: string;
      companySpecificMessage: string;
    };
    actions: Array<{
      type: 'email' | 'linkedin' | 'github' | 'curriculum';
      label: string;
      url?: string;
    }>;
  };
  closing: {
    greeting: string;
    signature: {
      name: string;
      title: string;
      description: string;
    };
    companySpecific: {
      label: string;
      text: string;
    };
  };
  actions: {
    back: string;
    viewCurriculum: string;
    viewFullCurriculum: string;
  };
}