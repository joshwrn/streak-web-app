import React, { useEffect } from 'react';

import { useAuth } from '../../context/AuthContext';

import PrimaryButton from '../reusable/PrimaryButton';

import trophy from '../../assets/3d-icons/trophy-gold.png';
import gift from '../../assets/3d-icons/gift-dynamic-gradient.png';
import medal from '../../assets/3d-icons/medal-dynamic-gradient.png';
import star from '../../assets/3d-icons/star-dynamic-gradient.png';

import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

interface Props {
  setLevelUp: (arg: boolean) => void;
  currentLevel: number;
}

const LevelUp = ({ setLevelUp, currentLevel }: Props) => {
  const { totalXP } = useAuth();
  const theme = useTheme();

  return (
    <Container
      key="LevelUp"
      variants={variants}
      initial={'initial'}
      animate={'animate'}
      exit={'exit'}
      // @ts-ignore
      custom={theme.task.background}
    >
      <InnerContainer>
        <HeaderContainer>
          <Header>Level Up!</Header>
          <SubHeader>Reached level {currentLevel}</SubHeader>
        </HeaderContainer>
        <Trophy variants={imageVariants} src={trophy} alt="trophy" />
        <Details variants={detailsVariants}>
          <Detail variants={detailVariants}>
            <DetailIcon src={gift} alt="gift" />
            <DetailText>3 Rewards</DetailText>
          </Detail>
          <Detail variants={detailVariants}>
            <DetailIcon src={star} alt="gift" />
            <DetailText>{totalXP} Total XP</DetailText>
          </Detail>
          <Detail variants={detailVariants}>
            <DetailIcon src={medal} alt="gift" />
            <DetailText>Level {currentLevel}</DetailText>
          </Detail>
        </Details>
        <ButtonContainer>
          <PrimaryButton name="Continue" onClick={() => setLevelUp(false)} />
        </ButtonContainer>
      </InnerContainer>
      <Gradient />
    </Container>
  );
};

const variants = {
  initial: (shadow: string) => ({
    scale: 0,
    borderRadius: '50%',
    height: '50vh',
    boxShadow: `0px 0px 5rem 10rem ${shadow}`,
    border: '10rem solid #de426b',
  }),
  animate: (shadow: string) => ({
    scale: 1,
    borderRadius: '0%',
    height: '100vh',
    boxShadow: `0px 0px 0px 0px ${shadow}`,
    border: '0px solid #de426b',
    transition: {
      scale: { duration: 0.35 },
      opacity: { duration: 0.35 },
      borderRadius: { type: 'spring', damping: 20, delay: 0.15 },
      height: { duration: 0.35, delay: 0.15 },
      boxShadow: { type: 'spring', damping: 20, delay: 0.35 },
      border: { duration: 0.2, delay: 0.2 },
    },
  }),
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      y: { duration: 0.35 },
      opacity: { duration: 0.2, delay: 0.4 },
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 1.2,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.35, delay: 0.45 },
      scale: { type: 'spring', damping: 7, delay: 0.45 },
    },
  },
  exit: {
    opacity: 0,
  },
};

const detailsVariants = {
  initial: {
    transition: {
      when: 'beforeChildren',
    },
  },
  animate: {
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
  exit: {
    transition: {
      when: 'beforeChildren',
    },
  },
};

const detailVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: 'spring', stiffness: 200, damping: 15 },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      y: { duration: 0.7 },
      opacity: { duration: 0.5 },
    },
  },
};

const Container = styled(motion.div)`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.main.background};
  z-index: 10;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8.7rem 0;
  gap: 8rem;
`;

const Gradient = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.main.gradient};
  width: 125%;
  height: 50vh;
  top: 10rem;
  z-index: -1;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0.83;
`;

const Header = styled.h1`
  font-size: 4.8rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.main.boldFont};
  color: ${({ theme }) => theme.main.primaryText};
`;

const SubHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.main.boldFont};
  color: ${({ theme }) => theme.main.primaryText};
`;

const Trophy = styled(motion.img)`
  /* mix-blend-mode: screen; */
`;

const Details = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const Detail = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailIcon = styled.img`
  mix-blend-mode: screen;
`;

const DetailText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.main.lightText};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 100%;
`;

const ContinueButton = styled(motion.button)`
  background: ${({ theme }) => theme.main.button};
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.main.borderRadius};
  border: none;
  color: ${({ theme }) => theme.main.primaryText};
  width: 215px;
  height: 53px;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.main.boldFont};
  cursor: pointer;
`;

export default LevelUp;
