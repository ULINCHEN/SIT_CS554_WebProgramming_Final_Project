import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import SidebarOption from './SidebarOption';


const styleContainer = makeStyles({
    sidebarContainer: {
<<<<<<< Updated upstream
        backgroundColor: "gray",
=======
        backgroundColor: "#784888",
>>>>>>> Stashed changes
        color: "white",
        flex: " 0.3",
        borderTop: "1px solid #49274b",
        maxWidth: "260px",
        marginTop: "45px",
    },
    hr: {
        marginTop: "10px",
        marginBottom: "10px",
        border: "1px solid #49274b"
    },
    sidebarHeader: {
        display: "flex",
        borderBottom: "1px solid #49274b",
        padding: "13px",
    },
    sidebarIcon: {
        padding: "8px",
        color: "#49274b",
        fontSize: "18px",
        backgroundColor: "white",
        borderradius: "999px",
    },
    sidebarInfo: {
        flex: "1",
        display: "flex",
        justifyContent: "center", /* 水平居中 */
        alignItems: "center", /* 垂直居中 */
    },
    h2: {
        fontSize: "15px",
        fontWeight: "900",

    },
    h3: {
        display: "flex",
        fontSize: "13px",
        fontWeight: "400",
        alignItems: "center"
    },
    h3Icon: {
        fontSize: "14px",
        marginTop: "1px",
        marginRight: "2px",
        color: "green"
    }
})


function Sidebar({ data, fn }) {
<<<<<<< Updated upstream

=======
    const currentUserName = sessionStorage.getItem("username");
>>>>>>> Stashed changes
    const style = styleContainer();

    return (
        <div className={style.sidebarContainer}>

            <div className={style.sidebarInfo}>
<<<<<<< Updated upstream
                <h2 className={style.h2}>Username's Chat History</h2>
=======
                <h2 className={style.h2}>{currentUserName}'s Chat History</h2>
>>>>>>> Stashed changes

            </div>


            {data && data.map((item) => {
                return (

                    <SidebarOption content={item} fn={fn} key={item.id} />

                )
            })}

        </div>
    )
}

export default Sidebar;