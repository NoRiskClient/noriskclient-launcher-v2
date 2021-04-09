import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Avatar, Typography } from '@material-ui/core'
import { SwitchAccount } from '../menu/SwitchAccount'
import { LauncherProfile } from '../../interfaces/LauncherAccount'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    },
    avatar: {
      boxShadow: theme.shadows[3]
    },
    username: {
      marginRight: '0.5em'
    },
    toolbarButtons: {
      marginLeft: 'auto'
    }
  })
)

interface Props {
  profile: LauncherProfile;
  setProfile: (profile: LauncherProfile) => void;
}

export const NavBar = (props: Props): JSX.Element => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ color: '#2b2c2e' }}>
        <Toolbar style={{ color: '#161617' }}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          {props.profile && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Typography variant={'h6'}>{props.profile?.minecraftProfile?.name}</Typography>
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
                  <Avatar
                    className={classes.avatar}
                    variant={'square'} alt="Remy Sharp"
                    src={props?.profile?.minecraftProfile?.id
                      ? 'https://crafatar.com/avatars/' + props.profile.minecraftProfile.id
                      : 'https://crafatar.com/avatars/54f04497-5693-48b9-b5de-70db3b6159d5'}/>
                </IconButton>
                <SwitchAccount switchProfile={props?.setProfile} handleClose={handleClose} anchorEl={anchorEl}/>
              </>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
