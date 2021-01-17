import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root {
    height: 100%;
    overflow: hidden;
}
`
