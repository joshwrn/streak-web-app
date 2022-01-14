const colors = {
  primary: '#0e0c27',
  secondary: '#191444',
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
    border: 'rgba(111, 103, 128, 0.151)',
    primaryText: '#E4E4E4',
    secondaryText: '#FFFFFF',
    lightText: 'rgba(255, 255, 255, 0.404)',
    boldFont: 'Epilogue-Bold',
  },
  task: {
    primary: taskPrimary,
    secondary: taskSecondary,
    gradient: `linear-gradient(267.7deg, ${taskSecondary} 0%, ${taskPrimary} 96.4%)`,
    background: '#4105B1',
  },
  calendar: {
    background: '#190B41',
    cell: '#c7a4ff39',
    completedCell: '#DE426B',
  },
};

export default theme;
