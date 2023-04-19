import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Message from './Message';
import ChatInput from './ChatInput';

const chatStyle = makeStyles({
    chatContainer: {
        flex: "0.7",
        flexGrow:"1",
        overflow: "scroll",
        marginTop: "50px"
    },
    header:{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid lightgray",
    },


  });


function Chat({data}) {

    const style = chatStyle();

  return (
    
    <div className={style.chatContainer}>

       {data? (
        data.chatData ? (
            <>    

            <div className={style.header}>Chat Wtih {data.nickname2}</div> 
            <div>
                {data.chatData.map((item) => {
                    return(
                        <Message content={item} key={item.id}/>
                    )
                })}
            </div>
            <ChatInput/>
            </>
        ) : (
            <>
            <div className={style.header}>No chat records with {data.nickname2}, why don't you say hi first?</div> 
            <ChatInput/>
            </>
        )
       ) : (

            <div>404</div>
        
       )}    

    </div>


  )
}

export default Chat