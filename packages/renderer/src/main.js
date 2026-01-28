import './style.css'
import { updateHandler } from './updateHandler.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="update-button" type="button">
        Check for updates
      </button>
      <p id="update-status" style="margin-top: 10px;"></p>
      <div id="update-notes" style="margin-top: 10px; display: flex; flex-direction: column; gap: 12px; max-width: 500px;"></div>
    </div>
  </div>
`

const updateButton = document.querySelector('#update-button')
const statusP = document.querySelector('#update-status')
const notesDiv = document.querySelector('#update-notes')
updateHandler(updateButton, statusP, notesDiv)