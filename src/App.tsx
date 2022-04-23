import TopBar from './components/TopBar/TopBar';
import BottomSection from './components/BottomBar/BottomSection';
import LevelUp from './components/LevelUp/LevelUp';
import Scene from './components/Pet/PetScene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <StyledApp>
          <TopBar />
          <Scene />
          <BottomSection />
          <LevelUp />
        </StyledApp>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: relative;
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
  max-height: ${({ theme }) => theme.main.maxHeight}rem;
`;

export default App;
