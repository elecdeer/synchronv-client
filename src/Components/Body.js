import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";


const Body = () => {

  return (
    <Container fluid>
      <Row className="px-0">
        {/*"https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"*/}
        <Col md={9} style={{backgroundColor: "teal"}}>
          <VideoPlayer
            options={{
              controls: true,
              fluid: true,
              sources: [{
                src: "https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"
              }],
              playbackRates: [0.5, 0.8, 1.0, 1.2, 1.5, 2],
              liveui: true,
            }}
            onPlay={currentTime => {
              console.log("onPlay!", currentTime);
            }}
            onPause={currentTime => {
              console.log("onPause!", currentTime);
            }}
            onReady={player => {
              // setTimeout(() => {
              //   player.play();
              // }, 5000);
            }}
          />
        </Col>
        <Col md={3} style={{backgroundColor: "#CCFFCC"}}>
          <ChatView/>
        </Col>
      </Row>

      <Row>
        <Col md={12} style={{backgroundColor: "maroon"}}>

        </Col>
      </Row>
    </Container>
  );
};

export default Body;
