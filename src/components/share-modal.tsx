
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShareCard } from './share-card';
import { Twitter, Download, Copy, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { DialogDescription } from './ui/dialog';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
  userData: {
    username: string;
    score: string;
    rank: string;
    level: string;
  };
}

export function ShareModal({ open, onOpenChange, imageUrl, userData }: ShareModalProps) {
  const handleTwitterShare = () => {
    // Format tweet text
    const tweetText = encodeURIComponent(
      `Just scored ${userData.score} on my DeFi score card! Rank #${userData.rank} 🚀\n\nCheck your own DeFi score:`
    );
    
    // Use a placeholder URL for now - in a real app, this would be your app's URL
    const shareUrl = encodeURIComponent('https://defi-score.xyz');
    
    // Open Twitter intent URL
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&url=${shareUrl}`,
      '_blank'
    );
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create an invisible anchor element
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `defi-score-${userData.username.replace(/\W+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Image downloaded!",
      description: "Your DeFi score card has been saved to your device.",
      duration: 3000,
    });
  };

  const handleCopyToClipboard = async () => {
    if (!imageUrl) return;
    
    try {
      // For modern browsers - fetch the image and copy it
      const blob = await fetch(imageUrl).then(r => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast({
        title: "Copied to clipboard!",
        description: "Your DeFi score card has been copied to clipboard.",
        duration: 3000,
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Failed to copy",
        description: "Please try downloading the image instead.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-defi-dark border-defi-green/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white monument-font">
            SHARE YOUR SCORE
          </DialogTitle>
          <DialogDescription className="text-center text-white/70">
            Share your DeFi score card with the community
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex flex-col items-center">
          {imageUrl ? (
            <div className="relative rounded-lg overflow-hidden shadow-[0_0_15px_rgba(172,255,127,0.2)]">
              <img 
                src={imageUrl} 
                alt="DeFi Score Card" 
                className="max-w-full h-auto"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-defi-gray/20 rounded-lg animate-pulse flex items-center justify-center">
              <p className="text-white/50">Generating image...</p>
            </div>
          )}
          
          <div className="mt-4 w-full grid grid-cols-3 gap-3">
            <Button 
              onClick={handleTwitterShare}
              className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            
            <Button 
              onClick={handleDownload}
              className="bg-defi-green text-black hover:bg-defi-green-light"
              disabled={!imageUrl}
            >
              <Download className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button 
              onClick={handleCopyToClipboard}
              className="bg-defi-gray hover:bg-defi-gray-light"
              disabled={!imageUrl}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex justify-center sm:justify-center">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-white/70 hover:text-white hover:bg-defi-gray"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
