import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}15;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoContent = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p, a {
    color: ${({ theme }) => theme.colors.gray};
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &.error {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &.error {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 500;
`;

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', values);
    setSubmitted(true);
    setSubmitting(false);
    resetForm();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <ContactSection id="contact">
      <SectionHeader>
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionDescription>
          Have a question or want to work together? Feel free to contact me!
        </SectionDescription>
      </SectionHeader>

      <ContactContainer>
        <ContactInfo>
          <InfoItem>
            <IconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </IconWrapper>
            <InfoContent>
              <h3>Email</h3>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </IconWrapper>
            <InfoContent>
              <h3>Location</h3>
              <p>Your City, Country</p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </IconWrapper>
            <InfoContent>
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/yourprofile
              </a>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </IconWrapper>
            <InfoContent>
              <h3>GitHub</h3>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                github.com/yourusername
              </a>
            </InfoContent>
          </InfoItem>
        </ContactInfo>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Field
                  name="name"
                  as={StyledInput}
                  className={errors.name && touched.name ? 'error' : ''}
                />
                <ErrorMessage name="name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Field
                  name="email"
                  type="email"
                  as={StyledInput}
                  className={errors.email && touched.email ? 'error' : ''}
                />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Field
                  name="subject"
                  as={StyledInput}
                  className={errors.subject && touched.subject ? 'error' : ''}
                />
                <ErrorMessage name="subject" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <Field
                  name="message"
                  as={StyledTextArea}
                  className={errors.message && touched.message ? 'error' : ''}
                />
                <ErrorMessage name="message" component={ErrorText} />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>

              {submitted && (
                <SuccessMessage>
                  Thanks for reaching out! I will get back to you soon.
                </SuccessMessage>
              )}
            </Form>
          )}
        </Formik>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
