import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import VideoPlayer from "./VideoPlayer";
import {SocketContext} from "../App";

let count = 0;
// export let isRemote = false;

const VideoView = () => {

  const ioState = useContext(SocketContext);

  const [player, setPlayer] = useState(null);
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
  };

  const handleReady = pl => {
    setPlayer(pl);
    console.log("handleReady", pl);
  }


  const emitSeek = () => {

  }

  const handlePause = (player) => {
    console.log("onPause!", player.currentTime(), isRemote.current);
    console.log("count", count++);
    console.log(player);

    if(isRemote.current){
      return;
    }

    // isRemote.current = true;
    // player.play();

    const param = {
      session_id: ioState.session_id,
      position: player.currentTime(),
      autoplay: false,
    }

    console.log("request_seek", param)
    ioState.io.emit("request_seek", param);
  };


  const handlePlay = (player) => {

    //自身の操作かリモート操作かを区別する必要がある
    // player.play()とかをラップすれば良い？


    console.log("onPlay!", player.currentTime(), isRemote.current);
    console.log("count", count++);


    if(isRemote.current){
      return;
    }


    // isRemote.current = true;
    // player.pause();

    const param = {
      session_id: ioState.session_id,
      position: player.currentTime(),
      autoplay: true,
    }

    console.log("request_seek", param)
    ioState.io.emit("request_seek", param);
  }

  const handleSeeked = player => {
    console.log("onSeeked!", player.currentTime(), isRemote.current);



    console.log("count", count++);
    if(isRemote.current){
      const param = {
        session_id: ioState.session_id,
      }

      console.log("ready_to_play", param)
      ioState.io.emit("ready_to_play", param);
    }else{

      console.log(player);
      const param = {
        session_id: ioState.session_id,
        position: player.currentTime(),
        autoplay: player.pause(),
      }

      console.log("request_seek", param);
      ioState.io.emit("request_seek", param);
    }

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
      // setRemoteControlling(false);
    });

  }, [player, ioState]);



  return (
    <>
      <VideoPlayer
        options={options}
        onPlay={handlePlay}
        onPause={handlePause}
        onReady={handleReady}
        onSeeked={handleSeeked}
      />
    </>
  );
};

export default VideoView;