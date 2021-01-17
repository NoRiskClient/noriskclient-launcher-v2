import { LauncherProfile } from './LauncherAccount'
import React from 'react'

export interface LauncherProps {
    profile: LauncherProfile
    setStatus: React.Dispatch<React.SetStateAction<string>>
    setIsStarting: React.Dispatch<React.SetStateAction<boolean>>
}
