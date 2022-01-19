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
  width: 100%;
`;

const StyledApp = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-width: 50rem;
`;

export default App;
