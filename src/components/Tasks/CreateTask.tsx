import { useState } from 'react';
import { TaskProps } from './types';

import { useAuth } from '../../context/AuthContext';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CreateNewBar = ({ setPage }: { setPage: (arg: string) => void }) => {
  const [input, setInput] = useState<string>('');
  const { setAllTasks } = useAuth();

  const handleCreateNew = () => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 3) return;

    setAllTasks((prev: TaskProps[]) => {
      return [
        ...prev,
        {
          task: trimmedInput,
          completed: false,
          streak: 0,
        },
      ];
    });
    setPage('Tasks');
  };

  return (
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
          placeholder="Streak Name"
          maxLength={15}
          minLength={3}
        />
        <CreateTaskButton onClick={handleCreateNew}>Create</CreateTaskButton>
      </InnerContainer>
    </AnimatePresence>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-family: ${({ theme }) => theme.main.boldFont};
  align-self: flex-start;
  font-size: 1.9rem;
  font-weight: bold;
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding: 2rem 0;
  width: 100%;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 5rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.8rem;
  padding-left: 2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.main.secondaryBackground};
  border: 0.1rem solid ${({ theme }) => theme.main.border};
  ::placeholder {
    color: #f4eeff68;
  }
`;

const CreateTaskButton = styled.button`
  align-self: flex-start;
  width: 100%;
  height: 5rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.task.background};
  border: 0.1rem solid ${({ theme }) => theme.main.border};
  font-size: 2rem;
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.main.primaryText};
  font-family: ${({ theme }) => theme.main.boldFont};
`;

export default CreateNewBar;
