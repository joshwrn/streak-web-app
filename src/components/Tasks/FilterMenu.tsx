import { useState, useEffect } from 'react';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'All' | 'Active' | 'Completed';

const FilterMenu = ({
  setTasks,
  exampleTasks,
}: {
  setTasks: (arg: TaskProps[]) => void;
  exampleTasks: TaskProps[];
}) => {
  const [filter, setFilter] = useState<FilterTypes>('All');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (filter === 'All') {
      setTasks(exampleTasks);
    } else if (filter === 'Completed') {
      setTasks(
        exampleTasks.filter((task: TaskProps) => task.completed === true)
      );
    } else if (filter === 'Active') {
      setTasks(
        exampleTasks.filter((task: TaskProps) => task.completed === false)
      );
    }
  }, [filter]);

  const handleFilter = (selectedFilter: FilterTypes) => {
    setFilter(selectedFilter);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      <HeaderContainer
        onClick={() => setIsOpen((open: boolean) => (open ? false : true))}
      >
        Sort: {filter}
      </HeaderContainer>
      {isOpen && (
        <DropdownContainer
          key="dropdownContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DropdownItem onMouseDown={() => handleFilter('All')}>
            All
          </DropdownItem>
          <DropdownItem onMouseDown={() => handleFilter('Active')}>
            Active
          </DropdownItem>
          <DropdownItem onMouseDown={() => handleFilter('Completed')}>
            Completed
          </DropdownItem>
        </DropdownContainer>
      )}
    </AnimatePresence>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
  font-weight: bold;
  font-size: 1.9rem;
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: fit-content;
  background: ${({ theme }) => theme.main.background};
  border: 1px solid ${({ theme }) => theme.main.border};
  border-radius: 0.5rem;
  padding: 0.5rem;
  transform: translateY(80px);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.main.primaryText};
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.main.hover};
  }
`;

export default FilterMenu;
