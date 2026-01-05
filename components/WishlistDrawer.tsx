import React from 'react';
import { Product } from '../types';
import { convertDriveLink } from '../utils/drive';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, wishlistItems, onRemove, onMoveToCart }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-black font-montserrat tracking-tight">Wishlist</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">Saved for later</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {wishlistItems.length > 0 ? (
              wishlistItems.map(item => (
                <div key={item.id} className="flex gap-4 group animate-in slide-in-from-left duration-300">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                    <img 
                      src={convertDriveLink(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-gray-900 truncate pr-2 font-montserrat">{item.name}</h3>
                       <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <i className="fas fa-heart text-sm text-red-500"></i>
                       </button>
                    </div>
                    <p className="text-gray-900 font-black mb-3 text-sm">₹{item.price.toLocaleString()}</p>
                    <button 
                      onClick={() => onMoveToCart(item)}
                      className="w-full py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-shopping-bag"></i> Add to Bag
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center px-10">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <i className="far fa-heart text-4xl text-gray-200"></i>
                 </div>
                 <p className="text-xl font-black font-montserrat mb-2">Empty Wishlist</p>
                 <p className="text-sm text-gray-400 font-light leading-relaxed">Browse our collection and tap the heart icon to save your favorite pieces.</p>
                 <button 
                   onClick={onClose}
                   className="mt-8 px-8 py-3 border-2 border-gray-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
                 >
                   Start Browsing
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;