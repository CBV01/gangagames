import { useState, useEffect } from "react";
import { Prize } from "@/pages/Index";

interface PrizeModalProps {
  prize: Prize;
  onClose: () => void;
}

export const PrizeModal = ({ prize, onClose }: PrizeModalProps) => {
  const [showReferral, setShowReferral] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const referralLink = "https://ganga1.in/#/register?invitationCode=78596367152";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Animated Background Particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-gold rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Modal */}
      <div
        className="relative bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-accent/30 rounded-2xl w-full max-w-md animate-scale-in overflow-hidden casino-glow-xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Golden Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-gold bg-clip-border opacity-20 animate-pulse pointer-events-none"></div>
        
        {/* Sparkle Effects */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-gold rounded-full animate-ping opacity-75 pointer-events-none"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-gold rounded-full animate-ping opacity-75 delay-500 pointer-events-none"></div>

        {/* Header with Crown Animation */}
        <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-accent/10 to-accent/5 border-b border-accent/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-gold text-black flex items-center justify-center text-lg shadow-lg animate-tada">
                👑
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-lg md:text-xl title-font text-foreground leading-tight font-bold gold-text">
                CONGRATULATIONS!
              </h2>
              <p className="text-xs text-muted-foreground font-medium">You've won an amazing prize!</p>
            </div>
          </div>
          
          <button 
            type="button"
            aria-label="Close"
            title="Close"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 text-foreground text-lg leading-none transition-all duration-200 hover:scale-110"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
          {/* Prize Display - Center Stage */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Animated Prize Circle */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent via-accent/90 to-accent/80 border-4 border-white/20 shadow-2xl flex items-center justify-center animate-pulse">
                <div className="text-4xl md:text-5xl drop-shadow-2xl animate-bounce">
                  {prize.emoji}
                </div>
              </div>
              
              {/* Rotating Rings */}
              <div className="absolute -inset-3 rounded-full border-4 border-accent/30 animate-spin-slow opacity-60"></div>
              <div className="absolute -inset-5 rounded-full border-2 border-accent/20 animate-spin-slow-reverse opacity-40"></div>
              
              {/* Floating Sparkles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-70"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-300 opacity-70"></div>
            </div>

            {/* Prize Name with Glow */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-gold text-black text-sm font-extrabold tracking-wider shadow-lg animate-pulse">
                🎯 {prize.name.toUpperCase()} 🎯
              </div>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-accent/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground mb-2">
                🚀 CLAIM YOUR REWARD
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete these simple steps to unlock your <span className="font-bold text-accent">exclusive prize</span>:
              </p>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                <div className="w-6 h-6 bg-gradient-gold text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-xs font-medium">Sign up with your referral code</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                <div className="w-6 h-6 bg-gradient-gold text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-xs font-medium">Refer 5 friends to activate</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                <div className="w-6 h-6 bg-gradient-gold text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-xs font-medium">Withdraw your amazing prize!</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Referral link shows at the top when revealed */}
              {showReferral && (
                <div className="bg-background/80 rounded-xl p-3 border border-accent/20">
                  <p className="text-xs text-muted-foreground text-center mb-2">Your unique referral link:</p>
                  <div className="bg-white/5 rounded-lg p-2 border border-accent/10 flex items-center justify-between gap-2">
                    <code className="text-xs font-mono break-all text-accent">
                      {referralLink}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('COPY REFERRAL CODE button clicked');
                        copyToClipboard();
                      }}
                      className="shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-colors"
                    >
                      {copied ? '✅ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {/* Primary CTA remains the same */}
              <a 
                href={referralLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white py-3 px-6 text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                🎮 SIGN UP NOW
                <span className="animate-bounce">✨</span>
              </a>

              {/* GET REFERRAL CODE button only shows until clicked */}
              {!showReferral && (
                <button 
                  type="button"
                  onClick={() => {
                    console.log('GET REFERRAL CODE button clicked');
                    setShowReferral(true);
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 hover:border-accent/50 text-foreground py-3 px-6 text-sm font-semibold transition-all duration-200 hover:bg-accent/20 flex items-center justify-center gap-2"
                >
                  🔐 GET REFERRAL CODE
                </button>
              )}
            </div>
          </div>

          {/* Quick Action */}
          <div className="text-center">
            <a 
              href="https://gangagames.com/" 
              className="inline-block text-xs text-muted-foreground hover:text-accent transition-colors border-b border-dashed border-muted-foreground/30 hover:border-accent"
            >
              🚀 Continue to Withdraw Bonus
            </a>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-60"></div>
      </div>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tada {
          0% { transform: scale(1); }
          10%, 20% { transform: scale(0.9) rotate(-3deg); }
          30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
          40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
          100% { transform: scale(1) rotate(0); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 12s linear infinite; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-tada { animation: tada 1s ease-in-out; }
        .gold-text {
          background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
        }
        .casino-glow-xl {
          box-shadow: 0 0 50px rgba(255, 215, 0, 0.3),
                     0 0 100px rgba(255, 215, 0, 0.2),
                     0 0 150px rgba(255, 215, 0, 0.1);
        }
      `}</style>
    </div>
  );
};