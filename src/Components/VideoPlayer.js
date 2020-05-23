import React, {useEffect, useRef, useState} from 'react';

import videojs from "video.js"
import "video.js/dist/video-js.css"

const VideoPlayer = (props) => {
  const {
    options,
    onReady = player => {},
    onPlay = player => {},
    onPause = player => {},
    onSeeked = player => {},
    onChangeRate = player => {},

    onUserPlay = player => {},
    onUserPause = player => {},
    onUserSeeked = player => {},
    onUserChangeRate = (player, rate) => {},

  } = props;


  const [player, setPlayer] = useState(null);
  const videoRef = useRef(null);


  useEffect(() => {
    if(!player) return;
    console.log(player.controlBar.progressControl);

    player.on(player.controlBar.progressControl, "mouseup", (event) => {
      console.log("######user seeked", player.currentTime());
      console.log(player.paused());
      onUserSeeked(player);
    });

    player.on(player.controlBar.playToggle, "click", (event) => {
      if(!player.paused()){
        // console.log("playClick!");
        onUserPlay(player);
      }else{
        // console.log("pauseClick!");
        onUserPause(player);
      }
    });

    const rateButtons = player.controlBar.playbackRateMenuButton.menu.children_;
    for(let button of rateButtons){
      player.on(button, "click", event => {
        onUserChangeRate(player, button.rate);
      })
    }


  }, [player]);

  useEffect(() => {
    if(!videoRef.current) return;

    const pl = videojs(videoRef.current, options, () => {
      console.log("player Ready", pl);
    });

    //シーク後の再生でも発火
    pl.on("play", () => onPlay(pl));
    pl.on("pause", () => onPause(pl));
    pl.on("seeked", () => onSeeked(pl));
    pl.on("ratechange", () => onChangeRate(pl));

    // pl.on("playing", () => {
    //   console.log("handlePlaying");
    // });
    // pl.on("timeupdate", () => {
    //   console.log("timeupdate");
    // });






    // const playButtonDom = pl.controlBar.playToggle.el();
    // playButtonDom.addEventListener("click", (event) => {
    //   if(pl.paused()){
    //     console.log("playClick!");
    //   }else{
    //     console.log("pauseClick!");
    //   }
    // })
    // console.log(playButtonDom);


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