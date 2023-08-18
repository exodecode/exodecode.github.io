import { useEffect, useRef, useState } from 'react'
import './App.css'
import { songsData } from './songsData'
import Player from './Player'

function App() {
  const songs = songsData;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [songFinished, setSongFinished] = useState(false);
  const audioElem = useRef();

  useEffect(() => {
    if(isPlaying  && songFinished){
      setSongFinished(false);
      setCurrentSong(songs[(songs.indexOf(currentSong) + 1) % songs.length])
    }
    else if(isPlaying){
      audioElem.current.play();
    }
    else{
      audioElem.current.pause();
    }
  }, [isPlaying, currentSong, audioElem, songs, songFinished]);

  return (
    <>
      <audio src={currentSong.source} ref={audioElem} onEnded={() => setSongFinished(true)}/>
      <Player
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioElem={audioElem}
      />
    </>
  )
}

App.propTypes ={

}

export default App
