import fs from 'fs'
import { NRC_FABRIC_1_16_4 } from '../interfaces/MinecraftVersion'
import { downloadAndWriteFile, getMCDir, getOS, installLibraries } from './InstallerUtils'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { LauncherProfile } from '../interfaces/LauncherAccount'
import { launchGame } from './LaunchUtils'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sha256File from 'sha256-file'

export const installNoRiskFabric = (profile: LauncherProfile): void => {
  checkForVersionsFolder(profile)
}

const checkForVersionsFolder = (profile: LauncherProfile): void => {
  // TODO GEILER UPDATEN
  downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.16.4-NRC-Fabric.json', {
    filename: '1.16.4-NRC-Fabric.json',
    directory: getMCDir() + '/versions/' + NRC_FABRIC_1_16_4.folderName
  }, false, () => {
    downloadAndWriteFile('https://launcher.mojang.com/v1/objects/1952d94a0784e7abda230aae6a1e8fc0522dba99/client.jar', {
      filename: '1.16.4-NRC-Fabric.jar',
      directory: getMCDir() + '/versions/' + NRC_FABRIC_1_16_4.folderName
    }, false, () => {
      downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/latest.jar', {
        filename: 'NoRiskClient.jar',
        directory: getMCDir() + '/norisk/mods/1.16.4'
      }, false, () => {
        downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-3.2.2.zip', {
          filename: 'lwjgl-3.2.2.zip',
          fileToCheck: getMCDir() + '/norisk/natives/lwjgl-3.2.2/native/' + getOS(),
          directory: getMCDir() + '/norisk'
        }, false, () => {
          const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-3.2.2.zip')
          zip.extractAllTo(getMCDir() + '/norisk/natives', true)
          downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/sha256sum.txt', {
            filename: 'sha256sum.txt',
            directory: getMCDir() + '/norisk'
          }, true, () => {
            const currentMD5 = sha256File(getMCDir() + '/norisk/mods/1.16.4/NoRiskClient.jar')
            const newestMD5 = fs.readFileSync(getMCDir() + '/norisk/sha256sum.txt', 'utf8').substr(0, 64)
            if (newestMD5 === currentMD5) {
              installLibraries(NRC_FABRIC_1_16_4, () => {
                console.log(NRC_FABRIC_1_16_4)
                launchGame(NRC_FABRIC_1_16_4, profile)
              })
            } else {
              downloadAndWriteFile('https://noriskclient.de/downloads/fabric/1-16-4-client/latest.jar', {
                filename: 'NoRiskClient.jar',
                directory: getMCDir() + '/norisk/mods/1.16.4/'
              }, true, () => {
                installLibraries(NRC_FABRIC_1_16_4, () => {
                  launchGame(NRC_FABRIC_1_16_4, profile)
                })
              })
            }
          })
        })
      })
    })
  })
}
