import Logo from './Logo';
import Button from './Button';
import { Plus, Users } from 'lucide-react';
import { useNavigate} from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const startVote = () => {
        navigate('/create');
    }
    const joinVote = () => {
        navigate('/join');
    }

    return <div className="container ">
        <div className="content">
        <Logo />
        <div className="text-2sm text-black font-bold tracking-tight">
            VoteIt</div>

        <div className="text-slate-600 text-xl font-medium">
                Skip the debate, let's vote!
         </div>

        <div className="home-buttons flex flex-col w-full gap-4 ">
                <Button className="button-primary" text="Start a Vote" onClick={startVote} icon={<Plus className="h-4 w-4" />} />
                <Button className="button-secondary" text="Join a Vote" onClick={joinVote} icon={<Users className="h-4 w-4" />}/>
        </div>
        </div>
    </div>

}

export default Home;