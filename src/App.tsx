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
import { Box, createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { LaunchSettings } from './interfaces/LaunchSettings'
import { NRC_FABRIC_1_16_4 } from './interfaces/MinecraftVersion'
import 'babel-polyfill'

import { v1 as uuid } from 'uuid'
import { ipcRenderer } from 'electron'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.$ = window.jQuery = jquery

const threeScript = document.createElement('script')
threeScript.id = 'threeScript'
threeScript.crossOrigin = 'anonymous'
threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/94/three.min.js'
threeScript.integrity = 'sha256-NGC9JEuTWN4GhTj091wctgjzftr+8WNDmw0H8J5YPYE='

const skinRenderScript = document.createElement('script')
skinRenderScript.id = 'skinRenderScript'
skinRenderScript.crossOrigin = 'anonymous'
skinRenderScript.src = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/MineRender@1.4.6/dist/skin.min.js'

document.head.appendChild(threeScript)
document.head.appendChild(skinRenderScript)

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
  const [launchSettings, setLaunchSettings] = useState<LaunchSettings>({
    version: NRC_FABRIC_1_16_4
  })
  const [skinRender, setSkinRender] = useState<any>()
  const [isApiLoaded, setApiLoaded] = useState({ skinApi: false, threeApi: false })

  useEffect(() => {
    const skinRenderId = 'skinRenderApi'
    const threeId = 'threeApi'
    if (document.getElementById(skinRenderId) === null && document.getElementById(threeId) === null) {
      const skinRenderScript = document.createElement('script')
      const threeScript = document.createElement('script')
      skinRenderScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/InventivetalentDev/MineRender@1.4.6/dist/skin.min.js')
      skinRenderScript.setAttribute('id', skinRenderId)

      threeScript.crossOrigin = 'anonymous'
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/94/three.min.js'
      threeScript.integrity = 'sha256-NGC9JEuTWN4GhTj091wctgjzftr+8WNDmw0H8J5YPYE='

      document.head.appendChild(threeScript)
      document.head.appendChild(skinRenderScript)

      skinRenderScript.onload = () => {
        setApiLoaded(prevState => {
          return { skinApi: true, threeApi: prevState.threeApi }
        })
      }

      threeScript.onload = () => {
        setApiLoaded(prevState => {
          return { skinApi: prevState.skinApi, threeApi: true }
        })
      }
    }

    if (isApiLoaded.threeApi && isApiLoaded.skinApi) {
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
    console.log('moin')
    const apiUrl = 'https://authserver.mojang.com'

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    ipcRenderer.send('auth', {
      username: '',
      password: '',
      path: '/authenticate'
    })
    ipcRenderer.once('auth-completed', (event, args) => {
      console.log(args)
    })
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div style={skyBg}>
        <GlobalStyle/>
        <NavBar profile={profile} setProfile={setProfile}/>
        <Landing profile={profile} launchSettings={launchSettings} setLaunchSettings={setLaunchSettings} />
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
