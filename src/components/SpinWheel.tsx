import { useState } from "react";
import { Prize } from "@/pages/Index";

interface SpinWheelProps {
  prizes: Prize[];
  onPrizeWon: (prize: Prize) => void;
}

export const SpinWheel = ({ prizes, onPrizeWon }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Calculate random final rotation (where the wheel will stop)
    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const randomFinalAngle = Math.random() * 360; // Random final angle
    const totalRotation = currentRotation + (fullSpins * 360) + randomFinalAngle;
    
    setCurrentRotation(totalRotation);
    
    // Random spin duration between 4-6 seconds
    const spinDuration = 4000 + Math.floor(Math.random() * 2000);
    
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      
      // Calculate which prize the pointer is actually pointing to
      // The pointer is at 0 degrees (top), so we need to find which segment
      // is at that position after the wheel stops rotating
      const finalAngle = totalRotation % 360;
      
      // Each segment is 45 degrees, and we need to find which segment
      // is currently at the top (0 degrees) after rotation
      // Since the wheel rotated, we need to find the inverse
      const normalizedAngle = (360 - finalAngle) % 360;
      
      // Each segment is 45 degrees, starting from 0 degrees
      // Segment 0: 0-45 degrees, Segment 1: 45-90 degrees, etc.
      const pointedPrizeIndex = Math.floor(normalizedAngle / 45);
      
      // Get the actual prize that the pointer is pointing to
      const actualPrize = prizes[pointedPrizeIndex];
      
      onPrizeWon(actualPrize);
    }, spinDuration);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Wheel Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-neon opacity-50 blur-xl animate-pulse"></div>
        
        {/* Main Wheel */}
        <div 
          className="relative w-96 h-96 rounded-full casino-shadow"
          style={{ 
            transform: `rotate(${currentRotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
          }}
        >
          {/* Wheel Background */}
          <div className="absolute inset-2 rounded-full bg-gradient-wheel neon-border">
            {/* Outer Rim */}
            <div className="absolute inset-0 rounded-full ring-8 ring-black/40"></div>
            <div className="absolute inset-1 rounded-full ring-2 ring-accent/60"></div>

            {/* Prize Segments */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {prizes.map((prize, index) => {
                const rotation = (index * 45) - 22.5; // 8 segments of 45 degrees each
                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <div className="absolute left-1/2 top-3 -translate-x-1/2">
                      <div
                        className="flex flex-col items-center text-center"
                        style={{ transform: `rotate(${-rotation}deg)` }}
                      >
                        <div className="text-3xl md:text-4xl mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{prize.emoji}</div>
                        <div className="px-2.5 py-1 rounded-full bg-gradient-gold text-black font-extrabold uppercase tracking-wider text-[9px] md:text-[11px] shadow-[0_0_10px_hsla(51,100%,50%,0.6)] ring-1 ring-black/10">
                          {prize.name.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tick marks removed */}
          </div>
          
          {/* Luxury Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-gold casino-glow flex items-center justify-center border-4 border-accent/70">
            <div className="text-4xl">💎</div>
          </div>
        </div>

        {/* Prominent Top Pointer - overlap into wheel */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative flex flex-col items-center">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-accent drop-shadow-[0_4px_10px_hsla(51,100%,50%,0.8)]"></div>
            <div className="w-5 h-1 bg-accent/90 rounded-b-sm shadow-[0_0_8px_hsla(51,100%,50%,0.7)] -mt-0.5"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`btn-gold text-2xl font-black py-6 px-12 ${
          isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        } ${!hasSpun ? 'animate-bounce' : ''}`}
      >
        {isSpinning ? (
          <>
            <span className="animate-spin inline-block mr-2">🎡</span>
            Spinning...
          </>
        ) : hasSpun ? (
          'Spin Again 🎡'
        ) : (
          'Tap to Spin 🎡'
        )}
      </button>

      {/* Wheel Labels */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        {prizes.map((prize, index) => (
          <div key={prize.id} className="flex items-center space-x-2 bg-card/20 rounded px-2 py-1">
            <span>{prize.emoji}</span>
            <span className="font-medium">{prize.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};