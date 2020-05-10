import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";
import VideoView from "./VideoView";


const Body = () => {

  return (
    <Container fluid>
      <Row className="px-0">
        {/*"https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"*/}
        <Col md={9} style={{backgroundColor: "teal"}}>
          <VideoView/>
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
