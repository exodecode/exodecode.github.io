import { useEffect, useRef, useState } from 'react'
import './App.css'
import { songsData } from './songsData'
import Player from './Player'

function App() {
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [songFinished, setSongFinished] = useState(false);
  const audioElem = useRef();

  useEffect(() => {
    if(isPlaying  && songFinished){
      console.log("asdf");
      setSongFinished(false);
      setCurrentSong(songs[(songs.indexOf(currentSong) + 1) % songs.length])
    }
    else if(isPlaying){
      console.log("jkl");
      audioElem.src = currentSong;
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
