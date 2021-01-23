import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { NRCVersions } from '../../interfaces/MinecraftVersion'
import { LaunchSettings } from '../../interfaces/LaunchSettings'

interface ISwitchVersion {
    handleClose: () => void,
    setLaunchSettings: React.Dispatch<React.SetStateAction<LaunchSettings>>
    anchorEl: HTMLElement | null;
}

export const SwitchVersion = (props: ISwitchVersion): JSX.Element => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorEl}
      keepMounted
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
    >
      {NRCVersions.map(value => {
        return (<MenuItem
          onClick={() => {
            props.setLaunchSettings(prevState => {
              return { ...prevState, version: value }
            })
            props.handleClose()
          }}
          key={value.name}>
          {value.name}
        </MenuItem>)
      })}
    </Menu>
  )
}
