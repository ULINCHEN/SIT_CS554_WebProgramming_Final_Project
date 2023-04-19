import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";


// change those from db fn
const fakeData1 = {
    chatRoom:[
        {
            id:'1',
            username1:'Tom',
            username2:'Jerry'
        },
        {
            id:'2',
            username1:'Tom',
            username2:'Angela'
        },
        {
            id:'3',
            username1:'Tom',
            username2:'Lover'
        },
        {
            id:'4',
            username1:'Tom',
            username2:'UltraMan'
        }
    ]
}
// replace with real data
const fakeChatData = [
    {
        id:"1",
    username1:"User1",
    username2:"User2",
    nickname1:"Tom",
    nickname2:"Jerry",
    chatData:[
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"Good evening"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"Good Morning"
        },
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"Good evening"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"Good Morning"
        },
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"Good evening"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"Good Morning"
        },       
    ]
    },

    {
        id:"2",
    username1:"User1",
    username2:"User2",
    nickname1:"baby",
    nickname2:"angela",
    chatData:[
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"hello"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"goodbye"
        },
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"hello"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"goodbye"
        },
        {
            username:"User1",
            time:"01/02/2023 23:56:49",
            text:"hello"
        },
        {
            username:"User2",
            time:"01/02/2023 23:56:49",
            text:"goodbye"
        },       
    ]
    },
    {
        id:"3",
    username1:"User1",
    username2:"User2",
    nickname1:"baby",
    nickname2:"Lover",
    chatData:[]
    },
    {
        id:"4",
    username1:"User1",
    username2:"User2",
    nickname1:"baby",
    nickname2:"UltraMan",
    chatData:[]
    },
    
]
const styleContainer = makeStyles({
    
    pageContainer:{
        display: "flex",
        height: "100vh"
    },
    left:{
        flex: "0 0 15%",
    },
    right:{
        flex: "1",
    }
})


function ChatPage() {

    const [chatData, setChatData] = useState(undefined);

    const chooseChatData = (id) => {
        console.log("chooseChatData is fired, id =>", id);
        for(let item of fakeChatData){
            console.log("current item id => ", item.id);
            if(id === item.id) {
                setChatData(item);
                console.log("data has set => ", chatData);
                return;
            } 
        }
        setChatData(undefined);
    }

    const style = styleContainer();

  return (
    <div className={style.pageContainer}>

        <Sidebar className={style.left} data={fakeData1} fn={chooseChatData}/>
        <Chat className={style.right} data={chatData}/>

    </div>
  )
}

export default ChatPage