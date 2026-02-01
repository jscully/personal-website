import api from './api';

export const authService = {
  async login(credentials: any) {
    const formData = new FormData();
    formData.append('username', credentials.email); // API expects 'username' but UI sends 'email'
    formData.append('password', credentials.password);

    const response = await api.post('/admin/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios handles boundary
      },
    });
    
    return {
      user: { email: credentials.email, name: 'Admin' }, // API doesn't return user info on login, just token
      token: response.data.access_token
    };
  },

  async logout() {
    try {
      await api.post('/admin/auth/logout');
    } catch (err) {
      console.error('Logout failed', err);
    }
  },
};