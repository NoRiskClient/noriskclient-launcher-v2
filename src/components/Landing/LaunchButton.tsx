import React, { useState } from 'react'
import { installNoRiskStandAlone } from '../../installer/StandAloneInstaller'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import { installNoRiskForge } from '../../installer/ForgeInstaller'
import { installNoRiskFabric } from '../../installer/FabricInstaller'

interface Props {
    profile: LauncherProfile
}

export const LaunchButton = (props: Props): JSX.Element => {
  const [test, setTest] = useState<string>('Start')
  return (
    <button onClick={() => {
      installNoRiskStandAlone(props.profile)
    }}>{test}</button>
  )
}
