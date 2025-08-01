import React from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  padding: 5rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionDescription = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray};
`;

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eaeaea;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:first-child {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  
  &:last-child {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}10;
    }
  }
`;

// Define TypeScript interface for our project
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
}

const Projects: React.FC = () => {
  // Sample project data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A responsive dashboard for e-commerce stores with sales analytics, inventory management and customer insights.",
      image: "/assets/images/project1-placeholder.jpg",
      tags: ["React", "TypeScript", "Chart.js"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/yourusername/project1"
    },
    {
      id: 2,
      title: "Weather App",
      description: "A weather application that fetches real-time data from an API and displays current conditions and forecasts.",
      image: "/assets/images/project2-placeholder.jpg",
      tags: ["React", "API Integration", "CSS"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/yourusername/project2"
    },
    {
      id: 3,
      title: "Task Management System",
      description: "A full-stack application for managing tasks and projects with user authentication and real-time updates.",
      image: "/assets/images/project3-placeholder.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/yourusername/project3"
    }
  ];

  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionTitle>My Projects</SectionTitle>
        <SectionDescription>
          Here are some of the projects I've worked on. Check out my GitHub for more.
        </SectionDescription>
      </SectionHeader>
      
      <ProjectsContainer>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <ProjectTag key={index}>{tag}</ProjectTag>
                ))}
              </ProjectTags>
              <ProjectLinks>
                <ProjectLink href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </ProjectLink>
                <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  View Code
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;