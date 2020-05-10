import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {Navbar, NavbarBrand} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./Components/Body";
import io from "socket.io-client";
import Header from "./Components/Header";

export const SocketContext = createContext(null);

const App = () => {

  const [socketIO, setSocketIO] = useState(null);

  useEffect(() => {
    const url = `${window.location.hostname}:5001`;
    const socketIO = io(url);

    socketIO.on("connect", () => {
      console.log("Connected!", socketIO.id);
      // socketIO.emit("join");
    })

    //接続時の処理もここに

    setSocketIO(socketIO);
  }, []);


  return (
    <SocketContext.Provider value={socketIO}>
      <Header/>
      <Body/>
    </SocketContext.Provider>
  );

}

export default App;
