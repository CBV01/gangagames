import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SpinWheel } from "@/components/SpinWheel";
import { PrizeModal } from "@/components/PrizeModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Confetti } from "@/components/Confetti";
import { TopWinnersTicker } from "@/components/TopWinnersTicker";
import { CasinoIcons } from "@/components/CasinoIcons";
import { WinnersLeaderboard } from "@/components/WinnersLeaderboard";

export interface Prize {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const prizes: Prize[] = [
  { id: "1", name: "₹200 Amazon / Paytm Voucher", emoji: "🎫", color: "casino-blue" },
  { id: "2", name: "Free Tournament Entry", emoji: "🎮", color: "secondary" },
  { id: "3", name: "25 Free Spins", emoji: "🎰", color: "casino-green" },
  { id: "4", name: "Mystery Reward", emoji: "🎁", color: "accent" },
  { id: "5", name: "₹5000 Big Bonus", emoji: "🏆", color: "primary" },
  { id: "6", name: "₹1000 Bonus Credits", emoji: "💎", color: "accent" },
  { id: "7", name: "₹300 Paytm Wallet Top-up", emoji: "💳", color: "casino-orange" },
  { id: "8", name: "₹500 Bonus Credits", emoji: "💰", color: "casino-red" },
];

const Index = () => {
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

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

  // Read referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get('ref');
    if (r) setRefCode(r);
  }, []);

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
        {refCode && (
          <div className="bg-muted/20 border border-border/50 text-foreground text-sm py-2">
            <div className="container mx-auto px-4 text-center">
              संदर्भ कोड: <span className="font-semibold text-accent">{refCode}</span> — अपना इनाम सक्रिय करने के लिए अभी स्पिन करें और साइन अप करें!
            </div>
          </div>
        )}
        <TopWinnersTicker />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl title-font mb-4 text-accent gold-glow">
              व्हील घुमाएँ और ₹10,000 तक के रोमांचक पुरस्कार अनलॉक करें
              <br />
              🎰
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-semibold">
              मनोरंजन के लिए खेलें - आश्चर्य, वाउचर और विशेष उपहार अनलॉक करें!
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
            
            {/* Right Sidebar - Referral removed; now shown via modal actions */}
          </div>

          {/* Footer */}
          <footer className="text-center text-muted-foreground border-t border-border/20 pt-8">
            <div className="mb-4">
              <p className="text-sm">
                यह मनोरंजन के लिए एक प्रमोशनल गेम है। इनाम वाउचर, क्रेडिट या उपहार के रूप में मिलते हैं। इसमें असली पैसे की कोई सट्टेबाजी शामिल नहीं है। केवल 18+ आयु वर्ग के लिए। नियम और शर्तें लागू।
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">नियम और शर्तें</a>
              <a href="#" className="hover:text-primary transition-colors">गोपनीयता नीति</a>
              <a href="#" className="hover:text-primary transition-colors">संपर्क करें</a>
            </div>
          </footer>
        </main>

        {/* Fixed Position Components */}
        
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
