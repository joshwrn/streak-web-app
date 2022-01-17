import React from 'react';

import cake from '../../assets/food/cake.png';
import PrimaryButton from '../reusable/PrimaryButton';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Focus = () => {
  return (
    <Container
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: '100vh' }}
      exit={{ opacity: 0, x: '-100vh', position: 'absolute' }}
      transition={{
        opacity: { type: 'spring', damping: 15 },
        x: { type: 'spring', damping: 15 },
      }}
    >
      <DialContainer>
        <DialBackground />
        <DialBorder />
        <ImageContainer>
          <img src={cake} alt="cake" />
          <Time>25:00</Time>
        </ImageContainer>
      </DialContainer>
      <PrimaryButton name="Start" onClick={() => {}} />
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 4rem;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 215px;
  height: 215px;
`;

const Time = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-weight: bold;
`;

const DialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 215px;
  margin-top: 1rem;
`;

const DialBackground = styled.div`
  width: 204px;
  height: 204px;
  border-radius: 50%;
  background: linear-gradient(218.42deg, #262867 17.02%, #c04781 85.18%);
`;

const DialBorder = styled.div`
  width: 215px;
  height: 215px;
  border-radius: 50%;
  background: #de426b;
  position: absolute;
  z-index: -1;
`;

export default Focus;
