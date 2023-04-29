import './App.css';
import TestSocket from './TestSocket';
import Auth from './components/Auth';
import Chat from './components/Chat/Chat';
import ChatPage from './components/Chat/ChatPage';
import Home from './components/Home';
import { Route, Routes, Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
       
      <div className='App-body'>
          <Routes>
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path='/test' element={<TestSocket />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
