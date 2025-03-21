
import React from 'react';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  onClick: () => void;
  className?: string;
}

export function ShareButton({ onClick, className }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-8 py-3 bg-defi-green text-black font-bold rounded-full monument-font",
        "transition-all duration-300 ease-out",
        "hover:bg-defi-green-light hover:shadow-[0_0_15px_rgba(172,255,127,0.5)]",
        "active:scale-95",
        "flex items-center justify-center gap-2",
        className
      )}
    >
      <span>SHARE YOUR SCORE</span>
      <Share2 className="w-4 h-4" />
    </button>
  );
}
