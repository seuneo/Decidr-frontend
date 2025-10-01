import Logo from "./Logo";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateRoomProps {
    setCurrentRoom: any;
  }

function CreateRoom({setCurrentRoom}: CreateRoomProps) {
    
    const navigate = useNavigate();


    const [question, setQuestion] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const{value} = event.target;
        setQuestion(value);    
    }

    async function createRoom(){

        try {
            const response = await fetch('http://localhost:3001/api/rooms', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ question }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to create room');
            }
      
            const roomData = await response.json();
            navigate('/share')

            console.log(roomData);
            
          } catch (error) {
            console.error('Error creating room:', error);
            
          }


    }


    console.log(question);

    return <div className="create-room-container ">

       <Logo />
       <input value={question} name="question" type="text" placeholder="Should we order pizza for lunch?" onChange={handleChange}/>
       <Button text="next" onClick={createRoom}/>

    </div>

}

export default CreateRoom;