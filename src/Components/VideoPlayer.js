import React, {useEffect, useRef, useState} from 'react';

import videojs from "video.js"
import "video.js/dist/video-js.css"

const VideoPlayer = (props) => {
  const {
    options,
    onReady = player => {},
    onPlay = currentTime => {},
    onPause = currentTime => {},
    onSeeked = currentTime => {},
  } = props;


  const [player, setPlayer] = useState(null);
  const videoRef = useRef(null);


  useEffect(() => {
    if(!videoRef.current) return;

    const pl = videojs(videoRef.current, options, () => {
      console.log("player Ready", pl);
    });

    //シーク後の再生でも発火
    pl.on("play", () => onPlay(pl));
    pl.on("pause", () => onPause(pl));
    pl.on("seeked", () => onSeeked(pl));


    pl.ready( () => {
      console.log("video ready", pl);

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