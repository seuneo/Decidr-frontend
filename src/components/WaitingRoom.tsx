import React from 'react';
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
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">Room {room.id}</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants} joined</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-4">
          {/* Question Display */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-relaxed">{room.question}</h2>
          </div>

          {/* Status Indicator */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg animate-pulse" style={{backgroundColor: '#E07A5F'}}>
              <Clock className="h-10 w-10" style={{color: '#F4F1DE'}} />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black">Waiting for Host</h3>
              <p className="text-slate-600 text-sm">
                The poll will start when the host begins voting
              </p>
            </div>
          </div>

          {/* Room Info */}
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 rounded-lg p-6" style={{borderColor: '#3D405B'}}>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{room.participants} participant{room.participants !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-700">
                    <Wifi className="h-4 w-4" />
                    <span>Connected</span>
                  </div>
                </div>
                
                {/* Loading Animation */}
                <div className="space-y-3">
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Waiting for the host to start the poll...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-500">
            Stay on this page - you'll be notified when voting begins
          </div>
        </div>
      </div>
    </div>
  );
}