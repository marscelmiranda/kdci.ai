
import React from 'react';

export const Logo = ({ isDarkHero }: { isDarkHero: boolean }) => {
  return (
    <div className="relative flex items-center h-10">
      {/* White logo — for dark / hero backgrounds */}
      <img loading="lazy"
        src="/KDCI.AI_Logo_D01_No_Tagline.webp"
        alt="KDCI.AI"
        className={`h-10 w-auto transition-opacity duration-300 ${isDarkHero ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Black logo — for light / scrolled backgrounds */}
      <img loading="lazy"
        src="/KDCI.AI_Logo_D01_No_Tagline_Black.webp"
        alt=""
        aria-hidden="true"
        className={`h-10 w-auto absolute inset-0 transition-opacity duration-300 ${isDarkHero ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
