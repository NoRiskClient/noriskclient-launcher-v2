import fs from 'fs'
import { NRC_FORGE, NRC_STANDALONE } from '../interfaces/MinecraftVersion'
import { downloadAndWriteFile, getMCDir, getOS, installLibraries } from './InstallerUtils'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { LauncherProfile } from '../interfaces/LauncherAccount'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sha256File from 'sha256-file'
// eslint-disable-next-line camelcase
import * as child_process from 'child_process'
import { launchGame } from './LaunchUtils'

export const installNoRiskStandAlone = (profile: LauncherProfile): void => {
  checkForVersionsFolder(profile)
}

const checkForVersionsFolder = (profile: LauncherProfile): void => {
  downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.8.9-NRC.json', {
    filename: '1.8.9-NRC.json',
    directory: getMCDir() + '/versions/' + NRC_STANDALONE.folderName
  }, false, () => {
    downloadAndWriteFile('https://launcher.mojang.com/v1/objects/3870888a6c3d349d3771a3e9d16c9bf5e076b908/client.jar', {
      filename: '1.8.9-NRC.jar',
      directory: getMCDir() + '/versions/' + NRC_STANDALONE.folderName
    }, false, () => {
      downloadAndWriteFile('https://noriskclient.de/downloads/optifine_1.8.9.zip', {
        filename: 'optifine_1.8.9.zip',
        directory: getMCDir() + '/versions/' + NRC_STANDALONE.folderName
      }, false, () => {
        downloadAndWriteFile('https://noriskclient.de/downloads/MergeZips.jar', {
          filename: 'MergeZips.jar',
          directory: getMCDir() + '/norisk/'
        }, false, () => {
          const child = child_process.spawn('java', ['-jar', `${getMCDir() + '/norisk/MergeZips.jar'}`,
            getMCDir() + '/versions/' + NRC_STANDALONE.folderName + '/1.8.9-NRC.jar',
            getMCDir() + '/versions/' + NRC_STANDALONE.folderName + '/1.8.9-NRC-TEMP.jar',
            getMCDir() + '/versions/' + NRC_STANDALONE.folderName + '/optifine_1.8.9.zip',
            fs.readFileSync(getMCDir() + '/versions/' + NRC_STANDALONE.folderName + '/1.8.9-NRC.jar').length <= 8561484 ? 'false' : 'true'
          ], { cwd: getMCDir(), detached: false })
          child.stdout.on('data', () => {
            downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-2.9.3.zip', {
              filename: 'lwjgl-2.9.3.zip',
              fileToCheck: getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS(),
              directory: getMCDir() + '/norisk'
            }, false, () => {
              const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-2.9.3.zip')
              zip.extractAllTo(getMCDir() + '/norisk/natives', true)
              downloadAndWriteFile('https://noriskclient.de/downloads/client/sha256sum.txt', {
                filename: 'NoRiskClient-1.8.9.jar',
                directory: getMCDir() + '/libraries/de/noriskclient/NoRiskClient/1.8.9/'
              }, true, () => {
                const currentMD5 = sha256File(getMCDir() + '/libraries/de/noriskclient/NoRiskClient/1.8.9/NoRiskClient-1.8.9.jar')
                const newestMD5 = fs.readFileSync(getMCDir() + '/norisk/sha256sum.txt', 'utf8').substr(0, 64)
                if (newestMD5 === currentMD5) {
                  installLibraries(NRC_STANDALONE, () => {
                    launchGame(NRC_STANDALONE, profile)
                  })
                } else {
                  downloadAndWriteFile('https://noriskclient.de/downloads/client/latest.jar', {
                    filename: 'NoRiskClient-1.8.9.jar',
                    directory: getMCDir() + '/libraries/de/noriskclient/NoRiskClient/1.8.9/'
                  }, true, () => {
                    installLibraries(NRC_STANDALONE, () => {
                      launchGame(NRC_STANDALONE, profile)
                    })
                  })
                }
              })
            })
          })
          child.stderr.on('data', (data) => {
            console.log('[MergeZips]', data.toString('utf8'))
          })
        })
      })
    })
  })
}
