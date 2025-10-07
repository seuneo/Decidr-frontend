import {ThumbsUp, ThumbsDown } from 'lucide-react';

function Logo() {

    return <div className="logo w-20 h-20 bg-[#E07A5F] rounded-3xl shadow-sm">
        <div className="logo-icons space-x-1">
            <ThumbsUp className="h-6 w-6 transform -rotate-12" />
            <ThumbsDown className="h-6 w-6 transform rotate-12"/>
        </div>   
    </div>

}

export default Logo;