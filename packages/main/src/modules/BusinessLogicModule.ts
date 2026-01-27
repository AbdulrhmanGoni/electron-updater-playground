import type { AppModule } from '../AppModule.js';
import { ModuleContext } from '../ModuleContext.js';
import { ipcMain } from 'electron';
import * as appUpdater from '../appUpdater.js';
import * as metadata from '../metadata.js';

class BusinessLogicModule implements AppModule {
    async enable({ }: ModuleContext): Promise<void> {
        ipcMain.handle('check-for-update', () => appUpdater.checkForUpdate());
        ipcMain.handle('download-update', () => appUpdater.downloadUpdate());
        ipcMain.handle('cancel-downloading-update', () => appUpdater.cancelUpdate());
        ipcMain.handle('quit-and-install-update', () => appUpdater.quitAndInstallUpdate());

        ipcMain.handle('get-metadata', () => ({ ...metadata }));
    }
}

export function createBusinessLogicModule() {
    return new BusinessLogicModule();
}
