import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

interface NavLinksProps {
  isOpen: boolean;
}

const NavLinks = styled.div<NavLinksProps>`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    padding: 1rem 0;
    height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
    overflow: hidden;
    transition: height 0.3s ease;
  }
`;

interface NavLinkProps {
  active: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  margin-left: 2rem;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? '600' : '400'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 1rem 0;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <Nav>
      <Logo to="/">Joe Scully</Logo>
      <MenuIcon onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </MenuIcon>
      <NavLinks isOpen={isOpen}>
        <NavLink to="/" active={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/about" active={location.pathname === '/about'}>
          About
        </NavLink>
        <NavLink to="/blog" active={location.pathname === '/blog'}>
          Blog
        </NavLink>
        <NavLink to="/projects" active={location.pathname === '/projects'}>
          Projects
        </NavLink>
        <NavLink to="/contact" active={location.pathname === '/contact'}>
          Contact
        </NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;