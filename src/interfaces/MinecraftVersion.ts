export interface MinecraftVersion {
  name: string,
  mainClass: string,
  folderName: string;
  jsonPath: string,
  assetIndex: string
  nativePath?: string,
  jarPath: string,
  tweakClass?: string,
  libraries?: string,
}

export const NRC_STANDALONE = {
  name: '1.8.9 Standalone',
  assetIndex: '1.8',
  mainClass: 'net.minecraft.launchwrapper.Launch',
  libraries: 'MCDIR/libraries/com/mojang/netty/1.6/netty-1.6.jar;MCDIR/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;MCDIR/libraries/net/java/dev/jna/jna/3.4.0/jna-3.4.0.jar;MCDIR/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;MCDIR/libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar;MCDIR/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;MCDIR/libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar;MCDIR/libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar;MCDIR/libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar;MCDIR/libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar;MCDIR/libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar;MCDIR/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;MCDIR/libraries/com/google/guava/guava/17.0/guava-17.0.jar;MCDIR/libraries/org/apache/commons/commons-lang3/3.3.2/commons-lang3-3.3.2.jar;MCDIR/libraries/commons-io/commons-io/2.4/commons-io-2.4.jar;MCDIR/libraries/commons-codec/commons-codec/1.9/commons-codec-1.9.jar;MCDIR/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;MCDIR/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;MCDIR/libraries/com/google/code/gson/gson/2.2.4/gson-2.2.4.jar;MCDIR/libraries/com/mojang/authlib/1.5.21/authlib-1.5.21.jar;MCDIR/libraries/com/mojang/realms/1.7.59/realms-1.7.59.jar;MCDIR/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;MCDIR/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;MCDIR/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;MCDIR/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-api/2.0-beta9/log4j-api-2.0-beta9.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-core/2.0-beta9/log4j-core-2.0-beta9.jar;MCDIR/libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar;MCDIR/libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar;MCDIR/libraries/tv/twitch/twitch/6.5/twitch-6.5.jar;MCDIR/libraries/de/noriskclient/NoRiskClient/1.8.9/NoRiskClient-1.8.9.jar;MCDIR/libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar;MCDIR/versions/1.8.9-NRC/1.8.9-NRC.jar',
  jsonPath: '/versions/1.8.9-NRC/1.8.9-NRC.json',
  jarPath: '/versions/1.8.9-NRC/1.8.9-NRC.jar',
  tweakClass: '--tweakClass=de.noriskclient.norisk.asm.ClassTweaker',
  folderName: '1.8.9-NRC'
}

export const NRC_FORGE = {
  name: '1.8.9 Forge',
  assetIndex: '1.8',
  mainClass: 'net.minecraft.launchwrapper.Launch',
  jsonPath: '/versions/1.8.9-NRC-Forge/1.8.9-NRC-Forge.json',
  jarPath: '/versions/1.8.9-NRC-Forge/1.8.9-NRC-Forge.jar',
  folderName: '1.8.9-NRC-Forge',
  tweakClass: '--tweakClass=net.minecraftforge.fml.common.launcher.FMLTweaker',
  libraries: 'MCDIR/libraries/de/noriskclient/forge/1.8.9/forge-1.8.9.jar;MCDIR/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;MCDIR/libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar;MCDIR/libraries/org/ow2/asm/asm-all/5.0.3/asm-all-5.0.3.jar;MCDIR/libraries/jline/jline/2.13/jline-2.13.jar;MCDIR/libraries/com/typesafe/akka/akka-actor_2.11/2.3.3/akka-actor_2.11-2.3.3.jar;MCDIR/libraries/com/typesafe/config/1.2.1/config-1.2.1.jar;MCDIR/libraries/org/scala-lang/scala-actors-migration_2.11/1.1.0/scala-actors-migration_2.11-1.1.0.jar;MCDIR/libraries/org/scala-lang/scala-compiler/2.11.1/scala-compiler-2.11.1.jar;MCDIR/libraries/org/scala-lang/plugins/scala-continuations-library_2.11/1.0.2/scala-continuations-library_2.11-1.0.2.jar;MCDIR/libraries/org/scala-lang/plugins/scala-continuations-plugin_2.11.1/1.0.2/scala-continuations-plugin_2.11.1-1.0.2.jar;MCDIR/libraries/org/scala-lang/scala-library/2.11.1/scala-library-2.11.1.jar;MCDIR/libraries/org/scala-lang/scala-parser-combinators_2.11/1.0.1/scala-parser-combinators_2.11-1.0.1.jar;MCDIR/libraries/org/scala-lang/scala-reflect/2.11.1/scala-reflect-2.11.1.jar;MCDIR/libraries/org/scala-lang/scala-swing_2.11/1.0.1/scala-swing_2.11-1.0.1.jar;MCDIR/libraries/org/scala-lang/scala-xml_2.11/1.0.2/scala-xml_2.11-1.0.2.jar;MCDIR/libraries/lzma/lzma/0.0.1/lzma-0.0.1.jar;MCDIR/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;MCDIR/libraries/java3d/vecmath/1.5.2/vecmath-1.5.2.jar;MCDIR/libraries/net/sf/trove4j/trove4j/3.0.3/trove4j-3.0.3.jar;MCDIR/libraries/com/mojang/netty/1.6/netty-1.6.jar;MCDIR/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;MCDIR/libraries/net/java/dev/jna/jna/3.4.0/jna-3.4.0.jar;MCDIR/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;MCDIR/libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar;MCDIR/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;MCDIR/libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar;MCDIR/libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar;MCDIR/libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar;MCDIR/libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar;MCDIR/libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar;MCDIR/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;MCDIR/libraries/com/google/guava/guava/17.0/guava-17.0.jar;MCDIR/libraries/org/apache/commons/commons-lang3/3.3.2/commons-lang3-3.3.2.jar;MCDIR/libraries/commons-io/commons-io/2.4/commons-io-2.4.jar;MCDIR/libraries/commons-codec/commons-codec/1.9/commons-codec-1.9.jar;MCDIR/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;MCDIR/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;MCDIR/libraries/com/google/code/gson/gson/2.2.4/gson-2.2.4.jar;MCDIR/libraries/com/mojang/authlib/1.5.21/authlib-1.5.21.jar;MCDIR/libraries/com/mojang/realms/1.7.59/realms-1.7.59.jar;MCDIR/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;MCDIR/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;MCDIR/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;MCDIR/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-api/2.0-beta9/log4j-api-2.0-beta9.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-core/2.0-beta9/log4j-core-2.0-beta9.jar;MCDIR/libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar;MCDIR/libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar;MCDIR/libraries/tv/twitch/twitch/6.5/twitch-6.5.jar;MCDIR/versions/1.8.9/1.8.9.jar'
}

export const NRC_FABRIC_1_16_4 = {
  name: '1.16.4 Fabric',
  assetIndex: '1.16',
  mainClass: 'net.fabricmc.loader.launch.knot.KnotClient',
  libraries: 'MCDIR/libraries/net/fabricmc/tiny-mappings-parser/0.2.2.14/tiny-mappings-parser-0.2.2.14.jar;MCDIR/libraries/net/fabricmc/sponge-mixin/0.8.2+build.24/sponge-mixin-0.8.2+build.24.jar;MCDIR/libraries/net/fabricmc/tiny-remapper/0.3.0.70/tiny-remapper-0.3.0.70.jar;MCDIR/libraries/net/fabricmc/access-widener/1.0.0/access-widener-1.0.0.jar;MCDIR/libraries/net/fabricmc/fabric-loader-sat4j/2.3.5.4/fabric-loader-sat4j-2.3.5.4.jar;MCDIR/libraries/com/google/jimfs/jimfs/1.2-fabric/jimfs-1.2-fabric.jar;MCDIR/libraries/org/ow2/asm/asm/9.0/asm-9.0.jar;MCDIR/libraries/org/ow2/asm/asm-analysis/9.0/asm-analysis-9.0.jar;MCDIR/libraries/org/ow2/asm/asm-commons/9.0/asm-commons-9.0.jar;MCDIR/libraries/org/ow2/asm/asm-tree/9.0/asm-tree-9.0.jar;MCDIR/libraries/org/ow2/asm/asm-util/9.0/asm-util-9.0.jar;MCDIR/libraries/com/google/guava/guava/21.0/guava-21.0.jar;MCDIR/libraries/net/fabricmc/intermediary/1.16.4/intermediary-1.16.4.jar;MCDIR/libraries/de/noriskclient/fabric-loader/0.10.8/fabric-loader-0.10.8.jar;MCDIR/libraries/com/mojang/patchy/1.1/patchy-1.1.jar;MCDIR/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;MCDIR/libraries/net/java/dev/jna/jna/4.4.0/jna-4.4.0.jar;MCDIR/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;MCDIR/libraries/com/ibm/icu/icu4j/66.1/icu4j-66.1.jar;MCDIR/libraries/com/mojang/javabridge/1.0.22/javabridge-1.0.22.jar;MCDIR/libraries/net/sf/jopt-simple/jopt-simple/5.0.3/jopt-simple-5.0.3.jar;MCDIR/libraries/io/netty/netty-all/4.1.25.Final/netty-all-4.1.25.Final.jar;MCDIR/libraries/com/google/guava/guava/21.0/guava-21.0.jar;MCDIR/libraries/org/apache/commons/commons-lang3/3.5/commons-lang3-3.5.jar;MCDIR/libraries/commons-io/commons-io/2.5/commons-io-2.5.jar;MCDIR/libraries/commons-codec/commons-codec/1.10/commons-codec-1.10.jar;MCDIR/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;MCDIR/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;MCDIR/libraries/com/mojang/brigadier/1.0.17/brigadier-1.0.17.jar;MCDIR/libraries/com/mojang/datafixerupper/4.0.26/datafixerupper-4.0.26.jar;MCDIR/libraries/com/google/code/gson/gson/2.8.0/gson-2.8.0.jar;MCDIR/libraries/com/mojang/authlib/2.1.28/authlib-2.1.28.jar;MCDIR/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;MCDIR/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;MCDIR/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;MCDIR/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;MCDIR/libraries/it/unimi/dsi/fastutil/8.2.1/fastutil-8.2.1.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-api/2.8.1/log4j-api-2.8.1.jar;MCDIR/libraries/org/apache/logging/log4j/log4j-core/2.8.1/log4j-core-2.8.1.jar;MCDIR/libraries/org/lwjgl/lwjgl/3.2.2/lwjgl-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-jemalloc/3.2.2/lwjgl-jemalloc-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-openal/3.2.2/lwjgl-openal-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-opengl/3.2.2/lwjgl-opengl-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-glfw/3.2.2/lwjgl-glfw-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-stb/3.2.2/lwjgl-stb-3.2.2.jar;MCDIR/libraries/org/lwjgl/lwjgl-tinyfd/3.2.2/lwjgl-tinyfd-3.2.2.jar;MCDIR/libraries/com/mojang/text2speech/1.11.3/text2speech-1.11.3.jar;MCDIR/versions/fabric-loader-0.10.6+build.214-1.16.4/fabric-loader-0.10.6+build.214-1.16.4.jar',
  folderName: '1.16.4-NRC-Fabric',
  jsonPath: '/versions/1.16.4-NRC-Fabric/1.16.4-NRC-Fabric.json',
  jarPath: '/versions/1.16.4-NRC-Fabric/1.16.4-NRC-Fabric.jar'
}

export const NRCVersions: Array<MinecraftVersion> = [NRC_STANDALONE, NRC_FORGE, NRC_FABRIC_1_16_4]
