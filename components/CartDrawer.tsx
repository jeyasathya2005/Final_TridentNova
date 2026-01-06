import React from 'react';
import { CartItem } from '../types';
import { convertDriveLink } from '../utils/drive';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    let message = `Hello Trident Nova! I'd like to place an order:%0A%0A`;
    cart.forEach(item => {
      message += `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    message += `%0A*Total: ₹${total.toLocaleString()}*%0A%0APlease confirm availability and share payment details.`;
    
    const whatsappUrl = `https://wa.me/917871947562?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-black font-montserrat tracking-tight">Your Bag</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">{cart.length} items selected</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors" aria-label="Close cart">
              <i className="fas fa-times text-xl text-gray-900"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                    <img 
                      src={convertDriveLink(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between mb-1">
                       <h3 className="font-bold text-gray-900 truncate pr-2 font-montserrat">{item.name}</h3>
                       <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <i className="fas fa-trash-alt text-sm"></i>
                       </button>
                    </div>
                    <p className="text-blue-600 font-black mb-3">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1 bg-white">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors">-</button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors">+</button>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center px-10">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <i className="fas fa-shopping-bag text-4xl text-gray-200"></i>
                 </div>
                 <p className="text-xl font-black font-montserrat mb-2">Bag is empty</p>
                 <p className="text-sm text-gray-400 font-light leading-relaxed">It seems you haven't added any of our premium essentials yet.</p>
                 <button 
                   onClick={onClose}
                   className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                 >
                   Discover Products
                 </button>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Estimated Total</span>
              <span className="text-3xl font-black font-montserrat tracking-tighter">₹{total.toLocaleString()}</span>
            </div>
            
            <div className="space-y-4">
              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
              >
                <i className="fab fa-whatsapp text-xl"></i> Secure Checkout
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-4 border-2 border-gray-900 text-gray-900 font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all rounded-2xl flex items-center justify-center gap-2"
              >
                <i className="fas fa-arrow-left text-[8px]"></i> Continue Shopping
              </button>
            </div>
            
            <p className="text-center text-[8px] text-gray-400 font-black uppercase tracking-[0.25em] mt-6">
              Order confirmation via WhatsApp Concierge
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;