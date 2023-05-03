import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poor Story', cursive;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
