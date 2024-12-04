import React, { useEffect } from "react";

const Confetti = () => {
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      // Random rotation
      const randomRotation = Math.floor(Math.random() * 360);
      // Random scale
      const randomScale = Math.random();
      // Random width & height
      const randomWidth = Math.floor(
        Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      );
      const randomHeight = Math.floor(
        Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      );
      // Random animation delay
      const randomAnimationDelay = Math.floor(Math.random() * 15);
      // Random colors
      const colors = ["bg-green-500", "bg-red-500", "bg-pink-400", "bg-blue-600", "bg-yellow-400"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Create confetti piece
      const confetti = document.createElement("div");
      confetti.className = `absolute w-4 h-6 ${randomColor} rounded transform animate-fall`;
      confetti.style.top = `${randomHeight}px`;
      confetti.style.left = `${randomWidth}px`;
      confetti.style.opacity = randomScale;
      confetti.style.transform = `rotate(${randomRotation}deg)`;
      confetti.style.animationDelay = `${randomAnimationDelay}s`;

      // Append confetti to the wrapper
      document.getElementById("confetti-wrapper").appendChild(confetti);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" id="confetti-wrapper">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
            }
          }

          .animate-fall {
            animation: fall 5s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default Confetti;
