import { useState } from 'react';

import { setPage, pageTypes } from '../../slices/pageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import TasksBar from '../Tasks/TasksBar';
import Focus from '../Focus/Focus';
import CreateNewBar from '../Tasks/TaskCreate';
import FilterMenu from './FilterMenu';
import EditMenu from './EditMenu';

import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { IoCreateOutline } from 'react-icons/io5';

import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

const Center = () => {
  const page = useAppSelector((state) => state.page.page);
  const dispatch = useAppDispatch();

  const handlePageChange = (selectedPage: pageTypes) => {
    dispatch(setPage(selectedPage));
  };

  return (
    <HeaderCenter>
      <HeaderText>{page}</HeaderText>
      <NavContainer>
        <PageIcon
          active={
            page === 'Tasks' || page === 'Stats' || page === 'Create'
              ? true
              : false
          }
          onClick={() => handlePageChange('Tasks')}
        />
        <PageIcon
          active={page === 'Focus' ? true : false}
          onClick={() => handlePageChange('Focus')}
        />
      </NavContainer>
    </HeaderCenter>
  );
};

const BottomSection = () => {
  const [filter, setFilter] = useState<FilterTypes>('Active');

  const page = useAppSelector((state) => state.page.page);
  const dispatch = useAppDispatch();

  const handlePageChange = (selectedPage: pageTypes) => {
    dispatch(setPage(selectedPage));
  };

  return (
    <Container>
      <AnimatePresence initial={false} exitBeforeEnter>
        {page !== 'Focus' && (
          <Header
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="Tasks"
            custom={page}
          >
            {(page === 'Stats' || page === 'Create') && (
              <Arrow size={30} onClick={() => handlePageChange('Tasks')} />
            )}
            {page === 'Tasks' && (
              <FilterContainer>
                <FilterMenu filter={filter} setFilter={setFilter} />
              </FilterContainer>
            )}
            <Center />
            <HeaderRight>
              {page === 'Tasks' && (
                <CreateIcon
                  data-testid="createNewBtn"
                  as={IoCreateOutline}
                  size={28}
                  onClick={() => handlePageChange('Create')}
                />
              )}
              {page === 'Stats' && <EditMenu />}
            </HeaderRight>
          </Header>
        )}
        {page === 'Focus' && (
          <Header
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="Focus"
            custom={page}
          >
            <Center />
          </Header>
        )}
      </AnimatePresence>
      <Content>
        {(page === 'Tasks' || page === 'Stats') && (
          <TasksBar key={1} filter={filter} />
        )}
        {page === 'Focus' && <Focus key={2} />}
        {page === 'Create' && <CreateNewBar key={3} />}
      </Content>
    </Container>
  );
};

const headerVariants = {
  initial: (page: string) => ({
    opacity: 0,
    x: page === 'Focus' ? '50vw' : '-50vw',
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring', damping: 15 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (page: string) => ({
    opacity: 0,
    x: page === 'Focus' ? '50vw' : '-50vw',
    transition: {
      duration: 0.1,
    },
  }),
};

const Container = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  padding: 0 3rem;
  max-height: ${({ theme }) => theme.main.maxHeight};
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Header = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding-bottom: 1.5rem;
  position: relative;
  z-index: 4;
`;

const HeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 2 / 3;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const CreateIcon = styled.p`
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
`;

const Arrow = styled(HiOutlineArrowNarrowLeft)`
  color: ${({ theme }) => theme.main.primaryText};
  margin-left: 1rem;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.main.boldFont};
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

export default BottomSection;
