import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,body{
    font-family: 'Poor Story', cursive;
    font-size: 10px;
  }

  body {
    line-height: 1.5;
  }
`;

export default GlobalStyle;
