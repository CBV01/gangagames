export const CasinoIcons = () => {
  const icons = ["🎰", "🎲", "💎", "🃏", "🍒", "⭐", "🎪", "🎡"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute animate-float-up opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${index * 2}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        >
          <div className="text-2xl gold-glow animate-pulse">
            {icon}
          </div>
        </div>
      ))}
    </div>
  );
};