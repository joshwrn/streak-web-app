import { IoIosMenu } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const TopBar = () => {
  const { currentLevel, nextLevel, percent, currentProgress } = useAuth();
  return (
    <Container>
      <MenuButton as={IoIosMenu} size={40} />
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
        </LevelBarContainer>
      </MenuSection>
      <SettingsButton as={IoSettingsOutline} size={28} />
    </Container>
  );
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
  color: ${({ theme }) => theme.main.primaryText};
  opacity: 0.5;
  font-size: 1.2rem;
`;

const LevelBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
  height: 0.4rem;
  overflow: hidden;
  border-radius: 0.4rem;
  position: relative;
`;

const ProgressBar = styled(motion.div)`
  background-color: ${({ theme }) => theme.main.primaryText};
  height: 0.4rem;
  position: absolute;
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
`;

const MenuButton = styled(Button)`
  transform: scaleY(0.8);
`;

const SettingsButton = styled(Button)``;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8.5rem;

  z-index: 1;
  top: 0;
  display: flex;

  padding: 0 3.5rem;
`;

export default TopBar;
