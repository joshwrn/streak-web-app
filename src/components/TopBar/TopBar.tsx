import { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';

import { useAppSelector } from '../../app/hooks';

import { progressToNextLevel } from '../../utils/levelSystem';

import { IoIosMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentLevel, setCurrentLevel] = useState<number>(-1);
  const [currentProgress, setCurrentProgress] = useState<number>(-1);
  const [nextLevel, setNextLevel] = useState<number>(-1);
  const [percent, setPercent] = useState<number>(-1);

  const totalXP = useAppSelector((state) => state.totalXP.totalXP);
  const blurControl = useAnimation();

  useEffect(() => {
    const totals = progressToNextLevel(totalXP);

    setCurrentLevel(totals.currentLevel);
    setCurrentProgress(totals.currentProgress);
    setNextLevel(totals.pointsForNextLevel);
    setPercent(totals.percent);
  }, [totalXP]);

  useEffect(() => {
    blurControl.start('animate');
    setTimeout(() => {
      blurControl.start('stay');
    }, 1000);
  }, [percent]);

  return (
    <Container>
      {isMenuOpen ? (
        <CloseButton
          as={IoClose}
          size={33}
          onClick={() => setIsMenuOpen(false)}
        />
      ) : (
        <MenuButton
          as={IoIosMenu}
          size={40}
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      <AnimatePresence>{isMenuOpen && <Menu />}</AnimatePresence>
      <MenuSection>
        <StatContainer>
          <Level>Level {currentLevel}</Level>
          <Number>
            {currentProgress} / {nextLevel}
          </Number>
        </StatContainer>
        <LevelBarContainer>
          <ProgressBar
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            custom={percent}
          />
          <TotalBar />
          <BlurBar
            variants={blurVariants}
            initial={'initial'}
            animate={blurControl}
            custom={percent}
          />
          <TotalBlurBar />
        </LevelBarContainer>
      </MenuSection>
      <SettingsButton as={IoSettingsOutline} size={28} />
    </Container>
  );
};

const variants = {
  initial: {
    width: 0,
  },
  animate: (percent: number) => ({
    width: `${percent}%`,
    transition: {
      width: { type: 'spring', damping: 30 },
    },
  }),
};

const blurVariants = {
  initial: {
    opacity: 0.1,
    width: 0,
  },
  animate: (percent: number) => ({
    width: `${percent}%`,
    opacity: 0.5,
    transition: {
      opacity: { type: 'spring', damping: 30 },
      width: { type: 'spring', damping: 30 },
    },
  }),
  stay: (percent: number) => ({
    width: `${percent}%`,
    opacity: 0.1,
    transition: {
      opacity: { type: 'spring', damping: 30 },
      width: { type: 'spring', damping: 30 },
    },
  }),
};

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const Level = styled.p`
  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.2rem;
`;

const Number = styled.p`
  color: ${({ theme }) => theme.main.lightText};
  font-size: 1.2rem;
`;

const LevelBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
  height: 0.4rem;
  border-radius: 0.4rem;
  position: relative;
`;

const BlurBar = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme }) => theme.main.primaryText};
  height: 1rem;
  filter: blur(8px);
`;

const TotalBlurBar = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme }) => theme.main.primaryText};
  width: 100%;
  height: 1rem;
  opacity: 0.15;
  filter: blur(8px);
`;

const ProgressBar = styled(motion.div)`
  background-color: ${({ theme }) => theme.main.primaryText};
  height: 0.4rem;
  position: absolute;
  border-radius: 0.4rem;
`;

const TotalBar = styled.div`
  background-color: ${({ theme }) => theme.main.secondaryText};
  width: 100%;
  height: 0.4rem;
  opacity: 0.5;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  position: relative;
  z-index: 6;
`;

const MenuButton = styled(Button)`
  transform: scaleY(0.8);
  position: relative;
  z-index: 6;
`;

const SettingsButton = styled(Button)``;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8.5rem;

  z-index: 5;
  top: 0;
  display: flex;

  padding: 0 3.5rem;
`;

export default TopBar;
