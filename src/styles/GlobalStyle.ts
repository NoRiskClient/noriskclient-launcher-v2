import { createGlobalStyle } from 'styled-components'
import Background from '../images/sky-background.png'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root {
    height: 100%;
    overflow: hidden;
}
   .shadow > canvas {
                -webkit-filter: drop-shadow(5px 5px 5px #222);
                filter: drop-shadow(5px 5px 5px #222);
   }
   
   .launch-button {
   border: 5px solid red;
  position: absolute;
bottom: 0;
right: 0;
   }

`

export const skyBg = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'contain',
  height: '100%',
  backgroundRepeat: 'no-repeat'
}
