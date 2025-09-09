import { Prize } from "@/pages/Index";

interface PrizeModalProps {
  prize: Prize;
  onClose: () => void;
}

export const PrizeModal = ({ prize, onClose }: PrizeModalProps) => {
  const referralLink = `https://casinowin.com/ref/${Math.random().toString(36).substring(7)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border-2 border-primary rounded-2xl casino-shadow max-w-md w-full animate-bounce-in">
        {/* Header */}
        <div className="text-center p-8 bg-gradient-neon rounded-t-2xl">
          <div className="text-6xl mb-4">{prize.emoji}</div>
          <h2 className="text-3xl font-black text-background mb-2">Congratulations! 🎉</h2>
          <p className="text-xl font-bold text-background">You won {prize.name}!</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step Instructions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary neon-glow text-center">Claim Your Prize:</h3>
            
            {/* Step 1 */}
            <div className="bg-muted/20 rounded-lg p-4 neon-border">
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-2">Sign Up on CasinoWin Platform</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create your account to activate your prize and start playing!
                  </p>
                  <button className="btn-casino w-full">
                    Sign Up Now 🚀
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-muted/20 rounded-lg p-4 neon-border">
              <div className="flex items-start space-x-3">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-2">Invite 5 Friends</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your unique link to unlock full eligibility
                  </p>
                  <div className="space-y-2">
                    <div className="bg-background/50 rounded p-2 text-xs font-mono break-all">
                      {referralLink}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="btn-gold w-full text-sm"
                    >
                      📋 Copy Referral Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-muted/10 rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Referral Progress</div>
            <div className="bg-background/20 rounded-full h-3 mb-2">
              <div className="bg-gradient-neon h-full rounded-full w-0 transition-all duration-1000"></div>
            </div>
            <div className="text-xs font-semibold">0/5 Friends Joined</div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg"
          >
            Continue to Platform
          </button>
        </div>
      </div>
    </div>
  );
};