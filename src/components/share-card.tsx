
import React from 'react';
import { ClusterLogo } from './cluster-logo';
import { AspectRatio } from './ui/aspect-ratio';

interface ShareCardProps {
  username: string;
  score: string;
  rank: string;
  level: string;
  children?: React.ReactNode;
}

export function ShareCard({ username, score, rank, level, children }: ShareCardProps) {
  return (
    <div 
      id="shareCard" 
      className="w-full max-w-[800px] bg-defi-dark rounded-xl border-4 border-defi-green/50"
      style={{ 
        background: '#14141A',
        boxShadow: '0 4px 30px rgba(172, 255, 127, 0.3)'
      }}
    >
      <AspectRatio ratio={16/9} className="relative">
        <div className="absolute inset-0 p-4 flex flex-col">
          {/* Content area */}
          <div className="flex-1 relative overflow-hidden">
            {children}
          </div>
          
          {/* Bottom stats bar */}
          <div className="mt-2 py-2 px-3 bg-black/40 backdrop-blur-sm rounded-lg flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-white/70 text-xs">USERNAME</span>
                <span className="text-white font-bold">{username}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-xs">SCORE</span>
                <span className="text-defi-green font-bold">{score}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-xs">RANK</span>
                <span className="text-white font-bold">#{rank}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-xs">LEVEL</span>
                <span className="text-white font-bold">{level}</span>
              </div>
            </div>
          </div>
          
          {/* Bottom credit bar */}
          <div className="mt-auto py-2 px-4 bg-black/50 backdrop-blur-sm flex justify-between items-center">
            <ClusterLogo />
            <p className="text-defi-green text-sm font-medium">defi-score.xyz</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
