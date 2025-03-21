
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
      className="w-full max-w-[800px] bg-defi-dark rounded-xl border-4 border-defi-green/50"
      style={{ 
        background: 'rgb(20,20,26)',
        boxShadow: '0 4px 30px rgba(172, 255, 127, 0.3)'
      }}
    >
      <AspectRatio ratio={16/9} className="relative">
        <div className="absolute inset-0 p-4">
          {children}
        </div>
        
        {/* Bottom credit bar */}
        <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-black/50 backdrop-blur-sm flex justify-between items-center">
          <ClusterLogo />
          <p className="text-defi-green text-sm font-medium">defi-score.xyz</p>
        </div>
      </AspectRatio>
    </div>
  );
}
