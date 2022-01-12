import { useState, useEffect } from 'react';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

const FilterMenu = ({
  setFilter,
  filter,
}: {
  setFilter: (arg: FilterTypes) => void;
  filter: FilterTypes;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFilter = (selectedFilter: FilterTypes) => {
    setFilter(selectedFilter);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      <HeaderContainer
        onClick={() => setIsOpen((open: boolean) => (open ? false : true))}
      >
        {filter}
      </HeaderContainer>
      {isOpen && (
        <DropdownContainer
          key="dropdownContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
  color: ${({ theme }) => theme.main.lightText};
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  height: 2rem;
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: fit-content;
  background: ${({ theme }) => theme.task.primary};
  backdrop-filter: blur(5px);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem;
  transform: translateY(30px);
  z-index: 3;
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
