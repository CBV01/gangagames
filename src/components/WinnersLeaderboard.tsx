import { useState, useEffect, useMemo } from "react";

interface Winner {
  id: number;
  name: string;
  city: string;
  prize: string;
  amount: number;
  timestamp: Date;
}

const NAMES = [
  "Priya S.", "Rahul K.", "Sneha P.", "Arjun M.", "Maya L.", "Karan D.", "Anita V.", "Rohan B.",
  "Kavya N.", "Vikram S.", "Isha P.", "Dev T.", "Ananya R.", "Sandeep J.", "Neha K."
];

const CITIES = ["Mumbai", "Delhi", "Pune", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad"];
const PRIZES = ["Big Bonus", "Amazon Voucher", "Paytm Credit", "Free Spins", "Tournament Entry", "Mystery Reward"];

const randomOf = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomAmount = () => [200, 300, 500, 1_000, 5_000][Math.floor(Math.random() * 5)];

const formatRelative = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

export const WinnersLeaderboard = () => {
  const [winners, setWinners] = useState<Winner[]>(() =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() - i,
      name: randomOf(NAMES),
      city: randomOf(CITIES),
      prize: randomOf(PRIZES),
      amount: randomAmount(),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 12 * 60 * 1000))
    }))
  );
  const [highlightIds, setHighlightIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners(prev => {
        const prevOrder = new Map(prev.map((w, idx) => [w.id, idx] as const));

        // Randomly choose to boost an existing winner or add a new one
        const mutateExisting = Math.random() < 0.7 && prev.length > 0;
        let next = [...prev];
        if (mutateExisting) {
          const idx = Math.floor(Math.random() * next.length);
          const boost = Math.floor(50 + Math.random() * 800);
          next[idx] = {
            ...next[idx],
            amount: next[idx].amount + boost,
            timestamp: new Date()
          };
        } else {
          next.unshift({
            id: Date.now(),
            name: randomOf(NAMES),
            city: randomOf(CITIES),
            prize: randomOf(PRIZES),
            amount: randomAmount(),
            timestamp: new Date()
          });
        }

        // Sort by amount desc (top winners)
        next.sort((a, b) => b.amount - a.amount);

        // Determine overtakes for highlight
        const improved = next
          .filter(w => prevOrder.has(w.id))
          .filter(w => (prevOrder.get(w.id) as number) > next.indexOf(w))
          .map(w => w.id);

        if (improved.length > 0) {
          setHighlightIds(new Set(improved));
          setTimeout(() => setHighlightIds(new Set()), 1500);
        }

        // Keep the list to 5 items max
        return next.slice(0, 5);
      });
    }, 5000 + Math.random() * 3000); // 5-8s

    return () => clearInterval(interval);
  }, []);

  const display = useMemo(() => winners, [winners]);

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 luxury-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg title-font text-accent gold-glow">🏆 Top Winners</h3>
        <div className="text-xs text-muted-foreground">Live Updates</div>
      </div>
      
      <div className="space-y-3">
        {display.map((winner, index) => {
          const isTop = index === 0;
          const isHighlighted = highlightIds.has(winner.id);
          return (
            <div
              key={winner.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                isTop ? 'bg-gradient-gold text-black' : 'bg-muted/20 hover:bg-muted/30'
              } ${isHighlighted ? 'animate-bounce-in ring-2 ring-casino-green/60' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${
                  isTop ? 'bg-black text-accent' : 'bg-accent text-black'
                } w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-sm">{winner.name}</div>
                  <div className={`${isTop ? 'text-black/70' : 'text-muted-foreground'} text-xs`}>
                    {winner.city} • {formatRelative(winner.timestamp)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">₹{winner.amount.toLocaleString()}</div>
                <div className={`${isTop ? 'text-black/70' : 'text-muted-foreground'} text-xs`}>
                  {winner.prize}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};