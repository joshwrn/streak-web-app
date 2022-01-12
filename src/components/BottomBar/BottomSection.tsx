import { useState } from 'react';

import TasksBar from '../Tasks/TasksBar';
import Focus from '../Focus/Focus';

import { AnimatePresence } from 'framer-motion';

import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import FilterMenu from '../Tasks/FilterMenu';

import styled from 'styled-components';

type FilterTypes = 'Active' | 'Completed';

const BottomSection = () => {
  const [page, setPage] = useState('Tasks');
  const [filter, setFilter] = useState<FilterTypes>('Active');
  return (
    <Container>
      <Header>
        {page === 'Stats' && (
          <Arrow size={30} onClick={() => setPage('Tasks')} />
        )}
        {page === 'Tasks' && (
          <FilterContainer>
            <FilterMenu filter={filter} setFilter={setFilter} />
          </FilterContainer>
        )}
        <HeaderCenter>
          <HeaderText>{page}</HeaderText>
          <NavContainer>
            <PageIcon
              active={page === 'Tasks' || page === 'Stats' ? true : false}
              onClick={() => setPage('Tasks')}
            />
            <PageIcon
              active={page === 'Focus' ? true : false}
              onClick={() => setPage('Focus')}
            />
          </NavContainer>
        </HeaderCenter>
      </Header>
      <Content>
        <AnimatePresence initial={false}>
          {(page === 'Tasks' || page === 'Stats') && (
            <TasksBar key={1} setPage={setPage} page={page} filter={filter} />
          )}
          {page === 'Focus' && <Focus key={2} />}
        </AnimatePresence>
      </Content>
    </Container>
  );
};
const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  z-index: 3;
  background: ${({ theme }) => theme.main.background};
`;

const Arrow = styled(HiOutlineArrowNarrowLeft)`
  color: ${({ theme }) => theme.main.primaryText};
  margin-left: 1rem;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding-bottom: 1.5rem;
`;

const HeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 2 / 3;
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
