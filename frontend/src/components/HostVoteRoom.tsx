import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface HostVoteRoomProps {
    roomCode: any;
}

    function HostVoteRoom ({roomCode}: HostVoteRoomProps) {

    const navigate = useNavigate();

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
            
            
          } catch (error) {
            console.error('Error voting', error);
            
          }


    }

    function endVote(){
        navigate('/results');
    }

    return <div>

        <div>
            <Button text="Yes" onClick={() => vote({choice: true})}/>
            <Button text="No" onClick={() => vote({choice: false})}/> 
        </div>
        
        <Button text="End Vote" className="button-primary" onClick={endVote}/>


    </div>
}

export default HostVoteRoom;