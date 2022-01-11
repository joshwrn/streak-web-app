import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import FilterMenu from './FilterMenu';
import Task from './TaskItem';
import TaskStats from './TaskStats';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';
type PageTypes = 'allTasks' | 'taskItem';

const TasksBar = () => {
  const { setAllTasks, allTasks } = useAuth();
  const [filter, setFilter] = useState<FilterTypes>('Active');
  const [page, setPage] = useState<string>('allTasks');
  const [activeTask, setActiveTask] = useState<string>('');

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
      <AnimatePresence>
        {/* TASK STATS */}
        {page === 'taskItem' ? (
          <TaskStats activeTask={activeTask} setPage={setPage} />
        ) : (
          <>
            <FilterContainer>
              <FilterMenu filter={filter} setFilter={setFilter} />
            </FilterContainer>

            {allTasks.map((item: TaskProps, index: number) => {
              const taskItem = (
                <Task
                  key={index}
                  task={item.task}
                  completed={item.completed}
                  streak={item.streak}
                  setTasks={setAllTasks}
                  setPage={setPage}
                  setActiveTask={setActiveTask}
                  index={index}
                />
              );
              if (filter === 'Active' && !item.completed) {
                return taskItem;
              } else if (filter === 'Completed' && item.completed) {
                return taskItem;
              }
            })}

            {filter === 'Active' &&
            allTasks.filter((item: TaskProps) => !item.completed).length ===
              0 ? (
              <NoTask>No Active Streaks 😃</NoTask>
            ) : (
              filter === 'Completed' &&
              allTasks.filter((item: TaskProps) => item.completed).length ===
                0 && <NoTask>No Completed Streaks 😬</NoTask>
            )}
          </>
        )}
      </AnimatePresence>
    </InnerContainer>
  );
};

const NoTask = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.main.primaryText};
  font-size: 1.7rem;

  width: 100%;
  height: 7rem;
  border-radius: 0.8rem;
  overflow: hidden;

  cursor: pointer;

  background: ${({ theme }) => theme.task.gradient};
`;

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
  max-width: 50rem;
  height: 100%;

  /* overflow-y: auto; */
  /* ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; */
`;

export default TasksBar;
