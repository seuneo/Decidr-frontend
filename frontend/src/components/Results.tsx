import Button from "./Button";

interface ResultsProps {
    roomCode: any;
}

function Results({roomCode}: ResultsProps) {

    return <div>

        <div>
            <div>Results</div>

           
        </div>
   
        <Button text="Share" className="button-primary" onClick={() => {}}/>
        <Button text="Home" className="button-primary" onClick={() => {}}/>


    </div>
}

export default Results;