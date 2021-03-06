import React, { useState } from 'react';
import { StreakTypes } from '../../types/streakTypes';
import Food from './TaskFood';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import { incrementByAmount, decrementByAmount } from '../../slices/xpSlice';
import { setPage } from '../../slices/pageSlice';
import { markStreakAsCompleted } from '../../slices/streakSlice';
import { useAppDispatch } from '../../app/hooks';

interface TaskComponentProps extends StreakTypes {
  setActiveTask: (arg: string) => void;
  index: number;
}

const Task = ({
  task,
  completed,
  streak,
  setActiveTask,
  index,
}: TaskComponentProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const dispatch = useAppDispatch();

  const handleOpenTask = () => {
    dispatch(setPage('Stats'));
    setActiveTask(task);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
    dispatch(markStreakAsCompleted(task));

    // set total XP
    completed
      ? dispatch(decrementByAmount(streak))
      : dispatch(incrementByAmount(streak));
  };

  return (
    <StyledTask
      variants={variants}
      exit={'exit'}
      initial={'closed'}
      animate={'open'}
      whileTap={{ scale: 0.95 }}
      custom={index}
      layout={true}
      data-testid={task}
      onClick={handleOpenTask}
    >
      <StartContainer>
        <Food streak={streak} />
      </StartContainer>
      <TaskContainer>
        <TaskText completed={isCompleted}>{task}</TaskText>
      </TaskContainer>
      <EndContainer>
        <Number onClick={handleComplete} completed={isCompleted}>
          <NumberText>{streak}</NumberText>
        </Number>
      </EndContainer>
    </StyledTask>
  );
};

const StartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
`;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EndContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Number = styled.div<{ completed: StreakTypes['completed'] }>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.075);
  border-radius: 100%;

  width: 4rem;
  height: 4rem;

  transition: background-color 0.2s ease-in-out;
`;

const NumberText = styled.div`
  transform: translateY(0.2rem);
  font-size: 1.8rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.main.boldFont};
  color: ${({ theme }) => theme.task.text};
`;

const TaskText = styled.div<{ completed: StreakTypes['completed'] }>`
  position: relative;
  z-index: 1;

  font-size: 1.7rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ theme }) => theme.task.text};

  width: 100%;
  margin-left: 3.5rem;
`;

const StyledTask = styled(motion.div)`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  cursor: pointer;
  width: 100%;
  height: 7rem;
  border-radius: 1.6rem;
  border: 1px solid ${({ theme }) => theme.task.border};

  background: ${({ theme }) => theme.task.background};
`;

const variants = {
  open: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', damping: 15 },
      delay: index * 0.17 + 0.6,
    },
  }),
  closed: {
    y: 150,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  exit: {
    x: 150,
    opacity: 0,

    transition: {
      y: { stiffness: 1000 },
      delay: 0.3,
    },
  },
};

export default Task;
