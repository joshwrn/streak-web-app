import { useState, useEffect } from 'react';

import { TaskProps } from './components/Tasks/types';

import TasksBar from './components/Tasks/TasksBar';
import CreateNewBar from './components/Tasks/CreateTask';
import BottomBar from './components/BottomBar/BottomBar';
import Scene from './components/pet/Scene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';

import { exampleTasks } from './components/Tasks/exampleTasks';

function App() {
  const [sidebarType, setSidebarType] = useState<string>('none');
  const [active, setActive] = useState<number>(0);
  const [tasks, setTasks] = useState<TaskProps[]>(exampleTasks);

  useEffect(() => {
    const activeTotal = tasks.filter(
      (task: TaskProps) => task.completed === false
    ).length;
    setActive(activeTotal);
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <AnimatePresence>
          {sidebarType === 'tasks' && (
            <TasksBar
              tasks={tasks}
              setTasks={setTasks}
              setSidebarType={setSidebarType}
            />
          )}
          {sidebarType === 'create' && (
            <CreateNewBar setSidebarType={setSidebarType} setTasks={setTasks} />
          )}
        </AnimatePresence>
        <BottomBar active={active} setSidebarType={setSidebarType} />
        <Scene />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  background: ${({ theme }) => theme.main.gradient};
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default App;
