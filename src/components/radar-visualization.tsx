
import React, { useEffect, useRef, useState } from 'react';
import { Twitter, MessageSquare, Zap, Bitcoin, Share2, ArrowUpRight } from 'lucide-react';

// Platform icons for orbiting
const PLATFORM_ICONS = [
  { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
  { name: 'Telegram', icon: MessageSquare, color: '#0088cc' },
  { name: 'Ethereum', icon: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
      <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602"/>
      <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
      <path d="M16.498 21.9682V27.995L24 17.616L16.498 21.9682Z" fill="white" fillOpacity="0.602"/>
      <path d="M16.498 27.995V21.9672L9 17.616L16.498 27.995Z" fill="white"/>
      <path d="M16.498 20.5731L23.995 16.2201L16.498 12.8721V20.5731Z" fill="white" fillOpacity="0.2"/>
      <path d="M9 16.2201L16.498 20.5731V12.8721L9 16.2201Z" fill="white" fillOpacity="0.602"/>
    </svg>
  ), color: '#627EEA' },
  { name: 'Solana', icon: () => (
    <svg width="24" height="24" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64.6833 237.316L98.053 202.251C100.396 200.007 103.538 198.71 106.851 198.71H387.57C392.757 198.71 395.341 205.451 391.55 209.147L358.186 242.21C355.836 244.454 352.701 245.757 349.389 245.757H68.6698C63.476 245.757 60.8992 239.009 64.6833 235.32V237.316Z" fill="url(#paint0_linear_1064_606)"/>
      <path d="M64.6833 68.5942L98.053 103.659C100.396 105.903 103.538 107.2 106.851 107.2H387.57C392.757 107.2 395.341 100.459 391.55 96.7629L358.186 63.6996C355.836 61.4558 352.701 60.1594 349.389 60.1594H68.6698C63.476 60.1594 60.8992 66.9068 64.6833 70.5958V68.5942Z" fill="url(#paint1_linear_1064_606)"/>
      <path d="M358.186 152.85L324.815 117.785C322.473 115.541 319.33 114.245 316.018 114.245H35.2991C30.1125 114.245 27.5287 120.986 31.32 124.682L64.6833 157.745C67.0333 159.989 70.1682 161.286 73.4805 161.286H354.199C359.393 161.286 361.97 154.537 358.186 150.848V152.85Z" fill="url(#paint2_linear_1064_606)"/>
      <defs>
        <linearGradient id="paint0_linear_1064_606" x1="376.963" y1="60.3229" x2="180.334" y2="303.328" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1064_606" x1="308.09" y1="26.9587" x2="111.461" y2="269.964" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_1064_606" x1="342.448" y1="43.5977" x2="145.82" y2="286.604" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
      </defs>
    </svg>
  ), color: '#9945FF' },
  { name: 'Polygon', icon: () => (
    <svg width="24" height="24" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9944 0L0 10.8282V21.6563L7.3916 25.9844V14.4435L18.9944 7.90748L30.5972 14.4435V25.9844L37.9888 21.6563V10.8282L18.9944 0Z" fill="#8247E5"/>
      <path d="M18.9943 15.7972L11.6027 20.1252L18.9943 24.4533L26.3859 20.1252L18.9943 15.7972Z" fill="#8247E5"/>
      <path d="M0 24.1968L7.3916 28.5249V33L18.9944 24.9718L30.5972 33V28.5249L37.9888 24.1968L30.5972 19.8688L18.9944 27.8969L7.3916 19.8688L0 24.1968Z" fill="#8247E5"/>
    </svg>
  ), color: '#8247E5' },
  { name: 'Coinbase', icon: () => (
    <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" fill="#0052FF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z" fill="white"/>
    </svg>
  ), color: '#0052FF' },
  { name: 'Bitcoin', icon: Bitcoin, color: '#F7931A' },
  { name: 'Share', icon: Share2, color: '#acff7f' },
  { name: 'Link', icon: ArrowUpRight, color: '#acff7f' },
];

export function RadarVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const iconImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  
  // Preload SVG icons as images
  useEffect(() => {
    const loadIconsAsImages = async () => {
      const svgToImage = (svg: SVGElement, width: number, height: number): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const serializer = new XMLSerializer();
          const svgStr = serializer.serializeToString(svg);
          const img = new Image(width, height);
          
          img.onload = () => resolve(img);
          img.onerror = reject;
          
          const blob = new Blob([svgStr], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          img.src = url;
        });
      };
      
      const svgNamespace = "http://www.w3.org/2000/svg";
      
      // For each platform icon, create an SVG and convert it to an image
      const iconsMap = new Map<string, HTMLImageElement>();
      
      for (const platform of PLATFORM_ICONS) {
        try {
          if (typeof platform.icon === 'function' && platform.icon.name === '') {
            // It's an SVG component
            const svgEl = document.createElementNS(svgNamespace, "svg");
            svgEl.setAttribute("width", "24");
            svgEl.setAttribute("height", "24");
            svgEl.setAttribute("viewBox", "0 0 24 24");
            svgEl.setAttribute("fill", "none");
            
            // Render the SVG content
            const tempDiv = document.createElement('div');
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);
            
            // Render the component to get the SVG markup
            const IconComponent = platform.icon;
            tempDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(<IconComponent />);
            
            const renderedSvg = tempDiv.querySelector('svg');
            if (renderedSvg) {
              const img = await svgToImage(renderedSvg, 24, 24);
              iconsMap.set(platform.name, img);
            }
            
            document.body.removeChild(tempDiv);
          } else {
            // Use Lucide icons
            const svgEl = document.createElementNS(svgNamespace, "svg");
            svgEl.setAttribute("width", "24");
            svgEl.setAttribute("height", "24");
            svgEl.setAttribute("viewBox", "0 0 24 24");
            svgEl.setAttribute("fill", "none");
            svgEl.setAttribute("stroke", platform.color);
            svgEl.setAttribute("stroke-width", "2");
            svgEl.setAttribute("stroke-linecap", "round");
            svgEl.setAttribute("stroke-linejoin", "round");
            
            // For lucide icons, we need to get their path data
            // This is a simplified approach; actual implementation may need to be more robust
            const LucideIcon = platform.icon as React.FC;
            const tempDiv = document.createElement('div');
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);
            
            // Render the component to get the SVG markup
            tempDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(<LucideIcon />);
            
            const renderedSvg = tempDiv.querySelector('svg');
            if (renderedSvg) {
              // Copy all child nodes from rendered SVG to our SVG element
              Array.from(renderedSvg.childNodes).forEach(node => {
                svgEl.appendChild(node.cloneNode(true));
              });
              
              const img = await svgToImage(svgEl, 24, 24);
              iconsMap.set(platform.name, img);
            }
            
            document.body.removeChild(tempDiv);
          }
        } catch (error) {
          console.error(`Failed to load icon for ${platform.name}:`, error);
        }
      }
      
      iconImagesRef.current = iconsMap;
      setLoaded(true);
    };
    
    loadIconsAsImages();
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    
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
    
    // Set up orbital rings
    const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
    const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
    const maxRadius = Math.min(centerX, centerY) * 0.85;
    
    // Three orbital rings
    const orbitalRings = [
      { radius: maxRadius * 0.4, speed: 0.0003, icons: [] },
      { radius: maxRadius * 0.6, speed: 0.0002, icons: [] },
      { radius: maxRadius * 0.8, speed: 0.0001, icons: [] }
    ];
    
    // Distribute platform icons across the rings
    const iconsList = Array.from(iconImagesRef.current.entries());
    iconsList.forEach((icon, index) => {
      const ringIndex = index % orbitalRings.length;
      const [name, image] = icon;
      const angle = (index / Math.ceil(iconsList.length / orbitalRings.length)) * Math.PI * 2;
      
      orbitalRings[ringIndex].icons.push({
        name,
        image,
        angle,
        distance: 0, // For black hole pull effect
        baseAngle: angle,
        speed: orbitalRings[ringIndex].speed * (0.8 + Math.random() * 0.4), // Slight variation in speed
        amplitude: 0.1 + Math.random() * 0.05, // For wobble effect
        phase: Math.random() * Math.PI * 2, // Random starting phase
      });
    });
    
    // Draw function for the animation
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Draw black hole effect in center
      const blackHoleRadius = maxRadius * 0.15;
      
      // Draw background glow for the black hole
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, blackHoleRadius * 2
      );
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      bgGradient.addColorStop(0.5, 'rgba(25, 25, 25, 0.6)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = bgGradient;
      ctx.fill();
      
      // Draw black hole center
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, blackHoleRadius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(20, 20, 20, 1)');
      gradient.addColorStop(1, 'rgba(40, 40, 40, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw nac.fun text in center
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = 'rgba(172, 255, 127, 0.85)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("nac.fun", centerX, centerY);
      
      // Draw the orbiting logos
      orbitalRings.forEach((ring, ringIndex) => {
        // Draw the orbital ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(172, 255, 127, ${0.15 + ringIndex * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw the platform icons on this ring
        ring.icons.forEach(icon => {
          // Update icon position
          icon.angle += icon.speed;
          
          // Add wobble effect
          const wobble = Math.sin(time * 0.5 + icon.phase) * icon.amplitude;
          
          // Calculate distance with black hole pull effect
          // As the icon gets closer to the center, increase the pull
          const targetRadius = ring.radius * (1 - wobble * 0.2);
          const blackHolePull = Math.sin(time * 0.2) * 0.1; // Periodic pull effect
          
          // Calculate final position
          const x = centerX + Math.cos(icon.angle) * (targetRadius - blackHolePull * (ring.radius / maxRadius) * 20);
          const y = centerY + Math.sin(icon.angle) * (targetRadius - blackHolePull * (ring.radius / maxRadius) * 20);
          
          // Calculate size based on "distance" from viewer (perspective effect)
          const perspective = 0.5 + Math.sin(icon.angle) * 0.15;
          const size = 24 * perspective;
          
          // Calculate opacity based on black hole proximity
          const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          const absorbEffect = Math.max(0, Math.min(1, (distanceToCenter - blackHoleRadius) / (ring.radius * 0.5)));
          
          // Draw platform icon
          try {
            // Apply a fade effect based on black hole proximity
            ctx.globalAlpha = absorbEffect;
            ctx.drawImage(icon.image, x - size/2, y - size/2, size, size);
            ctx.globalAlpha = 1.0;
            
            // Draw trailing effect toward the black hole
            if (distanceToCenter < ring.radius) {
              // Calculate vector to black hole
              const dx = centerX - x;
              const dy = centerY - y;
              const len = Math.sqrt(dx * dx + dy * dy);
              
              // Draw trail
              ctx.beginPath();
              ctx.moveTo(x, y);
              
              // Calculate trail length based on proximity to black hole
              const trailFactor = Math.max(0, 1 - absorbEffect) * 1.5;
              const trailLength = Math.min(len, size * trailFactor);
              
              // Draw trail
              ctx.lineTo(
                x + (dx / len) * trailLength,
                y + (dy / len) * trailLength
              );
              
              // Trail gradient
              const trailGradient = ctx.createLinearGradient(x, y, x + (dx / len) * trailLength, y + (dy / len) * trailLength);
              trailGradient.addColorStop(0, `rgba(172, 255, 127, ${0.4 * (1 - absorbEffect)})`);
              trailGradient.addColorStop(1, 'rgba(172, 255, 127, 0)');
              
              ctx.strokeStyle = trailGradient;
              ctx.lineWidth = size * 0.2 * (1 - absorbEffect);
              ctx.stroke();
            }
          } catch (error) {
            console.error(`Failed to draw icon ${icon.name}:`, error);
          }
        });
      });
      
      // Draw the text around the outer edge
      ctx.save();
      ctx.translate(centerX, centerY);
      
      const nacFundText = "NAC.FUND POWERED BY CLUSTER PROTOCOL. YOUR SCORES WILL DECIDE YOUR ROLE: VALIDATOR VERIFIER SUBMITTER";
      ctx.font = "bold 8px monospace";
      ctx.fillStyle = 'rgba(172, 255, 127, 0.7)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < nacFundText.length; i++) {
        const angle = (i / nacFundText.length) * Math.PI * 2 - Math.PI / 2 + time * 0.0005;
        const x = Math.cos(angle) * (maxRadius + 15);
        const y = Math.sin(angle) * (maxRadius + 15);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(nacFundText[i], 0, 0);
        ctx.restore();
      }
      
      ctx.restore();
      
      // Particles effect for the black hole
      for (let i = 0; i < 5; i++) {
        // Create random particles that get pulled into the black hole
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistance = Math.random() * maxRadius * 0.3 + maxRadius * 0.2;
        
        const particleX = centerX + Math.cos(randomAngle) * randomDistance;
        const particleY = centerY + Math.sin(randomAngle) * randomDistance;
        
        // Draw a line from the particle to the black hole
        ctx.beginPath();
        ctx.moveTo(particleX, particleY);
        
        // Calculate the end point - closer to the black hole
        const pullFactor = 0.7 + Math.random() * 0.2;
        const endX = centerX + (particleX - centerX) * pullFactor;
        const endY = centerY + (particleY - centerY) * pullFactor;
        
        ctx.lineTo(endX, endY);
        
        const particleGradient = ctx.createLinearGradient(particleX, particleY, endX, endY);
        particleGradient.addColorStop(0, 'rgba(172, 255, 127, 0)');
        particleGradient.addColorStop(0.5, `rgba(172, 255, 127, ${Math.random() * 0.3})`);
        particleGradient.addColorStop(1, 'rgba(172, 255, 127, 0)');
        
        ctx.strokeStyle = particleGradient;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Update time for animation
      time += 1;
    };
    
    // Animation loop
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [loaded]);

  return (
    <div className="relative w-full aspect-square mx-auto animate-fade-in">
      <div className="absolute inset-0 bg-neon-glow animate-pulse-glow"></div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-defi-green/10 flex items-center justify-center animate-pulse-glow">
          <div className="w-8 h-8 rounded-full bg-defi-green/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-defi-green/60"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-defi-green/50"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-defi-green/50"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-defi-green/50"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-defi-green/50"></div>
    </div>
  );
}
