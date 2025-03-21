
import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { RadarVisualization } from '@/components/radar-visualization';
import { ProfileSection } from '@/components/profile-section';
import { ScoreCard } from '@/components/score-card';
import { ProgressBar } from '@/components/progress-bar';
import { ShareButton } from '@/components/share-button';
import { ClusterLogo } from '@/components/cluster-logo';
import { Twitter, MessageSquare, Wallet, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        toast({
          title: "Link copied to clipboard",
          description: "Share your DeFi score with friends!",
          duration: 3000,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Failed to copy link",
          description: "Please try again",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen bg-defi-dark text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <ProfileSection 
              username="User Space"
              twitterHandle="usiegram"
              telegramHandle="telegram"
            />
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Twitter className="h-4 w-4 text-defi-green" />
                <span className="text-white text-sm font-medium">Twitter Score</span>
                <span className="ml-auto text-xs text-white/50">SRES</span>
              </div>
              <ProgressBar value={79} max={103} />
            </div>
          </div>
          
          {/* Center Column - Visualization */}
          <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <RadarVisualization />
              
              <div className="mt-4 flex justify-center">
                <div className="flex flex-col items-center">
                  <p className="text-white/70 text-sm">Powered by</p>
                  <ClusterLogo />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <div className="glass-panel neo-shadow p-4 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 rounded-full bg-defi-green mr-2"></div>
                <h3 className="text-white monument-font">Teginen</h3>
              </div>
              <ProgressBar value={1035} max={1200} className="mb-4" />
              
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-2 rounded-lg flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-defi-green" />
                  <span className="text-white/80 text-xs">Brfi Card</span>
                  <span className="ml-auto text-white font-bold text-sm">25</span>
                </div>
                <div className="glass-panel p-2 rounded-lg flex items-center gap-2">
                  <div className="w-4 h-4 text-defi-green">C</div>
                  <span className="text-white/80 text-xs">Sore</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <ScoreCard 
                icon={<Twitter className="w-full h-full" />}
                label="Twitter Score"
                score="2019 9099"
              />
              
              <ScoreCard 
                icon={<MessageSquare className="w-full h-full" />}
                label="TG Score"
                score="2019 9099"
              />
              
              <ScoreCard 
                icon={<Wallet className="w-full h-full" />}
                label="Address Score"
                score="45 299"
              />
            </div>
            
            <div className="glass-panel neo-shadow p-6 rounded-xl">
              <p className="text-center text-white/90 font-medium">
                Building the future of DEFI, One Transaction at a Time
              </p>
            </div>
            
            <ShareButton onClick={handleShare} className="w-full" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
