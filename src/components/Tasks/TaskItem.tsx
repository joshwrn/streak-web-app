import { useState } from 'react';
import { TaskProps } from './types';
import Food from './Food';
import { useAuth } from '../../context/AuthContext';

import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Task = ({
  task,
  completed,
  streak,
  setTasks,
  index,
}: TaskComponentProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { setTotalXP } = useAuth();

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    setTasks((prev: TaskProps[]) => {
      return prev.map((item: TaskProps) => {
        if (item.task === task) {
          console.log(item.task, task);
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
      custom={index}
      layout={true}
    >
      <TaskContainer>
        <Number completed={isCompleted}>{streak}</Number>
        <Food streak={streak} />
        <TaskText completed={isCompleted}>{task}</TaskText>
      </TaskContainer>
      <CheckIcon
        onClick={handleComplete}
        as={isCompleted ? FiCheckCircle : FiCircle}
        size={25}
      />
    </StyledTask>
  );
};

interface TaskComponentProps extends TaskProps {
  setTasks: (arg: (prev: TaskProps[]) => TaskProps[]) => void;
  index: number;
}

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.div`
  color: ${({ theme }) => theme.main.primaryText};
  margin-right: 2.5rem;
  position: relative;
  z-index: 1;
`;
const Number = styled.div<{ completed: TaskProps['completed'] }>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: bold;
  font-family: Epilogue-Bold;

  border-radius: 100%;
  width: 7rem;

  transition: background-color 0.2s ease-in-out;
`;

const TaskText = styled.div<{ completed: TaskProps['completed'] }>`
  position: relative;
  z-index: 1;

  font-size: 1.7rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};

  color: ${({ theme, completed }) =>
    completed ? theme.main.secondaryText : theme.main.primaryText};
`;

const StyledTask = styled(motion.div)`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.main.primaryText};

  width: 100%;
  height: 7rem;
  border-radius: 0.8rem;
  overflow: hidden;

  cursor: pointer;

  background: ${({ theme }) => theme.task.gradient};
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
