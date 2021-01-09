import fs from 'fs'
import { NRC_STANDALONE } from '../interfaces/MinecraftVersion'
import { downloadAndWriteFile, getMCDir, getNatives, getOS } from './InstallerUtils'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import 'babel-polyfill'
import AdmZip from 'adm-zip'
import { LauncherProfile } from '../interfaces/LauncherAccount'
import * as child_process from 'child_process'

export const installNoRiskStandAlone = (profile: LauncherProfile): void => {
  console.log('yo')
  checkForVersionsFolder(profile)
}

const checkForVersionsFolder = (profile: LauncherProfile): void => {
  downloadAndWriteFile('https://noriskclient.de/downloads/launcher/1.8.9-NRC.json', {
    filename: '1.8.9-NRC.json',
    directory: getMCDir() + '/versions/' + NRC_STANDALONE.folderName
  }, () => {
    downloadAndWriteFile('https://launcher.mojang.com/v1/objects/3870888a6c3d349d3771a3e9d16c9bf5e076b908/client.jar', {
      filename: '1.8.9-NRC.jar',
      directory: getMCDir() + '/versions/' + NRC_STANDALONE.folderName
    }, () => {
      downloadAndWriteFile('https://noriskclient.de/downloads/lwjgl-2.9.3.zip', {
        filename: 'lwjgl-2.9.3.zip',
        fileToCheck: getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS(),
        directory: getMCDir() + '/norisk'
      }, () => {
        const zip = new AdmZip(getMCDir() + '/norisk/lwjgl-2.9.3.zip')
        zip.extractAllTo(getMCDir() + '/norisk/natives', true)
        installLibraries(() => {
          const version = NRC_STANDALONE
          const mcDir = getMCDir()
          const java = process.env.JAVA_HOME + '.jar' as string
          console.log(profile)
          console.log(version.mainClass)
          console.log(`-Djava.library.path=${getNatives(version.assetIndex)}`)
          console.log(`${mcDir + '/versions/1.8.9-NRC/1.8.9-NRC.jar'}`)
          console.log(`${version.libraries?.split('MCDIR').join(mcDir)}`)
          /// let jarPath = app.getAppPath() + ‘\\student-portal-api.jar’;

          const child = child_process.spawn('java', [
            '-Xms1024M',
            '-Xmx1024M',
            '-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump',
            `-Djava.library.path=${getNatives(version.assetIndex)}`,
            `-Dminecraft.client.jar=${mcDir + '/versions/1.8.9-NRC/1.8.9-NRC.jar'}`,
            '-cp',
            `${version.libraries?.split('MCDIR').join(mcDir)}`,
            `${version.mainClass}`,
            '--version', version.folderName,
            '--gameDir', mcDir,
            '--assetsDir', mcDir + '/assets',
            '--username', 'NoRiskk',
            '--assetIndex', version.assetIndex,
            '--uuid', profile.minecraftProfile.id,
            '--accessToken', profile.accessToken,
            '--userProperties', profile.userProperites.length === 0 ? '' : '',
            '--userType', profile.type,
            `${version.tweakClass}`
          ], { cwd: getMCDir(), detached: false })
          console.log(child)
          child.stdout.on('data', (data) => console.log('data', data.toString('utf-8')))
          child.stderr.on('data', (data) => console.log('data', data.toString('utf-8')))
          child.on('close', (code) => console.log('close', code))
        })
      })
    })
  })
}

const installLibraries = (cb: any) => {
  console.log('install libraries')
  const json: LauncherJSON = JSON.parse(fs.readFileSync(getMCDir() + NRC_STANDALONE.jsonPath) as unknown as string)
  const library: Array<Library> = json.libraries.filter(value => {
    return value.downloads?.artifact?.url && value.downloads?.artifact?.path
  })
  downloadMinecraftDependenciesRecursiv(library, 0, cb)
}

const downloadMinecraftDependenciesRecursiv = (library: Array<Library>, index: number, cb: any) => {
  const value = library[index]
  if (value) {
    if (fs.existsSync(getMCDir() + '/libraries/' + value.downloads.artifact.path)) {
      console.log('Found file' + value.downloads.artifact.path)
      downloadMinecraftDependenciesRecursiv(library, index + 1, cb)
    } else {
      downloadAndWriteFile(value.downloads.artifact.url,
        { directory: getMCDir() + '/libraries/', filename: value.downloads.artifact.path },
        () => {
          console.log('UND NÄCHSTE RUNDE')
          downloadMinecraftDependenciesRecursiv(library, index + 1, cb)
        })
    }
  } else {
    cb()
    console.log('ENDE IM GELÄNDE')
  }
}
