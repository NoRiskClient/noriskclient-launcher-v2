import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Landing } from './components/Landing/Landing'
import { LauncherProfile } from './interfaces/LauncherAccount'
import { getMCDir } from './installer/InstallerUtils'
import fs from 'fs'
import { LaunchButton } from './components/Landing/LaunchButton'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  const [profile, setProfile] = useState<LauncherProfile>({} as LauncherProfile)
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
    <>
      <div>Hallo</div>
      <button>Moin</button>
      <LaunchButton profile={profile}/>
      <Landing/>
      <p>Profile {profile?.minecraftProfile?.name}</p>
    </>
  )
}

render(<App/>, mainElement)
