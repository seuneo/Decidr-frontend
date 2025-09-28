import {ThumbsUp, ThumbsDown } from 'lucide-react';

function Logo() {

    return <div className="logo rounded-3xl bg-red-500 shadow-lg">
        <div className="logo-icons space-x-1">
            <ThumbsUp className="h-6 w-6 transform -rotate-12" />
            <ThumbsDown className="h-6 w-6 transform rotate-12"/>
        </div>   
    </div>

}

export default Logo;