const play = document.getElementById('play');
const pause = document.getElementById('pause');

const songs = [...document.getElementsByClassName('song')];
console.log(songs);

let currentSong = songs[0];
currentSong.classList.add("current-song");

songs.forEach(song => {
    song.onclick = () => 
    {
        console.log(song);
        currentSong.classList.remove("current-song");
        currentSong = song;
        currentSong.classList.add("current-song");
    }
});

play.onclick = () => {
    play.hidden = true;
    pause.hidden = false;
}

pause.onclick = () => {
    play.hidden = false;
    pause.hidden = true;
}