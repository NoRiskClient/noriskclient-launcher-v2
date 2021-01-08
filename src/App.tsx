import React from 'react'
import { render } from 'react-dom'
import { Landing } from './components/Landing/Landing'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <Landing />
    </>
  )
}

render(<App />, mainElement)
