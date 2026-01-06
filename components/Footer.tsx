import React from 'react';
import { CategoryItem } from '../types';

interface FooterProps {
  onNavigate: (section: 'home' | 'products' | 'admin', category?: string, sort?: string) => void;
  onShowInfo: (type: string) => void;
  categories: CategoryItem[];
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onShowInfo, categories }) => {
  const instagramUrl = "https://www.instagram.com/reel/DS8CZxoE8UZ/?igsh=NnIwNWxoampzYTQ2";

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-20 px-6 sm:px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16">
        <div className="md:col-span-1">
          {/* Footer Logo Lockup */}
          <div className="flex flex-col items-start gap-1 mb-6 sm:mb-8 cursor-pointer group" onClick={() => onNavigate('home')}>
             <div className="relative">
                <svg className="absolute -top-2 -right-4 w-5 h-5 sm:w-6 sm:h-6 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                </svg>
                <div className="flex items-baseline select-none">
                  <span className="text-3xl sm:text-4xl font-black text-white italic font-serif leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>τ</span>
                  <span className="w-1.5"></span>
                  <span className="text-3xl sm:text-4xl font-black text-white italic font-serif leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>η</span>
                </div>
             </div>
             <span className="text-[9px] sm:text-[10px] font-black font-montserrat tracking-[0.3em] uppercase text-white/70">TRIDENT NOVA</span>
          </div>
          
          <div className="space-y-4 text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
            <p>Curating the finest tech and luxury essentials since 2024.</p>
            <div className="pt-4 border-t border-white/5 space-y-2">
              <p className="text-white font-black uppercase tracking-widest text-[9px]">The Boutique</p>
              <address className="not-italic text-gray-400 space-y-1">
                <p>Trident Nova,</p>
                <p>Rajaji Road, Sivagiri,</p>
                <p>Tenkasi - <span className="font-mono">627757</span></p>
                <p className="pt-2 flex items-center gap-2 text-white font-bold">
                  <i className="fas fa-phone-alt text-[10px] text-blue-500"></i>
                  +91 78719 47562
                </p>
              </address>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group">
              <i className="fab fa-instagram text-lg sm:text-xl group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 sm:mb-8">Collections</h4>
          <ul className="space-y-3 sm:space-y-4 text-gray-400 text-xs sm:text-sm font-medium">
            <li><button onClick={() => onNavigate('products', 'all')} className="hover:text-white transition-colors">View All Items</button></li>
            {categories.slice(0, 4).map(cat => (
              <li key={cat.id}><button onClick={() => onNavigate('products', cat.name)} className="hover:text-white transition-colors uppercase tracking-widest text-[9px] sm:text-[10px]">{cat.name}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 sm:mb-8">Client Care</h4>
          <ul className="space-y-3 sm:space-y-4 text-gray-400 text-xs sm:text-sm font-medium">
            <li><button onClick={() => onShowInfo('about')} className="hover:text-white transition-colors">Our Heritage</button></li>
            <li><button onClick={() => onShowInfo('service')} className="hover:text-white transition-colors">Bespoke Support</button></li>
            <li><a href="https://wa.me/917871947562" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Concierge</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 sm:mb-8">The Insider</h4>
          <p className="text-gray-400 text-xs sm:text-sm mb-6 font-light">Receive early access to limited edition drops and private events.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm font-medium"
            />
            <button className="absolute right-1 sm:right-2 top-1 sm:top-2 bottom-1 sm:bottom-2 px-4 sm:px-6 bg-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-500 transition-all font-black text-[9px] sm:text-[10px] uppercase">
              Enter
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] sm:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
         <p className="text-center">© 2024 Trident Nova. Sivagiri, Tenkasi.</p>
         <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <button onClick={() => onShowInfo('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onShowInfo('terms')} className="hover:text-white transition-colors">Terms</button>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white transition-colors">Instagram</a>
         </div>
      </div>
    </footer>
  );
};

export default Footer;