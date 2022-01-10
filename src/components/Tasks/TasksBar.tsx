import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import FilterMenu from './FilterMenu';
import Task from './TaskItem';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

const TasksBar = () => {
  const { setAllTasks, allTasks } = useAuth();
  const [filter, setFilter] = useState<FilterTypes>('Active');

  return (
    <InnerContainer
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: '100vh' }}
      exit={{ opacity: 0, x: '-100vh', position: 'absolute' }}
      transition={{
        opacity: { type: 'spring', damping: 15 },
        x: { type: 'spring', damping: 15 },
      }}
    >
      <FilterContainer>
        <FilterMenu filter={filter} setFilter={setFilter} />
      </FilterContainer>
      <AnimatePresence>
        {allTasks.map((item: TaskProps, index) => {
          if (filter === 'Active' && !item.completed) {
            return (
              <Task
                key={index}
                task={item.task}
                completed={item.completed}
                streak={item.streak}
                setTasks={setAllTasks}
                index={index}
              />
            );
          } else if (filter === 'Completed' && item.completed) {
            return (
              <Task
                key={index}
                task={item.task}
                completed={item.completed}
                streak={item.streak}
                setTasks={setAllTasks}
                index={index}
              />
            );
          }
        })}
      </AnimatePresence>
    </InnerContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 2rem;
  width: 100%;
  max-width: 500px;
  height: 100%;

  /* overflow-y: auto; */
  /* ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; */
`;

export default TasksBar;
