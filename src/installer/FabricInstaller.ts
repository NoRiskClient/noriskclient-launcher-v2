import { NRC_FABRIC_1_16_4 } from '../interfaces/MinecraftVersion'
import { checkMD5, downloadAndWriteFile, getMCDir, getOS, installLibraries } from './InstallerUtils'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { launchGame } from './LaunchUtils'
import { LauncherProps } from '../interfaces/LauncherProps'
import { ChildProcessWithoutNullStreams } from 'child_process'

export const installNoRiskFabric = (props: LauncherProps): Promise<ChildProcessWithoutNullStreams> | undefined => {
  return checkForVersionsFolder(props)
}

const checkForVersionsFolder = (props: LauncherProps): Promise<ChildProcessWithoutNullStreams> => {
  const profile = props.profile
  const setStatus = props.setStatus
  return new Promise(resolve => {
    downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.16.4-NRC-Fabric.json', {
      filename: '1.16.4-NRC-Fabric.json',
      directory: getMCDir() + '/versions/' + NRC_FABRIC_1_16_4.folderName,
      setStatus: setStatus
    }).then(() => {
      return downloadAndWriteFile('https://launcher.mojang.com/v1/objects/1952d94a0784e7abda230aae6a1e8fc0522dba99/client.jar', {
        filename: '1.16.4-NRC-Fabric.jar',
        directory: getMCDir() + '/versions/' + NRC_FABRIC_1_16_4.folderName,
        setStatus: setStatus
      })
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/latest.jar', {
        filename: 'NoRiskClient.jar',
        directory: getMCDir() + '/norisk/mods/1.16.4',
        setStatus: setStatus
      })
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-3.2.2.zip', {
        filename: 'lwjgl-3.2.2.zip',
        fileToCheck: getMCDir() + '/norisk/natives/lwjgl-3.2.2/native/' + getOS(),
        directory: getMCDir() + '/norisk',
        setStatus: setStatus
      })
    }).then(() => {
      const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-3.2.2.zip')
      return zip.extractAllToAsync(getMCDir() + '/norisk/natives', true)
    }).then(() => {
      return downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/sha256sum.txt', {
        filename: 'sha256sum.txt',
        directory: getMCDir() + '/norisk',
        setStatus: setStatus
      }, true)
    }
    ).then(() => {
      return checkMD5(
        getMCDir() + '/norisk/mods/1.16.4/NoRiskClient.jar',
        getMCDir() + '/norisk/sha256sum.txt')
    }).then((hasLastestVersion) => {
      if (!hasLastestVersion) {
        return downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/latest.jar', {
          filename: 'NoRiskClient.jar',
          directory: getMCDir() + '/norisk/mods/1.16.4/',
          setStatus: setStatus
        }, true)
      }
    }).then(() => {
      installLibraries(NRC_FABRIC_1_16_4, () => {
        props.setIsStarting(false)
        resolve(launchGame(NRC_FABRIC_1_16_4, props.profile))
      })
    })
  })
}
