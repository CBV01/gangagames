import { useState } from "react";
import { Prize } from "@/pages/Index";

interface SpinWheelProps {
  prizes: Prize[];
  onPrizeWon: (prize: Prize) => void;
}

export const SpinWheel = ({ prizes, onPrizeWon }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Randomly select a prize (always win!)
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Simulate wheel spinning time
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      onPrizeWon(randomPrize);
    }, 4000); // Match CSS animation duration
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Wheel Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-neon opacity-50 blur-xl animate-pulse"></div>
        
        {/* Main Wheel */}
        <div className={`relative w-80 h-80 rounded-full casino-shadow ${isSpinning ? 'spin-wheel' : ''}`}>
          {/* Wheel Background */}
          <div className="absolute inset-2 rounded-full bg-gradient-wheel neon-border">
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
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-2xl mb-1">{prize.emoji}</div>
                      <div className="text-xs font-bold text-background px-2 py-1 bg-foreground/90 rounded">
                        {prize.name.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Luxury Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-gold casino-glow flex items-center justify-center">
            <div className="text-3xl">💎</div>
          </div>
        </div>

        {/* Luxury Gold Pointer */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-accent casino-glow"></div>
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