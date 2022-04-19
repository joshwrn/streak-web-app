import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

import BottomSection from './BottomSection';

test('new task is added after being created', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BottomSection />
      </ThemeProvider>
    </Provider>
  );
  userEvent.click(screen.getByTestId('createNewBtn'));
  const taskName = 'new task';
  userEvent.type(screen.getByRole('textbox'), taskName);

  screen.getByRole('button', { name: /create/i }).click();

  userEvent.click(screen.getByTestId(taskName));
});
