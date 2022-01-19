import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import Task from './TaskItem';
import TaskStats from './TaskStats';

import { TaskProps } from './types';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

const TasksBar = ({
  setPage,
  page,
  filter,
}: {
  setPage: (arg: string) => void;
  filter: FilterTypes;
  page: string;
}) => {
  const { setAllTasks, allTasks } = useAuth();
  // const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
  const [activeTask, setActiveTask] = useState<string>('');

  // useEffect(() => {
  //   const filtered = allTasks.filter((task) => {
  //     if (filter === 'Active') {
  //       return !task.completed;
  //     } else if (filter === 'Completed') {
  //       return task.completed;
  //     }
  //   });
  //   setFilteredTasks(filtered);
  // }, [filter, allTasks]);

  return (
    <InnerContainer
      animate={{ opacity: 1, x: 0 }}
      initial={false}
      exit={{ opacity: 0, x: '-100vh', position: 'absolute' }}
      transition={{
        opacity: { type: 'spring', damping: 15 },
        x: { type: 'spring', damping: 15 },
      }}
    >
      <AnimatePresence>
        {/* TASK STATS */}
        {page === 'Stats' ? (
          <TaskStats activeTask={activeTask} setPage={setPage} />
        ) : (
          <TaskItemsContainer>
            <AnimatePresence>
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
            </AnimatePresence>
            {filter === 'Active' &&
            allTasks.filter((item: TaskProps) => !item.completed).length ===
              0 ? (
              <NoTask>No Active Streaks 😃</NoTask>
            ) : (
              filter === 'Completed' &&
              allTasks.filter((item: TaskProps) => item.completed).length ===
                0 && <NoTask>No Completed Streaks 😬</NoTask>
            )}
          </TaskItemsContainer>
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
`;

const TaskItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  width: 100%;
  height: 100%;
  gap: 2rem;

  ::after {
    content: '';
    padding-top: 7rem;
  }

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  gap: 2rem;
  width: 100%;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default TasksBar;
