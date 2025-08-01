import React from 'react';
import styled from 'styled-components';
import About from '../components/About';

const PageHeader = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary}10;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const PageDescription = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.1rem;
`;

const ExperienceSection = styled.section`
  padding: 5rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
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

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #eaeaea;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 30px;
  margin-bottom: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 15px;
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const Company = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const Period = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const EducationSection = styled.section`
  padding: 5rem 0;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 3rem 0;
  }
`;

const AboutPage: React.FC = () => {
  
  const workExperience = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Company",
      period: "Jan 2022 - Present",
      description: "Lead the development of user interfaces using React and TypeScript. Implemented responsive designs, optimized performance, and mentored junior developers."
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "Mar 2020 - Dec 2021",
      description: "Developed and maintained client websites and web applications. Worked with a team to implement designs and integrate with backend APIs."
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Startup",
      period: "Jun 2018 - Feb 2020",
      description: "Assisted in building web applications from scratch. Learned modern JavaScript frameworks and best practices for web development."
    }
  ];
  
  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      period: "2014 - 2018",
      description: "Focused on software engineering, algorithms, and web development. Graduated with honors."
    },
    {
      id: 2,
      degree: "Web Development Bootcamp",
      institution: "Coding Academy",
      period: "2018",
      description: "Intensive 12-week program focused on modern web development technologies and practices."
    }
  ];
  
  return (
    <>
      <PageHeader>
        <PageTitle>About Me</PageTitle>
        <PageDescription>
          Learn more about my background, experience, and skills
        </PageDescription>
      </PageHeader>
      
      <About />
      
      <ExperienceSection>
        <SectionTitle>Work Experience</SectionTitle>
        <TimelineContainer>
          {workExperience.map((job) => (
            <TimelineItem key={job.id}>
              <JobTitle>{job.title}</JobTitle>
              <Company>{job.company}</Company>
              <Period>{job.period}</Period>
              <Description>{job.description}</Description>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ExperienceSection>
      
      <EducationSection>
        <SectionTitle>Education</SectionTitle>
        <TimelineContainer>
          {education.map((edu) => (
            <TimelineItem key={edu.id}>
              <JobTitle>{edu.degree}</JobTitle>
              <Company>{edu.institution}</Company>
              <Period>{edu.period}</Period>
              <Description>{edu.description}</Description>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </EducationSection>
    </>
  );
};

export default AboutPage;