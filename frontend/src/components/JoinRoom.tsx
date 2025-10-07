import Logo from "./Logo";
import TextBox from "./TextBox";
import Button from "./Button";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

function JoinRoom() {

    const [roomCode, setRoomCode] = useState("");

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const{value} = event.target;
        setRoomCode(value);
    }

    async function joinRoom(){
        if(roomCode.trim() && roomCode.trim().length >= 4){
            try{
                const response = await fetch(`http://localhost:3001/api/rooms/${roomCode}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if(!response.ok){
                    toast.error('Room not found');
                    throw new Error('Failed to join room');
                }
                const roomData = await response.json();
                console.log(roomData);
                navigate(`/join/${roomCode}`);
            } catch (error) {
                console.error('Error joining room:', error);
            }

        }
        
    }

    console.log(!roomCode.trim() || roomCode.trim().length < 4);

    return <div className="container ">
        <div className="content">
            <Logo/>
            <div className="text-2xl font-bold">Join a Vote</div>
            <div className="text-slate-600 text-sm text-center">Enter the room code to join the vote</div>
            <TextBox value={roomCode} onChange={handleChange} className=" font-bold text-center text-xl border-2 py-2" placeholder="Enter room code" />
            <Button disabled={!roomCode.trim() || roomCode.trim().length < 4} icon={<LogIn className="h-4 w-4 mr-2" />} className="button-primary text-sm py-2" text="Join" onClick={joinRoom}/>

        </div>

    </div>

}

export default JoinRoom;