import React from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const BottomBar = ({
  setIsSidebarOpen,
  active,
}: {
  setIsSidebarOpen: (arg: (prev: boolean) => boolean) => void;
  active: number;
}) => {
  return (
    <BarContainer>
      <TasksButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <TasksBadge>{active}</TasksBadge>
        Tasks
      </TasksButton>
      <CreateButton>
        <AddIcon as={IoAddCircleOutline} size={30} />
      </CreateButton>
      <TasksButton>Stats</TasksButton>
    </BarContainer>
  );
};

const BarContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;

  display: flex;
  align-items: center;
  gap: 50px;
  justify-content: center;

  z-index: 1;
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.main.primaryText};
  background-color: ${({ theme }) => theme.main.background};
  border: 1px solid ${({ theme }) => theme.main.border};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.main.hover};
  }
`;

const AddIcon = styled(motion.svg)`
  color: ${({ theme }) => theme.main.primaryText};
`;

const CreateButton = styled(Button)`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;

const TasksButton = styled(Button)`
  width: 100px;
  height: 50px;
  border-radius: 5rem;
  font-size: 1.5rem;
`;

const TasksBadge = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  background: rgb(255, 0, 98);
  color: white;
  font-size: 1.4rem;
  border-radius: 100%;
  transform: translate(45px, -14px);
  cursor: pointer;
`;

export default BottomBar;
