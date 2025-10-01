import { useState, useEffect } from 'react'
import {Route, Routes, Navigate} from "react-router-dom"
import './App.css'

//components
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import ShareRoom from './components/ShareRoom';

function App() {

  const [roomData, setCurrentRoom] = useState(null);
 

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRoom setCurrentRoom={setCurrentRoom}/>} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/share" element={<ShareRoom roomData={roomData}/>} />
      </Routes>
    </div>
  )
}

export default App
