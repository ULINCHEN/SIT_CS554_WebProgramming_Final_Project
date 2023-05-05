import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from '@material-ui/core';
import noImage from "../../img/download.jpeg";

const messageStyle = makeStyles({
    messageStyleUser1: {
        display: "flex",
        alignContent: "center",
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
        alignContent: "center",
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
        paddingLeft: "10px",
    },
    inline: {
        color: "black",
        fontWeight: "300",
        marginLeft: "4px",
        fontSize: "10px"
    },
    display: 'flex', alignItems: 'center'
});



function Message({ content }) {
    // console.log(content);
    const style = messageStyle();
    const profileImage = undefined;
    const [currentUser, setCurrentUser] = useState(true);

    useEffect(() => {

        if (content.username === sessionStorage.getItem("username")) {
            setCurrentUser(true);
        }
        else {
            setCurrentUser(false);
        }

    }, [])

    return (
        <div className={currentUser ? style.messageStyleUser1 : style.messageStyleUser2}>

            {profileImage && (<img src={profileImage} alt="" />)}

            <div className={style.messageInfo}>

                <Avatar src={content.imageURL?content.imageURL:noImage} size="small" variant='circular' alt={content.username}/>
                {/* <h4>{content.username}
                    <span className={style.inline}>{content.time}</span>
                </h4>
                <p>{content.text}</p> */}
                <span style={{ marginLeft: '10px' }}>{content.username}</span>
                <span className={style.inline}>{content.time}</span>
                <div style={{ marginLeft: '10px' }}>{content.text}</div>
            </div>


        </div>
    )
}

export default Message;