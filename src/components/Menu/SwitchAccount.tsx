import React, { useEffect, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Avatar } from '@material-ui/core'
import { LauncherProfile } from '../../interfaces/LauncherAccount'
import fs from 'fs'
import { getMCDir } from '../../installer/InstallerUtils'

interface ISwitchAccountMenu {
  open: boolean,
  handleClose: () => void,
  switchProfile: (profile: LauncherProfile) => void,
  anchorEl: HTMLElement | null;
}

export const SwitchAccount = (props: ISwitchAccountMenu): JSX.Element => {
  const [accounts, setAccounts] = useState<Array<LauncherProfile>>()
  useEffect(() => {
    const profiles = JSON.parse(fs.readFileSync(getMCDir() + '/' + 'launcher_accounts.json') as unknown as string)
    setAccounts(Object.entries(profiles.accounts).map(value => {
      return value[1] as LauncherProfile
    }))
  }, [])
  return (
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={props.open}
      onClose={props.handleClose}>

      {accounts?.map(account => {
        return (
          <MenuItem key={account.minecraftProfile.id} onClick={() => {
            props.switchProfile(account)
            props.handleClose()
          }}>
            <Avatar
              variant={'square'} alt="Remy Sharp"
              src={'https://crafatar.com/avatars/' + account.minecraftProfile.id}/>
            <h1>{account.minecraftProfile.name}</h1>
          </MenuItem>
        )
      })}
    </Menu>
  )
}
