import { getMCDir, getNatives, getOS } from './InstallerUtils'
import { MinecraftVersion, NRC_FABRIC_1_16_4, NRC_FORGE } from '../interfaces/MinecraftVersion'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import fs from 'fs'
import { LauncherProfile } from '../interfaces/LauncherAccount'
// eslint-disable-next-line camelcase
import child_process, { ChildProcessWithoutNullStreams } from 'child_process'

export const getJVMOptions = (version: string): Array<string> => {
  const jvm: Array<string> = [
    '-XX:-UseAdaptiveSizePolicy',
    '-XX:-OmitStackTraceInFastThrow',
    '-Dfml.ignorePatchDiscrepancies=true',
    '-Dfml.ignoreInvalidMinecraftCertificates=true',
    '-Xms1024M',
    '-Xmx1024M',
      `-Djava.library.path=${getNatives(version)}`
  ]
  const opts: any = {
    windows: '-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump',
    macosx: '-XstartOnFirstThread',
    linux: '-Xss1M'
  }
  jvm.push(opts[getOS()])
  // if (this.options.customArgs) jvm = jvm.concat(this.options.customArgs)
  return jvm
}

export const getArgs = (version: MinecraftVersion, profile: LauncherProfile): Array<string> => {
  const mcDir = getMCDir()
  let args: Array<string> = []
  const JVMOptions = getJVMOptions(version.assetIndex)
  const libraries = getLibraries(version)
  const launchOptions = getLaunchOptions(version, profile)
  args = args.concat(JVMOptions, [`-Dminecraft.client.jar=${mcDir + version.jarPath}`, '-cp', libraries], launchOptions)
  return args
}

const getLibraries = (version: MinecraftVersion): string => {
  const json: LauncherJSON = JSON.parse(fs.readFileSync(getMCDir() + version.jsonPath) as unknown as string)
  const set = new Set()
  json.libraries.filter(lib => {
    if (lib.downloads && lib.downloads.artifact && !parseRule(lib)) {
      return set.add(getMCDir() + '/libraries/' + lib.downloads.artifact.path)
    }
  })
  set.add(getMCDir() + version.jarPath)
  const stringArray: string[] = []
  set.forEach(value => {
    stringArray.push(value as string)
  })
  console.log(stringArray)
  return stringArray.join(getOS() === 'windows' ? ';' : ':')
}

const getLaunchOptions = (version: MinecraftVersion, profile: LauncherProfile): Array<string> => {
  const mcDir = getMCDir()
  return [`${version.mainClass}`,
    '--version', version.folderName,
    '--gameDir', mcDir,
    '--assetsDir', mcDir + '/assets',
    '--username', 'NoRiskk',
    '--assetIndex', version.assetIndex,
    '--uuid', profile.minecraftProfile.id,
    '--accessToken', profile.accessToken,
    '--userProperties', profile.userProperites.length === 0 ? '' : '',
    '--userType', 'mojang',
        `${version.tweakClass}`
  ]
}

const parseRule = (lib: Library) => {
  if (lib.rules) {
    if (lib.rules.length > 1) {
      if (lib.rules[0].action === 'allow' &&
                lib.rules[1].action === 'disallow' &&
                lib.rules[1].os.name === 'osx') {
        return getOS() === 'macosx'
      } else {
        return true
      }
    } else {
      if (lib.rules[0].action === 'allow' && lib.rules[0].os) return getOS() !== 'macosx'
    }
  } else {
    return false
  }
}

export const launchGame = (version: MinecraftVersion, profile: LauncherProfile) : ChildProcessWithoutNullStreams => {
  const args = getArgs(version, profile)
  const child = child_process.spawn('java', args, { cwd: getMCDir(), detached: false })
  child.stdout.on('data', (data) => console.log('data', data.toString('utf-8')))
  child.stderr.on('data', (data) => console.log('data', data.toString('utf-8')))
  child.on('close', (code) => console.log('close', code))
  return child
}
