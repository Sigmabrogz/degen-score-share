
import React, { useEffect, useRef } from 'react';
import { Twitter, MessageSquare, Wallet } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Define platform types and their roles
interface PlatformIcon {
  name: string;
  icon: JSX.Element;
  role: 'validator' | 'verifier' | 'contributor';
  score: number;
  orbitRadius: number;
  speed: number;
  angle: number;
  size: number;
}

export function RadarVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure canvas size is set correctly for high DPI displays
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Animation variables
    let time = 0;
    let pulsatePhase = 0;
    let showRoleInfo = false;
    let roleInfoTimer = 0;
    
    // Define platform icons and their properties
    const platformIcons: PlatformIcon[] = [
      // Social platforms - Inner orbit
      { 
        name: 'Twitter', 
        icon: <Twitter color="#1DA1F2" />, 
        role: 'validator', 
        score: 925, 
        orbitRadius: 0.4, 
        speed: 0.0003, 
        angle: 0, 
        size: 24 
      },
      { 
        name: 'Telegram', 
        icon: <MessageSquare color="#0088cc" />, 
        role: 'verifier', 
        score: 780, 
        orbitRadius: 0.4, 
        speed: 0.00035, 
        angle: Math.PI * 0.5, 
        size: 24 
      },
      { 
        name: 'Discord', 
        icon: <MessageSquare color="#5865F2" />, 
        role: 'contributor', 
        score: 650, 
        orbitRadius: 0.4, 
        speed: 0.00032, 
        angle: Math.PI, 
        size: 20
      },
      
      // Blockchains - Middle orbit
      { 
        name: 'Ethereum', 
        icon: <Wallet color="#627EEA" />, 
        role: 'validator', 
        score: 890, 
        orbitRadius: 0.6, 
        speed: 0.00025, 
        angle: Math.PI * 0.25, 
        size: 26 
      },
      { 
        name: 'Solana', 
        icon: <Wallet color="#00FFA3" />, 
        role: 'verifier', 
        score: 810, 
        orbitRadius: 0.6, 
        speed: 0.00028, 
        angle: Math.PI * 0.75, 
        size: 26 
      },
      { 
        name: 'Polygon', 
        icon: <Wallet color="#8247E5" />, 
        role: 'contributor', 
        score: 720, 
        orbitRadius: 0.6, 
        speed: 0.0003, 
        angle: Math.PI * 1.25, 
        size: 22 
      },
      { 
        name: 'Avalanche', 
        icon: <Wallet color="#E84142" />, 
        role: 'validator', 
        score: 850, 
        orbitRadius: 0.6, 
        speed: 0.00022, 
        angle: Math.PI * 1.75, 
        size: 24 
      },
      
      // Exchanges/Platforms - Outer orbit
      { 
        name: 'Coinbase', 
        icon: <Wallet color="#0052FF" />, 
        role: 'validator', 
        score: 940, 
        orbitRadius: 0.8, 
        speed: 0.00018, 
        angle: 0, 
        size: 28 
      },
      { 
        name: 'Binance', 
        icon: <Wallet color="#F0B90B" />, 
        role: 'verifier', 
        score: 870, 
        orbitRadius: 0.8, 
        speed: 0.0002, 
        angle: Math.PI * 0.5, 
        size: 28 
      },
      { 
        name: 'Uniswap', 
        icon: <Wallet color="#FF007A" />, 
        role: 'contributor', 
        score: 730, 
        orbitRadius: 0.8, 
        speed: 0.00022, 
        angle: Math.PI, 
        size: 24 
      },
      { 
        name: 'OpenSea', 
        icon: <Wallet color="#2081E2" />, 
        role: 'verifier', 
        score: 800, 
        orbitRadius: 0.8, 
        speed: 0.00019, 
        angle: Math.PI * 1.5, 
        size: 26 
      }
    ];

    // Function to convert SVG to image
    const svgToImage = (svgString: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    // Cache for icon images
    const iconImagesCache = new Map<string, HTMLImageElement>();

    // Preload all icon images
    const preloadIcons = async () => {
      for (const platform of platformIcons) {
        const svgString = ReactDOMServer.renderToStaticMarkup(
          <svg width={platform.size} height={platform.size} viewBox={`0 0 24 24`} xmlns="http://www.w3.org/2000/svg">
            {platform.icon}
          </svg>
        );
        try {
          const img = await svgToImage(svgString);
          iconImagesCache.set(platform.name, img);
        } catch (error) {
          console.error(`Failed to load icon for ${platform.name}:`, error);
        }
      }
    };

    // Call preload function
    preloadIcons();

    // Draw the visualization
    const draw = async () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) * 0.9;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw pulsating background
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      gradient.addColorStop(0.4 + Math.sin(pulsatePhase) * 0.05, 'rgba(172, 255, 127, 0.1)');
      gradient.addColorStop(0.7 + Math.sin(pulsatePhase) * 0.05, 'rgba(172, 255, 127, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw orbit rings
      const drawOrbitRing = (radiusMultiplier: number, alpha: number) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * radiusMultiplier, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(172, 255, 127, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };
      
      // Draw three orbit rings with pulsating effect
      drawOrbitRing(0.4, 0.2 + Math.sin(pulsatePhase) * 0.1);
      drawOrbitRing(0.6, 0.3 + Math.sin(pulsatePhase + 0.5) * 0.1);
      drawOrbitRing(0.8, 0.25 + Math.sin(pulsatePhase + 1) * 0.1);
      
      // Draw orbiting platform icons
      for (const platform of platformIcons) {
        // Update position
        platform.angle += platform.speed * (1 + Math.sin(time * 0.1) * 0.2);
        
        // Calculate position with slight gravitational pull
        const baseRadius = radius * platform.orbitRadius;
        const pullFactor = 0.05 * Math.sin(time * 0.05); // Gravitational pull effect
        const currentRadius = baseRadius * (1 - pullFactor);
        
        const x = centerX + Math.cos(platform.angle) * currentRadius;
        const y = centerY + Math.sin(platform.angle) * currentRadius;
        
        // Draw icon if image is loaded
        const iconImg = iconImagesCache.get(platform.name);
        if (iconImg) {
          ctx.save();
          ctx.translate(x, y);
          
          // Apply glow effect based on role
          ctx.shadowBlur = 15;
          if (platform.role === 'validator') {
            ctx.shadowColor = 'rgba(172, 255, 127, 0.8)'; // Green glow
          } else if (platform.role === 'verifier') {
            ctx.shadowColor = 'rgba(66, 153, 225, 0.8)'; // Blue glow
          } else {
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // White glow
          }
          
          // Draw icon with slight pulse
          const scale = 1 + 0.1 * Math.sin(time * 0.5 + platform.angle);
          ctx.drawImage(
            iconImg, 
            -platform.size / 2 * scale, 
            -platform.size / 2 * scale, 
            platform.size * scale, 
            platform.size * scale
          );
          
          // Show role and score information periodically
          if (showRoleInfo) {
            const roleBgColors = {
              validator: 'rgba(30, 70, 32, 0.8)',
              verifier: 'rgba(30, 64, 175, 0.8)',
              contributor: 'rgba(45, 55, 72, 0.8)'
            };
            
            ctx.fillStyle = roleBgColors[platform.role];
            ctx.beginPath();
            ctx.roundRect(-70, 15, 140, 44, 8);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(platform.role.toUpperCase(), 0, 30);
            
            ctx.font = '12px sans-serif';
            ctx.fillText(`Score: ${platform.score}`, 0, 50);
          }
          
          ctx.restore();
        }
      }
      
      // Draw the central message
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Create glow effect for text
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(172, 255, 127, 0.8)';
      
      // Main title
      ctx.font = 'bold 16px "MonumentExtended", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("We're building", 0, -12);
      
      // knack.fun with pulsating effect
      ctx.font = 'bold 20px "MonumentExtended", sans-serif';
      const knackScale = 1 + 0.1 * Math.sin(pulsatePhase);
      ctx.fillStyle = 'rgba(172, 255, 127, 0.9)';
      ctx.fillText("knack.fun", 0, 12);
      
      // Subtitle
      ctx.shadowBlur = 0;
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText("Powered by Cluster Protocol", 0, 32);
      
      ctx.restore();
      
      // Draw outer text
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Draw the circle text
      const text = "NAC.FUND POWERED BY CLUSTER PROTOCOL • YOUR SCORES WILL DECIDE YOUR ROLE: VALIDATOR VERIFIER SUBMITTER •";
      ctx.font = "9px monospace";
      ctx.fillStyle = 'rgba(172, 255, 127, 0.7)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < text.length; i++) {
        const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2 + time * 0.05;
        const x = Math.cos(angle) * (radius + 10);
        const y = Math.sin(angle) * (radius + 10);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
      }
      
      ctx.restore();
      
      // Update animation variables
      time += 1;
      pulsatePhase += 0.02;
      
      // Toggle role info display every few seconds
      roleInfoTimer++;
      if (roleInfoTimer >= 120) { // Toggle every ~2 seconds (60fps)
        showRoleInfo = !showRoleInfo;
        roleInfoTimer = 0;
      }
    };
    
    // Animation loop
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square mx-auto animate-fade-in">
      <div className="absolute inset-0 bg-neon-glow animate-pulse-glow"></div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* The central content is now drawn on canvas */}
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-defi-green/50"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-defi-green/50"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-defi-green/50"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-defi-green/50"></div>
    </div>
  );
}
