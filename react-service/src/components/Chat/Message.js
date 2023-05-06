import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from '@material-ui/core';
import noImage from "../../img/download.jpeg";

const messageStyle = makeStyles({
    messageStyleUser1: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        borderColor: "#ffc90c",
        borderStyle: "solid",
        borderRadius: "15px",
        margin: "15px 15px",
        marginTop: "5px",
        transition: "0.5s",
        '&:hover': {
            boxShadow: "10px 5px 5px gray",
            transition: "0.5s"
        }
    },
    messageStyleUser2: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        borderColor: "#1ba784",
        borderStyle: "solid",
        margin: "15px 15px",
        borderRadius: "15px",
        marginTop: "5px",
        transition: "0.5s",
        '&:hover': {
            boxShadow: "10px 5px 5px gray",
            transition: "0.5s"
        }
    },
    image: {
        height: "50px",
        width: "50px",
        borderRadius: "8px",
    },
    messageInfo: {
        display: 'flex', alignItems: 'center',
        paddingLeft: "10px",

    },
    avatar: {

    },
    inline: {
        color: "black",
        fontWeight: "300",
        marginLeft: "4px",
        fontSize: "10px"
    },

});



function Message({ content }) {
    // console.log(content);
    const style = messageStyle();
    const profileImage = undefined;
    const [currentUser, setCurrentUser] = useState(true);
    const [message, setMessage] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (content) setMessage(content);
        setLoading(false);
    }, [content]);

    useEffect(() => {

        if (message && message.username === sessionStorage.getItem("username")) {
            setCurrentUser(true);
        }
        else {
            setCurrentUser(false);
        }

    }, [message]);

    return (

        <div className={currentUser ? style.messageStyleUser1 : style.messageStyleUser2}>


            {loading ? <p> Loading</p> : (
                <div>
                    <div className={style.messageInfo}>

                        <Avatar className={style.avatar} src={message.imageURL ? message.imageURL : noImage} size="small" variant='circular' alt={message.username} />
                        <span style={{ marginLeft: '10px' }}>{message.username}</span>
                        <span className={style.inline}>{message.time}</span>


                    </div>
                    <div style={{ marginTop: "10px", marginLeft: "10px" }}>{message.text}</div></div>

            )}

            {/* {profileImage && (<img src={profileImage} alt="" />)} */}



        </div>
    )
}

export default Message;