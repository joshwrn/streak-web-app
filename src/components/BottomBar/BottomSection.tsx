import { useState } from 'react';

import TasksBar from '../Tasks/TasksBar';
import Focus from '../Focus/Focus';

import { AnimatePresence, motion } from 'framer-motion';

import styled from 'styled-components';

const BottomSection = () => {
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
      <Content>
        <AnimatePresence initial={false}>
          {page === 'Tasks' && <TasksBar key={1} />}
          {page === 'Focus' && <Focus key={2} />}
        </AnimatePresence>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

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
  cursor: pointer;
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
