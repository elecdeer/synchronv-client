import React, {useEffect, useRef, useState} from 'react';

import videojs from "video.js"
import "video.js/dist/video-js.css"

const VideoPlayer = ({
                       options,
                       onReady = () => {},
                       onPlay = () => {},
                       onPause = () => {},
                     }) => {

  const [player, setPlayer] = useState(null);
  const videoRef = useRef(null);


  useEffect(() => {
    if(!videoRef.current) return;

    const pl = videojs(videoRef.current, options, () => {
      console.log("player Ready", pl);
    });

    //シーク後の再生でも発火
    pl.on("play", () => onPlay(pl.currentTime()));
    pl.on("pause", () => onPause(pl.currentTime()));


    pl.ready( () => {
      console.log("video ready");

      onReady(pl);
    });

    setPlayer(pl);



    //onUnmounted
    return () => {
      if(player){
        player.dispose();
      }
    };
  }, [videoRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js"></video>
    </div>
  );
};

export default VideoPlayer;