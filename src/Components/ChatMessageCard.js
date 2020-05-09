import React from 'react';
import {Media} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const ChatMessageCard = ({user, body, time}) => {
  return (
//1/3
    <ListGroupItem>
      <Row>
        <Col xs={3} className="px-2">
          <img width={"100%"} src={user.iconUrl}/>
        </Col>
        <Col xs={9}>
          <div>
            <h5 style={{float: "left"}}>{user.name}</h5>
            <p className="text-right">{time}</p>
          </div>
          <p>
            {body}
          </p>
        </Col>
      </Row>
    </ListGroupItem>


    // <Media as="li">
    //   <img width={48} height={48} src={user.iconUrl} className="mr-3"/>
    //   <Media.Body>
    //     <Row>
    //       <Col xs={8}>
    //         <h5>{user.name}</h5>
    //       </Col>
    //       <Col xs={4}>
    //         <p>{time}</p>
    //       </Col>
    //     </Row>
    //
    //     <p>{body}</p>
    //   </Media.Body>
    // </Media>
  );
};

export default ChatMessageCard;