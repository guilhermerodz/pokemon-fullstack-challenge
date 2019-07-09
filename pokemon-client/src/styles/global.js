import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-width: 100%;
    min-height: 100%;
  }

  body {
    background: linear-gradient(135deg, #A5A5A5, #BFBFBF) repeat scroll 0% 0%;

    font-family: 'Lato', Helvetica, Arial, sans-serif;

    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
  }

  body, input, button {
    color: #313131;
    font-size: 14px;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    border: 0;
    outline: 0;
  }

  button {
    cursor: pointer;
  }
`;
