import React from 'react'
import { LaunchButton } from './LaunchButton'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import { Box, Grid } from '@material-ui/core'
import { VersionButton } from './VersionButton'
import { LaunchSettings } from '../../interfaces/LaunchSettings'

interface Props {
  profile: LauncherProfile,
  launchSettings: LaunchSettings,
  setLaunchSettings: React.Dispatch<React.SetStateAction<LaunchSettings>>
}

export const Landing = (props: Props): JSX.Element => {
  return (<>
    <Box
      position="absolute"
      bottom={'5%'}
      left="5%">
      <Grid container direction="column" spacing={3}>
        <Grid item xs>
          <VersionButton setLaunchSettings={props.setLaunchSettings} version={props.launchSettings.version}/>
        </Grid>
        <Grid item xs>
          <LaunchButton launchSettings={props.launchSettings} profile={props.profile}/>
        </Grid>
      </Grid>
    </Box>
  </>)
}
