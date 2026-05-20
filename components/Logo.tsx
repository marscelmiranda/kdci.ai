
import React from 'react';

export const Logo = ({ isDarkHero }: { isDarkHero: boolean }) => {
  return (
    <div className="flex items-center">
      <img
        src={isDarkHero ? '/kdci-logo.webp' : '/kdci-logo-dark.webp'}
        alt="KDCI.AI"
        className="h-10 w-auto"
      />
    </div>
  );
};
