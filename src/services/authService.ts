import api from './api';

export const authService = {
  async login(credentials: any) {
    // Mocking login for now
    // const response = await api.post('/auth/login', credentials);
    // return response.data;
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', name: 'Joe Scully', email: 'joe@example.com' },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  async logout() {
    // await api.post('/auth/logout');
    return Promise.resolve();
  },
};
