export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center casino-glow">
            <span className="text-2xl font-black text-background">🎰</span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-2xl font-black text-accent neon-glow">CasinoWin</h2>
            <p className="text-xs text-muted-foreground">Spin & Win Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Games
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Promotions
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Support
          </a>
          <button className="btn-casino">
            Sign Up Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden btn-casino text-sm px-4 py-2">
          Menu
        </button>
      </div>
    </header>
  );
};