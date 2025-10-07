import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {ThumbsUp, ThumbsDown, CheckCircle, StopCircle} from "lucide-react";


interface HostVoteRoomProps {
    roomCode: any;
}

    function HostVoteRoom ({roomCode}: HostVoteRoomProps) {

      const [question, setQuestion] = useState("");
      const [loading, setLoading] = useState(true);
  
      const [showVoteConfirm, setShowVoteConfirm] = useState(false);
      const [voteChoice, setVoteChoice] = useState<boolean | null>(null);
      
      const navigate = useNavigate();

    useEffect(() => {
      if(roomCode !== null){
          getQuestion();
      }
  }, [roomCode]);

  async function getQuestion(){
    try {

      const response = await fetch(`http://localhost:3001/api/rooms/${roomCode}`, {
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
            const response = await fetch(`http://localhost:3001/api/rooms/${roomCode}/vote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ choice }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to vote');
            }
      
            const roomData = await response.json();
            //setCurrentRoom(roomData);

            console.log(roomData);
            setVoteChoice(choice);
            setShowVoteConfirm(true);
            
            
          } catch (error) {
            console.error('Error voting', error);
            
          }


    }

    function endVote(){
        navigate('/results');
    }

    return <div className="container ">

      <div className="content">

        <div className="w-full flex flex-col gap-4">

        

        
      <div className="text-2xl font-bold text-center">{question}?</div>
        
        <div className="text-slate-600 text-sm text-center">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>10 voted</span>
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