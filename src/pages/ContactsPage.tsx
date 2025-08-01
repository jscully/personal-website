import React from 'react';
import styled from 'styled-components';
import Contact from '../components/Contact';

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

const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader>
        <PageTitle>Contact</PageTitle>
        <PageDescription>
          Have a question or want to work together? I'd love to hear from you!
        </PageDescription>
      </PageHeader>
      
      <Contact />
    </>
  );
};

export default ContactPage;