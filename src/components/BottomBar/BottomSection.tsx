import { useState } from 'react';

import TasksBar from '../Tasks/TasksBar';
import Focus from '../Focus/Focus';
import { TaskProps } from '../Tasks/types';
import { exampleTasks } from '../Tasks/exampleTasks';

import styled from 'styled-components';

const BottomSection = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(exampleTasks);
  const [page, setPage] = useState('Tasks');
  return (
    <Container>
      <Header>
        <HeaderText>{page}</HeaderText>
        <NavContainer>
          <PageIcon
            active={page === 'Tasks' ? true : false}
            onClick={() => setPage('Tasks')}
          />
          <PageIcon
            active={page !== 'Tasks' ? true : false}
            onClick={() => setPage('Focus')}
          />
        </NavContainer>
      </Header>
      {page === 'Tasks' && <TasksBar tasks={tasks} setTasks={setTasks} />}
      {page === 'Focus' && <Focus />}
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 1.5rem;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.main.primaryText};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  gap: 0.5rem;
`;

const PageIcon = styled.div<{ active: boolean }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.main.secondaryText};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-color: ${({ theme }) => theme.main.primaryBackground};
  padding: 0 3rem;
`;

export default BottomSection;
