import { ipcRenderer } from 'electron';

const metadata = await ipcRenderer.invoke('get-metadata')

export { metadata };
