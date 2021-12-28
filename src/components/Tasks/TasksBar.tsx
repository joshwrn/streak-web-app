import { useState, useEffect } from 'react';

import FilterMenu from './FilterMenu';

import { IoCreateOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { TaskProps } from './types';

const exampleTasks: TaskProps[] = [
  {
    task: 'Go to the gym',
    completed: true,
    importance: 'LOW',
    streak: 1,
  },
  {
    task: 'read a book',
    completed: false,
    importance: 'HIGH',
    streak: 5,
  },
  {
    task: 'walk the dog',
    completed: false,
    importance: 'MEDIUM',
    streak: 0,
  },
];

const CreateNewBar = ({
  setIsOpen,
  isOpen,
  setTasks,
}: {
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
  // takes in a function technically because i'm accesssing prev state
  setTasks: (arg: (prev: TaskProps[]) => TaskProps[]) => void;
}) => {
  const [input, setInput] = useState<string>('');
  const handleCreateNew = () => {
    setTasks((prev: TaskProps[]) => {
      return [
        ...prev,
        {
          task: input,
          completed: false,
          importance: 'LOW',
          streak: 0,
        },
      ];
    });
    setIsOpen(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <TasksContainer
          key="createNewTaskContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header>Create New Streak</Header>
          <StyledInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <CreateTaskButton onClick={handleCreateNew}>Create</CreateTaskButton>
        </TasksContainer>
      )}
    </AnimatePresence>
  );
};

const TasksBar = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(exampleTasks);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sidebar>
      <HeaderContainer>
        <Header>
          Tasks
          <FilterMenu setTasks={setTasks} exampleTasks={exampleTasks} />
        </Header>
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
                  importance={item.importance}
                  streak={item.streak}
                />
              );
            })}
          </TasksContainer>
        )}
      </AnimatePresence>
    </Sidebar>
  );
};

const CreateButton = styled.button`
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.main.primaryText};
`;

const CreateTaskButton = styled.button`
  align-self: flex-start;
  width: 100%;
  height: 30px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.main.background};
  border: 1px solid ${({ theme }) => theme.main.border};
  font-size: 1.6rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.main.primaryText};
  &:hover {
    background-color: ${({ theme }) => theme.main.hover};
  }
`;

const Task = ({ task, completed, importance, streak }: TaskProps) => {
  return (
    <StyledTask variants={variants} importance={importance}>
      <Number completed={completed}>{streak}</Number>
      {task}
    </StyledTask>
  );
};

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
    transition: { staggerChildren: 0.57, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.main.background};
  border-right: 1px solid ${({ theme }) => theme.main.border};

  width: 500px;
  height: 100vh;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.main.primaryText};
  align-self: flex-start;
  font-size: 2.5rem;
  font-weight: bold;
`;

const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
`;

const Number = styled.div<{ completed: TaskProps['completed'] }>`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;

  font-size: 2rem;
  font-weight: bold;

  background-color: ${({ theme }) => theme.main.hover};
  color: ${({ theme, completed }) =>
    completed ? theme.main.primaryText : theme.main.secondaryText};

  border-radius: 100%;
  width: 4.6rem;
  height: 4.6rem;

  transition: background-color 0.2s ease-in-out;
`;

const StyledTask = styled(motion.div)<{ importance: TaskProps['importance'] }>`
  display: grid;
  grid-template-columns: 50px 1fr;
  justify-items: center;
  align-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.main.border};
  color: ${({ theme }) => theme.main.primaryText};

  width: 100%;
  height: 10rem;
  border-radius: 0.8rem;
  padding: 2rem;

  cursor: pointer;

  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.main.hover};
  }
  &:hover ${Number} {
    background-color: ${({ theme }) => theme.main.background};
  }
`;

export default TasksBar;
