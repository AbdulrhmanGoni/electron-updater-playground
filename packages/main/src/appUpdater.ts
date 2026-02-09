import type { CancellationToken } from 'electron-updater';
import electronUpdater from 'electron-updater';
import semver from 'semver';
const { autoUpdater, CancellationToken: CancellationTokenConstructor } = electronUpdater;
import * as metadata from './metadata.js';

let cancellationToken: CancellationToken | null = null;

export async function checkForUpdate() {
    const newUpdate = await autoUpdater.checkForUpdatesAndNotify();
    if (newUpdate && semver.gt(newUpdate.updateInfo.version, metadata.appVersion)) {
        return newUpdate
    }
    return null
}

export function downloadUpdate() {
    cancellationToken = new CancellationTokenConstructor();
    return autoUpdater.downloadUpdate(cancellationToken);
}

export function cancelUpdate() {
    if (cancellationToken && !cancellationToken.cancelled) {
        cancellationToken.cancel();
    }
}

export function quitAndInstallUpdate() {
    autoUpdater.quitAndInstall();
}
