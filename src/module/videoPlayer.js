export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player')
  const videoButtonPlay = document.querySelector('.video-button__play')
  const videoButtonStop = document.querySelector('.video-button__stop')
  const videoTimePassed = document.querySelector('.video-time__passed')
  const videoProgress = document.querySelector('.video-progress ')
  const videoTimeTotal = document.querySelector('.video-time__total')
  const videoVolume = document.querySelector('.video-volume')
  const volumeOff = document.querySelector('.fa-volume-off')
  const volumeUp = document.querySelector('.fa-volume-up')
  const videoFullscreen = document.querySelector('.video-fullscreen')

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen()
  })

  videoPlayer.addEventListener('fullsccreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true
    } else {
      videoPlayer.controls = false
    }
  })

  const toogleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause')
      videoButtonPlay.classList.add('fa-play')
    } else {
      videoButtonPlay.classList.add('fa-pause')
      videoButtonPlay.classList.remove('fa-play')
    }
  }

  const tooglePlay = (event) => {
    event.preventDefault()
    if (videoPlayer.paused) {
      videoPlayer.play()
    } else {
      videoPlayer.pause()
    }

    toogleIcon()
  }

  const stopPlay = () => {
    videoPlayer.pause()
    videoPlayer.currentTime = 0
  }

  const addZero = (n) => (n < 10 ? '0' + n : n)

  const changeValue = () => {
    const valueVolume = videoVolume.value
    videoPlayer.volume = valueVolume / 100
  }

  videoPlayer.addEventListener('click', tooglePlay)
  videoButtonPlay.addEventListener('click', tooglePlay)

  videoPlayer.addEventListener('play', toogleIcon)
  videoPlayer.addEventListener('pause', toogleIcon)

  videoButtonStop.addEventListener('click', stopPlay)

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime
    const duration = videoPlayer.duration

    videoProgress.value = (currentTime / duration) * 100

    let minutePassed = Math.floor(currentTime / 60)
    let secondsPassed = Math.floor(currentTime % 60)

    let minuteTotal = Math.floor(duration / 60)
    let secondsTotal = Math.floor(duration % 60)

    videoTimePassed.textContent =
      addZero(minutePassed) + ':' + addZero(secondsPassed)
    videoTimeTotal.textContent =
      addZero(minuteTotal) + ':' + addZero(secondsTotal)
  })

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration
    const value = videoProgress.value
    videoPlayer.currentTime = (value * duration) / 100
  })

  videoVolume.addEventListener('input', changeValue)
  changeValue()

  volumeOff.addEventListener('click', () => {
    if (videoPlayer.volume != 0) {
      videoPlayer.volume = 0
      videoVolume.value = 0
    } else {
      videoPlayer.volume = 0.5
      videoVolume.value = 50
    }
  })

  volumeUp.addEventListener('click', () => {
    if (videoPlayer.volume != 1) {
      videoPlayer.volume = 1
      videoVolume.value = 100
    } else if (videoPlayer.volume == 100) {
      videoPlayer.volume = 0.5
      videoVolume.value = 50
      console.log(1)
    }
  })

  videoVolume.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100)
  })

  videoPlayerInit.stop = () => {
    videoPlayer.pause()
    toogleIcon()
  }
}
