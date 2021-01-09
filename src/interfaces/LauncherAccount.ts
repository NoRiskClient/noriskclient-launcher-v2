export interface MinecraftProfile {
    id: string;
    name: string;
}

export interface LauncherProfile {
    accessToken: string;
    eligibleForMigration: boolean;
    hasMultipleProfiles: boolean;
    legacy: boolean;
    localId: string;
    minecraftProfile: MinecraftProfile;
    persistent: boolean;
    remoteId: string;
    type: string;
    userProperites: any[];
    username: string;
}
