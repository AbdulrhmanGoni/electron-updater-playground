import type { CancellationToken } from 'electron-updater';
import electronUpdater from 'electron-updater';
const { autoUpdater, CancellationToken: CancellationTokenConstructor } = electronUpdater;
import * as metadata from './metadata.js';

let cancellationToken: CancellationToken | null = null;

function isGreaterVersion(a: string, b: string) {
    const v1 = a.split('.').map(Number);
    const v2 = b.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
        if (v1[i] > v2[i]) return true;
        if (v1[i] < v2[i]) return false;
    }

    return false;
}

export async function checkForUpdate() {
    const newUpdate = await autoUpdater.checkForUpdatesAndNotify();
    if (newUpdate && isGreaterVersion(newUpdate.updateInfo.version, metadata.appVersion)) {
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
