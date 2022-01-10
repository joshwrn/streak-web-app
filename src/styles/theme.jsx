const colors = {
  primary: '#0e0c27',
  secondary: '#0D0F52',
  taskPrimary: '#242782',
  taskSecondary: '#4d2482',
};

const { primary, secondary, taskPrimary, taskSecondary } = colors;

const theme = {
  main: {
    background: primary,
    secondaryBackground: secondary,
    hover: '#00000057',
    gradient: `radial-gradient(50% 50% at 50% 50%, ${secondary} 0%, ${primary} 100%)`,
    border: '#21033a',
    primaryText: '#E4E4E4',
    secondaryText: '#FFFFFF',
  },
  task: {
    primary: taskPrimary,
    secondary: taskSecondary,
    gradient: `linear-gradient(267.7deg, ${taskSecondary} 0%, ${taskPrimary} 96.4%)`,
  },
};

export default theme;
