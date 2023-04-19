import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const styleContainer = makeStyles({
    
    optionContainer:{
        display: "flex",
        fontSize: "12px",
        alignItems: "center",
        paddingLeft: "auto",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.9",
            backgroundColor: "#340e36"
          },
          "& h3":{
            fontWeight: "500",
            "& span":{
                padding: "15px",
            }
        }
    },
    optionChannel:{
        padding: "10px 0",
        fontWeight: "300",
    }
})




function SidebarOption({content, fn}) {

    const style = styleContainer();


  return (
    <div className={style.optionContainer} onClick={(e) => {
        e.preventDefault();
        fn(content.id);
    }}>

        <span>#</span><div className={style.optionChannel}>{content.username2}</div>

    </div>
  )
}

export default SidebarOption