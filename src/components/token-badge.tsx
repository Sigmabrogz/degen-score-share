
import React from 'react';
import { cn } from '@/lib/utils';

interface TokenBadgeProps {
  name: string;
  className?: string;
}

export function TokenBadge({ name, className }: TokenBadgeProps) {
  return (
    <div className={cn(
      "px-4 py-1.5 bg-defi-gray text-white/80 font-medium rounded-full monument-font",
      "border border-white/5",
      "transition-all duration-300 hover:bg-defi-gray-light",
      className
    )}>
      {name}
    </div>
  );
}
