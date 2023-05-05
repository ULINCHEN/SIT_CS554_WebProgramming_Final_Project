import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Message from './Message';
import ChatInput from './ChatInput';
import { useRef } from 'react';
import io from 'socket.io-client';
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

    }, []);


    // 设定窗口自动滚动到聊天记录下方
    useEffect(() => {

        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [data]);

    return (

        <div className={style.chatContainer}>
            {data ? (
                data.messages.length !== 0 ? (
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