import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Copy, Play } from "lucide-react";
import QRCode from "qrcode";
import {toast} from 'sonner';
import HomeButton from "./HomeButton";
import UsersJoined from "./UsersJoined";
import {io, Socket} from "socket.io-client";

function ShareRoom() {
  const {roomCode} = useParams();

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorPage, setErrorPage] = useState(false);

    const [qrCodeURL, setQrCodeURL] = useState("");
    const [userCount, setUserCount] = useState(0);
    const [socket, setSocket] = useState<Socket | null>(null);


    const navigate = useNavigate();

    useEffect(() => {
      const newSocket = io('https://voteit.onrender.com');
      
      // Join the room when connected
      newSocket.emit('join_room', roomCode);
      
      // Listen for user count updates
      newSocket.on('user_count_update', (count) => {
        setUserCount(count);
      });
  
      // Listen for connection events
      newSocket.on('connect', () => {
        console.log('Connected to server');
      });
  
      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
  
      setSocket(newSocket);
  
      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }, [roomCode]);

    function startVoting() {
      if (socket) {
        socket.emit('vote_started', roomCode);
        navigate(`/host/${roomCode}`);
      }
        
    }

    useEffect(() => {
        if(roomCode !== null){
            getQuestion();
            generateQrCode();
            setLoading(false);
        }
    }, [roomCode]);

    async function getQuestion(){
        try {

          const response = await fetch(`https://voteit.onrender.com/api/rooms/${roomCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        
        if (!response.ok) {
            navigate('/');
            setErrorPage(true);
            throw new Error('Failed to get question');
        }

        const roomData = await response.json();
        setQuestion(roomData?.room?.question);
        setLoading(false);
            
        } catch (error) {
            console.error('Error getting question:', error);
            navigate('/');
            setErrorPage(true);
        }  
        
    }

    async function generateQrCode(){
        try {
            const roomLink = `${window.location.origin}/join/${roomCode}`;
            const qrCodeDataUrl = await QRCode.toDataURL(roomLink, {
              width: 300,
              margin: 2,
              color: {
                dark: '#000000',  // Dark color
                light: '#FFFFFF'  // Light color
              }
            });
            setQrCodeURL(qrCodeDataUrl);
          } catch (error) {
            console.error('Error generating QR code:', error);
          }
    }

        const copyRoomCode = () => {
          if (roomCode) {
            navigator.clipboard.writeText(roomCode);
            toast.success('Room code copied to clipboard!');
          }
        };
      
        const copyRoomLink = () => {
          if (roomCode) {
            const roomLink = `${window.location.origin}/join/${roomCode}`;
            navigator.clipboard.writeText(roomLink);
            toast.success('Room link copied to clipboard!');
          }
        };
    

    console.log(question);

    
    console.log(roomCode);

    if(loading){
      return <div className="container">
        <div className="content">
          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold text-center">Loading...</div>
          </div>
        </div>
      </div>
    }

    if(errorPage){
      return <div className="container">
        <div className="content">
          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold text-center">Room not found</div>
          </div>
        </div>
      </div>
    }

    return <div className="container ">
        <div className="content">
          <HomeButton />
          <UsersJoined userCount={userCount}/>

        <div className="text-2xl font-bold text-center">{question}</div>
        <div className="text-slate-600 text-sm text-center">Share QR or room code to join vote</div>

        <div>
      {qrCodeURL && (
        <img 
          src={qrCodeURL}
          alt={`QR code for room: ${roomCode}`}
          className="w-48 h-48 mx-auto rounded-lg"
        />
      )}
    </div>
       <div className="w-full text-center font-semibold code-box rounded-xl p-2 border-2 text-sm bg-white">{roomCode}</div>
       
       <div className="copy-buttons flex gap-2 w-full">
        <button className="" onClick={copyRoomCode}>
            <Copy className="h-4 w-4 mr-1" />Copy Code</button>
        <button onClick={copyRoomLink}>
            <Copy className="h-4 w-4 mr-1" />Copy Link</button> 
    </div>
       
    <Button icon={<Play className="h-4 w-4 mr-1" />} className="button-primary" text="Start Voting" onClick={startVoting}/>
        </div>
    </div>

}


export default ShareRoom;