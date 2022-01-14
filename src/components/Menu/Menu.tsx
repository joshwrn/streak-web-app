import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    width: 0,
  },
  animate: {
    width: '30rem',
  },
};

const Menu = () => {
  return (
    <Container
      variants={variants}
      animate="animate"
      initial="initial"
      exit="initial"
    >
      <TopSection></TopSection>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100vh;
  width: 30rem;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: ${({ theme }) => theme.main.background};
  box-shadow: 1rem 0rem 2rem rgba(0, 0, 0, 0.5);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Menu;
