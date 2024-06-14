import { useState, useEffect } from 'react';
import {AuthComponent} from "./components/AuthComponent";
import {RoomComponent} from "./components/RoomComponent";
import './App.css';

function App() {
  
  const [sessionToken, setSessionToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("MyToken")){
      setSessionToken(localStorage.getItem("MyToken"))
    }
  },[])

  const handleChange = (state, value) => {
    switch(state){
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
        default:
          console.log("something went wrong");
    }
}

const handleSignup = async() => {
try{
  setError("");
  const response = await(await fetch("http://localhost:7000/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }),
  })
  ).json()
  console.log(response);
  if (response.Error) {
    
    throw new Error(response.Error.message);
    
  }
  updateToken(response.Token);
  setIsLoggedIn("true");
}catch(err){
  const message = err.message ? err.message: "an error occured, please try again";
  setError(message);
  console.log(err);
  setIsLoggedIn("");
}
}

const handleSignin = async() => {
  try{
    setError("");
    const response = await(await fetch("http://localhost:7000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    ).json()
    console.log(response);
    if (response.Error) {
      
      throw new Error(response.Error.message);
      
    }
    updateToken(response.Token);
    setIsLoggedIn("true");
  }catch(err){
    const message = err.message ? err.message: "an error occured, please try again";
    setError(message);
    console.log(err);
    setIsLoggedIn("");
  }
  }

const updateToken = (token) => {
  console.log("Token updated");
  localStorage.setItem("MyToken", token);
  setSessionToken(token);
}

const clearToken = () => {
  console.log("Token cleared!");
  localStorage.removeItem("MyToken")
  setSessionToken("");
}


  return (
    <>

     {error}
     
     {isLoggedIn ?
     <RoomComponent />:
     <AuthComponent handleChange={handleChange} handleSignup={handleSignup}  handleSignin={handleSignin}/>
     }
    
     </> 
    
  )
}
//wee
export default App
