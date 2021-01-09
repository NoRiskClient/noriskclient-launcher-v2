export interface AssetIndex {
  id: string;
  sha1: string;
  size: number;
  totalSize: number;
  url: string;
}

export interface Artifact {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface NativesLinux {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface NativesOsx {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface NativesWindows {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface NativesWindows32 {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface NativesWindows64 {
  path: string;
  sha1: string;
  size: number;
  url: string;
}



export interface Downloads {
  artifact: Artifact;
}

export interface Os {
  name: string;
}

export interface Rule {
  action: string;
  os: Os;
}

export interface Extract {
  exclude: string[];
}

export interface Natives {
  linux: string;
  osx: string;
  windows: string;
}

export interface Library {
  downloads: Downloads;
  name: string;
  rules: Rule[];
  extract: Extract;
  natives: Natives;
}

export interface File {
  id: string;
  sha1: string;
  size: number;
  url: string;
}

export interface Client {
  argument: string;
  file: File;
  type: string;
}

export interface Logging {
  client: Client;
}

export interface LauncherJSON {
  assetIndex: AssetIndex;
  assets: string;
  id: string;
  libraries: Library[];
  logging: Logging;
  mainClass: string;
  minecraftArguments: string;
  minimumLauncherVersion: number;
  releaseTime: Date;
  time: Date;
  type: string;
}
