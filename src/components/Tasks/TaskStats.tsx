import { useState, useEffect } from 'react';

import { TaskProps } from './types';
import { useAuth } from '../../context/AuthContext';

import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import donut from '../../assets/food/donutSprinkles_NE.png';

const placeholder = {
  task: '',
  completed: false,
  streak: 0,
};

interface TaskInfo {
  activeTask: string;
  setPage: (arg: string) => void;
}

const TaskStats = ({ activeTask, setPage }: TaskInfo) => {
  const [currentTask, setCurrentTask] = useState<TaskProps>(placeholder);
  const [calendar, setCalendar] = useState<string[]>([]);
  const { allTasks } = useAuth();

  useEffect(() => {
    if (calendar.length === 0) {
      const arr = [];
      for (let i = 0; i < 91; i++) {
        const random = Math.floor(Math.random() * 3);
        if (random === 0) {
          arr.push('false');
        } else {
          arr.push('true');
        }
      }
      setCalendar(arr);
    }
  }, []);

  useEffect(() => {
    const task = allTasks.find((item) => item.task === activeTask);
    if (task) {
      setCurrentTask(task);
    }
  }, [activeTask]);

  return (
    <Container
      variants={variants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <Back onClick={() => setPage('allTasks')}>
        <Arrow size={30} />
        Back To Tasks
      </Back>
      <InfoContainer>
        <Food src={donut} />
        <TaskInfo>
          <TaskHeader>{currentTask.task}</TaskHeader>
          <StreakRow>
            <StreakNumber>{currentTask.streak}</StreakNumber>
            <StreakText>Streak</StreakText>
          </StreakRow>
          <StreakRow>
            <StreakNumber>7</StreakNumber>
            <StreakText>Highest Streak</StreakText>
          </StreakRow>
        </TaskInfo>
      </InfoContainer>
      {/* Calendar */}
      <CalendarContainer>
        <CalendarHeader>Past 3 Months</CalendarHeader>
        <Calendar>
          {calendar.map((item, index) => {
            return (
              <CalendarCell
                variants={cellVariants}
                initial="initial"
                animate="animate"
                custom={index}
                key={index}
                completed={item}
              />
            );
          })}
        </Calendar>
      </CalendarContainer>
    </Container>
  );
};

const cellVariants = {
  initial: {
    opacity: 0,
    transform: 'scale(.5)',
    transition: {
      opacity: { stiffness: 1000 },
      transform: { type: 'spring', damping: 15 },
    },
  },
  animate: (index: number) => ({
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      opacity: { stiffness: 1000 },
      transform: { type: 'spring', damping: 15 },
      delay: index * 0.005 + 0.2,
    },
  }),
};

const variants = {
  initial: {
    opacity: 0,
    transform: 'scale(0)',
    transition: {
      opacity: { stiffness: 1000 },
      transform: { type: 'spring', damping: 15 },
    },
  },
  animate: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      opacity: { stiffness: 1000 },
      transform: { type: 'spring', damping: 15 },
    },
  },
  exit: {
    opacity: 0,
    transform: 'scale(0)',
    transition: {
      opacity: { stiffness: 1000 },
      transform: { type: 'spring', damping: 15 },
    },
  },
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Arrow = styled(HiOutlineArrowNarrowLeft)`
  color: ${({ theme }) => theme.main.primaryText};
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.main.lightText};
  height: 2rem;
`;

// Info

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2.4rem;
`;

const TaskHeader = styled.h1`
  font-size: 2.6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.main.primaryText};
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8rem;
`;

const Food = styled.img`
  width: 13rem;
  height: 7.4rem;
  position: relative;
  overflow: hidden;
  object-fit: contain;
`;

const StreakRow = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: 1.5rem;
`;

const StreakText = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.main.lightText};
`;

const StreakNumber = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.main.primaryText};
`;

// Calendar

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  width: 100%;
  gap: 1rem;
`;

const CalendarHeader = styled.h3`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.main.lightText};
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;

  width: 100%;
  height: 18rem;
  padding: 1.5rem 2.5rem;
  gap: 0.4rem;

  background-color: #190b41;
  border-radius: 0.8rem;
`;

const CalendarCell = styled(motion.div)<{ completed: string }>`
  width: 18px;
  height: 18px;
  border-radius: 0.4rem;
  background-color: ${({ theme, completed }) =>
    completed === 'true' ? theme.calendar.completedCell : theme.calendar.cell};
`;

export default TaskStats;
