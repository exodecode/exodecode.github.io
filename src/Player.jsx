import { PropTypes } from "prop-types";

function Player( { songs, isPlaying, setIsPlaying, currentSong, setCurrentSong, audioElem } ) {
  const playingJumpyUrl = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/jumpyBug.gif";
  const pausedJumpyUrl = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/jumpyBug_paused.png";
  const previousIcon = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/navigate_before_FILL0_wght400_GRAD0_opsz48.svg";
  const nextIcon = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/navigate_next_FILL0_wght400_GRAD0_opsz48.svg";
  const pauseIcon = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/pause_circle_FILL0_wght400_GRAD0_opsz48.svg";
  const playIcon = "https://raw.githubusercontent.com/exodecode/assets-exodecode.github.io/a5a934a82333dc7b9782007274bcee9bacaf841a/play_circle_FILL0_wght400_GRAD0_opsz48.svg";

  function setCurrentTo(index){
    let song = songs[index];
    let currentSource = currentSong.source;

    if (currentSource === song.source && isPlaying){
      return;
    }

    setCurrentSong(song);
    audioElem.current.src = song.source;
    setIsPlaying(true);
  }

  function isCurrent(index){
    return currentSong.source === songs[index].source && isPlaying ? 'current-song': '';
  }

  function next() {
    let index = (songs.indexOf(currentSong) + 1) % songs.length;
    setCurrentTo(index);
  }

  function previous(){
    let index = (songs.indexOf(currentSong) - 1 + songs.length) % songs.length;

    setCurrentTo(index);
  }

  function handleSpace(e) {
    if(e.key === " ") {
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <div className="content" onKeyDown={(e) => handleSpace(e)} tabIndex={-1}>
        <div className="list-container">
            <div className="player" >
                <h1 className="song-header">{currentSong.title}</h1>
                <img src={isPlaying ? playingJumpyUrl : pausedJumpyUrl} alt="" className="song-image"/>

                <div className="song-controls">
                    <img src={previousIcon} alt="" className="song-control-img" onClick={previous} />
                    <img src={playIcon} alt="" className="song-control-img" hidden={isPlaying} onClick={() => setIsPlaying(true)}/>
                    <img src={pauseIcon} alt="" className="song-control-img" hidden={!isPlaying} onClick={() => setIsPlaying(false)}/>
                    <img src={nextIcon} alt="" className="song-control-img" onClick={next} />
                </div>
            </div>

            <div className="song-list">
                {songs.map((song, i) => <span onClick={() => setCurrentTo(i)} className={`song ${isCurrent(i)}`} key={song.source}>{song.title}</span>)}
            </div>
        </div>
    </div>

  )
}

Player.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, source: PropTypes.string})),
  setSongs: PropTypes.func,
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  currentSong: PropTypes.shape({title: PropTypes.string, source: PropTypes.string}),
  setCurrentSong: PropTypes.func,
  audioElem: PropTypes.object
}

export default Player