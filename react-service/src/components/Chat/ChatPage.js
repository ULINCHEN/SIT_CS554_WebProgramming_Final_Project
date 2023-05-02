import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';


// change those from db fn
const fakeData1 = {
    chatRoom: [
        {
            id: '1',
            username1: 'Tom',
            username2: 'Jerry'
        },
        {
            id: '2',
            username1: 'Tom',
            username2: 'Angela'
        },
        {
            id: '3',
            username1: 'Tom',
            username2: 'Lover'
        },
        {
            id: '4',
            username1: 'Tom',
            username2: 'UltraMan'
        }
    ]
}
// replace with real data
const fakeChatData = [
    {
        id: "1",
        username1: "User1",
        username2: "User2",
        nickname1: "Tom",
        nickname2: "Jerry",
        chatData: [
            {
                username: "User1",
                time: "01/02/2023 23:55:49",
                text: "Good evening"
            },
            {
                username: "User2",
                time: "01/02/2023 23:56:49",
                text: "Good Morning"
            },
            {
                username: "User1",
                time: "01/02/2023 23:57:49",
                text: "Good evening"
            },
            {
                username: "User2",
                time: "01/02/2023 23:58:49",
                text: "Good Morning"
            },
            {
                username: "User1",
                time: "01/02/2023 23:59:40",
                text: "Good evening"
            },
            {
                username: "User2",
                time: "01/02/2023 23:37:18",
                text: "Good Morning"
            },
        ]
    },

    {
        id: "2",
        username1: "User1",
        username2: "User2",
        nickname1: "baby",
        nickname2: "angela",
        chatData: [
            {
                username: "User1",
                time: "01/02/2023 23:56:49",
                text: "hello"
            },
            {
                username: "User2",
                time: "01/02/2023 23:56:49",
                text: "goodbye"
            },
            {
                username: "User1",
                time: "01/02/2023 23:56:49",
                text: "hello"
            },
            {
                username: "User2",
                time: "01/02/2023 23:56:49",
                text: "goodbye"
            },
            {
                username: "User1",
                time: "01/02/2023 23:56:49",
                text: "hello"
            },
            {
                username: "User2",
                time: "01/02/2023 23:56:49",
                text: "goodbye"
            },
        ]
    },
    {
        id: "3",
        username1: "User1",
        username2: "User2",
        nickname1: "baby",
        nickname2: "Lover",
        chatData: []
    },
    {
        id: "4",
        username1: "User1",
        username2: "User2",
        nickname1: "baby",
        nickname2: "UltraMan",
        chatData: []
    },

]
const styleContainer = makeStyles({

    pageContainer: {
        display: "flex",
        height: "100vh"
    },
    left: {
        flex: "0 0 15%",
    },
    right: {
        flex: "1",
    }
})

const getTimeStamp = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function ChatPage() {

    const [chatData, setChatData] = useState(undefined);
    const [chatId, setChatId] = useState('');
    const [newMsg, setNewMsg] = useState('')

    // ----- socketIO ----------

    const socketRef = useRef();

    // 当ChatID发生变化后触发，链接到socket server，并加入当前频道
    // ** 同时需要重新从数据库fetchData **


    useEffect(() => {

        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('join', chatId);
        console.log('socketIO connect to channel =>', chatId);

        // 组件卸载前断开socket server链接
        return () => {
            socketRef.current.disconnect();
        };
    }, [chatId]);


    // 当message发生变化后触发，向socket发送消息
    useEffect(() => {
        console.log('useEffect fired when message change');
        socketRef.current.on('message', (data) => {
            console.log('The server has sent some data to all clients, data =>', data);

            let newChatDataArray = [
                ...chatData.chatData,
                data
            ];

            let newChatData = {
                ...chatData,
                chatData: newChatDataArray
            };

            setChatData(newChatData);

        });


        return () => {
            socketRef.current.off('message');
            socketRef.current.off('user_join');
        };
    }, [chatData]);



    // ----- socketIO End ----------

    // sendMsg函数会通过props传递至 -> Chat -> ChatInput
    // 用户在聊天框输入并回车发送后，在本组件将设定newMsg状态为新的信息
    // 并将这条新的消息更新至chatData
    const sendMsg = (msg) => {
        console.log('sendMsg: user send a new message from chatinput => ', msg);

        let msgObj = {
            username: localStorage.getItem('username'),
            time: getTimeStamp(),
            text: msg
        }

        setNewMsg(msgObj);
        socketRef.current.emit('message', msgObj);

    }

    // chooseChatData函数会通过props传递至 -> sideBar -> sidebarOption，用户点击选项后，会选中对应的对话id
    // 函数触发后，本组件会将chatData设置为对应id的数据, 在组件中通过props将数据传递给Chat组件进行渲染
    // **这里setChatData需要调整成从数据库调取对应的数据**
    const chooseChatData = (id) => {
        console.log("chooseChatData is fired, id =>", id);
        setChatId(id);
        for (let item of fakeChatData) {
            console.log("current item id => ", item.id);
            if (id === item.id) {
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

            <Sidebar className={style.left} data={fakeData1} fn={chooseChatData} />
            <Chat className={style.right} data={chatData} fn={sendMsg} />

        </div>
    )
}

export default ChatPage