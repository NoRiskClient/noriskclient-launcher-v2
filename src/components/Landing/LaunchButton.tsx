import React, { useState } from 'react'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import 'babel-polyfill'
import { installNoRiskStandAlone } from '../../installer/StandAloneInstaller'
import { installNoRiskForge } from '../../installer/ForgeInstaller'

interface Props {
    profile: LauncherProfile
}

export const LaunchButton = (props: Props): JSX.Element => {
  const [status, setStatus] = useState<string>('Start')
  const [isStarting, setStarting] = useState<boolean>(false)
  return (
    <button onClick={() => {
      if (!isStarting) {
        setStarting(true)
        installNoRiskForge({ setStatus: setStatus, profile: props.profile, setIsStarting: setStarting })
      }
    }}>{status}</button>
  )
}
