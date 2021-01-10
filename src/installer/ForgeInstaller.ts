import fs from 'fs'
import { NRC_FABRIC_1_16_4, NRC_FORGE } from '../interfaces/MinecraftVersion'
import { downloadAndWriteFile, getMCDir, getOS, installLibraries } from './InstallerUtils'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { LauncherProfile } from '../interfaces/LauncherAccount'
import { launchGame } from './LaunchUtils'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sha256File from 'sha256-file'

export const installNoRiskForge = (profile: LauncherProfile): void => {
  checkForVersionsFolder(profile)
}

const checkForVersionsFolder = (profile: LauncherProfile): void => {
  downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.8.9-NRC-Forge.json', {
    filename: '1.8.9-NRC-Forge.json',
    directory: getMCDir() + '/versions/' + NRC_FORGE.folderName
  }, false, () => {
    downloadAndWriteFile('https://launcher.mojang.com/v1/objects/3870888a6c3d349d3771a3e9d16c9bf5e076b908/client.jar', {
      filename: '1.8.9-NRC-Forge.jar',
      directory: getMCDir() + '/versions/' + NRC_FORGE.folderName
    }, false, () => {
      downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', {
        filename: 'NoRiskClient.jar',
        directory: getMCDir() + '/mods/1.8.9'
      }, false, () => {
        downloadAndWriteFile('https://noriskclient.de/downloads/optifine_1.8.9.zip', {
          filename: 'OptiFine_1.8.9_HD_U_L5.jar',
          directory: getMCDir() + '/mods/1.8.9'
        }, false, () => {
          downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-2.9.3.zip', {
            filename: 'lwjgl-2.9.3.zip',
            fileToCheck: getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS(),
            directory: getMCDir() + '/norisk'
          }, false, () => {
            const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-2.9.3.zip')
            zip.extractAllTo(getMCDir() + '/norisk/natives', true)
            downloadAndWriteFile('https://noriskclient.de/downloads/client/sha256sum.txt', {
              filename: 'sha256sum.txt',
              directory: getMCDir() + '/norisk'
            }, true, () => {
              const currentMD5 = sha256File(getMCDir() + '/mods/1.8.9/NoRiskClient.jar')
              const newestMD5 = fs.readFileSync(getMCDir() + '/norisk/sha256sum.txt', 'utf8').substr(0, 64)
              if (newestMD5 === currentMD5) {
                installLibraries(NRC_FORGE, () => {
                  launchGame(NRC_FORGE, profile)
                })
              } else {
                downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', {
                  filename: 'NoRiskClient.jar',
                  directory: getMCDir() + '/mods/1.8.9/'
                }, true, () => {
                  installLibraries(NRC_FORGE, () => {
                    launchGame(NRC_FORGE, profile)
                  })
                })
              }
            })
          })
        })
      })
    })
  })
}
