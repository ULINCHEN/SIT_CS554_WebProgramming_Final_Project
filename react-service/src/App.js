import "./App.css";
import Auth from "./components/Auth";
import ChatPage from "./components/Chat/ChatPage";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import EditProfile from "./components/EditProfile";
import UpdatePreference from "./components/UpdatePreference";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Match Pets</h1>
          <nav>
            <NavLink className="navLink" to="/chat">
              Chat Rooms
            </NavLink>
            <NavLink className="navLink" to="/">
              Home
            </NavLink>
            <NavLink className="navLink" to="/update">
              Update Your Profile
            </NavLink>
            <NavLink className="navLink" to="/preference">
              What You Prefer
            </NavLink>
            <NavLink className="navLink" to="/profile">
              My Profile
            </NavLink>
          </nav>
        </header>

        <div className='App-body'>
          <Routes>
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<EditProfile />} />
            <Route path="/preference" element={<UpdatePreference />} />
<<<<<<< Updated upstream
            <Route path="/profile" element={<Profile />} />
=======
>>>>>>> Stashed changes
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
