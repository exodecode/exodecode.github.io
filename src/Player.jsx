/* eslint-disable react/prop-types */
function Player(props) {

  function setCurrentTo(index){
    let song = props.songs[index];
    let currentSource = props.currentSong.source;

    if (currentSource === song.source && props.isPlaying){
      return;
    }

    props.setCurrentSong(song);
    props.audioElem.current.src = song.source;
    props.setIsPlaying(true);
  }

  function isCurrent(index){
    return props.currentSong.source === props.songs[index].source && props.isPlaying ? 'current-song': '';
  }

  function next() {
    let index = (props.songs.indexOf(props.currentSong) + 1) % props.songs.length;
    setCurrentTo(index);
  }

  function previous(){
    let index = (props.songs.indexOf(props.currentSong) - 1 + props.songs.length) % props.songs.length;
    console.log("current index: " + index);

    setCurrentTo(index);
  }

  return (
    <div className="content">
        <div className="list-container">
            <div className="player">
                <h1 className="song-header">{props.currentSong.title}</h1>
                <img src={props.isPlaying ? "/assets/jumpyBug.gif" : "/assets/jumpyBug_paused.png"} alt="" className="song-image" />

                <div className="song-controls">
                    <img src="/assets/navigate_before_FILL0_wght400_GRAD0_opsz48.svg" alt="" className="song-control-img" onClick={previous} />
                    <img src="/assets/play_circle_FILL0_wght400_GRAD0_opsz48.svg" alt="" className="song-control-img" hidden={props.isPlaying} onClick={() => props.setIsPlaying(true)}/>
                    <img src="/assets/pause_circle_FILL0_wght400_GRAD0_opsz48.svg" alt="" className="song-control-img" hidden={!props.isPlaying} onClick={() => props.setIsPlaying(false)}/>
                    <img src="/assets/navigate_next_FILL0_wght400_GRAD0_opsz48.svg" alt="" className="song-control-img" onClick={next} />
                </div>
            </div>

            <div className="song-list">
                {props.songs.map((song, i) => <span onClick={() => setCurrentTo(i)} className={`song ${isCurrent(i)}`} key={song.source}>{song.title}</span>)}
            </div>
        </div>
    </div>

  )
}

export default Player