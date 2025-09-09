export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Gangagames Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center luxury-shadow relative">
            <span className="text-2xl">🎰</span>
            <div className="absolute inset-0 rounded-full luxury-border"></div>
          </div>
          <div className="hidden md:block">
            <h2 className="text-3xl title-font text-accent gold-glow">Gangagames</h2>
            <p className="text-xs text-muted-foreground font-medium">Premium Gaming Platform</p>
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