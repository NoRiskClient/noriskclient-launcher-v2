import React, { useState } from 'react'
import { downloadAndWriteFile, getMCDir } from '../../installer/InstallerUtils'

export const LaunchButton = (): JSX.Element => {
  const [test, setTest] = useState<string>('Jo')
  return (
    <button onClick={() => {
      console.log('Hallo')
      downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', getMCDir() + '/norisk', setTest)
    }}>{test}</button>
  )
}
