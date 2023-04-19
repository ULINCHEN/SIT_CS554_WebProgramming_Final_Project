import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { Button } from '@material-ui/core';

const styleContainer = makeStyles({
    ChatInputContainer:{
        borderRadius: "20px",
        "& form":{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        "& input": {
            position: "fixed",
            bottom: "30px",
            width:"60%",
            border: "1px solid gray",
            borderRadius: "3px",
            padding: "20px",
            outline: "none",
        },
        "& button":{
            display: "none !important"
        }
    }
    }
    
})

function ChatInput() {
    const [input, setInput] = useState('');
    const style = styleContainer();

    const sendMessage = () => {
        console.log("message send!")
    }

  return (
    <div className={style.ChatInputContainer}>
        <form>
            <input value={input} placeholder={"Use the Enter key to send a message..."} onChange={(e) => setInput(e.target.value)} />
            <Button hidden type='submit' onClick={sendMessage}>send</Button>
        </form>
    </div>
  )
}

export default ChatInput