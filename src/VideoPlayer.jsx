import React, { useRef,useState } from 'react'
import video from './Videos/audio1.mp4';

const VideoPlayer = () => {
  const videoref=useRef();
  const[currentTime,setcurrentTime]=useState();
  const[duration,setDuration]=useState();

const  handleRange=(event)=>{
  videoref.current.currentTime=event.target.value;
  setcurrentTime(event.target.value);

}
  return (
    <div>
      <h1>video player</h1>
      <hr />
      <video controls autoPlay muted ref={videoref}
      onTimeUpdate={()=>{setcurrentTime(videoref.current.currentTime)}}
      onLoadedMetadata={()=>{setDuration(videoref.current.duration)}}>
        <source src={video}>

        </source>
      </video>
      <input type="range" min='0' max={duration} value={currentTime}  onChange={handleRange} />
      <span>{Math.floor(currentTime)}s/{Math.floor(duration)}s</span>
    </div>
  )
}

export default VideoPlayer