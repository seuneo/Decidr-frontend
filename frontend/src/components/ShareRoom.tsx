import Button from "./Button";

interface ShareRoomProps {
    roomData: any;
}

function ShareRoom({roomData}: ShareRoomProps) {

    

    return <div className="share-room-container ">

       <Button text="Start Voting" onClick={() => {}}/>

    </div>

}

export default ShareRoom;