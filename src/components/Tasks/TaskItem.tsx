import { TaskProps } from './types';
import Food from './Food';

import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Task = ({ task, completed, streak, setTasks }: TaskComponentProps) => {
  const handleComplete = () => {
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
  };

  return (
    <StyledTask variants={variants}>
      <TaskContainer>
        <Number completed={completed}>{streak}</Number>
        <Food streak={streak} />
        <TaskText completed={completed}>{task}</TaskText>
      </TaskContainer>
      <CheckIcon
        onClick={handleComplete}
        as={completed ? FiCheckCircle : FiCircle}
        size={23}
      />
      <TaskBackground completed={completed} />
    </StyledTask>
  );
};

interface TaskComponentProps extends TaskProps {
  setTasks: (arg: (prev: TaskProps[]) => TaskProps[]) => void;
}

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.div`
  color: ${({ theme }) => theme.main.primaryText};
  margin-right: 2rem;
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

  border-radius: 100%;
  width: 7rem;
  margin: 0 0 0 0;

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

  background: linear-gradient(267.7deg, #4d2482 0%, #242782 96.4%);
`;

const TaskBackground = styled.div<{ completed: TaskProps['completed'] }>`
  position: absolute;
  z-index: 0;
  display: block;
  width: 100%;
  pointer-events: none;
  height: 100%;
  background-color: ${({ theme }) => theme.main.hover};
  border-radius: ${({ completed }) => (completed ? '0' : '50%')};
  transform: ${({ completed }) =>
    completed ? 'translateY(0)' : 'translateY(100px)'};

  transition: transform 0.9s ease-in-out, border-radius 0.5s ease-in-out;
`;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', damping: 15 },
    },
  },
  closed: {
    y: 150,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default Task;
