import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    'hsl(330, 85%, 55%)', // primary
    'hsl(280, 90%, 65%)', // secondary  
    'hsl(45, 100%, 60%)', // accent
    'hsl(0, 85%, 45%)',   // casino-red
    'hsl(120, 70%, 45%)', // casino-green
    'hsl(220, 85%, 60%)', // casino-blue
    'hsl(25, 95%, 60%)',  // casino-orange
  ];

  useEffect(() => {
    const createConfetti = () => {
      const newPieces: ConfettiPiece[] = [];
      
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 6,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }
      
      setPieces(newPieces);
    };

    createConfetti();

    const animateConfetti = () => {
      setPieces(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.speedX,
        y: piece.y + piece.speedY,
        rotation: piece.rotation + piece.rotationSpeed,
        speedY: piece.speedY + 0.1, // gravity
      })).filter(piece => piece.y < window.innerHeight + 50));
    };

    const interval = setInterval(animateConfetti, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 10px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
};