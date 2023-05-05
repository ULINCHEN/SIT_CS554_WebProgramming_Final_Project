import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from '@mui/icons-material/Chat';
const styleContainer = makeStyles({

    optionContainer: {
        display: "flex",
        fontSize: "12px",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "auto",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.9",
            backgroundColor: "#340e36"
        },
        "& h3": {
            fontWeight: "500",
            "& span": {
                padding: "15px",
            }
        }
    },
    optionChannel: {
        padding: "10px 0",
        margin: "10px",
        fontWeight: "500",
        fontSize: "15px"
    }
})




function SidebarOption({ content, fn }) {

    const style = styleContainer();


    return (
        <div className={style.optionContainer} onClick={(e) => {
            e.preventDefault();
            fn(content.id);
        }}>
            <ChatIcon /><div className={style.optionChannel}>{content.username2}</div>

        </div>
    )
}

export default SidebarOption