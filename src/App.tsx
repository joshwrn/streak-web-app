import React from 'react';

import TasksBar from './components/Tasks/TasksBar';
import Scene from './components/pet/Scene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <TasksBar />
        <Scene />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  background: ${({ theme }) => theme.main.gradient};
  display: flex;
`;

export default App;
