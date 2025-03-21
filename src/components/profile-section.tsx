
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Twitter, MessageSquare } from 'lucide-react';

interface ProfileSectionProps {
  username: string;
  twitterHandle: string;
  telegramHandle: string;
  avatarUrl?: string;
}

export function ProfileSection({
  username,
  twitterHandle,
  telegramHandle,
  avatarUrl
}: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-start space-y-4 w-full animate-fade-in">
      <div className="flex items-center space-x-4 w-full">
        <Avatar className="h-16 w-16 border-2 border-defi-green/20 ring-2 ring-defi-green/10 ring-offset-1 ring-offset-black">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback className="bg-defi-gray text-defi-green">
            {username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white monument-font">{username}</h2>
          <div className="flex space-x-2 mt-1">
            <div className="text-xs text-defi-green-light bg-defi-gray-dark px-2 py-0.5 rounded-full">
              DEGEN
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex items-center space-x-2">
          <Twitter className="h-4 w-4 text-defi-green" />
          <span className="text-white text-sm font-medium">@{twitterHandle}</span>
          <span className="ml-auto text-xs text-white/50">SRES</span>
        </div>
        <div className="w-full h-px bg-white/5" />
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-defi-green" />
          <span className="text-white text-sm font-medium">@{telegramHandle}</span>
          <span className="ml-auto text-xs text-white/50">SRES</span>
        </div>
        <div className="w-full h-px bg-white/5" />
      </div>
    </div>
  );
}
