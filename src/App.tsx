import { useState } from 'react';

import TasksBar from './components/Tasks/TasksBar';
import BottomBar from './components/BottomBar/BottomBar';
import Scene from './components/pet/Scene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <AnimatePresence>
          {isSidebarOpen && <TasksBar setActive={setActive} />}
        </AnimatePresence>
        <BottomBar active={active} setIsSidebarOpen={setIsSidebarOpen} />
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
