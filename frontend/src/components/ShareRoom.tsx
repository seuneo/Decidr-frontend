import Button from "./Button";
import { useNavigate } from "react-router-dom";


interface ShareRoomProps {
    roomCode: any;
}

function ShareRoom({roomCode}: ShareRoomProps) {

    const navigate = useNavigate();

    function startVoting() {
        navigate('/host-vote');
    }

    
    console.log(roomCode);
    return <div className="share-room-container ">

        <div>QR code</div>
    
       <p>{roomCode}</p>
       <p>{roomCode}</p>

       <Button text="Copy Code" onClick={() => {}}/>
       <Button text="Copy Link" onClick={() => {}}/> 

       
    <Button className="button-primary" text="Start Voting" onClick={startVoting}/>

    </div>

}

export default ShareRoom;