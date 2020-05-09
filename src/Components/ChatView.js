import React from 'react';
import ChatInfoCard from "./ChatInfoCard";
import ChatMessageCard from "./ChatMessageCard";
import {ListGroup} from "react-bootstrap";

const ChatView = () => {
  // const [chatCards, ]

  return (
    <ListGroup className="pt-2">
      <ChatInfoCard
        body={"Pon が入室しました"}
        time={"03:34:00"}
      />
      <ChatMessageCard
        user={{name: "Pon", iconUrl:"https://pbs.twimg.com/profile_images/1247572558456565760/j1CQVcLK_400x400.png"}}
        body={"PC壊れた!!!!"}
        time={"03:34:00"}
      />
      <ChatInfoCard
        body={"Test Message"}
        time={"03:34:00"}
      />
    </ListGroup>

    //
    // <ul className="list-unstyled ">
    //
    // </ul>
  );
};

export default ChatView;