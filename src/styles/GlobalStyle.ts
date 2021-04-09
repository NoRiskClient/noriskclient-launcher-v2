import { createGlobalStyle } from 'styled-components'
import Background from '../images/sky-background.png'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;

}
html, body, #root {
  height: 100%;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
  
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #2b2c2e;
}

::-webkit-scrollbar-thumb {
  background: #5b5c5e;
  border-radius: 10px;
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
  background: '#2b2c2e',
  // backgroundImage: `url(${Background})`,
  backgroundSize: 'contain',
  height: '100%',
  backgroundRepeat: 'no-repeat'
}
