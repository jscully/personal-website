import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Button from '../common/Button';

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 260px;
  background-color: ${({ theme }) => theme.colors.heading};
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80px;
  }
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0 2rem;
  margin-bottom: 3rem;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    padding: 0 1rem;
    text-align: center;
  }
`;

const NavLinks = styled.nav`
  flex-grow: 1;
`;

interface NavItemProps {
  active: boolean;
}

const NavItem = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${({ active }) => (active ? 'white' : '#b0b0b0')};
  background-color: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
    justify-content: center;
    span {
      display: none;
    }
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  height: 70px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
`;

const ContentBody = styled.div`
  padding: 2rem;
  flex-grow: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Blog Posts', path: '/admin/blogs' },
    { label: 'Tags', path: '/admin/tags' },
    { label: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <AdminContainer>
      <Sidebar>
        <Logo to="/admin/dashboard">Admin Panel</Logo>
        <NavLinks>
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              active={location.pathname === item.path}
            >
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavLinks>
        <div style={{ padding: '0 2rem' }}>
          <Button variant="outline" size="small" fullWidth onClick={handleLogout} style={{ borderColor: '#666', color: '#ccc' }}>
            Logout
          </Button>
        </div>
      </Sidebar>
      <MainContent>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Joe Scully</span>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#0070f3', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
              JS
            </div>
          </div>
        </TopBar>
        <ContentBody>
          <Outlet />
        </ContentBody>
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout;
