const colors = {
  primary: '#0e0c22',
  secondary: '#191444',
  taskPrimary: '#16132c',
  taskSecondary: '#221038',
};

const { primary, secondary, taskPrimary, taskSecondary } = colors;

const theme = {
  main: {
    background: primary,
    secondaryBackground: secondary,
    hover: '#00000057',
    gradient: `radial-gradient(50% 50% at 50% 50%, ${secondary} 0%, ${primary} 100%)`,
    border: 'rgba(111, 103, 128, 0.151)',
    borderRadius: '0.8rem',
    primaryText: '#E4E4E4',
    secondaryText: '#FFFFFF',
    lightText: 'rgba(255, 255, 255, 0.404)',
    boldFont: 'Epilogue-Bold',
    button: '#de426b',
    maxHeight: 92.6,
  },
  focus: {
    dial: '#de426b',
    dialBorder: 'rgba(255, 89, 128, 0.5)',
    dialBackground:
      'linear-gradient(218.42deg, #262867 17.02%, #c04781 85.18%)',
  },
  task: {
    primary: taskPrimary,
    secondary: taskSecondary,
    gradient: `linear-gradient(267.7deg, ${taskSecondary} 0%, ${taskPrimary} 96.4%)`,
    background: taskPrimary,
    border: 'rgba(255, 255, 255, 0.034)',
    text: '#ffffff',
  },
  calendar: {
    background: '#190B41',
    cell: '#c7a4ff39',
    completedCell: '#DE426B',
  },
};

export default theme;
