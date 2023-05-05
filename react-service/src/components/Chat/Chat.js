import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Message from './Message';
import ChatInput from './ChatInput';
import { useRef } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const chatStyle = makeStyles({
    chatContainer: {
        flex: "0.7",
        flexGrow: "1",
        overflow: "scroll",
        marginTop: "50px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid lightgray",
    },
    chatBottom: {
        paddingBottom: "200px"
    }

});


function Chat({ data, fn }) {


    const style = chatStyle();
    const chatRef = useRef(null);
    const [chatData, setChatData] = useState(undefined);

    useEffect(() => {

        const fetchImage = async(data) => { 
            if (data && data.messages){
                console.log("chatData petId1, petId2: ", data.petId1, data.petId2);
                for (let i = 0, len = data.messages.length; i < len; i++) {
                    if (data.messages[i].username === data.username1) {
                        console.log("user1 trigger");
                        try {
                            const response = await axios.get(
                                `http://localhost:3000/pets/${data.petId1}`,
                                { withCredentials: true}
                            );
                            data.messages[i].imageURL = response.data.imageURL;
                            console.log("Chat Pet 1 imageURL: ", response.data.imageURL);
                        } catch (error) {
                            if (error.response && error.response.data) {
                                console.log('Error Get Chat Pet Image:', error.response.data);
                                throw error.response.data.error;
                            }
                            throw "Cannot Get Chat Pet Image";
                        }
                    } else if (data.messages[i].username === data.username2) {
                        console.log("user2 trigger");
                        try {
                            const response = await axios.get(
                                `http://localhost:3000/pets/${data.petId2}`,
                                { withCredentials: true}
                            );
                            data.messages[i].imageURL = response.data.imageURL;
                            console.log("Chat Pet 2 imageURL: ", response.data.imageURL);
                        } catch (error) {
                            if (error.response && error.response.data) {
                                console.log('Error Get Chat Pet Image:', error.response.data);
                                throw error.response.data.error;
                            }
                            throw "Cannot Get Chat Pet Image";
                        }
                    }     
                    console.log("chatData.messages: ", data.messages); 
                }
            }
            setChatData(data);
        };
        
        fetchImage(data);

    }, [data]);


    // 设定窗口自动滚动到聊天记录下方
    useEffect(() => {

        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [data]);

    return (

        <div className={style.chatContainer}>
            {data ? (
                data.messages ? (
                    <>

                        <div className={style.header}>Chat Wtih {data.nickname2}</div>
                        <div>
                            {data.messages.map((item) => {
                                return (
                                    <Message content={item} key={uuidv4()} />
                                )
                            })}
                        </div>
                        <div ref={chatRef} className={style.chatBottom}></div>
                        <ChatInput fn={fn} />
                    </>
                ) : (
                    <>
                        <div className={style.header}>No chat records with {data.nickname2}, why don't you say hi first?</div>
                        <ChatInput fn={fn} />
                    </>
                )
            ) : (

                <div>Click a user name to start chat!</div>

            )}

        </div>


    )
}

export default Chat