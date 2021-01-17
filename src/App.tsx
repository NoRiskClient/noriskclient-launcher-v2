import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Landing } from './components/Landing/Landing'
import { LauncherProfile } from './interfaces/LauncherAccount'
import { getMCDir } from './installer/InstallerUtils'
import fs from 'fs'
import { GlobalStyle } from './styles/GlobalStyle'
import { LaunchButton } from './components/Landing/LaunchButton'
import Background from './images/sky-background.png'

const script = document.createElement('script')
script.crossOrigin = 'anonymous'
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
script.integrity = 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8='

const script2 = document.createElement('script')
script2.crossOrigin = 'anonymous'
script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/94/three.min.js'
script2.integrity = 'sha256-NGC9JEuTWN4GhTj091wctgjzftr+8WNDmw0H8J5YPYE='

const script3 = document.createElement('script')
script3.crossOrigin = 'anonymous'
script3.src = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/MineRender@1.4.6/dist/skin.min.js'

const script4 = document.createElement('script')
script4.type = 'text/babel'
script4.src = 'main.ts'

document.head.appendChild(script)
document.head.appendChild(script2)
document.head.appendChild(script3)
document.head.appendChild(script4)

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  const [profile, setProfile] = useState<LauncherProfile>({} as LauncherProfile)
  const [skinRender, setSkinRender] = useState<any>()

  useEffect(() => {
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
            skin.playerModel.rotation.y += 0.01
          }, 10)
          return skin._renderer.domElement
        })
      })
    }
  }, [profile?.minecraftProfile?.name])
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
    <div style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: 'contain',
      height: '100%',
      backgroundRepeat: 'no-repeat'
    }}>
      <GlobalStyle/>
      <div className={'yo'} id={'3d-skin'}/>
      <div>Hallo</div>
      <button>Moin</button>
      <LaunchButton profile={profile}/>
      <Landing/>
      <p>Profile {profile?.minecraftProfile?.name}</p>
    </div>
  )
}

render(<App/>, mainElement)
