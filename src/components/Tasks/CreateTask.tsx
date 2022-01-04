import { useState } from 'react';
import { TaskProps } from './types';

import Sidebar from '../reusable/Sidebar';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CreateNewBar = ({
  setSidebarType,
  setTasks,
}: {
  // takes in a function technically because i'm accesssing prev state
  setSidebarType: (arg: string) => void;
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
    setSidebarType('none');
  };
  return (
    <Sidebar>
      <AnimatePresence>
        <InnerContainer
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
        </InnerContainer>
      </AnimatePresence>
    </Sidebar>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.main.primaryText};
  align-self: flex-start;
  font-size: 2.5rem;
  font-weight: bold;
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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

export default CreateNewBar;
