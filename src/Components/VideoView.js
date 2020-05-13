import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import VideoPlayer from "./VideoPlayer";
import {SocketContext} from "../App";

let count = 0;
// export let isRemote = false;

const VideoView = () => {

  const ioState = useContext(SocketContext);

  const [player, setPlayer] = useState(null);

  // const [isPlaying, setPlaying] = useState(false);
  const isPlaying = useRef(false);

  const isRemote = useRef(false);
  // const [isRemoteControlling, setRemoteControlling] = useState(false);


  const options = {
    controls: true,
    fluid: true,
    sources: [{
      src: "https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"
    }],
    playbackRates: [0.5, 0.8, 1.0, 1.2, 1.5, 2],
    liveui: true,
    autoplay: 'muted',
  };

  const handleReady = pl => {
    setPlayer(pl);
    console.log("handleReady", pl);
    // pl.
    isRemote.current = true;
  }


  const emitSeek = (play, position) => {
    const param = {
      session_id: ioState.session_id,
      position: position,
      autoplay: play,
    }

    console.log("request_seek", param);
    ioState.io.emit("request_seek", param);
  }


  const handleUserPlay = (player) => {
    console.log("onPlay!", player.currentTime(), isRemote.current);

    emitSeek(true, player.currentTime());
  }

  const handleUserPause = (player) => {
    console.log("onPause!", player.currentTime(), isRemote.current);

    emitSeek(false, player.currentTime());
  };



  const handleSeeked = player => {
    isPlaying.current = !player.paused();
    const param = {
      session_id: ioState.session_id,
    }

    console.log("ready_to_play", param)
    ioState.io.emit("ready_to_play", param);
  }

  const handleUserSeeked = player => {
    console.log("onSeeked!", player.currentTime(), isRemote.current, isPlaying);
    emitSeek(isPlaying.current, player.currentTime());
  }


  useEffect(() => {
    if(!player) return;

    ioState.io.on("control_seek", (data) => {
      console.log("rsv control_seek", data);
      // player.pause();
      player.currentTime(data.position);

      console.log("count", count++);
      isRemote.current = true;
      // setRemoteControlling(true);
    });

    ioState.io.on("complete_seek", (data) => {
      console.log("rsv complete_seek", data);
      if(data.autoplay){
        player.play();
      }else{
        player.pause();
      }

      console.log("remote off");
      isRemote.current = false;
      console.log("\n");
      // setRemoteControlling(false);
    });



  }, [player]);



  return (
    <>
      <VideoPlayer
        options={options}
        onPlay={() => {
          // setPlaying(true);
          // isPlaying.current = true;
        }}
        onPause={() => {
          // setPlaying(false);
          // isPlaying.current = false;
        }}
        onUserPlay={handleUserPlay}
        onUserPause={handleUserPause}
        onReady={handleReady}
        onSeeked={handleSeeked}
        onUserSeeked={handleUserSeeked}
      />
    </>
  );
};

export default VideoView;