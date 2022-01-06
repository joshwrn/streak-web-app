import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const BottomSection = () => {
  return (
    <Container>
      <Header>
        <HeaderText>Focus</HeaderText>
        <NavContainer>
          <PageIcon active={false} />
          <PageIcon active={true} />
        </NavContainer>
      </Header>
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7rem;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.main.primaryText};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  gap: 0.5rem;
`;

const PageIcon = styled.div<{ active: boolean }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.main.secondaryText};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-color: ${({ theme }) => theme.main.secondaryBackground};
  /* border: 1px solid ${({ theme }) => theme.main.border}; */
  /* border-radius: 2rem 2rem 0 0; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
`;

export default BottomSection;
