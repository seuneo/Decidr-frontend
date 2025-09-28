
import Logo from './Logo';
import Button from './Button';
import { Plus, Users } from 'lucide-react';

function Home() {

    return <div className="home-container ">

        <Logo />
        <div className="text-2sm text-black font-bold tracking-tight">
            VoteIt</div>

        <div className="text-slate-600 text-xl font-medium">
                Skip the debate, let's vote!
         </div>

        <div className="home-buttons">
                <Button className="button-primary" text="Start a Vote" onClick={() => {}} icon={<Plus className="h-6 w-6" />} />
                <Button className="button-secondary" text="Join a Vote" onClick={() => {}} icon={<Users className="h-6 w-6" />}/>
        </div>

    </div>

}

export default Home;