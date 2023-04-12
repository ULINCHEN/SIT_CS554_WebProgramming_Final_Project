import './App.css';
import Auth from './components/Auth';
import { Route, Routes, Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
       
      <div className='App-body'>
          <Routes>
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
