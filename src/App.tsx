import { AuthProvider } from './context/AuthContext';

import TopBar from './components/TopBar/TopBar';
import BottomSection from './components/BottomBar/BottomSection';
import Scene from './components/pet/Scene';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledApp>
          <TopBar />
          <Scene />
          <BottomSection />
        </StyledApp>
      </ThemeProvider>
    </AuthProvider>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export default App;
