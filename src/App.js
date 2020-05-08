import React from 'react';
import './App.css';
import {Navbar, NavbarBrand} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./Components/Body";

function App(){
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Synchronv</Navbar.Brand>
      </Navbar>
      <Body/>
    </>
  );
}

export default App;
