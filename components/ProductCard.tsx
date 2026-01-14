import React from 'react';
import { Product } from '../types';
import { convertDriveLink } from '../utils/drive';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isWishlisted, 
  onWishlistToggle 
}) => {
  const imageUrl = convertDriveLink(product.image);

  return (
    <div className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 border border-gray-50 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#fbfbfc] m-2 sm:m-3 rounded-[1.5rem] sm:rounded-[2rem]">
        <img 
          src={imageUrl} 
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800';
          }}
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
           <span className="bg-white/90 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm border border-white/50">
             {product.category}
           </span>
        </div>
        
        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center backdrop-blur-[1px]">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="bg-white text-gray-900 px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-blue-600 hover:text-white"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-10 pt-4 sm:pt-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4 sm:mb-6">
          <div className="flex-grow">
             {/* Product Name: Removed truncate to ensure full visibility */}
             <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors font-montserrat tracking-tight leading-tight">
               {product.name}
             </h3>
             <p className="text-gray-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.25em]">
               Official Collection
             </p>
          </div>
          <span className="text-xl sm:text-2xl font-black font-montserrat text-gray-900 shrink-0">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Description: Removed line-clamp to ensure full visibility */}
        <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-10 flex-grow leading-relaxed font-light">
          {product.description}
        </p>
        
        <div className="flex items-center gap-3 sm:gap-5 pt-6 sm:pt-8 border-t border-gray-50 mt-auto">
           <button 
             onClick={onAddToCart}
             className="flex-1 py-3 sm:py-4 bg-[#121417] text-white rounded-[1rem] sm:rounded-[1.2rem] font-black text-[9px] sm:text-[11px] uppercase tracking-[0.15em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
           >
             Purchase Now
           </button>
           <button 
             onClick={onWishlistToggle}
             className={`w-10 h-10 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-[1.2rem] border transition-all duration-300 flex items-center justify-center ${
               isWishlisted 
               ? 'bg-red-50 border-red-100 text-red-500 scale-105 sm:scale-110 shadow-lg shadow-red-100' 
               : 'bg-white border-gray-100 text-gray-300 hover:text-red-400 hover:border-red-100'
             }`}
           >
             <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart text-base sm:text-lg`}></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;