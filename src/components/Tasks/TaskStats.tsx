import { useState, useEffect } from 'react';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import donut from '../../assets/food/donutSprinkles_NE.png';
import { useAppSelector } from '../../app/hooks';

const placeholder = {
  task: '',
  completed: false,
  streak: 0,
};

interface TaskInfoTypes {
  activeTask: string;
}

const TaskStats = ({ activeTask }: TaskInfoTypes) => {
  const [currentTask, setCurrentTask] = useState<TaskProps>(placeholder);
  const [calendar, setCalendar] = useState<string[]>([]);
  const allTasks = useAppSelector((state) => state.tasks.tasks);

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
      <InfoContainer>
        <Food src={donut} />
        {/* <TaskStatsFood /> */}
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

const Container = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  font-family: ${({ theme }) => theme.main.boldFont};
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
  align-items: center;
  margin-top: 2.4rem;
  width: 100%;
  gap: 1rem;
`;

const CalendarHeader = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.main.lightText};
  align-self: flex-start;
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  max-width: 40rem;
  height: 18rem;
  padding: 1.5rem 2rem;
  gap: 0.4rem;

  background-color: ${({ theme }) => theme.calendar.background};
  border-radius: 0.8rem;
`;

const CalendarCell = styled(motion.div)<{ completed: string }>`
  width: 18px;
  height: 18px;
  border-radius: 0.4rem;
  background-color: ${({ theme, completed }) =>
    completed === 'true' ? theme.calendar.completedCell : theme.calendar.cell};
`;

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

export default TaskStats;
