'use client';

import React, { useEffect, useRef } from 'react';

const BackgroundBubbles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Bubble colors using recommended pastel tones
    const bubbleColors = [
      { color: '#e0f2fe', name: 'sky-blue' },    // Very light sky blue
      { color: '#f3e8ff', name: 'lavender' },    // Soft lavender
      { color: '#ecfdf5', name: 'mint' },        // Fresh mint
    ];

    // Create static decorative bubbles
    const bubbleData = [
      // Hero section bubbles
      { size: 'w-[400px] h-[400px]', top: 'top-1/4', left: 'left-1/4', color: 'sky-blue', delay: '0s', duration: '25s' },
      { size: 'w-[350px] h-[350px]', top: 'top-1/3', right: 'right-1/4', color: 'lavender', delay: '3s', duration: '30s' },
      { size: 'w-[300px] h-[300px]', top: 'top-1/2', left: 'left-1/6', color: 'mint', delay: '6s', duration: '28s' },
      
      // Projects section bubbles
      { size: 'w-[450px] h-[450px]', top: 'top-2/3', right: 'right-1/6', color: 'sky-blue', delay: '2s', duration: '32s' },
      { size: 'w-[380px] h-[380px]', bottom: 'bottom-1/4', left: 'left-1/3', color: 'lavender', delay: '4s', duration: '26s' },
      
      // Contact section bubbles
      { size: 'w-[320px] h-[320px]', bottom: 'bottom-1/3', right: 'right-1/3', color: 'mint', delay: '1s', duration: '29s' },
      { size: 'w-[280px] h-[280px]', bottom: 'bottom-1/6', left: 'left-1/4', color: 'sky-blue', delay: '5s', duration: '27s' },
      
      // Corner accents
      { size: 'w-[500px] h-[500px]', top: '-top-40', left: '-left-40', color: 'lavender', delay: '0s', duration: '35s' },
      { size: 'w-[480px] h-[480px]', top: '-top-32', right: '-right-40', color: 'mint', delay: '2s', duration: '33s' },
      { size: 'w-[460px] h-[460px]', bottom: '-bottom-40', left: '-left-32', color: 'sky-blue', delay: '3s', duration: '31s' },
      { size: 'w-[420px] h-[420px]', bottom: '-bottom-32', right: '-right-40', color: 'lavender', delay: '1s', duration: '34s' },
    ];

    // Clear existing bubbles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create bubble elements
    bubbleData.forEach((bubble, index) => {
      const bubbleEl = document.createElement('div');
      bubbleEl.className = `absolute rounded-full opacity-30 mix-blend-overlay pointer-events-none ${bubble.size} ${bubble.top || ''} ${bubble.bottom || ''} ${bubble.left || ''} ${bubble.right || ''}`;
      
      // Set color based on name
      const colorInfo = bubbleColors.find(c => c.name === bubble.color);
      if (colorInfo) {
        bubbleEl.style.background = `radial-gradient(circle at 30% 30%, ${colorInfo.color}44, ${colorInfo.color}22, ${colorInfo.color}11)`;
      }
      
      bubbleEl.style.filter = 'blur(60px)';
      bubbleEl.style.animation = `float ${bubble.duration} ease-in-out infinite`;
      bubbleEl.style.animationDelay = bubble.delay;
      bubbleEl.style.willChange = 'transform, opacity';
      
      container.appendChild(bubbleEl);
    });

    // Cleanup
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0" />;
};

export default BackgroundBubbles;