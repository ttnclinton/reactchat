import React, {useState, useEffect} from 'react'

export const AuthComponent = ({handleChange, handleSignup, handleSignin}) => {
    const [logState, setLogState]=useState("");
    //ternary used to enable log in, in addition to signup.
  return( <>
<h1>Say hello to my little project</h1>
      {logState}
      {logState ?
      (<form style={{display: "flex", flexDirection: "column"}}>
          <label>Email</label>
          <input onChange={(e)=>handleChange("email", e.target.value)}/>
          <label>Password</label>
          <input onChange={(e)=>handleChange("password", e.target.value)}/>
          <button type="button" onClick={handleSignin}>Sign In!</button>
      </form>) : (
            <form style={{display: "flex", flexDirection: "column"}}>
            <h2>Signup</h2>
            <label>FirstName</label>
            <input onChange={(e)=>handleChange("first", e.target.value)} />
            <label>LastName</label>
            <input onChange={(e)=>handleChange("last", e.target.value)} />
            <label>Email</label>
            <input onChange={(e)=>handleChange("email", e.target.value)}/>
            <label>Password</label>
            <input onChange={(e)=>handleChange("password", e.target.value)}/>
            <button type="button" onClick={handleSignup}>Signup!</button>
            <br/>
            <button type="button" onClick={()=>{setLogState(true)}}>Already Signed UP? Log-in</button>
        </form>
      )}


  </>
  )
}


