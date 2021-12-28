const colors = {
  primary: '#252525',
};

const { primary } = colors;

const theme = {
  main: {
    background: primary,
    hover: '#2b2b2b',
    gradient: `linear-gradient(0deg, #000000, ${primary}, ${primary})`,
    border: '#3b3b3b',
    primaryText: '#d8d8d8',
    secondaryText: '#727272',
  },
};

export default theme;
