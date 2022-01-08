const colors = {
  primary: '#0e0c27',
  secondary: '#0D0F52',
};

const { primary, secondary } = colors;

const theme = {
  main: {
    background: primary,
    secondaryBackground: secondary,
    hover: '#00000057',
    gradient: `radial-gradient(50% 50% at 50% 50%, ${secondary} 0%, ${primary} 100%)`,
    border: '#b8b8b8',
    primaryText: '#E4E4E4',
    secondaryText: '#FFFFFF',
  },
};

export default theme;
