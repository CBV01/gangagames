import { useState, useEffect } from "react";

export const ReferralTracker = () => {
  const [referrals, setReferrals] = useState(0);
  const [referralLink] = useState(
    `https://casinowin.com/ref/${Math.random().toString(36).substring(7)}`
  );

  const maxReferrals = 5;
  const progress = (referrals / maxReferrals) * 100;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Simulate referral updates for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      if (referrals < maxReferrals && Math.random() > 0.7) {
        setReferrals(prev => Math.min(prev + 1, maxReferrals));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [referrals]);

  return (
    <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 casino-shadow neon-border">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary neon-glow mb-2">
          Unlock Full Prize Eligibility
        </h3>
        <p className="text-muted-foreground">
          Invite friends to activate your winnings!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-accent">
            {referrals}/{maxReferrals} Friends
          </span>
        </div>
        <div className="bg-muted/20 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-neon h-full rounded-full transition-all duration-1000 casino-glow"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-foreground mb-2 block">
          Your Referral Link:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-background/50 border border-border rounded px-3 py-2 text-sm font-mono"
          />
          <button
            onClick={copyToClipboard}
            className="btn-gold px-4 py-2 text-sm"
          >
            📋 Copy
          </button>
        </div>
      </div>

      {/* Referral Rewards */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-foreground">Referral Rewards:</h4>
        {[
          { count: 1, reward: "₹100 Bonus" },
          { count: 3, reward: "₹500 Extra" },
          { count: 5, reward: "Full Prize Unlock + ₹1000" },
        ].map((tier) => (
          <div 
            key={tier.count}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              referrals >= tier.count 
                ? 'bg-casino-green/20 border-casino-green text-casino-green' 
                : 'bg-muted/10 border-border text-muted-foreground'
            }`}
          >
            <span className="font-medium">
              {referrals >= tier.count ? '✅' : '⭕'} {tier.count} Friends
            </span>
            <span className="font-bold">{tier.reward}</span>
          </div>
        ))}
      </div>

      {/* Social Share Buttons */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center mb-3">
          Share on social media:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button className="bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue border border-casino-blue/50 rounded-lg py-2 text-sm font-medium transition-colors">
            📘 Facebook
          </button>
          <button className="bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue border border-casino-blue/50 rounded-lg py-2 text-sm font-medium transition-colors">
            🐦 Twitter
          </button>
          <button className="bg-casino-green/20 hover:bg-casino-green/30 text-casino-green border border-casino-green/50 rounded-lg py-2 text-sm font-medium transition-colors">
            📱 WhatsApp
          </button>
        </div>
      </div>

      {referrals >= maxReferrals && (
        <div className="mt-6 p-4 bg-accent/20 border border-accent rounded-lg text-center animate-bounce-in">
          <div className="text-2xl mb-2">🎉</div>
          <p className="font-bold text-accent">
            Congratulations! You've unlocked your full prize!
          </p>
        </div>
      )}
    </div>
  );
};