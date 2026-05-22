import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PortfolioItem } from './PortfolioData';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-10 md:py-8 border-b border-slate-100 bg-white shrink-0 z-20">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{item.title}</h3>
            <p className="text-sm text-[#E61739] font-black uppercase tracking-[0.2em] mt-2">{item.tag}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={28} />
          </button>
        </div>
        
        {/* Content (Scrollable) */}
        <div className="overflow-y-auto p-6 md:p-12 bg-slate-50 flex-grow">
          {item.description && (
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-4xl mx-auto text-center leading-relaxed font-medium">
              {item.description}
            </p>
          )}
          
          <div className="space-y-[6px] max-w-5xl mx-auto">
            {item.media.map((mediaItem, idx) => (
              <div key={idx} className="overflow-hidden shadow-lg bg-white border border-slate-100 w-full">
                {mediaItem.type === 'image' && (
                  <img 
                    src={mediaItem.url} 
                    alt={`${item.title} - Media ${idx + 1}`} 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {mediaItem.type === 'youtube' && (
                  <div className="relative w-full pt-[56.25%]">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={mediaItem.url} 
                      title={`${item.title} - Video ${idx + 1}`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {mediaItem.type === 'vimeo' && (
                  <div className="relative w-full pt-[56.25%]">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={mediaItem.url} 
                      title={`${item.title} - Video ${idx + 1}`}
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
