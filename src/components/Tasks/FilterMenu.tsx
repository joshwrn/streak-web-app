import { useState, useEffect } from 'react';

import { TaskProps } from './types';

import { MdOutlineSort } from 'react-icons/md';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'all' | 'incomplete' | 'completed';

const FilterMenu = ({
  setTasks,
  exampleTasks,
}: {
  setTasks: (arg: TaskProps[]) => void;
  exampleTasks: TaskProps[];
}) => {
  const [filter, setFilter] = useState<FilterTypes>('all');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (filter === 'all') {
      setTasks(exampleTasks);
    } else if (filter === 'completed') {
      setTasks(
        exampleTasks.filter((task: TaskProps) => task.completed === true)
      );
    } else if (filter === 'incomplete') {
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
      <Arrow
        onClick={() => setIsOpen((open: boolean) => (open ? false : true))}
        as={MdOutlineSort}
        size={30}
      />
      {isOpen && (
        <DropdownContainer
          key="dropdownContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DropdownItem onMouseDown={() => handleFilter('all')}>
            All
          </DropdownItem>
          <DropdownItem onMouseDown={() => handleFilter('incomplete')}>
            Incomplete
          </DropdownItem>
          <DropdownItem onMouseDown={() => handleFilter('completed')}>
            Completed
          </DropdownItem>
        </DropdownContainer>
      )}
    </AnimatePresence>
  );
};

const Arrow = styled.div`
  color: ${({ theme }) => theme.main.primaryText};
  cursor: pointer;
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
