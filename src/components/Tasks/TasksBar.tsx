import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import Task from './TaskItem';
import TaskStats from './TaskStats';

import { TaskProps } from '../../types/taskTypes';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

type propTypes = {
  filter: FilterTypes;
};

const TasksBar = ({ filter }: propTypes) => {
  const page = useAppSelector((state) => state.page.page);
  const allTasks = useAppSelector((state) => state.tasks.tasks);
  const [activeTask, setActiveTask] = useState<string>('');

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
          <TaskStats activeTask={activeTask} />
        ) : (
          <TaskItemsContainer>
            <AnimatePresence>
              {allTasks.map((item: TaskProps, index: number) => {
                // make sure timing is always correct
                const filtered = allTasks.filter((task) =>
                  filter === 'Active' ? !task.completed : task.completed
                );
                const findIndex = filtered.findIndex(
                  (task) => task.task === item.task
                );

                const TaskItem = (
                  <Task
                    key={index}
                    task={item.task}
                    completed={item.completed}
                    streak={item.streak}
                    setActiveTask={setActiveTask}
                    index={findIndex}
                  />
                );

                if (filter === 'Active' && !item.completed) {
                  return TaskItem;
                } else if (filter === 'Completed' && item.completed) {
                  return TaskItem;
                }
              })}
            </AnimatePresence>
            {filter === 'Active' &&
              allTasks.filter((item: TaskProps) => !item.completed).length ===
                0 && <NoTask>No Active Streaks 😃</NoTask>}

            {filter === 'Completed' &&
              allTasks.filter((item: TaskProps) => item.completed).length ===
                0 && <NoTask>No Completed Streaks 😬</NoTask>}
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
