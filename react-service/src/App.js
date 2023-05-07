import "./App.css";
import Auth from "./components/Auth";
import ChatPage from "./components/Chat/ChatPage";
import Home from "./components/Home";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import EditProfile from "./components/EditProfile";
import UpdatePreference from "./components/UpdatePreference";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";


const styleContainer = makeStyles({

  header: {
    backgroundColor: "#7A4988",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

})


function App() {

  const style = styleContainer();
  return (
    <Router>
      <div className="App">



        <div className={style.header}>
          <h1> 🐾 PAWFECT MATCH 🐾 </h1>
          <div className={style.navbar}>

            <NavLink className="navLink" to="/chat">
              Chat Rooms
            </NavLink>
            <NavLink className="navLink" to="/">
              Home
            </NavLink>
            <NavLink className="navLink" to="/profile">
              My Profile
            </NavLink>

          </div>
        </div>



        <div className='App-body'>
          <Routes>
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<EditProfile />} />
            <Route path="/preference" element={<UpdatePreference />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<ErrorPage errorMsg={"Invalid URL"} />} />
          </Routes>


        </div>
      </div>
    </Router>
  );
}

export default App;
