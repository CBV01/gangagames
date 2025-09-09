import { useState } from "react";
import { Header } from "@/components/Header";
import { SpinWheel } from "@/components/SpinWheel";
import { PrizeModal } from "@/components/PrizeModal";
import { ReferralTracker } from "@/components/ReferralTracker";
import { LiveNotifications } from "@/components/LiveNotifications";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Confetti } from "@/components/Confetti";
import { CasinoIcons } from "@/components/CasinoIcons";
import { WinnersLeaderboard } from "@/components/WinnersLeaderboard";

export interface Prize {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const prizes: Prize[] = [
  { id: "1", name: "₹500 Bonus Credits", emoji: "💰", color: "casino-red" },
  { id: "2", name: "₹1,000 Bonus Credits", emoji: "💎", color: "accent" },
  { id: "3", name: "₹200 Amazon / Paytm Voucher", emoji: "🎫", color: "casino-blue" },
  { id: "4", name: "25 Free Spins", emoji: "🎰", color: "casino-green" },
  { id: "5", name: "₹5,000 Big Bonus", emoji: "🏆", color: "primary" },
  { id: "6", name: "₹300 Paytm Wallet Top-up", emoji: "💳", color: "casino-orange" },
  { id: "7", name: "Free Tournament Entry", emoji: "🎮", color: "secondary" },
  { id: "8", name: "🎁 Mystery Reward", emoji: "🎁", color: "accent" },
];

const Index = () => {
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const handlePrizeWon = (prize: Prize) => {
    setWonPrize(prize);
    setShowConfetti(true);
    setHasSpun(true);
    
    // Hide confetti after 4 seconds
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleCloseModal = () => {
    setWonPrize(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Casino Icons */}
      <CasinoIcons />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-casino"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-secondary/15 blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl title-font mb-4 text-accent gold-glow">
              Spin & Win up to ₹10,000 instantly 🎰
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-semibold">
              Play for free – No risk, just rewards!
            </p>
            
            <CountdownTimer />
          </div>

          {/* Main Wheel Section */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mb-16">
            {/* Left Sidebar - Winners */}
            <div className="hidden lg:block flex-shrink-0 w-80">
              <WinnersLeaderboard />
            </div>
            
            {/* Center Wheel */}
            <div className="flex-shrink-0">
              <SpinWheel prizes={prizes} onPrizeWon={handlePrizeWon} />
            </div>
            
            {/* Right Sidebar - Referral (appears after spin) */}
            {hasSpun && (
              <div className="flex-shrink-0 w-80 animate-float-up">
                <ReferralTracker />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center text-muted-foreground border-t border-border/20 pt-8">
            <div className="mb-4">
              <p className="text-sm">
                🔒 This is a promotional game. Terms & conditions apply. 18+ only.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </footer>
        </main>

        {/* Fixed Position Components */}
        <LiveNotifications />
        
        {/* Confetti Effect */}
        {showConfetti && <Confetti />}
        
        {/* Prize Modal */}
        {wonPrize && (
          <PrizeModal prize={wonPrize} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Index;