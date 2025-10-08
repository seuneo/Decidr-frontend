import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {ThumbsUp, ThumbsDown, CheckCircle, StopCircle} from "lucide-react";
import UsersJoined from "./UsersJoined";
import {io, Socket} from "socket.io-client";

    function HostVoteRoom () {

      const {roomCode} = useParams();

      const [question, setQuestion] = useState("");
      const [loading, setLoading] = useState(true);
      const [errorPage, setErrorPage] = useState(false);
  

      const [showVoteConfirm, setShowVoteConfirm] = useState<boolean>(false);
      const [voteChoice, setVoteChoice] = useState<boolean | null>(null);
      
      const navigate = useNavigate();

      const [userCount, setUserCount] = useState(0);
      const [voteCount, setVoteCount] = useState(0);
      const [socket, setSocket] = useState<Socket | null>(null);

      useEffect(() => {
        const newSocket = io('https://voteit.onrender.com');
        
        // Join the room when connected
        newSocket.emit('join_room', roomCode);
        
        // Listen for user count updates
        newSocket.on('user_count_update', (count) => {
          setUserCount(count);
        });

        newSocket.on('vote_count_update', (count) => {
          setVoteCount(count);
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

    useEffect(() => {
      if(roomCode !== null){
          getQuestion();
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
        throw new Error('Failed to get question');
    }

    const roomData = await response.json();
    setQuestion(roomData?.room?.question);
    setLoading(false);
        
    } catch (error) {
        console.error('Error getting question:', error);
        
    }  
    
}

    async function vote({choice}: {choice: boolean}){

        try {
            const response = await fetch(`https://voteit.onrender.com/api/rooms/${roomCode}/vote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ choice }),
            });
      
            if (!response.ok) {

              navigate('/');
              setErrorPage(true);
              throw new Error('Failed to vote');
            }
      
            const roomData = await response.json();
            //setCurrentRoom(roomData);

            console.log(roomData);
            setVoteChoice(choice);
            setShowVoteConfirm(true);

            // Emit vote event to Socket.io
            if (socket) {
              socket.emit('user_voted', roomCode);
            }
            
            
          } catch (error) {
            console.error('Error voting', error);
            navigate('/');
            setErrorPage(true);
            
          }


    }

    function endVote(){
      if (socket) {
        socket.emit('end_vote', roomCode);
        // Navigate to results page
        navigate(`/results/${roomCode}`);
      }
    }

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

        <UsersJoined userCount={userCount}/>

        <div className="w-full flex flex-col gap-4">
       
      <div className="text-2xl font-bold text-center">{question}?</div>
        
        <div className="text-slate-600 text-sm text-center">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>{voteCount} voted</span>
          </div>
        </div>

        {!showVoteConfirm && <div className="w-full flex flex-col gap-4">

        
        <div className="text-slate-600 text-sm text-center">Cast your vote:</div>

        <div className="flex gap-4 w-full vote-buttons">
            <Button disabled={showVoteConfirm} className="bg-[#10B981]" icon={<ThumbsUp className="h-4 w-4" />} text="Yes" onClick={() => vote({choice: true})}/>
            <Button disabled={showVoteConfirm} className="bg-[#EF4444]" icon={<ThumbsDown className="h-4 w-4" />} text="No" onClick={() => vote({choice: false})}/> 
        </div>
        </div>}
        {showVoteConfirm && <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-sm" style={{backgroundColor: '#E07A5F'}}>
            <CheckCircle className="h-8 w-8" style={{color: '#F4F1DE'}} />
          </div>
          <div className="text-2xl font-semibold text-center"> Vote Confirmed!</div>
          <div className="text-slate-600"> You voted{' '}
                      <span className={`font-semibold uppercase ${voteChoice ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{voteChoice === true ? 'Yes' : 'No'}</span>
          </div>

          <div className="text-slate-600"> Waiting for results...</div>
        </div>}
        </div>
        <Button icon={<StopCircle className="h-4 w-4 mr-2" />} text="End Vote" className="button-primary" onClick={endVote}/>
    </div>

    </div>
}

export default HostVoteRoom;