import React, {useState, useEffect} from 'react'

export const MessageComponent = () => {
    const [allMessages, setAllMessages] = useState ([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
      //form for creating a new message
    const createNewMessage = () => (
        <form onSubmit={handleNewMessage}>
        <input onChange={(e) => setNewMessage(e.target.value)} placeholder="put your message here"></input>
        <button >Create New Message</button>
        </form>
      )
  
      //handles process to create new message, displays updated room
      const handleNewMessage = async (e) => {
        try {
          e.preventDefault();
            setStatus("Loading");
            const json = await (
                await fetch("http://localhost:7000/message/create/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
                    },
                    body: JSON.stringify({
                        room_id: roomId,
                        body: newMessage,
                        
                    })
                })
            ).json();
          if(json.Created){
            getAllInRoom(roomId)
          }  
        }catch (err) {
            console.log(err);
        }
    }  
    })
}