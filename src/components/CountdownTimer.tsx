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
      <p className="text-accent gold-glow title-font font-bold text-lg mb-4">
        ⚡ ऑफर जल्द समाप्त होने वाला है
      </p>

      <div className="flex items-center gap-4 bg-card/30 backdrop-blur-md rounded-2xl p-4 md:p-6 luxury-border luxury-shadow">
        {/* Hours */}
        <div className="text-center">
          <div className="bg-gradient-neon text-foreground rounded-lg px-4 py-3 min-w-16 md:min-w-20">
            <div className="text-2xl md:text-4xl font-black tracking-widest">{formatNumber(timeLeft.hours)}</div>
          </div>
          <div className="text-[10px] md:text-xs font-semibold text-muted-foreground mt-2 tracking-[0.2em]">घंटे</div>
        </div>

        <div className="text-2xl md:text-3xl text-primary font-extrabold animate-pulse">:</div>

        {/* Minutes */}
        <div className="text-center">
          <div className="bg-gradient-neon text-foreground rounded-lg px-4 py-3 min-w-16 md:min-w-20">
            <div className="text-2xl md:text-4xl font-black tracking-widest">{formatNumber(timeLeft.minutes)}</div>
          </div>
          <div className="text-[10px] md:text-xs font-semibold text-muted-foreground mt-2 tracking-[0.2em]">मिनट</div>
        </div>

        <div className="text-2xl md:text-3xl text-primary font-extrabold animate-pulse">:</div>

        {/* Seconds */}
        <div className="text-center">
          <div className="bg-gradient-neon text-foreground rounded-lg px-4 py-3 min-w-16 md:min-w-20">
            <div className="text-2xl md:text-4xl font-black tracking-widest">{formatNumber(timeLeft.seconds)}</div>
          </div>
          <div className="text-[10px] md:text-xs font-semibold text-muted-foreground mt-2 tracking-[0.2em]">सेकंड</div>
        </div>
      </div>

      <p className="text-foreground/90 font-semibold text-sm md:text-base mt-4">
        🔥 बड़ी जीत का मौका पाने के लिए अभी स्पिन करें!
      </p>
    </div>
  );
};
