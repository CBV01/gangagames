import { useState, useEffect } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches 00:00:00
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <p className="text-casino-red font-bold text-lg mb-4 neon-glow animate-pulse">
        ⚡ Offer expires in:
      </p>
      
      <div className="flex items-center space-x-4 bg-card/20 backdrop-blur-sm rounded-2xl p-6 neon-border casino-shadow">
        {/* Hours */}
        <div className="text-center">
          <div className="bg-gradient-neon text-background rounded-lg p-3 min-w-16">
            <div className="text-3xl font-black">{formatNumber(timeLeft.hours)}</div>
          </div>
          <div className="text-xs font-semibold text-muted-foreground mt-2">HOURS</div>
        </div>
        
        <div className="text-2xl text-primary font-bold animate-pulse">:</div>
        
        {/* Minutes */}
        <div className="text-center">
          <div className="bg-gradient-neon text-background rounded-lg p-3 min-w-16">
            <div className="text-3xl font-black">{formatNumber(timeLeft.minutes)}</div>
          </div>
          <div className="text-xs font-semibold text-muted-foreground mt-2">MINUTES</div>
        </div>
        
        <div className="text-2xl text-primary font-bold animate-pulse">:</div>
        
        {/* Seconds */}
        <div className="text-center">
          <div className="bg-gradient-neon text-background rounded-lg p-3 min-w-16">
            <div className="text-3xl font-black">{formatNumber(timeLeft.seconds)}</div>
          </div>
          <div className="text-xs font-semibold text-muted-foreground mt-2">SECONDS</div>
        </div>
      </div>
      
      <p className="text-accent font-semibold text-sm mt-4 pulse-glow">
        🔥 Don't miss out – Limited time only!
      </p>
    </div>
  );
};