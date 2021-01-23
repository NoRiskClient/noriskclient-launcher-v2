import React from 'react'
import { Button } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { MinecraftVersion } from '../../interfaces/MinecraftVersion'
import { SwitchVersion } from '../Menu/SwitchVersion'
import { LaunchSettings } from '../../interfaces/LaunchSettings'

interface Props {
    version: MinecraftVersion
    setLaunchSettings: React.Dispatch<React.SetStateAction<LaunchSettings>>
}

export const VersionButton = (props: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) }

  const handleClose = () => { setAnchorEl(null) }

  return (
    <>
      <Button
        size={'large'}
        className={'launch-button'}
        variant="contained"
        color="primary"
        onClick={handleMenu}
        startIcon={<Settings/>}>
        {props.version.name}
      </Button>
      <SwitchVersion setLaunchSettings={props.setLaunchSettings} handleClose={handleClose} anchorEl={anchorEl}/>
    </>
  )
}
