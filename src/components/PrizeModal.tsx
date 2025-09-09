import { useState } from "react";
import { Prize } from "@/pages/Index";

interface PrizeModalProps {
  prize: Prize;
  onClose: () => void;
}

export const PrizeModal = ({ prize, onClose }: PrizeModalProps) => {
  const [showReferral, setShowReferral] = useState(false);
  const code = Math.random().toString(36).substring(7);
  const referralLink = `${window.location.origin}/?ref=${code}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="bg-card border border-border rounded-xl w-[92vw] max-w-md animate-bounce-in overflow-hidden">
        {/* Compact Header - subtle glass */}
        <div className="px-3 py-2.5 flex items-center justify-between bg-card/80 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center text-base">👑</div>
            <div>
              <h2 className="text-sm md:text-base title-font text-foreground leading-tight">You won a prize!</h2>
              <p className="text-[11px] text-muted-foreground">{prize.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-lg leading-none">×</button>
        </div>

        {/* Content - compact, no scroll */}
        <div className="px-4 py-3 space-y-3">
          {/* Gamified chip visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20 rounded-full bg-secondary/40 border border-border flex items-center justify-center">
              {/* rotating accent ring for game feel */}
              <div className="absolute -inset-1 rounded-full border border-accent/30" style={{ animation: 'spin 6s linear infinite' }}></div>
              <div className="absolute inset-2 rounded-full border border-border/60"></div>
              <div className="text-2xl">{prize.emoji}</div>
            </div>
          </div>

          {/* subtle reward ribbon */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-gold text-black text-[11px] font-extrabold tracking-wider">
              ⭐ Premium Reward
            </span>
                </div>

          {/* Requirements notice */}
          <div className="rounded-md bg-muted/10 border border-border px-3 py-2">
            <p className="text-[11px] leading-relaxed text-muted-foreground text-center">
              To collect your prize, please <span className="font-semibold text-foreground">sign up</span> and
              then <span className="font-semibold text-foreground">refer 5 friends</span>.
            </p>
                </div>

          {/* Actions */}
          <div className="space-y-2">
            {/* Why sign up and refer */}
            <div className="rounded-md bg-muted/10 border border-border px-3 py-2">
              <ul className="text-[11px] leading-relaxed text-muted-foreground list-disc list-inside">
                <li>Sign up to activate and secure your prize.</li>
                <li>Refer friends to boost rewards and unlock bonuses.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a href="https://gangagames.com/" target="_blank" rel="noopener noreferrer" className="w-full rounded-md bg-primary text-primary-foreground py-1.5 text-sm font-semibold hover:opacity-90 transition text-center">🎮 Sign Up</a>
              {!showReferral ? (
                <button onClick={() => setShowReferral(true)} className="w-full rounded-md bg-muted text-foreground py-1.5 text-sm font-semibold hover:bg-muted/70 transition">🔐 Copy Referral Code</button>
              ) : (
                <button onClick={copyToClipboard} className="w-full rounded-md bg-muted text-foreground py-1.5 text-sm font-semibold hover:bg-muted/70 transition">📋 Copy Referral Code</button>
              )}
            </div>
          </div>

          {showReferral && (
            <div className="bg-background/60 rounded-md p-2 text-xs font-mono break-all text-center border border-border">
              {referralLink}
            </div>
          )}

          {/* Continue to site */}
          <a href="https://gangagames.com/" className="w-full inline-block text-center py-1.5 text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md text-sm">
            Continue to Withdraw Bonus
          </a>
        </div>
      </div>
    </div>
  );
};