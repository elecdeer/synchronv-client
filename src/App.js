import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {Navbar, NavbarBrand} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./Components/Body";
import io from "socket.io-client";
import Header from "./Components/Header";

export const SocketContext = createContext(null);

const App = () => {

  const [ioState, setIoState] = useState(null);

  useEffect(() => {
    const url = `${window.location.hostname}:5001`;
    const socketIO = io(url);

    socketIO.on("connect", () => {
      console.log("Connected!", socketIO.id);


      socketIO.emit("join", {
        // session_id: socketIO.id,
      });

    })

    //接続時の処理もここに


    socketIO.on("participants_changed", data => {
      console.log("participants_changed", data);

      setIoState({
        io: socketIO,
        session_id: data.session_id,
      });
    })


  }, []);


  if(!ioState){
    return (
      <p>Connectiong...</p>
    );
  }

  //socketIO接続できてないのに渡すとめんどいので
  return (
    <SocketContext.Provider value={ioState}>
      <Header/>
      <Body/>
    </SocketContext.Provider>
  );

}

export default App;
