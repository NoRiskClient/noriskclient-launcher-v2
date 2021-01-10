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
  console.log(libraries)
  // console.log(NRC_FABRIC_1_16_4.libraries.split('MCDIR').join(getMCDir()))
  const launchOptions = getLaunchOptions(version, profile)
  console.log('C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/tiny-mappings-parser/0.2.2.14/tiny-mappings-parser-0.2.2.14.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/sponge-mixin/0.8.2+build.24/sponge-mixin-0.8.2+build.24.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/tiny-remapper/0.3.0.70/tiny-remapper-0.3.0.70.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/access-widener/1.0.0/access-widener-1.0.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/fabric-loader-sat4j/2.3.5.4/fabric-loader-sat4j-2.3.5.4.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/google/jimfs/jimfs/1.2-fabric/jimfs-1.2-fabric.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/ow2/asm/asm/9.0/asm-9.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/ow2/asm/asm-analysis/9.0/asm-analysis-9.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/ow2/asm/asm-commons/9.0/asm-commons-9.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/ow2/asm/asm-tree/9.0/asm-tree-9.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/ow2/asm/asm-util/9.0/asm-util-9.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/google/guava/guava/21.0/guava-21.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/fabricmc/intermediary/1.16.4/intermediary-1.16.4.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/de/noriskclient/fabric-loader/0.10.8/fabric-loader-0.10.8.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/patchy/1.1/patchy-1.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/java/dev/jna/jna/4.4.0/jna-4.4.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/ibm/icu/icu4j/66.1/icu4j-66.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/javabridge/1.0.22/javabridge-1.0.22.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/sf/jopt-simple/jopt-simple/5.0.3/jopt-simple-5.0.3.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/io/netty/netty-all/4.1.25.Final/netty-all-4.1.25.Final.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/google/guava/guava/21.0/guava-21.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/commons/commons-lang3/3.5/commons-lang3-3.5.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/commons-io/commons-io/2.5/commons-io-2.5.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/commons-codec/commons-codec/1.10/commons-codec-1.10.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/brigadier/1.0.17/brigadier-1.0.17.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/datafixerupper/4.0.26/datafixerupper-4.0.26.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/google/code/gson/gson/2.8.0/gson-2.8.0.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/authlib/2.1.28/authlib-2.1.28.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/it/unimi/dsi/fastutil/8.2.1/fastutil-8.2.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/logging/log4j/log4j-api/2.8.1/log4j-api-2.8.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/apache/logging/log4j/log4j-core/2.8.1/log4j-core-2.8.1.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl/3.2.2/lwjgl-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-jemalloc/3.2.2/lwjgl-jemalloc-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-openal/3.2.2/lwjgl-openal-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-opengl/3.2.2/lwjgl-opengl-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-glfw/3.2.2/lwjgl-glfw-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-stb/3.2.2/lwjgl-stb-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/org/lwjgl/lwjgl-tinyfd/3.2.2/lwjgl-tinyfd-3.2.2.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/libraries/com/mojang/text2speech/1.11.3/text2speech-1.11.3.jar;C:\\Users\\max\\AppData\\Roaming/.minecraft/versions/1.16.4-NRC-Fabric/1.16.4-NRC-Fabric.jar'
  )
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
  console.log(set)
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
