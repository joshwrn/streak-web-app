import React from 'react';

import { IoIosMenu } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const TopBar = () => {
  return (
    <Container>
      <MenuSection>
        <Avatar />
        <MenuText>Mia Chapman</MenuText>
      </MenuSection>
      <MenuButton
        as={IoIosMenu}
        size={40}
        onClick={() => console.log('menu')}
      />
    </Container>
  );
};

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuButton = styled.button`
  color: ${({ theme }) => theme.main.primaryText};
`;

const Avatar = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.main.primaryText};
  background-image: url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
  background-size: cover;
  background-position: center;
`;

const MenuText = styled.p`
  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.6rem;
  font-weight: bold;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6rem;

  z-index: 1;
  top: 0;
  display: flex;

  padding: 0 2rem;
`;

export default TopBar;
