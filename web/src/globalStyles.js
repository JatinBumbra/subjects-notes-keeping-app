import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  input, button {
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
  }
`;

export default GlobalStyle;
