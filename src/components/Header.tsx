export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-gold flex items-center justify-center luxury-shadow relative">
            <span className="text-xl md:text-2xl">🎰</span>
            <div className="absolute inset-0 rounded-full luxury-border"></div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl title-font text-accent gold-glow">Gangagames</h2>
          </div>
        </div>
      </div>
    </header>
  );
};