"use strict";

const songFileDir: string = './assets/music/'
const songFileType: string = '.wav'

const songFiles: string[] = [
  'Cherry',
  'Demyelination',
  'Microlattice',
  'OGLE-TR-122b',
  'Ozone',
  'WF6',
  'Who_Let_This_Guy_in_Here!'
]

/* Stateful Variables */
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const next = document.getElementById('next')
const before = document.getElementById('before')
const songList = document.getElementById('song-list')
const songTitle = document.getElementById('song-header')
const songImage = document.getElementById('song-image') as HTMLImageElement

const audio = new Audio()
let currentSong: HTMLElement
let currentIndex: number = 0

const songElements: HTMLElement[] = []
const songNames: string[] = []
const paths: string[] = []

let hasPlayed: boolean = false

function replaceAll(s: string, search: string, replace: string): string {
  return s.split(search).join(replace)
}

/**
 * Plays a song in paths array at a given index from the audio instance.
 * @param {number} index
 * @returns {void}
 */
function playAtIndex(index: number): void {
  currentIndex = index
  const currentPath = paths[currentIndex]

  if (!audio.paused) {
    audio.pause()
    audio.currentTime = 0
  }

  audio.src = currentPath

  currentSong.classList.remove('current-song')
  currentSong = songElements[currentIndex]
  currentSong.classList.add('current-song')

  if (songTitle !== null && play !== null && pause !== null && songImage !== null) {
    songTitle.innerText = songNames[index]
    play.hidden = true
    pause.hidden = false

    audio.play()
    hasPlayed = true
    songImage.src = './assets/jumpyBug.gif'
  }
}

/**
 * Toggles the current Audio instance between play and pause.
 */
function togglePlay(): void {
  if (songTitle !== null && play !== null && pause !== null && songImage !== null) {
    if (!audio.paused) {
      play.hidden = false
      pause.hidden = true
      audio.pause()
      songImage.src = './assets/jumpyBug_paused.png'
    } else {
      play.hidden = true
      pause.hidden = false
      audio.play()
      songImage.src = './assets/jumpyBug.gif'
    }
  }
}

/**
 * Plays the song after the current index.
 */
function playNext(): void {
  playAtIndex((currentIndex + 1) % paths.length)
}

/**
 * Plays the song before the current index.
 */
function playPrevious(): void {
  playAtIndex((currentIndex - 1 + paths.length) % paths.length)
}

/**
 * Initialization
 */
function init(): void {
  if (songList !== null && songTitle !== null && next !== null && before !== null && play !== null && pause !== null) {
    songFiles.forEach((file, i) => {
      const songElem = document.createElement('span')
      songElem.classList.add('song')
      const songName = replaceAll(file, '_', ' ')

      songNames.push(songName)

      songElem.innerText = songName
      songList.appendChild(songElem)
      songElements.push(songElem)

      const path = songFileDir + file + songFileType

      paths.push(path)

      songElem.onclick = () => {
        playAtIndex(i)
      }
    })

    currentSong = songElements[0]
    currentSong.classList.add('current-song')
    songTitle.innerText = replaceAll(currentSong.innerText, '_', ' ')

    audio.addEventListener('ended', playNext, false)

    next.addEventListener('click', playNext)
    before.addEventListener('click', playPrevious)

    play.addEventListener('click', () => {
      play.hidden = true
      pause.hidden = false
      if (!hasPlayed) {
        playAtIndex(currentIndex)
      } else {
        if (!audio.paused) {
          audio.pause()
          audio.currentTime = 0
        }
        audio.play()
        songImage.src = './assets/jumpyBug.gif'
      }
    })

    pause.addEventListener('click', () => {
      play.hidden = false
      pause.hidden = true
      audio.pause()
      songImage.src = './assets/jumpyBug_paused.png'
    })

    document.body.onkeydown = function (e) {
      if (hasPlayed) {
        if (e.keyCode === 32) {
          togglePlay()
        }
      }
    }

    audio.src = paths[0]
  }
}

init()
