// Project Types
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoLink: string;
    codeLink: string;
    category?: string; // For filtering projects
  }
  
  // Work Experience Types
  export interface WorkExperience {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
  }
  
  // Education Types
  export interface Education {
    id: number;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }
  
  // Contact Form Types
  export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }