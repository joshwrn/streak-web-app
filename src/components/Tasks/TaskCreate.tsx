import { useState, useEffect } from 'react';

import { createStreak } from '../../slices/streakSlice';
import { setPage } from '../../slices/pageSlice';
import { useAppDispatch } from '../../app/hooks';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import PrimaryButton from '../reusable/PrimaryButton';
import PrimaryInput from '../reusable/PrimaryInput';

const CreateNewBar = () => {
  const [input, setInput] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDisabled(input.length < 3);
  }, [input]);

  const handleCreateNew = () => {
    dispatch(createStreak({ task: input, completed: false, streak: 0 }));
    dispatch(setPage('Tasks'));
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
        <Form onSubmit={handleCreateNew}>
          <PrimaryInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Streak Name"
            maxLength={15}
            minLength={3}
          />
          <PrimaryButton disabled={disabled} type="submit" buttonsize="large">
            Create
          </PrimaryButton>
        </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
`;

export default CreateNewBar;
