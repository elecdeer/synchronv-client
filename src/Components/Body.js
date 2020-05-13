import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";
import VideoView from "./VideoView";
import {FormControl, InputGroup, ListGroup} from "react-bootstrap";


const Body = () => {

  return (
    <Container fluid>
      <Row className="px-0" >
        {/*"https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"*/}
        <Col lg={9} style={{backgroundColor: "teal"}} className="py-2">
          <VideoView/>
        </Col>
        <Col lg={3} style={{backgroundColor: "#CCFFCC", minHeight: "300px", paddingRight: "30px"}}>
          <ChatView/>
        </Col>
      </Row>

      <Row>
        <Col lg={12} style={{backgroundColor: "maroon"}}>

        </Col>
      </Row>
    </Container>
  );
};

export default Body;
