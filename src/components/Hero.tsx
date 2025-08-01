import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8rem 2rem;
  min-height: calc(100vh - 70px);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.8rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 650px;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.light};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const SecondaryButton = styled(Link)`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

interface HeroProps {
  name?: string;
  tagline?: string;
  description?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  name = "Your Name", 
  tagline = "Software Developer", 
  description = "I build modern web applications with a focus on performance, accessibility, and user experience."
}) => {
  return (
    <HeroSection>
      <Title>
        Hi, I'm <Highlight>{name}</Highlight>
        <br />
        {tagline}
      </Title>
      <Subtitle>{description}</Subtitle>
      <ButtonContainer>
        <PrimaryButton to="/projects">View My Work</PrimaryButton>
        <SecondaryButton to="/contact">Get In Touch</SecondaryButton>
      </ButtonContainer>
    </HeroSection>
  );
};

export default Hero;