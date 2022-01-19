import { useState, useEffect } from 'react';
import { TaskProps } from './types';
import Food from './TaskFood';
import { useAuth } from '../../context/AuthContext';

import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TaskComponentProps extends TaskProps {
  setTasks: (arg: (prev: TaskProps[]) => TaskProps[]) => void;
  setPage: (arg: string) => void;
  setActiveTask: (arg: string) => void;
  index: number;
}

const Task = ({
  task,
  completed,
  streak,
  setTasks,
  setPage,
  setActiveTask,
  index,
}: TaskComponentProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { setTotalXP } = useAuth();

  const handleOpenTask = () => {
    setPage('Stats');
    setActiveTask(task);
  };

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    setTasks((prev: TaskProps[]) => {
      return prev.map((item: TaskProps) => {
        if (item.task === task) {
          return {
            ...item,
            completed: !item.completed,
            streak: item.completed ? item.streak - 1 : item.streak + 1,
          };
        }
        return item;
      });
    });
    // set total XP
    setTotalXP((prev: number) =>
      completed ? prev - streak : prev + streak + 1
    );
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
    >
      <StartContainer>
        <Food streak={streak} />
      </StartContainer>
      <TaskContainer onClick={handleOpenTask}>
        <TaskText completed={isCompleted}>{task}</TaskText>
      </TaskContainer>
      {/* <CheckIcon
        onClick={handleComplete}
        as={isCompleted ? FiCheckCircle : FiCircle}
        size={25}
      /> */}
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
  cursor: pointer;
`;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const EndContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  cursor: pointer;
`;

const CheckIcon = styled.div`
  color: ${({ theme }) => theme.task.text};
  /* margin-right: 2.5rem; */
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

const Number = styled.div<{ completed: TaskProps['completed'] }>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.075);
  border-radius: 100%;
  /* border: 2px solid rgba(255, 255, 255, 0.034); */

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

const TaskText = styled.div<{ completed: TaskProps['completed'] }>`
  position: relative;
  z-index: 1;

  font-size: 1.7rem;
  /* font-weight: bold; */
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ theme }) => theme.task.text};
  /* font-family: ${({ theme }) => theme.main.boldFont}; */

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
