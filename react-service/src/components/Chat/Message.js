import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const messageStyle = makeStyles({
    messageStyle: {
        display: "flex",
        alignContent: "center",
        padding: "20px"
    },
    image:{
        height: "50px",
        width:"50px",
        borderRadius: "8px",
    },
    messageInfo:{
        paddingLeft: "10px",
    },
    inline:{
        color: "gray",
        fontWeight: "300",
        marginLeft: "4px",
        fontSize: "10px"
    }
  });



function Message({content}) {
    
    const style = messageStyle();
    const profileImage = undefined;


  return (
    <div className={style.messageStyle}>

        {profileImage && (<img src={profileImage} alt="" />)}

        <div className={style.messageInfo}>

            <h4>
                {content.username}
                <span className={style.inline}>{content.time}</span>
            </h4>
            <p>{content.text}</p>
        </div>


    </div>
  )
}

export default Message