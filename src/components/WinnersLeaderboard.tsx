import { useState, useEffect } from "react";

interface Winner {
  id: number;
  name: string;
  city: string;
  prize: string;
  amount: number;
  time: string;
}

export const WinnersLeaderboard = () => {
  const [winners] = useState<Winner[]>([
    { id: 1, name: "Priya S.", city: "Mumbai", prize: "Big Bonus", amount: 5000, time: "2m ago" },
    { id: 2, name: "Rahul K.", city: "Delhi", prize: "Amazon Voucher", amount: 1000, time: "4m ago" },
    { id: 3, name: "Sneha P.", city: "Pune", prize: "Paytm Credit", amount: 500, time: "7m ago" },
    { id: 4, name: "Arjun M.", city: "Bangalore", prize: "Free Spins", amount: 300, time: "9m ago" },
    { id: 5, name: "Maya L.", city: "Chennai", prize: "Tournament Entry", amount: 200, time: "12m ago" },
  ]);

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 luxury-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg title-font text-accent gold-glow">🏆 Top Winners</h3>
        <div className="text-xs text-muted-foreground">Live Updates</div>
      </div>
      
      <div className="space-y-3">
        {winners.map((winner, index) => (
          <div
            key={winner.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              index === 0 
                ? 'bg-gradient-gold text-black' 
                : 'bg-muted/20 hover:bg-muted/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-black text-accent' : 'bg-accent text-black'
              }`}>
                {index + 1}
              </div>
              <div>
                <div className="font-semibold text-sm">{winner.name}</div>
                <div className={`text-xs ${index === 0 ? 'text-black/70' : 'text-muted-foreground'}`}>
                  {winner.city} • {winner.time}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">₹{winner.amount.toLocaleString()}</div>
              <div className={`text-xs ${index === 0 ? 'text-black/70' : 'text-muted-foreground'}`}>
                {winner.prize}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};