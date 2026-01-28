import { appUpdater } from '@app/preload'

export function updateHandler(updateButton, statusP, notesDiv) {
  let status = {
    currentStatus: 'checking',
    downloaded: false,
    updateInfo: null,
  }

  const setStatus = (newStatus) => {
    status = { ...status, ...newStatus }
  }

  updateButton.addEventListener('click', () => {
    if (status.downloaded) {
      appUpdater.quitAndInstallUpdate()
    } else if (status.updateInfo) {
      statusP.textContent = 'Downloading update...'
      appUpdater.downloadUpdate()
        .then(() => {
          statusP.textContent = 'Update was downloaded successfully ✅'
          updateButton.textContent = 'Quit and install update'
          setStatus({ downloaded: true })
        })
        .catch((error) => {
          statusP.textContent = error
        })
    } else {
      statusP.textContent = 'Checking for updates...'
      appUpdater.checkForUpdate()
        .then((result) => {
          if (result?.isUpdateAvailable) {
            setStatus({ updateInfo: result.updateInfo })
            updateButton.textContent = 'Download update'
            statusP.textContent = `Update available (v${result.updateInfo.version})`
            notesDiv.innerHTML = result.updateInfo.releaseNotes.map(
              (note) => (
                `<div>
                  <p style="font-weight: bold; font-size: 22px;">${note.version}</p>
                  ${note.note}
                </div>`
              )
            ).join('')
          } else {
            setStatus({ updateInfo: null })
            updateButton.textContent = 'Check for updates'
            statusP.textContent = 'No updates available'
          }
        })
        .catch((error) => {
          statusP.textContent = error
        })
    }
  })

  appUpdater.onDownloadingUpdateProgress((progressInfo) => {
    statusP.textContent = `Downloading update (${progressInfo.percent.toFixed(2)}%)`
  })
}
