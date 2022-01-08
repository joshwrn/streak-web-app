import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import Task from './TaskItem';

import { TaskProps } from './types';

const TasksBar = ({
  tasks,
  setTasks,
}: {
  tasks: TaskProps[];
  setTasks: (arg: TaskProps[] | ((prev: TaskProps[]) => TaskProps[])) => void;
}) => {
  return (
    <>
      <AnimatePresence>
        <InnerContainer
          variants={containerVariants}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
        >
          {tasks.map((item: TaskProps, index) => {
            return (
              <Task
                key={index}
                task={item.task}
                completed={item.completed}
                streak={item.streak}
                setTasks={setTasks}
              />
            );
          })}
        </InnerContainer>
      </AnimatePresence>
    </>
  );
};

const containerVariants = {
  open: {
    transition: { staggerChildren: 0.17 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 2rem;
  width: 100%;
  height: 100%;

  /* overflow-y: auto; */
  /* ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; */
`;

export default TasksBar;
