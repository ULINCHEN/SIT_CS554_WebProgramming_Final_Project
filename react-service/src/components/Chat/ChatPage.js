import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import axios from 'axios';

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
        messages: [
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
        messages: [
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
        messages: []
    },
    {
        id: "4",
        username1: "User1",
        username2: "User2",
        nickname1: "baby",
        nickname2: "UltraMan",
        messages: []
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
    const [sidebarChatData, setSidebarChatData] = useState(undefined);
    const [allChatsData, setAllChatsData] = useState(undefined);
    const [chatId, setChatId] = useState('');
    const [newMsg, setNewMsg] = useState('')

    // ----- socketIO ----------

    const socketRef = useRef();

    // 当ChatID发生变化后触发，链接到socket server, 加入频道
    // ** 同时需要从数据库fetchData **
    useEffect(() => {

        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('join', chatId);
        console.log('socketIO connect to channel =>', chatId);

        const petId = sessionStorage.getItem("petId");
        const getAllChats = async() => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/chat`,
                    { withCredentials: true }
                );
                console.log("allChatsData: ", response.data);
                setAllChatsData(response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log('Error Get Chat Data:', error.response.data);
                    throw error.response.data.error;
                }
                throw "Cannot Get Chat Data";
            }
        };

        const getChatRoomsById = async(petId) => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/pets/${petId}`,
                    { withCredentials: true}
                );
                console.log("sidebarChatData: ", response.data.chatRoom);
                setSidebarChatData(response.data.chatRoom);
            } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error Get Chat Rooms:', error.response.data);
                throw error.response.data.error;
            }
            throw "Cannot Get Chat Rooms";
            }
        };
        getChatRoomsById(petId);
        getAllChats();

        // 组件卸载前断开socket server链接
        return () => {
            socketRef.current.disconnect();
        };
    }, [chatId]);


    // 这里是接受信息的部分
    // 当收到socket 广播的消息后，将该消息更新到当前的chatData中
    // ** 需要将数据同步到数据库 **
    useEffect(() => {
        console.log('useEffect fired when message change');
        socketRef.current.on('message', (data) => {
            console.log('The server has sent some data to all clients, data =>', data);

            let newChatDataArray = [
                ...chatData.messages,
                data
            ];

            let newChatData = {
                ...chatData,
                messages: newChatDataArray
            };

            setChatData(newChatData);

        });


        return () => {
            socketRef.current.off('message');
            socketRef.current.off('user_join');
        };
    }, [chatData]);


    // 这里是信息向外发送的部分
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

        const addMessageToChat = async(chatId, msgObj) => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/chat/${chatId}`,
                    { withCredentials: true}
                );
                console.log("Chat to add msg exist: ", response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log('Error Get Chat Rooms:', error.response.data);
                    throw error.response.data.error;
                }
                throw "Cannot Get Chat to add msg";
            }
            try {
                const response = await axios.patch(
                    `http://localhost:3000/chat/${chatId}`,
                    { message: msgObj.text },
                    { withCredentials: true}
                );
                console.log("message added to chat successfully: ", response);

            } catch (error) {
                if (error.response && error.response.data) {
                    console.log('Error Add Message to Chat Room:', error.response.data);
                    throw error.response.data.error;
                }
                throw "Cannot add msg to Chat";
            }
        };
        addMessageToChat(chatId, msgObj);
        
        let newChatDataArray = [
            ...chatData.messages,
            msgObj
        ];

        let newChatData = {
            ...chatData,
            messages: newChatDataArray
        };

        setChatData(newChatData);
        
        socketRef.current.emit('message', msgObj);

    }

    // ----- socketIO End ----------

    // chooseChatData函数会通过props传递至 -> sideBar -> sidebarOption，用户点击选项后，会选中对应的对话id
    // 函数触发后，本组件会将chatData设置为对应id的数据, 在组件中通过props将数据传递给Chat组件进行渲染
    // **这部分在使用数据库数据的情况下，仅需要负责完成SetID的部分**
    // **实际的数据获取需要在上面的useEffect中完成**
    const chooseChatData = (id) => {
        console.log("chooseChatData is fired, id =>", id);
        setChatId(id);
        for (let item of allChatsData) {
            console.log("current item id => ", item._id);
            if (id === item._id) {
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

            <Sidebar className={style.left} data={sidebarChatData} fn={chooseChatData} />
            <Chat className={style.right} data={chatData} fn={sendMsg} />

        </div>
    )
}

export default ChatPage