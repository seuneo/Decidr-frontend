import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Home, BarChart3, PieChart, ThumbsUp, ThumbsDown, Users, Share2, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import type { Room } from '../App';

interface ResultsProps {
  room: Room;
  onGoHome: () => void;
}

export function Results({ room, onGoHome }: ResultsProps) {
  // Temporary fake data for visualization
  const fakeVotes = { up: 8, down: 5 };
  const totalVotes = fakeVotes.up + fakeVotes.down;
  const yesPercentage = Math.round((fakeVotes.up / totalVotes) * 100);
  const noPercentage = Math.round((fakeVotes.down / totalVotes) * 100);

  const barData = [
    {
      name: 'YES',
      votes: fakeVotes.up,
      percentage: yesPercentage,
    },
    {
      name: 'NO',
      votes: fakeVotes.down,
      percentage: noPercentage,
    },
  ];

  const pieData = [
    {
      name: 'YES',
      value: fakeVotes.up,
      color: '#10B981',
    },
    {
      name: 'NO',
      value: fakeVotes.down,
      color: '#EF4444',
    },
  ];

  const winner = fakeVotes.up > fakeVotes.down ? 'YES' : fakeVotes.down > fakeVotes.up ? 'NO' : 'TIE';

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F4F1DE'}}>
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{backgroundColor: '#F4F1DE'}}>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGoHome}
            style={{
              backgroundColor: 'transparent',
              color: 'inherit'
            }}
            className="transition-colors duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E8E0C7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Home className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">Results</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants} joined</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-4" data-results-container>
          {/* Question */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-relaxed">{room.question}</h2>
          </div>

          {/* Winner Display */}
          <div className="text-center space-y-4">
            {winner !== 'TIE' ? (
              <div className="space-y-4">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg"
                  style={{backgroundColor: winner === 'YES' ? '#10B981' : '#EF4444'}}
                >
                  {winner === 'YES' ? (
                    <ThumbsUp className="h-8 w-8" style={{color: '#F4F1DE'}} />
                  ) : (
                    <ThumbsDown className="h-8 w-8" style={{color: '#F4F1DE'}} />
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg"
                  style={{backgroundColor: '#E07A5F'}}
                >
                  <BarChart3 className="h-8 w-8" style={{color: '#F4F1DE'}} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-black">TIE</h3>
                  <p className="text-slate-600">
                    Equal votes on both sides
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Combined Results */}
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 rounded-lg p-6" style={{borderColor: '#3D405B'}}>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-slate-600" />
                  <h4 className="font-semibold text-black">Results</h4>
                </div>
                {totalVotes > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-4 w-4" style={{color: '#10B981'}} />
                          <span className="text-sm font-medium" style={{color: '#10B981'}}>YES ({fakeVotes.up} votes)</span>
                        </div>
                        <span className="text-sm text-slate-600">{yesPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full" style={{height: '12px'}}>
                        <div 
                          style={{
                            width: `${yesPercentage}%`,
                            height: '12px',
                            backgroundColor: '#10B981',
                            borderRadius: '0px'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <ThumbsDown className="h-4 w-4" style={{color: '#EF4444'}} />
                          <span className="text-sm font-medium" style={{color: '#EF4444'}}>NO ({fakeVotes.down} votes)</span>
                        </div>
                        <span className="text-sm text-slate-600">{noPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full" style={{height: '12px'}}>
                        <div 
                          style={{
                            width: `${noPercentage}%`,
                            height: '12px',
                            backgroundColor: '#EF4444',
                            borderRadius: '0px'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#E07A5F'}}>
                      <BarChart3 className="h-8 w-8" style={{color: '#F4F1DE'}} />
                    </div>
                    <h4 className="text-lg font-semibold text-black mb-2">No Votes Yet</h4>
                    <p className="text-sm text-slate-600">
                      Results will appear here once participants start voting
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="text-sm text-slate-500">
              Thanks for using <span className="font-semibold" style={{color: '#E07A5F'}}>VoteIt</span>! 🗳️
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'VoteIt Results',
                      text: `Vote Results: ${room.question}`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                  }
                }}
                className="border-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#E07A5F',
                  borderColor: '#3D405B',
                  color: '#F4F1DE',
                  boxShadow: '0 2px 0 #3D405B'
                }}
                size="sm"
                title="Share Results"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                onClick={onGoHome}
                className="border-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#E07A5F',
                  borderColor: '#3D405B',
                  color: '#F4F1DE',
                  boxShadow: '0 2px 0 #3D405B'
                }}
                size="sm"
                title="Go to Home"
              >
                <Home className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}