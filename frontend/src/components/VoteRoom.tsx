import Button from "./Button";

interface ButtonSmallProps {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
    className?: string; // Optional icon
  }

function VoteRoom() {

    return <div>

        <div>
            <Button text="Yes" onClick={() => {}}/>
            <Button text="No" onClick={() => {}}/> 
        </div>    
    </div>
}

export default VoteRoom;