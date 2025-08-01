import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    z-index: -1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Bio = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const Skill = styled.span`
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const About: React.FC = () => {
  const skills = [
    "React", "TypeScript", "JavaScript", "Node.js", 
    "HTML", "CSS", "Next.js", "Styled Components", 
    "Git", "API Development", "Responsive Design"
  ];

  return (
    <AboutSection id="about">
      <Container>
        <ImageContainer>
          <ProfileImage 
            src="/assets/images/profile-placeholder.jpg" 
            alt="Your Name" 
          />
        </ImageContainer>
        <ContentContainer>
          <SectionTitle>About Me</SectionTitle>
          <Bio>
            Hello! I'm a passionate software developer with experience building modern web applications.
            I specialize in JavaScript technologies, particularly React, and I enjoy creating responsive,
            user-friendly interfaces that provide great experiences.
          </Bio>
          <Bio>
            With a background in computer science, I approach problems with analytical thinking and a
            creative mindset. I'm constantly learning new technologies and methodologies to improve
            my skills and build better software.
          </Bio>
          <SectionTitle>Skills</SectionTitle>
          <SkillsContainer>
            {skills.map((skill, index) => (
              <Skill key={index}>{skill}</Skill>
            ))}
          </SkillsContainer>
        </ContentContainer>
      </Container>
    </AboutSection>
  );
};

export default About;