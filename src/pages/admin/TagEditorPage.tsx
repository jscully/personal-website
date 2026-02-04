import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { BlogAPI } from '../../services/BlogAPI';
import { useTag } from '../../hooks/useBlogs';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input, { Label, InputGroup, TextArea } from '../../components/common/Input';
import Toast, { ToastType } from '../../components/common/Toast';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Tag name is required')
    .min(1, 'Minimum 1 character')
    .max(50, 'Maximum 50 characters'),
  description: Yup.string().max(200, 'Maximum 200 characters'),
  color_code: Yup.string().matches(/^#[0-9A-Fa-f]{3,6}$/, 'Invalid hex color'),
});

const TagEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { data: tag, isLoading } = useTag(id || '');

  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const initialValues = {
    name: tag?.name || '',
    description: tag?.description || '',
    color_code: tag?.color_code || '#5A5d80',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      if (isEditing && id) {
        await BlogAPI.updateTag(id, {
          name: values.name,
          description: values.description || undefined,
          color_code: values.color_code,
        });
        showToast('Tag updated successfully!', 'success');
      } else {
        await BlogAPI.createTag({
          name: values.name,
          description: values.description || undefined,
          color_code: values.color_code,
        });
        showToast('Tag created successfully!', 'success');
      }
      // Invalidate the tags cache so the list refreshes with updated data
      await queryClient.invalidateQueries({ queryKey: ['tags'] });
      setTimeout(() => navigate('/admin/tags'), 1000);
    } catch (err: any) {
      console.error(err);
      showToast(`Failed to ${isEditing ? 'update' : 'create'} tag. Please try again.`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditing && isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <Header>
        <h1>{isEditing ? 'Edit Tag' : 'Add New Tag'}</h1>
        <Button variant="outline" onClick={() => navigate('/admin/tags')}>
          Cancel
        </Button>
      </Header>

      <Card style={{ maxWidth: '600px' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form>
              <InputGroup>
                <Label htmlFor="name">Name *</Label>
                <Field name="name" as={Input} placeholder="Enter tag name" />
                <ErrorMessage name="name" component={ErrorText} />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="description">Description</Label>
                <Field name="description" as={TextArea} placeholder="Optional description" />
                <ErrorMessage name="description" component={ErrorText} />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="color_code">Color</Label>
                <ColorRow>
                  <Field name="color_code" as={Input} placeholder="#5A5d80" />
                  <ColorPreview $color={values.color_code} />
                </ColorRow>
                <ErrorMessage name="color_code" component={ErrorText} />
              </InputGroup>

              <Button type="submit" disabled={isSubmitting} style={{ marginTop: '1.5rem' }}>
                {isSubmitting
                  ? (isEditing ? 'Updating...' : 'Creating...')
                  : (isEditing ? 'Update Tag' : 'Create Tag')}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default TagEditorPage;
