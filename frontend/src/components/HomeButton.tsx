import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

function HomeButton() {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    return <button onClick={goHome} className="absolute top-2 left-2 z-10 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-[#E8E0C7]">
        <Home className="h-4 w-4 text-[#3D405B]" />
             
    </button>
}

export default HomeButton;