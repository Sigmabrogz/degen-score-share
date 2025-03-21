
import React from 'react';
import { TokenBadge } from './token-badge';
import { ClusterLogo } from './cluster-logo';
import { Zap, Trophy } from 'lucide-react';
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
      className="w-full max-w-[800px] bg-defi-dark rounded-xl border border-defi-green/20"
      style={{ 
        background: 'linear-gradient(145deg, rgba(20,20,26,1) 0%, rgba(30,32,40,1) 100%)',
        boxShadow: '0 4px 30px rgba(172, 255, 127, 0.15)'
      }}
    >
      <AspectRatio ratio={16/9} className="relative">
        <div className="absolute inset-0 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white text-2xl font-bold monument-font">{username}</h2>
              <div className="flex items-center mt-1 mb-2">
                <div className="text-xs text-defi-green bg-defi-green/10 px-2 py-0.5 rounded-full flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  WHALE
                </div>
              </div>
            </div>
            
            <ClusterLogo />
          </div>
          
          <div className="flex gap-6 h-full">
            <div className="flex-1 h-full py-4">
              {children || (
                <div className="w-full h-full rounded-lg bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-defi-green/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-defi-green/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-defi-green" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-[250px] flex flex-col justify-between">
              <div className="glass-panel neo-shadow p-4 rounded-xl space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white monument-font">DEFI RANKING</h3>
                  <p className="text-xl font-bold text-defi-green">WHALE</p>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">RANK</p>
                    <p className="text-xl font-bold text-white">#{rank}</p>
                  </div>
                  
                  <div className="h-10 w-px bg-white/10"></div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">LEVEL</p>
                    <p className="text-xl font-bold text-white">{level}</p>
                  </div>
                  
                  <div className="h-10 w-px bg-white/10"></div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">SCORE</p>
                    <p className="text-xl font-bold text-white">{score}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <TokenBadge name="SOL" />
                <TokenBadge name="ETH" />
                <TokenBadge name="AVAX" />
                <TokenBadge name="DEFI WHALE" variant="highlight" />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-white/70 text-xs">BUILDING THE FUTURE OF DEFI • ONE TRANSACTION AT A TIME</p>
                <p className="text-defi-green text-xs mt-1">defi-score.xyz</p>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
