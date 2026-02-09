import './style.css'
import { updateHandler } from './updateHandler.js'
import { metadata } from '@app/preload'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Pre-release!</h1>
    <h3>Current version: ${metadata.appVersion}</h3>
    <div class="card">
      <button id="update-button" type="button">
        Check for updates
      </button>
      <p id="update-status"></p>
      <div id="update-notes"></div>
    </div>
  </div>
`

const updateButton = document.querySelector('#update-button')
const statusP = document.querySelector('#update-status')
const notesDiv = document.querySelector('#update-notes')
updateHandler(updateButton, statusP, notesDiv)