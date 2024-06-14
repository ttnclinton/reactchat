import React, {useState, useEffect} from 'react'

//?Currently, "RoomComponent" handles the fetch requests to the server, and all message and room display.
export const RoomComponent = () => {
    const [roomName, setRoomName] = useState("");
    const[roomDescription, setRoomDescription] = useState("");
    const[roomUsers, setRoomUsers] = useState([]);
    const [allRoom, setallRoom] = useState([]);
    const [status, setStatus] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [roomId, setRoomId] = useState("");
    // const [roomTitle, setRoomTitle] = useState(""); put a title above rooms, will work on after grading
        
    //get all rooms, useEffect used so that get all automatically updates when a new room is created
    useEffect(() => {
        
        const getallRoom = async () => {
            try{
                const json = await (
                    await fetch("http://localhost:7000/room/all", {
                       headers: {
                        Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
                       }, 
                    })
                ).json();

             setallRoom(json.Created); 
                    
            }catch(err){
                console.log(err);
            }
        };

        getallRoom();
    }, [status]); 

//handles room creation
    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
            setStatus("Loading");
            const json = await (
                await fetch("http://localhost:7000/room/create/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
                    },
                    body: JSON.stringify({
                        name: roomName,
                        description: roomDescription,
                        addedUsers: roomUsers
                    })
                })
            ).json();
                
          if(json.Created){
            setStatus("Room Created");
          }  
        }catch (err) {
            console.log(err);
        }
    };


//Retrieves all messages within a given room
    const getAllInRoom = async(roomID) => {
      try{
        const json = await(
          await fetch(`http://localhost:7000/message/get_room/${roomID}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
          },
          
          }
        )).json();
        setAllMessages(json.Results);

      } catch (err){
        console.log(err);
      }
    }

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
  };



  //function to show all Rooms
    const displayallRoom = () => {
      
        return allRoom?.map(i => (
            <div style={{ border: ".5em solid white"}} key={i._id}>
                <button onClick={()=>{getAllInRoom(i._id), setRoomId(i._id)}}>
                   Room Name: <b>{i.name}</b>
                </button>
            </div>
       ))
       .reverse();
    };   



  
//the grand return, immediately offers the option to create a room, followed by displaying all rooms, which are themselves clickable to view their messages below
    return (
    <div>

        <h1>Rooms</h1>
        <form>

        <input onChange={(e) => setRoomName(e.target.value)} placeholder='Room Name'/>
        <button onClick={handleSubmit}></button>
        <br/>
        <input onChange={(e) => setRoomDescription(e.target.value)} placeholder='Room Description' />
        <br/>
        <input onChange={(e) => setRoomUsers(e.target.value) } placeholder='Added Users' />
        <br/>
        <button onClick={handleSubmit}>Create a room</button>
        </form>


        <h2>All Rooms</h2>
        {displayallRoom()}

       { allMessages?.map(i => (
         <form key={i._id}>
          Message: <b>{i.body}</b>
          <br/>
          When: <b>{i.when}</b>
          <button>update!</button>
          <button>delete</button>
        </form>
        ))
      }
      {createNewMessage()}

    </div>
  );
};