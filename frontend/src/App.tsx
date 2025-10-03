import { useState, useEffect } from 'react'
import {Route, Routes, Navigate} from "react-router-dom"
import './App.css'

//components
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import ShareRoom from './components/ShareRoom';
import HostVoteRoom from './components/HostVoteRoom';
import VoteRoom from './components/VoteRoom';
import Results from './components/Results';

function App() {

  const [roomCode, setCurrentRoomCode] = useState(null);
 

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRoom setCurrentRoomCode={setCurrentRoomCode}/>} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/share" element={<ShareRoom roomCode={roomCode}/>} />
        <Route path="/host-vote" element={<HostVoteRoom roomCode={roomCode}/>} />
        <Route path="/vote" element={<VoteRoom />} />
        <Route path="/results" element={<Results roomCode={roomCode}/>} />
      </Routes>
    </div>
  )
}

export default App
