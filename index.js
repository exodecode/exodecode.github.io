const songFileDir = './assets/music/';
const songFileType = '.wav';

const songFiles = [
  'Cherry',
  'Demyelination',
  'Microlattice',
  'OGLE-TR-122b',
  'Ozone',
  'WF6',
  'Who_Let_This_Guy_in_Here!',
];

/* Stateful Variables */
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');
const before = document.getElementById('before');
const songList = document.getElementById('song-list');
const songImage = document.getElementById('song-image');
const songTitle = document.getElementById('song-header');

const audio = new Audio();
let currentSong;
let currentIndex = 0;

const songElements = [];
const songNames = [];
const paths = [];

let hasPlayed = false;

/**
 * Utility function to replace all occurrences of a
 * string(search) with another string(replace) inside a given string and then
 * returns the result as a new string.
 * @param {string} string
 * @param {string} search
 * @param {string} replace
 * @return {string}
 */
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

/**
 * Sets audio source to a path in paths array at index.
 * @param {number} index
 */
function playAtIndex(index) {
  currentIndex = index;
  const currentPath = paths[currentIndex];

  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio.src = currentPath;

  currentSong.classList.remove('current-song');
  currentSong = songElements[currentIndex];
  currentSong.classList.add('current-song');

  songTitle.innerText = songNames[index];

  play.hidden = true;
  pause.hidden = false;

  audio.play();
  hasPlayed = true;
  songImage.src = './assets/jumpyBug.gif';
}

/**
 * Toggles the current Audio instance between play and pause.
 */
function togglePlay() {
  if (!audio.paused) {
    play.hidden = false;
    pause.hidden = true;
    audio.pause();
    songImage.src = './assets/jumpyBug_paused.png';
  } else {
    play.hidden = true;
    pause.hidden = false;
    audio.play();
    songImage.src = './assets/jumpyBug.gif';
  }
}

/**
 * Plays the song after the current index.
 */
function playNext() {
  playAtIndex((currentIndex + 1) % paths.length);
}

/**
 * Plays the song before the current index.
 */
function playPrevious() {
  playAtIndex((currentIndex - 1 + paths.length) % paths.length);
}

songFiles.forEach((file, i) => {
  const songElem = document.createElement('span');
  songElem.classList.add('song');
  const songName = replaceAll(file, '_', ' ');

  songNames.push(songName);

  songElem.innerText = songName;
  songList.appendChild(songElem);
  songElements.push(songElem);

  const path = songFileDir + file +songFileType;

  paths.push(path);

  songElem.onclick = () => {
    playAtIndex(i);
  };
});

currentSong = songElements[0];
currentSong.classList.add('current-song');
songTitle.innerText = replaceAll(currentSong.innerText, '_', ' ');

audio.addEventListener('ended', playNext, false);

next.addEventListener('click', playNext);
before.addEventListener('click', playPrevious);

play.addEventListener('click', () => {
  play.hidden = true;
  pause.hidden = false;
  if (!hasPlayed) {
    playAtIndex(currentIndex);
  } else {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    audio.play();
    songImage.src = './assets/jumpyBug.gif';
  }
});

pause.addEventListener('click', () => {
  play.hidden = false;
  pause.hidden = true;
  audio.pause();
  songImage.src = './assets/jumpyBug_paused.png';
});

document.body.onkeydown = function(e) {
  if (hasPlayed) {
    if ( e.keyCode == 32 ) {
      togglePlay();
    }
  }
};

audio.src = paths[0];
