import { createGlobalStyle } from 'styled-components';

import EpilogueBold from '../assets/fonts/Epilogue-Bold.ttf';

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Epilogue-Bold';
  src: url(${EpilogueBold}) format('woff');
}

html {
  background-color: ${({ theme }) => theme.main.background};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scroll-behavior: smooth;
}

body {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #242427;
  z-index: -3;
  transition: background-color 0.5s ease-in-out;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: 62.5%  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

p,
a,
div {
  font-size: 1.6rem;
}

h1,
h2,
h3,
h4,
h5 {
  font-size: 2rem;
  font-family:  helvetica, arial, sans-serif;
}

a {
  text-decoration: none;
}


input,
select,
textarea {
  text-align: left;
  font-family: helvetica;
  font-size: 1.5rem;
}

textarea::placeholder {
  font-size: 1.5rem;
}

input::placeholder {
  font-family: helvetica;
}

textarea:focus,
input:focus {
  outline: none;
}

::selection {
  background: #161616;
  text-shadow: 1px 1px 10px white;
}

::-moz-selection {
  background: #161616;
  text-shadow: 1px 1px 10px white;
}
 
`;

export default GlobalStyles;
