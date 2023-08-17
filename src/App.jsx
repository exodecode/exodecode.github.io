import { useEffect, useRef, useState } from 'react'
import './App.css'
import { songsData } from './songsData'
import Player from './Player'

function App() {
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[0]);

  const audioElem = useRef();

  useEffect(() => {
    if(isPlaying){
      audioElem.src = currentSong;
      audioElem.current.play();
    }
    else{
      audioElem.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <>
      <audio src={currentSong.source} ref={audioElem}/>
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioElem={audioElem}
      />
    </>
  )
}

export default App
