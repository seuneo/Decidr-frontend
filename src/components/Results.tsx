import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Home, BarChart3, PieChart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import type { Room } from '../App';

interface ResultsProps {
  room: Room;
  onGoHome: () => void;
}

export function Results({ room, onGoHome }: ResultsProps) {
  const totalVotes = room.votes.up + room.votes.down;
  const yesPercentage = totalVotes > 0 ? Math.round((room.votes.up / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((room.votes.down / totalVotes) * 100) : 0;

  const barData = [
    {
      name: 'YES',
      votes: room.votes.up,
      percentage: yesPercentage,
    },
    {
      name: 'NO',
      votes: room.votes.down,
      percentage: noPercentage,
    },
  ];

  const pieData = [
    {
      name: 'YES',
      value: room.votes.up,
      color: '#22c55e',
    },
    {
      name: 'NO',
      value: room.votes.down,
      color: '#ef4444',
    },
  ];

  const winner = room.votes.up > room.votes.down ? 'YES' : room.votes.down > room.votes.up ? 'NO' : 'TIE';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onGoHome}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">Poll Results</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Question and Winner */}
          <Card className="p-8 text-center space-y-6 border-2 border-slate-200">
            <h2 className="text-2xl font-semibold text-black">{room.question}</h2>
            
            {winner !== 'TIE' ? (
              <div className="space-y-4">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto ${
                  winner === 'YES' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {winner === 'YES' ? (
                    <ThumbsUp className="h-10 w-10 text-green-600" />
                  ) : (
                    <ThumbsDown className="h-10 w-10 text-red-600" />
                  )}
                </div>
                <h3 className={`text-3xl font-bold ${
                  winner === 'YES' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {winner} WINS!
                </h3>
                <p className="text-slate-600 text-lg">
                  {winner === 'YES' ? yesPercentage : noPercentage}% of votes
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                  <BarChart3 className="h-10 w-10 text-slate-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-600">It's a Tie!</h3>
                <p className="text-slate-600 text-lg">
                  Equal votes on both sides
                </p>
              </div>
            )}
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center border-2 border-slate-200">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <ThumbsUp className="h-6 w-6" />
                  <span className="font-semibold text-lg">YES</span>
                </div>
                <div className="text-4xl font-bold text-green-600">{room.votes.up}</div>
                <div className="text-sm text-slate-600">{yesPercentage}%</div>
              </div>
            </Card>
            
            <Card className="p-6 text-center border-2 border-slate-200">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <ThumbsDown className="h-6 w-6" />
                  <span className="font-semibold text-lg">NO</span>
                </div>
                <div className="text-4xl font-bold text-red-600">{room.votes.down}</div>
                <div className="text-sm text-slate-600">{noPercentage}%</div>
              </div>
            </Card>
          </div>

          {/* Bar Chart */}
          <Card className="p-8 border-2 border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="h-6 w-6 text-slate-600" />
              <h3 className="font-semibold text-black text-lg">Vote Distribution</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar 
                    dataKey="votes" 
                    radius={[4, 4, 0, 0]}
                    fill={(entry) => entry.name === 'YES' ? '#22c55e' : '#ef4444'}
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart */}
          {totalVotes > 0 && (
            <Card className="p-8 border-2 border-slate-200">
              <div className="flex items-center space-x-3 mb-6">
                <PieChart className="h-6 w-6 text-slate-600" />
                <h3 className="font-semibold text-black text-lg">Vote Breakdown</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsPieChart
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Summary */}
          <Card className="p-6 bg-slate-50 border-slate-200">
            <div className="text-center space-y-3">
              <h4 className="font-medium text-black text-lg">Poll Summary</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <p><strong>{totalVotes}</strong> total votes from <strong>{room.participants}</strong> participants</p>
                <p>Room code: <strong>{room.id}</strong></p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={onGoHome}
              className="w-full bg-black hover:bg-slate-800 text-white border-0"
              size="lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Create New Poll
            </Button>
          </div>

          <div className="text-center text-sm text-slate-500 pt-4">
            Thanks for using VoteIt! 🗳️
          </div>
        </div>
      </div>
    </div>
  );
}