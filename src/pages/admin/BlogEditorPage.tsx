import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BlogAPI } from '../../services/BlogAPI';
import { useAdminBlogPost } from '../../hooks/useBlogs';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input, { Label, InputGroup, TextArea } from '../../components/common/Input';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Toast, { ToastType } from '../../components/common/Toast';

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const BlogEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const { data: post, isLoading } = useAdminBlogPost(id || '');

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const initialValues = {
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    categories: post?.categories?.join(', ') || '',
    tags: post?.tags?.join(', ') || '',
    status: post?.status || 'draft',
    reading_time: post?.readTime || 5,
    publishDate: post?.publishDate || null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    slug: Yup.string().required('Required'),
    excerpt: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    reading_time: Yup.number().integer().min(1).required('Required'),
  });

  if (isEditing && isLoading) return <LoadingIndicator />;

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log('Saving post:', values);
      // For new posts, ensure a unique slug if the user didn't change the default
      if (!isEditing && values.slug === post?.slug) {
         values.slug = `${values.slug}-${Date.now()}`;
      }
      await BlogAPI.savePost({ ...values, id: post?.id });
      showToast('Post saved successfully!', 'success');
      // Delay navigation slightly to let user see the success message
      setTimeout(() => navigate('/admin/blogs'), 1000);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        showToast('Failed to save: A post with this slug or ID already exists.', 'error');
      } else {
        showToast('Failed to save post. Please try again.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <EditorHeader>
        <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>
          Cancel
        </Button>
      </EditorHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <FormGrid>
              <Card>
                <InputGroup>
                  <Label htmlFor="title">Title</Label>
                  <Field name="title" as={Input} placeholder="Enter post title" />
                  <ErrorMessage name="title" component={ErrorText} />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="slug">Slug</Label>
                  <Field name="slug" as={Input} placeholder="enter-post-slug" />
                  <ErrorMessage name="slug" component={ErrorText} />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Field name="excerpt" as={TextArea} placeholder="Short summary of the post" />
                  <ErrorMessage name="excerpt" component={ErrorText} />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Field name="content" as={TextArea} style={{ minHeight: '400px' }} placeholder="# Your content here" />
                  <ErrorMessage name="content" component={ErrorText} />
                </InputGroup>
              </Card>

              <div>
                <Card style={{ marginBottom: '2rem' }}>
                  <h3>Publishing</h3>
                  <hr style={{ margin: '1rem 0' }} />
                  <p style={{ textTransform: 'capitalize' }}>Status: <strong>{values.status}</strong></p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Draft'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => handleSubmit({ ...values, status: 'published' }, { setSubmitting: () => {} })}>
                      Publish Now
                    </Button>
                  </div>
                </Card>

                <Card>
                  <h3>Metadata</h3>
                  <hr style={{ margin: '1rem 0' }} />
                  <InputGroup>
                    <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                    <Field name="reading_time" type="number" as={Input} />
                    <ErrorMessage name="reading_time" component={ErrorText} />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="categories">Categories (comma separated)</Label>
                    <Field name="categories" as={Input} />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Field name="tags" as={Input} />
                  </InputGroup>
                </Card>
              </div>
            </FormGrid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogEditorPage;