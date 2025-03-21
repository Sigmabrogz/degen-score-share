import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { RadarVisualization } from '@/components/radar-visualization';
import { ProfileSection } from '@/components/profile-section';
import { ScoreCard } from '@/components/score-card';
import { ProgressBar } from '@/components/progress-bar';
import { ShareButton } from '@/components/share-button';
import { ClusterLogo } from '@/components/cluster-logo';
import { TokenBadge } from '@/components/token-badge';
import { Twitter, MessageSquare, Wallet, Share2, Clock, Zap, Trophy, ArrowUpRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { ShareModal } from '@/components/share-modal';
import { ShareCard } from '@/components/share-card';
import html2canvas from 'html2canvas';

const Index = () => {
  const [generating, setGenerating] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  const userData = {
    username: "0xSolidity.eth",
    score: "1,035",
    rank: "42",
    level: "18"
  };

  const handleShare = async () => {
    setGenerating(true);
    setShareModalOpen(true);
    setShareImageUrl(null);
    
    try {
      setTimeout(async () => {
        if (!mainContentRef.current) {
          throw new Error("Main content element not found");
        }
        
        console.log("Step 1: Capturing main content");
        
        const mainCanvas = await html2canvas(mainContentRef.current, {
          backgroundColor: "#14141A",
          scale: 2,
          logging: true,
          useCORS: true,
          allowTaint: true,
          ignoreElements: (el) => {
            return el.id === 'shareCard' || el.classList.contains('fixed');
          }
        });
        
        if (!mainCanvas || mainCanvas.width === 0) {
          throw new Error("Failed to capture main content");
        }
        
        console.log("Step 2: Main content captured successfully", mainCanvas.width, mainCanvas.height);
        
        if (!shareCardRef.current) {
          throw new Error("Share card element not found");
        }
        
        const contentDiv = shareCardRef.current.querySelector('.absolute.inset-0.p-4');
        if (!contentDiv) {
          throw new Error("Content div not found in share card");
        }
        
        contentDiv.innerHTML = '';
        const img = document.createElement('img');
        img.src = mainCanvas.toDataURL('image/png');
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        contentDiv.appendChild(img);
        
        console.log("Step 3: Capturing final share card");
        
        const finalCanvas = await html2canvas(shareCardRef.current, {
          backgroundColor: null,
          scale: 2,
          logging: true,
          useCORS: true,
          allowTaint: true
        });
        
        const imageUrl = finalCanvas.toDataURL('image/png');
        setShareImageUrl(imageUrl);
        console.log("Step 4: Image generation complete");
        
        setGenerating(false);
      }, 500);
    } catch (err) {
      console.error('Failed to generate share image:', err);
      toast({
        title: "Failed to generate image",
        description: "Please try again: " + (err instanceof Error ? err.message : "Unknown error"),
        variant: "destructive",
        duration: 5000,
      });
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-defi-dark text-white flex flex-col">
      <Navbar />
      
      <main ref={mainContentRef} className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <ProfileSection 
              username="0xSolidity.eth"
              twitterHandle="DeFiWhale"
              telegramHandle="SolanaStaker"
            />
            
            <div className="glass-panel neo-shadow p-5 rounded-xl space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-defi-green mr-2"></div>
                <span className="text-white text-sm font-medium monument-font">DEFI ACTIVITY</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4 text-defi-green" />
                  <span className="text-white text-sm font-medium">Twitter Score</span>
                  <span className="ml-auto text-xs text-white/50">SCORE</span>
                </div>
                <ProgressBar value={79} max={103} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-defi-green" />
                  <span className="text-white text-sm font-medium">Telegram Activity</span>
                  <span className="ml-auto text-xs text-white/50">SCORE</span>
                </div>
                <ProgressBar value={63} max={100} />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <TokenBadge name="SOL" />
                <TokenBadge name="ETH" />
                <TokenBadge name="AVAX" />
                <TokenBadge name="DEFI WHALE" variant="highlight" />
              </div>
            </div>
            
            <div className="glass-panel neo-shadow p-5 rounded-xl space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-defi-green" />
                <span className="text-white text-sm font-medium monument-font">RECENT ACTIVITY</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Uniswap V3 swap</span>
                  <span className="text-defi-green">+25 pts</span>
                </div>
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Aave deposit</span>
                  <span className="text-defi-green">+18 pts</span>
                </div>
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">NFT purchase</span>
                  <span className="text-defi-green">+12 pts</span>
                </div>
              </div>
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
              
              <div className="mt-6 glass-panel neo-shadow p-5 rounded-xl text-center">
                <h3 className="text-xl font-bold text-white monument-font mb-2">DEFI RANKING</h3>
                <p className="text-3xl font-bold text-defi-green mb-2">WHALE</p>
                <p className="text-white/70">Top 5% of all users</p>
                <div className="mt-4 flex justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">RANK</p>
                    <p className="text-xl font-bold text-white">#42</p>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">LEVEL</p>
                    <p className="text-xl font-bold text-white">18</p>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/50">XP</p>
                    <p className="text-xl font-bold text-white">8,925</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <div className="glass-panel neo-shadow p-5 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 rounded-full bg-defi-green mr-2"></div>
                <h3 className="text-white monument-font">TOTAL SCORE</h3>
              </div>
              <ProgressBar value={1035} max={1200} className="mb-4" />
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass-panel p-3 rounded-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-defi-green" />
                  <span className="text-white/80 text-xs">DeFi Card</span>
                  <span className="ml-auto text-white font-bold text-sm">25</span>
                </div>
                <div className="glass-panel p-3 rounded-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-defi-green" />
                  <span className="text-white/80 text-xs">Score</span>
                  <span className="ml-auto text-white font-bold text-sm">89</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-white/60">
                <span>Current score</span>
                <span className="text-defi-green font-bold">1,035 / 1,200</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <ScoreCard 
                icon={<Twitter className="w-full h-full" />}
                label="Twitter Score"
                score="2,019"
              />
              
              <ScoreCard 
                icon={<MessageSquare className="w-full h-full" />}
                label="TG Score"
                score="1,736"
              />
              
              <ScoreCard 
                icon={<Wallet className="w-full h-full" />}
                label="Address Score"
                score="4,529"
              />
            </div>
            
            <div className="glass-panel neo-shadow p-5 rounded-xl space-y-4">
              <p className="text-center text-white/90 font-medium monument-font">
                Building the future of DeFi, One Transaction at a Time
              </p>
              <div className="flex items-center justify-center gap-2">
                <a href="#" className="text-defi-green text-sm flex items-center gap-1 hover:underline">
                  View full stats <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            
            <ShareButton onClick={handleShare} className="w-full" loading={generating} />
          </div>
        </div>
      </main>
      
      <ShareModal 
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        imageUrl={shareImageUrl}
        userData={userData}
      />
      
      <div className="fixed -left-[9999px]">
        <div ref={shareCardRef}>
          <ShareCard
            username={userData.username}
            score={userData.score}
            rank={userData.rank}
            level={userData.level}
          >
            <RadarVisualization />
          </ShareCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
