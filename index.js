'use strict';
var songFileDir = './assets/music/';
var songFileType = '.wav';
var songFiles = [
    'Cherry',
    'Demyelination',
    'Microlattice',
    'OGLE-TR-122b',
    'Ozone',
    'WF6',
    'Who_Let_This_Guy_in_Here!'
];
/* Stateful Variables */
var play = document.getElementById('play');
var pause = document.getElementById('pause');
var next = document.getElementById('next');
var before = document.getElementById('before');
var songList = document.getElementById('song-list');
var songTitle = document.getElementById('song-header');
var songImage = document.getElementById('song-image');
var audio = new Audio();
var currentSong;
var currentIndex = 0;
var songElements = [];
var songNames = [];
var paths = [];
var hasPlayed = false;
function replaceAll(s, search, replace) {
    return s.split(search).join(replace);
}
/**
 * Plays a song in paths array at a given index from the audio instance.
 * @param {number} index
 * @returns {void}
 */
function playAtIndex(index) {
    currentIndex = index;
    var currentPath = paths[currentIndex];
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio.src = currentPath;
    currentSong.classList.remove('current-song');
    currentSong = songElements[currentIndex];
    currentSong.classList.add('current-song');
    if (songTitle !== null && play !== null && pause !== null && songImage !== null) {
        songTitle.innerText = songNames[index];
        play.hidden = true;
        pause.hidden = false;
        void audio.play();
        hasPlayed = true;
        songImage.src = './assets/jumpyBug.gif';
    }
}
/**
 * Toggles the current Audio instance between play and pause.
 */
function togglePlay() {
    if (songTitle !== null && play !== null && pause !== null && songImage !== null) {
        if (!audio.paused) {
            play.hidden = false;
            pause.hidden = true;
            audio.pause();
            songImage.src = './assets/jumpyBug_paused.png';
        }
        else {
            play.hidden = true;
            pause.hidden = false;
            void audio.play();
            songImage.src = './assets/jumpyBug.gif';
        }
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
/**
 * Initialization
 */
function init() {
    if (songList !== null && songTitle !== null && next !== null && before !== null && play !== null && pause !== null) {
        songFiles.forEach(function (file, i) {
            var songElem = document.createElement('span');
            songElem.classList.add('song');
            var songName = replaceAll(file, '_', ' ');
            songNames.push(songName);
            songElem.innerText = songName;
            songList.appendChild(songElem);
            songElements.push(songElem);
            var path = songFileDir + file + songFileType;
            paths.push(path);
            songElem.onclick = function () {
                playAtIndex(i);
            };
        });
        currentSong = songElements[0];
        currentSong.classList.add('current-song');
        songTitle.innerText = replaceAll(currentSong.innerText, '_', ' ');
        audio.addEventListener('ended', playNext, false);
        next.addEventListener('click', playNext);
        before.addEventListener('click', playPrevious);
        play.addEventListener('click', function () {
            if (play !== null && pause !== null) {
                play.hidden = true;
                pause.hidden = false;
                if (!hasPlayed) {
                    playAtIndex(currentIndex);
                }
                else {
                    if (!audio.paused) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    void audio.play();
                    songImage.src = './assets/jumpyBug.gif';
                }
            }
        });
        pause.addEventListener('click', function () {
            play.hidden = false;
            pause.hidden = true;
            audio.pause();
            songImage.src = './assets/jumpyBug_paused.png';
        });
        document.body.onkeydown = function (e) {
            if (hasPlayed) {
                if (e.keyCode === 32) {
                    togglePlay();
                }
            }
        };
        audio.src = paths[0];
    }
}
init();
