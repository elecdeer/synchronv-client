import React, {useContext, useEffect, useRef} from 'react';
import ChatInfoCard from "./ChatInfoCard";
import ChatMessageCard from "./ChatMessageCard";
import {FormControl, InputGroup, ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useList} from "react-use";
import {SocketContext} from "../App";

const ChatView = () => {
  // const [chatCards, ]

  const [chatList, {push}] = useList([]);

  const ioState = useContext(SocketContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    if(! ioState.io.connected) return;

    ioState.io.on("complete_seek", data => {
      const message = data.autoplay? "play control" :"pause control";

      push({
        body: message,
        time: new Date(),
      });
    })

    console.log("registerChatViewHook");
    ioState.io.on("participants_changed", data => {
      console.log("participants_changed");
      const message = "participants_changed";

      push({
        body: message,
        time: new Date(),
      });
    })

  }, [ioState.io]);

  useEffect(() => {
    console.log(scrollRef.current);
    const bottom = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    console.log(bottom);
    scrollRef.current.scroll(0, bottom);
  }, [chatList]);


  // <ChatInfoCard
  //   body={"Pon が入室しました"}
  //   time={"03:34:00"}
  // />
  // <ChatMessageCard
  //   user={{name: "Pon", iconUrl:"https://pbs.twimg.com/profile_images/1247572558456565760/j1CQVcLK_400x400.png"}}
  //   body={"PC壊れた!!!!"}
  //   time={"03:34:00"}
  // />

  const cardList = chatList.map((data) => (
    <ChatInfoCard
      body={data.body}
      time={`${data.time.getHours()}:${data.time.getMinutes()}:${data.time.getSeconds()}`}
    />
  ));

  return (
    <div className="pt-2" style={{
      position: "absolute",
      height: "calc(100% - 0.5rem)",
      width: "calc(100% - 2rem)",
      display: "flex",
      flexDirection: "column"
    }}>
      <ListGroup ref={scrollRef} style={{
        overflowY: "auto",
      }}>
        {chatList.map((data) => (
          <ChatInfoCard
            body={data.body}
            time={`${data.time.getHours()}:${data.time.getMinutes()}:${data.time.getSeconds()}`}
          />
        ))}
      </ListGroup>

      <Button variant="light" style={{height: "1rem"}}/>
      <InputGroup>
        <FormControl/>
        <InputGroup.Append>
          <Button variant="secondary">Say</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default ChatView;