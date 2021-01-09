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