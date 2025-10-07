import { useState} from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import './App.css'
import {Toaster} from 'sonner';

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
        <Route path="/share/:roomCode" element={<ShareRoom/>} />
        <Route path="/host/:roomCode" element={<HostVoteRoom />} />
        <Route path="/join/:roomCode" element={<VoteRoom/>} />
        <Route path="/results/:roomCode" element={<Results/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
