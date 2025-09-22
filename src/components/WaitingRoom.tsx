import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Users, Clock, Wifi } from 'lucide-react';
import type { Room } from '../App';

interface WaitingRoomProps {
  room: Room;
  onGoHome: () => void;
}

export function WaitingRoom({ room, onGoHome }: WaitingRoomProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onGoHome}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">Room {room.id}</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8 text-center">
          {/* Status Indicator */}
          <div className="space-y-6">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <Clock className="h-12 w-12 text-slate-600" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-black">Waiting for Host</h2>
              <p className="text-slate-600 text-lg">
                The poll will start when the host begins voting
              </p>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 space-y-6 border-2 border-slate-200">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wide">
                Poll Question
              </h3>
              <p className="text-xl font-medium leading-relaxed text-black">
                {room.question}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Users className="h-4 w-4" />
                <span>{room.participants} participant{room.participants !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Wifi className="h-4 w-4" />
                <span>Connected</span>
              </div>
            </div>
          </Card>

          {/* Loading Animation */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-slate-600">
              Waiting for the host to start the poll...
            </p>
          </div>

          {/* Instructions */}
          <Card className="p-6 bg-slate-50 border-slate-200">
            <div className="space-y-3">
              <h4 className="font-medium text-black">What happens next?</h4>
              <div className="text-sm text-slate-600 space-y-2">
                <p>• The host will start the voting when ready</p>
                <p>• You'll see thumbs up and down buttons</p>
                <p>• Vote once and see the results together</p>
              </div>
            </div>
          </Card>

          <div className="text-sm text-slate-500 pt-4">
            Stay on this page - you'll be notified when voting begins
          </div>
        </div>
      </div>
    </div>
  );
}