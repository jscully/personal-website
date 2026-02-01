import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setCredentials } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input, { Label, InputGroup } from '../../components/common/Input';
import PageContainer from '../../components/common/PageContainer';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FormError = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      setLoginError(null);
      const data: any = await authService.login(values);
      dispatch(setCredentials(data));
      navigate(from, { replace: true });
    } catch (err) {
      setLoginError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <LoginWrapper>
        <StyledCard>
          <Title>Admin Login</Title>
          {loginError && <FormError>{loginError}</FormError>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputGroup>
                  <Label htmlFor="email">Email</Label>
                  <Field name="email" as={Input} type="email" />
                  <ErrorMessage name="email" component={ErrorText} />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="password">Password</Label>
                  <Field name="password" as={Input} type="password" />
                  <ErrorMessage name="password" component={ErrorText} />
                </InputGroup>

                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </StyledCard>
      </LoginWrapper>
    </PageContainer>
  );
};

export default LoginPage;
