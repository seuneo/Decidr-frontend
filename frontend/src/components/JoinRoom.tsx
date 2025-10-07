import Logo from "./Logo";
import TextBox from "./TextBox";
import Button from "./Button";
import { useState } from "react";
import { LogIn } from "lucide-react";

function JoinRoom() {

    const [roomCode, setRoomCode] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const{value} = event.target;
        setRoomCode(value);
    }

    return <div className="container ">
        <div className="content">
            <Logo/>
            <div className="text-2xl font-bold">Join a Vote</div>
            <div className="text-slate-600 text-sm text-center">Enter the room code to join the vote</div>
            <TextBox value={roomCode} onChange={handleChange} className=" font-bold text-center text-xl border-2 py-2" placeholder="Enter room code" />
            <Button disabled={!roomCode.trim() || roomCode.trim().length < 4} icon={<LogIn className="h-4 w-4 mr-2" />} className="button-primary text-sm py-2" text="Join" onClick={() => {}}/>

        </div>

    </div>

}

export default JoinRoom;