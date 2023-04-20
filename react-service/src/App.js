import './App.css';
import Auth from './components/Auth';
import ChatPage from './components/Chat/ChatPage';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
      <Router>
          <div className="App">

              <div className='App-body'>
                  <Routes>
                      <Route path='/chat' element={<ChatPage />} />
                      <Route path='/auth' element={<Auth />} />
                      <Route path="/" element={<Home />} />
                  </Routes>

              </div>
          </div>
      </Router>
    );
}

export default App;
