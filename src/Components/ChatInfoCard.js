import React from 'react';
import {Media} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const ChatInfoCard = ({body, time}) => {
  return (
    <ListGroupItem>
      <h5 style={{float: "left"}}>
        {body}
      </h5>
      <p className="text-right">
        {time}
      </p>

    </ListGroupItem>
  );
};

export default ChatInfoCard;