import React, { useState } from 'react'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import 'babel-polyfill'
import { Button } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import '../../styles/GlobalStyle.css'
import { LaunchSettings } from '../../interfaces/LaunchSettings'

interface Props {
    profile: LauncherProfile
    launchSettings: LaunchSettings
}

export const LaunchButton = (props: Props): JSX.Element => {
  const [status, setStatus] = useState<string>('Start')
  const [isStarting, setStarting] = useState<boolean>(false)
  const launchSettings = props.launchSettings
  return (
    <Button
      size={'large'}
      className={'launch-button'}
      variant="contained"
      color="primary"
      onClick={async () => {
        if (!isStarting) {
          setStarting(true)
          if (launchSettings.version.startGame) {
            const child = launchSettings.version.startGame({
              setStatus: setStatus,
              profile: props.profile,
              setIsStarting: setStarting
            })
          }
        }
      }}
      startIcon={<PlayArrow/>}>
      {status}
    </Button>
  )
}
