
import { Users } from 'lucide-react';

function UsersJoined({userCount}: {userCount: number}) {

    return <div className="absolute top-2 right-2 z-10 cursor-pointer p-2 flex items-center gap-2 text-sm text-[#6b7280]">
        <Users className="h-4 w-4" />
        {userCount} joined
             
    </div>
}

export default UsersJoined;