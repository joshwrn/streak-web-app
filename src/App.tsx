import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

import TopBar from './components/TopBar/TopBar';
import BottomSection from './components/BottomBar/BottomSection';
import Scene from './components/Pet/PetScene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

function App() {
  const [page, setPage] = useState('Tasks');
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <StyledApp>
            <TopBar />
            <Scene />
            <BottomSection />
          </StyledApp>
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledApp = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  border-radius: 1.8rem;
  max-width: 42.8rem;
  background-color: ${({ theme }) => theme.main.background};
  max-height: 92.6rem;
`;

export default App;
