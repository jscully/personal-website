import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.heading};
  color: ${({ theme }) => theme.colors.light};
  padding: 3rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 2rem;
  }
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block;
`;

const FooterDescription = styled.p`
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.light};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 30px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: #b0b0b0;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      padding-left: 5px;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #b0b0b0;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo to="/">YourName</Logo>
          <FooterDescription>
            A passionate software developer focused on building clean, user-friendly
            applications with modern technologies.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </SocialLink>
            <SocialLink href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/">Home</Link></FooterLink>
            <FooterLink><Link to="/about">About</Link></FooterLink>
            <FooterLink><Link to="/projects">Projects</Link></FooterLink>
            <FooterLink><Link to="/contact">Contact</Link></FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </FooterLink>
            <FooterLink>
              <span>Your City, Country</span>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} YourName. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;