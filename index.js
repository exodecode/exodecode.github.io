const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');
const before = document.getElementById('before');
const songTitle = document.getElementById('song-header');
const songList = document.getElementById('song-list');
const songImage = document.getElementById('song-image');

const audio = new Audio();

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
    
    if(!audio.paused){
        audio.pause();
        audio.currentTime = 0;
    }

    audio.src = currentPath;

    currentSong.classList.remove("current-song");
    currentSong = songElements[currentIndex];
    currentSong.classList.add("current-song");

    songTitle.innerText = songNames[index];

    play.hidden = true;
    pause.hidden = false;

    audio.play();
    hasPlayed = true;
    songImage.src = './assets/jumpyBug.gif';
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

audio.addEventListener("ended", playNext, false);

next.addEventListener('click', playNext);
before.addEventListener('click', playPrevious);

play.addEventListener('click', () => {
    play.hidden = true;
    pause.hidden = false;
    if(!hasPlayed){
        playAtIndex(currentIndex);
    }
    else{
        if(!audio.paused){
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

function togglePlay()
{
    if(!audio.paused)
    {
        play.hidden = false;
        pause.hidden = true;
        audio.pause();
        songImage.src = './assets/jumpyBug_paused.png';
    }
    else{
        play.hidden = true;
        pause.hidden = false;
        audio.play();
        songImage.src = './assets/jumpyBug.gif';
    }
}

document.body.onkeydown = function(e) {
    if(hasPlayed){
        if( e.keyCode == 32 ) {
            togglePlay();
        }
    }
}

audio.src = paths[0];