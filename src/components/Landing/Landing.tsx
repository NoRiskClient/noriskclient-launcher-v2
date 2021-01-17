import React from 'react'
import { LaunchButton } from './LaunchButton'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import { Box, Grid } from '@material-ui/core'

export const Landing = (profile: LauncherProfile): JSX.Element => {
  return (<>
    <Box
      position="absolute"
      bottom={'5%'}
      left="5%"
      zIndex="tooltip">
      <Grid container direction="column" spacing={3}>
        <Grid item xs>
          <LaunchButton profile={profile}/>
        </Grid>
        <Grid item xs>
          <LaunchButton profile={profile}/>
        </Grid>
      </Grid>
    </Box>
  </>)
}
