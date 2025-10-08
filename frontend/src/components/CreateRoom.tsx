import Logo from "./Logo";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "./TextBox";
import HomeButton from "./HomeButton";
import { toast } from "sonner";

function CreateRoom() {
    
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
            navigate(`/share/${roomData?.room?.code}`)

            console.log(roomData);
            
            
          } catch (error) {
            console.error('Error creating room:', error);
            toast.error('Failed to create room');
          }


    }

    console.log(question);

    return <div className="container ">
      <div className="content">
      <HomeButton />
       <Logo />
       <div className="text-2xl font-bold">What's your question?</div>
       <div className="text-slate-600 text-sm text-center">Enter a yes or no question. You'll be able to share it once created.</div>
       <TextBox className="question-box text-sm border-2" value={question} placeholder="e.g., Should we order pizza for lunch?" onChange={handleChange}/>
       <Button disabled={!question.trim()} className="text-sm py-2 button-primary disabled:opacity-50 disabled:pointer-events-none" text="next" onClick={createRoom}/>
</div>
    </div>

}

export default CreateRoom;