import { useEffect, useMemo, useRef, useState } from "react";

interface WinnerItem {
  id: number;
  name: string;
  location: string;
  prize: string;
  timestamp: Date;
}

const NAMES = [
  "Rahul","Priya","Amit","Sneha","Vikram","Anita","Rohan","Kavya",
  "Arjun","Neha","Sandeep","Isha","Karan","Meera","Dev","Ananya"
];

const LOCATIONS = [
  "Delhi","Mumbai","Bangalore","Pune","Chennai","Hyderabad","Kolkata","Ahmedabad"
];

const PRIZES = [
  "₹1,000 Bonus","₹500 Credits","25 Free Spins","₹200 Voucher","₹5,000 Jackpot",
  "₹300 Paytm","Free Tournament","Mystery Reward"
];

const getRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const formatRelativeTime = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

export const TopWinnersTicker = () => {
  const [winners, setWinners] = useState<WinnerItem[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Seed initial winners
  useEffect(() => {
    const initial: WinnerItem[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() - i,
      name: getRandom(NAMES),
      location: getRandom(LOCATIONS),
      prize: getRandom(PRIZES),
      // Spread timestamps over last ~10 minutes
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10 * 60 * 1000))
    }));
    setWinners(initial);
  }, []);

  // Add random new winner periodically (6-12s)
  useEffect(() => {
    const schedule = () => {
      const next = Math.floor(6000 + Math.random() * 6000);
      intervalRef.current = window.setTimeout(() => {
        setWinners(prev => [
          {
            id: Date.now(),
            name: getRandom(NAMES),
            location: getRandom(LOCATIONS),
            prize: getRandom(PRIZES),
            timestamp: new Date()
          },
          ...prev
        ].slice(0, 20));
        schedule();
      }, next);
    };
    schedule();
    return () => {
      if (intervalRef.current) window.clearTimeout(intervalRef.current);
    };
  }, []);

  // Duplicate list to create seamless marquee loop
  const marqueeList = useMemo(() => [...winners, ...winners], [winners]);

  return (
    <div className="bg-card/40 border border-border/40 backdrop-blur-md py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center gap-3 text-xs md:text-sm text-foreground/90">
          <span className="inline-flex items-center gap-2 font-semibold text-accent">
            <span className="w-2 h-2 rounded-full bg-casino-green animate-pulse"></span>
            Live Winners
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee flex items-center gap-6 pr-6">
              {marqueeList.map((w, idx) => (
                <div key={`${w.id}-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="text-primary font-semibold">{w.name}</span>
                  <span className="text-muted-foreground">from {w.location}</span>
                  <span className="text-casino-green font-semibold">won {w.prize}</span>
                  <span className="text-muted-foreground">• {formatRelativeTime(w.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopWinnersTicker;


