import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getStreaks, reset } from '../../slices/streakSlice';
import { useNavigate } from 'react-router-dom';

import Task from './TaskItem';
import TaskStats from './TaskStats';

import { StreakTypes } from '../../types/streakTypes';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTypes = 'Active' | 'Completed';

type propTypes = {
  filter: FilterTypes;
};

const TasksBar = ({ filter }: propTypes) => {
  const page = useAppSelector((state) => state.page.page);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useAppSelector(
    (state) => state.tasks
  );
  const [activeTask, setActiveTask] = useState<string>('');

  useEffect(() => {
    if (isError) {
      console.log('get error', message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getStreaks('idk'));

    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch]);

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
              {tasks.map((item: StreakTypes, index: number) => {
                // make sure timing is always correct
                const filtered = tasks.filter((task) =>
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
              tasks.filter((item: StreakTypes) => !item.completed).length ===
                0 && <NoTask>No Active Streaks 😃</NoTask>}

            {filter === 'Completed' &&
              tasks.filter((item: StreakTypes) => item.completed).length ===
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
