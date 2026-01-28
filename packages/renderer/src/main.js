import './style.css'
import { updateHandler } from './updateHandler.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite! 1</h1>
    <div class="card">
      <button id="update-button" type="button">
        Check for updates
      </button>
      <p id="update-status"></p>
    </div>
  </div>
`

const updateButton = document.querySelector('#update-button')
const statusP = document.querySelector('#update-status')
updateHandler(updateButton, statusP)