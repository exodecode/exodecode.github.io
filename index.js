const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');
const before = document.getElementById('before');
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-header');

const songList = document.getElementById('song-list');

const songFileDir = './assets/music/';
const songFileType = '.wav';
const songFiles = [
    'Cherry',
    'Demyelination',
    'Microlattice',
    'OGLE-TR-122b',
    'Ozone',
    'WF6',
    'Who_Let_This_Guy_in_Here',
];

let songElements = [];

// const songElements = [...document.getElementsByClassName('song')];
// console.log(songElements);

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

let currentSong;

let currentIndexer = 0;
let currentIndex = 0;

let songNames = [];

let paths = [];

songFiles.forEach((file, i) => {
    let songElem = document.createElement('span');
    songElem.classList.add('song');
    let songName = replaceAll(file, '_', ' ')
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



function playNext(){
    const i = currentIndex % paths.length;
    currentIndex = i;
    playAtIndex(currentIndex);
}

function playAtIndex(index) {
    // console.log(index)
    currentIndex = index;
    const currentPath = paths[currentIndex];
    // console.log(currentPath);
    audioPlayer.src = currentPath;

    currentSong.classList.remove("current-song");
    currentSong = songElements[currentIndex];
    // console.log(currentSong);
    currentSong.classList.add("current-song");

    songTitle.innerText = songNames[index];

    play.hidden = true;
    pause.hidden = false;

    audioPlayer.play();
}



currentSong = songElements[0]
currentSong.classList.add("current-song");
songTitle.innerText =  replaceAll(currentSong.innerText, '_', ' ');

// songElements.forEach(song => {
// });

next.onclick = () => {
    playAtIndex((currentIndex + 1) % paths.length);
}

before.onclick = () => {
    playAtIndex((currentIndex - 1 + paths.length) % paths.length);
}

play.onclick = () => {
    play.hidden = true;
    pause.hidden = false;
    audioPlayer.play();
}

pause.onclick = () => {
    play.hidden = false;
    pause.hidden = true;
    audioPlayer.pause();
    // audioPlayer.currentTime = 0;
}