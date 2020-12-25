import { radioPlayerInit } from './module/radioPlayer.js'
import { musicPlayerInit } from './module/musicPlayer.js'
import { videoPlayerInit } from './module/videoPlayer.js'

const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const temp = document.querySelector('.temp')

const deactivatoinPlayer = () => {
  temp.style.display = 'none'
  playerBtn.forEach((item) => {
    item.classList.remove('active')
  })
  playerBlock.forEach((item) => {
    item.classList.remove('active')
  })

  radioPlayerInit.stop()
  videoPlayerInit.stop()
  musicPlayerInit.stop()
}

playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    deactivatoinPlayer()
    btn.classList.add('active')
    playerBlock[i].classList.add('active')
  })
})

videoPlayerInit()
radioPlayerInit()
musicPlayerInit()
