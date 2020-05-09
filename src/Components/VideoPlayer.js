import React, {useEffect, useRef, useState} from 'react';

import videojs from "video.js"
import "video.js/dist/video-js.css"

const VideoPlayer = ({options}) => {

  const [player, setPlayer] = useState(null);

  const [videoNode, setVideoNode] = useState(null);
  // const videoRef = useRef(null);


  useEffect(() => {
    if(!videoNode) return;

    const video = videojs(videoNode, options, () => {
      console.log("player Ready", video);
    });
    setPlayer(video);

    return () => {
      if(player){
        video.dispose();
      }
    };
  }, [videoNode]);


  return (
    <div data-vjs-player>
      <video ref={node => {
        setVideoNode(node);
        return node;
      }} className="video-js"></video>
    </div>
  );
};

export default VideoPlayer;