import { useState, useEffect } from 'react';

import FilterMenu from './FilterMenu';
import CreateNewBar from './CreateTask';

import { IoCreateOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { TaskProps } from './types';

import { exampleTasks } from './exampleTasks';

const TasksBar = ({ setActive }: { setActive: (arg: number) => void }) => {
  const [tasks, setTasks] = useState<TaskProps[]>(exampleTasks);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const activeTotal = tasks.filter(
      (task: TaskProps) => task.completed === false
    ).length;
    setActive(activeTotal);
  }, [tasks]);

  return (
    <SidebarContainer>
      <Sidebar
        key="TaskContainer"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -500 }}
      >
        <HeaderContainer>
          <FilterMenu setTasks={setTasks} exampleTasks={exampleTasks} />
          <CreateButton
            onClick={() => setIsOpen(!isOpen)}
            as={IoCreateOutline}
            size={27}
          />
        </HeaderContainer>
        <AnimatePresence>
          {isOpen ? (
            <CreateNewBar
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              setTasks={setTasks}
            />
          ) : (
            <TasksContainer
              variants={containerVariants}
              initial={'closed'}
              animate={'open'}
              exit={'closed'}
            >
              {tasks.map((item: TaskProps, index) => {
                return (
                  <Task
                    key={index}
                    task={item.task}
                    completed={item.completed}
                    streak={item.streak}
                    setTasks={setTasks}
                  />
                );
              })}
            </TasksContainer>
          )}
        </AnimatePresence>
      </Sidebar>
    </SidebarContainer>
  );
};

interface TaskComponentProps extends TaskProps {
  setTasks: (arg: (prev: TaskProps[]) => TaskProps[]) => void;
}

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
      <Number onClick={handleComplete} completed={completed}>
        {streak}
      </Number>
      <TaskText completed={completed}>{task}</TaskText>
      <TaskBackground completed={completed} />
    </StyledTask>
  );
};

const CreateButton = styled.button`
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
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

const containerVariants = {
  open: {
    transition: { staggerChildren: 0.17 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 450px;
  height: 100vh;
`;

const Sidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.main.background};
  border: 1px solid ${({ theme }) => theme.main.border};
  border-radius: 0.5rem;

  width: 400px;
  height: 95vh;
  padding: 2rem;
  gap: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Number = styled.div<{ completed: TaskProps['completed'] }>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;

  font-size: 2rem;
  font-weight: bold;

  background-color: ${({ theme, completed }) =>
    completed ? theme.main.hover : theme.main.background};
  color: ${({ theme, completed }) =>
    completed ? theme.main.primaryText : theme.main.secondaryText};

  border-radius: 100%;
  width: 4.6rem;
  height: 4.6rem;

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
  display: grid;
  grid-template-columns: 50px 1fr;
  justify-items: center;
  align-content: center;
  align-items: center;
  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.main.border};
  color: ${({ theme }) => theme.main.primaryText};

  width: 100%;
  height: 8rem;
  border-radius: 0.8rem;
  padding: 2rem;

  cursor: pointer;

  transition: background-color 0.2s ease-in-out;

  /* &:hover {
    background-color: ${({ theme }) => theme.main.hover};
  } */
  /* &:hover ${Number} {
    background-color: ${({ theme }) => theme.main.background};
  } */
`;

const TaskBackground = styled.div<{ completed: TaskProps['completed'] }>`
  position: absolute;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.main.hover};
  border-radius: ${({ completed }) => (!completed ? '0' : '50%')};
  transform: ${({ completed }) =>
    !completed ? 'translateY(0)' : 'translateY(100px)'};

  transition: transform 0.9s ease-in-out, border-radius 0.5s ease-in-out;
`;

export default TasksBar;
