const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');
const before = document.getElementById('before');
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-header');
const songList = document.getElementById('song-list');

const songFileDir = './assets/music/';
const songFileType = '.wav';

let currentSong;
let currentIndex = 0;
let songElements = [];
let songNames = [];
let paths = [];

const songFiles = [
    'Cherry',
    'Demyelination',
    'Microlattice',
    'OGLE-TR-122b',
    'Ozone',
    'WF6',
    'Who_Let_This_Guy_in_Here!',
];

let hasPlayed = false;

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

function playNext()
{
    playAtIndex((currentIndex + 1) % paths.length);
}

function playPrevious()
{
    playAtIndex((currentIndex - 1 + paths.length) % paths.length);
}

function playAtIndex(index) {
    currentIndex = index;
    const currentPath = paths[currentIndex];
    audioPlayer.src = currentPath;

    currentSong.classList.remove("current-song");
    currentSong = songElements[currentIndex];
    currentSong.classList.add("current-song");

    songTitle.innerText = songNames[index];

    play.hidden = true;
    pause.hidden = false;

    audioPlayer.play();
    hasPlayed = true;
}

songFiles.forEach((file, i) => {
    let songElem = document.createElement('span');
    songElem.classList.add('song');
    let songName = replaceAll(file, '_', ' ');

    songNames.push(songName);

    songElem.innerText = songName;
    songList.appendChild(songElem);
    songElements.push(songElem);

    const path = songFileDir + file +songFileType

    paths.push(path);

    songElem.onclick = () => 
    {
        playAtIndex(i);
    }
});

currentSong = songElements[0]
currentSong.classList.add("current-song");
songTitle.innerText =  replaceAll(currentSong.innerText, '_', ' ');

audioPlayer.addEventListener("ended", playNext, false);

next.onclick = playNext;
before.onclick = playPrevious;

play.onclick = () => {
    play.hidden = true;
    pause.hidden = false;
    if(!hasPlayed){
        playAtIndex(0);
    }
    else{
        audioPlayer.play();
    }
}

pause.onclick = () => {
    play.hidden = false;
    pause.hidden = true;
    audioPlayer.pause();
}

function togglePlay()
{
    if(!audioPlayer.paused)
    {
        play.hidden = false;
        pause.hidden = true;
        audioPlayer.pause();
    }
    else{
        play.hidden = true;
        pause.hidden = false;
        audioPlayer.play();
    }
}

document.body.onkeydown = function(e) {
    if(hasPlayed){
        if( e.keyCode == 32 ) {
            togglePlay();
        }
    }
}