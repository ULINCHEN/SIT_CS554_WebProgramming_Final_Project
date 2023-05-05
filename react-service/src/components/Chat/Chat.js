import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Message from './Message';
import ChatInput from './ChatInput';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';



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

        setChatData(data);

    }, [data]);


    // 设定窗口自动滚动到聊天记录下方
    useEffect(() => {

        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [data]);

    return (

        <div className={style.chatContainer}>
            {chatData ? (
                chatData.messages ? (
                    <>

                        <h2 className={style.header}>Chat Wtih {chatData.nickname2}</h2>
                        <div>
                            {chatData.messages.map((item) => {
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
                        <h2 className={style.header}>No chat records with {chatData.nickname2}, why don't you say hi first?</h2>
                        <ChatInput fn={fn} />
                    </>
                )
            ) : (

                <h2>Click a user name to start chat!</h2>

            )}

        </div>


    )
}

export default Chat