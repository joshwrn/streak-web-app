const colors = {
  primary: '#f1f1f1',
  secondary: '#d3d3d3',
};

const { primary, secondary } = colors;

const theme = {
  main: {
    background: primary,
    secondaryBackground: secondary,
    hover: '#2b2b2b',
    gradient: `linear-gradient(0deg, ${secondary}, ${primary}, ${primary})`,
    border: '#b8b8b8',
    primaryText: '#464646',
    secondaryText: '#727272',
  },
};

export default theme;
