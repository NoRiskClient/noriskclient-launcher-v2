import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Landing } from './components/Landing/Landing'
import { LauncherProfile } from './interfaces/LauncherAccount'
import { getMCDir } from './installer/InstallerUtils'
import fs from 'fs'
import { GlobalStyle, skyBg } from './styles/GlobalStyle'

import jquery from 'jquery'
import { NavBar } from './components/NavBar/NavBar'
import { ThemeProvider } from 'styled-components'
import { createMuiTheme, Box } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.$ = window.jQuery = jquery

const script2 = document.createElement('script')
script2.crossOrigin = 'anonymous'
script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/94/three.min.js'
script2.integrity = 'sha256-NGC9JEuTWN4GhTj091wctgjzftr+8WNDmw0H8J5YPYE='

document.head.appendChild(script2)

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red
  }
})

const App = () => {
  const [profile, setProfile] = useState<LauncherProfile>({} as LauncherProfile)
  const [skinRender, setSkinRender] = useState<any>()
  const [isApiLoaded, setApiLoaded] = useState<boolean>(false)

  useEffect(() => {
    const id = 'skinRenderApi'
    if (document.getElementById(id) === null) {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://cdn.jsdelivr.net/gh/InventivetalentDev/MineRender@1.4.6/dist/skin.min.js')
      script.setAttribute('id', id)
      document.head.appendChild(script)
      script.onload = () => {
        setApiLoaded(true)
      }
    }

    if (isApiLoaded) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const skin = new SkinRender({ canvas: { width: '500', height: '500' } }, document.getElementById('3d-skin'))
      if (profile?.minecraftProfile?.name) {
        skin.render(profile.minecraftProfile.name, () => {
          setSkinRender((prevState: any) => {
            if (prevState !== undefined) {
              prevState.style.display = 'none'
            }
            // TODO das hier fixxen
            setInterval(() => {
              skin.playerModel.rotation.y += 0.005
            }, 10)
            return skin._renderer.domElement
          })
        })
      }
    }
  }, [profile?.minecraftProfile?.name, isApiLoaded])
  useEffect(() => {
    const json = JSON.parse(fs.readFileSync(getMCDir() + '/' + 'launcher_accounts.json') as unknown as string)
    Object.entries(json.accounts).map(value => {
      if (value[0] === json.activeAccountLocalId) {
        setProfile(value[1] as LauncherProfile)
      }
      return value[1] as LauncherProfile
    })
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div style={skyBg}>
        <GlobalStyle/>
        <NavBar profile={profile} setProfile={setProfile}/>
        <Landing {...profile}/>
        <Box
          position="absolute"
          top={40}
          left="40%"
          className={'shadow'}
          id={'3d-skin'}/>
      </div>
    </ThemeProvider>
  )
}

render(<App/>, mainElement)
