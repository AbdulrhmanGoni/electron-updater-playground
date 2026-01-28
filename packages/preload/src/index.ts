import { ipcRenderer } from 'electron';

const metadata = await ipcRenderer.invoke('get-metadata')

type CheckForUpdateResponse = {
    isUpdateAvailable: boolean;
    updateInfo: {
        tag: string,
        version: string,
        path: string,
        sha512: string,
        releaseDate: string,
        releaseName: string,
        releaseNotes: [
            {
                version: string,
                note: string
            }
        ]
    }
}

type ProgressInfo = {
    total: number;
    delta: number;
    transferred: number;
    percent: number;
    bytesPerSecond: number;
}

const appUpdater = {
    checkForUpdate: (): Promise<CheckForUpdateResponse | null> =>
        ipcRenderer.invoke('check-for-update'),
    downloadUpdate: (): Promise<void> =>
        ipcRenderer.invoke('download-update'),
    cancelUpdate: (): Promise<void> =>
        ipcRenderer.invoke('cancel-downloading-update'),
    onDownloadingUpdateProgress: (cb: (progressInfo: ProgressInfo) => void): void => {
        ipcRenderer.on('downloading-update-progress', (_: any, progressInfo: ProgressInfo) => cb(progressInfo));
    },
    quitAndInstallUpdate: (): Promise<void> =>
        ipcRenderer.invoke('quit-and-install-update'),
};

export { metadata, appUpdater };
