import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, ThumbsUp, ThumbsDown, Users, StopCircle, CheckCircle, Clock } from 'lucide-react';
import type { Room, UserRole } from '../App';

interface VotingRoomProps {
  room: Room;
  userRole: UserRole;
  userVote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down') => void;
  onEndPoll: () => void;
  onGoHome: () => void;
}

export function VotingRoom({ room, userRole, userVote, onVote, onEndPoll, onGoHome }: VotingRoomProps) {
  const totalVotes = room.votes.up + room.votes.down;
  const remainingParticipants = Math.max(0, room.participants - totalVotes);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onGoHome}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">
            {userRole === 'host' ? 'Managing Poll' : 'Voting'}
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8">
          {/* Question */}
          <Card className="p-8 text-center border-2 border-slate-200">
            <h2 className="text-2xl font-semibold mb-4 text-black">{room.question}</h2>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>{totalVotes} voted</span>
              </div>
              {remainingParticipants > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{remainingParticipants} remaining</span>
                </div>
              )}
            </div>
          </Card>

          {/* Vote Status or Voting Buttons */}
          {userVote ? (
            <Card className="p-8 text-center space-y-6 border-2 border-slate-200">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-green-700">Vote Confirmed!</h3>
                <p className="text-slate-600">
                  You voted{' '}
                  <span className={`font-semibold ${userVote === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {userVote === 'up' ? 'YES' : 'NO'}
                  </span>
                </p>
                <div className="text-sm text-slate-500">
                  {remainingParticipants > 0 
                    ? `Waiting for ${remainingParticipants} more vote${remainingParticipants !== 1 ? 's' : ''}...`
                    : 'All votes are in! Waiting for results...'
                  }
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="text-center text-slate-600 text-lg">
                Cast your vote:
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Button
                  onClick={() => onVote('up')}
                  className="h-36 flex-col space-y-3 bg-green-500 hover:bg-green-600 text-white border-0 rounded-2xl"
                  size="lg"
                >
                  <ThumbsUp className="h-14 w-14" />
                  <span className="text-xl font-semibold">YES</span>
                </Button>
                
                <Button
                  onClick={() => onVote('down')}
                  className="h-36 flex-col space-y-3 bg-red-500 hover:bg-red-600 text-white border-0 rounded-2xl"
                  size="lg"
                >
                  <ThumbsDown className="h-14 w-14" />
                  <span className="text-xl font-semibold">NO</span>
                </Button>
              </div>
            </div>
          )}

          {/* Live Vote Count - Only for participants */}
          {totalVotes > 0 && userRole === 'participant' && (
            <Card className="p-6 border-2 border-slate-200">
              <div className="space-y-4">
                <h4 className="font-medium text-center text-black">Live Results</h4>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <ThumbsUp className="h-5 w-5" />
                      <span className="font-semibold">YES</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">{room.votes.up}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-red-600">
                      <ThumbsDown className="h-5 w-5" />
                      <span className="font-semibold">NO</span>
                    </div>
                    <div className="text-3xl font-bold text-red-600">{room.votes.down}</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Host Controls */}
          {userRole === 'host' && (
            <Button
              onClick={onEndPoll}
              className="w-full bg-red-500 hover:bg-red-600 text-white border-0"
              size="lg"
            >
              <StopCircle className="h-5 w-5 mr-2" />
              End Poll
            </Button>
          )}

          <div className="text-center text-sm text-slate-500">
            {userRole === 'host' 
              ? 'You can end the poll at any time'
              : 'The host will end the poll when ready'
            }
          </div>
        </div>
      </div>
    </div>
  );
}