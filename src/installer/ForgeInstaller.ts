import { NRC_FORGE } from '../interfaces/MinecraftVersion'
import { checkMD5, downloadAndWriteFile, getMCDir, getOS, installLibraries } from './InstallerUtils'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { launchGame } from './LaunchUtils'
import { LauncherProps } from '../interfaces/LauncherProps'
import { ChildProcessWithoutNullStreams } from 'child_process'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const installNoRiskForge = (props: LauncherProps): Promise<ChildProcessWithoutNullStreams> | undefined => {
  return checkForVersionsFolder(props)
}

const checkForVersionsFolder = (props: LauncherProps): Promise<ChildProcessWithoutNullStreams> => {
  const profile = props.profile
  const setStatus = props.setStatus
  return new Promise(resolve => {
    downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.8.9-NRC-Forge.json', {
      filename: '1.8.9-NRC-Forge.json',
      directory: getMCDir() + '/versions/' + NRC_FORGE.folderName,
      setStatus: setStatus
    }).then(() => {
      return downloadAndWriteFile('https://launcher.mojang.com/v1/objects/3870888a6c3d349d3771a3e9d16c9bf5e076b908/client.jar', {
        filename: '1.8.9-NRC-Forge.jar',
        directory: getMCDir() + '/versions/' + NRC_FORGE.folderName,
        setStatus: setStatus
      })
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', {
        filename: 'NoRiskClient.jar',
        directory: getMCDir() + '/mods/1.8.9',
        setStatus: setStatus
      })
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/optifine_1.8.9.zip', {
        filename: 'OptiFine_1.8.9_HD_U_L5.jar',
        directory: getMCDir() + '/mods/1.8.9',
        setStatus: setStatus
      })
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-2.9.3.zip', {
        filename: 'lwjgl-2.9.3.zip',
        fileToCheck: getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS(),
        directory: getMCDir() + '/norisk',
        setStatus: setStatus
      })
    }).then(() => {
      const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-2.9.3.zip')
      return zip.extractAllToAsync(getMCDir() + '/norisk/natives', true)
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/client/sha256sum.txt', {
        filename: 'sha256sum.txt',
        directory: getMCDir() + '/norisk',
        setStatus: setStatus
      }, true)
    }).then(() => {
      return checkMD5(
        getMCDir() + '/mods/1.8.9/NoRiskClient.jar',
        getMCDir() + '/norisk/sha256sum.txt')
    }).then((hasLatestVersion) => {
      if (!hasLatestVersion) {
        return downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', {
          filename: 'NoRiskClient.jar',
          directory: getMCDir() + '/mods/1.8.9/',
          setStatus: setStatus
        }, true)
      }
    }).then(() => {
      installLibraries(NRC_FORGE, () => {
        props.setIsStarting(false)
        resolve(launchGame(NRC_FORGE, profile))
      })
    })
  })
}
