import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoPlayer from "./VideoPlayer";


const Body = () => {

  return (
    <Container>
      <Row>
        {/*"https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"*/}
        <Col md={8} style={{backgroundColor: "teal"}}>
          <VideoPlayer options={{
            controls: true,
            fluid: true,
            sources: [{
              src: "https://commonsi-muc.azureedge.net/contents/MEIJ100001/5e99053415a42/contents/media_files/media/ssmovie.mp4"
            }]
          }}/>
        </Col>
        <Col md={4} style={{backgroundColor: "green"}}>

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
