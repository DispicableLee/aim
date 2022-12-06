import React, { useEffect, useState } from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from "./ChatSideBar";


function Chats({ user, convoData, getConversations }) {
  const [selectedChat, setSelectedChat] = useState(convoData[0])

  useEffect(()=> {
    getConversations(user)
    // fetch("/myconversations")
    // .then(r => r.json())
    // .then(console.log)
  },[])

  function renderConversation(selectedConvoId) {
    const selectedConvo = convoData.find(convo => (convo.id === selectedConvoId))
    setSelectedChat(selectedConvo)
  }

  function sendNewMessage(message) {
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        conversation_id: selectedChat.id,
        content: message,
      }),
    }).then(res => res.json())
    .then(newMessage => {
      setSelectedChat({...selectedChat, messages: [...selectedChat.messages, newMessage]})
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <aside style={{
        float: "left"
      }}>
      <ChatSideBar convoData={convoData} renderConversation={renderConversation} />
      </aside>
      <ConvoFrame user={user} selectedChat={selectedChat} sendNewMessage={sendNewMessage} />
    </div>
  );
}

export default Chats;
