import React, { useState } from 'react'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import 'babel-polyfill'
import { installNoRiskStandAlone } from '../../installer/StandAloneInstaller'
import { Button } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import '../../styles/GlobalStyle.css'
interface Props {
    profile: LauncherProfile
}

export const LaunchButton = (props: Props): JSX.Element => {
  const [status, setStatus] = useState<string>('Start')
  const [isStarting, setStarting] = useState<boolean>(false)
  return (
    <Button
      size={'large'}
      className={'launch-button'}
      variant="contained"
      color="primary"
      onClick={() => {
        if (!isStarting) {
          setStarting(true)
          installNoRiskStandAlone({ setStatus: setStatus, profile: props.profile, setIsStarting: setStarting })
        }
      }}
      startIcon={<PlayArrow/>}>
      {status}
    </Button>
  )
}
