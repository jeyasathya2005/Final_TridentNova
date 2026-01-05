import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (s: 'home' | 'products' | 'admin') => void;
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onAdminClick: () => void;
  user: firebase.User | null;
  isAdmin: boolean;
  onLogout: () => void;
}

const Logo = () => (
  <div className="flex flex-col items-center group">
    <div className="relative">
      <svg className="absolute -top-3 -right-5 w-6 h-6 sm:w-8 sm:h-8 text-white opacity-90 group-hover:scale-125 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      </svg>
      <div className="flex items-baseline select-none">
        <span className="text-3xl sm:text-5xl font-black text-white italic font-serif leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
          τ
        </span>
        <span className="w-1 sm:w-2"></span>
        <span className="text-3xl sm:text-5xl font-black text-white italic font-serif leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
          η
        </span>
      </div>
    </div>
    <div className="mt-1 text-[8px] sm:text-[10px] font-black tracking-[0.3em] text-white/90 font-montserrat whitespace-nowrap">
      TRIDENT NOVA
    </div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection, 
  cartCount, 
  wishlistCount,
  onCartClick, 
  onWishlistClick,
  onAdminClick,
  user,
  isAdmin,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (section: 'home' | 'products' | 'admin') => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
        ? 'bg-black/95 backdrop-blur-2xl shadow-2xl py-2' 
        : 'bg-transparent py-4 sm:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:text-blue-500 transition-colors"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>

          <div 
            className="cursor-pointer group py-1" 
            onClick={() => handleNav('home')}
          >
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-14 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => handleNav('home')}
              className="relative py-2 group"
            >
              <span className={`text-xs font-black uppercase tracking-[0.25em] transition-colors ${
                activeSection === 'home' ? 'text-blue-500' : 'text-gray-300 group-hover:text-white'
              }`}>
                HOME
              </span>
              {activeSection === 'home' && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => handleNav('products')}
              className="relative py-2 group"
            >
              <span className={`text-xs font-black uppercase tracking-[0.25em] transition-colors ${
                activeSection === 'products' ? 'text-blue-500' : 'text-gray-300 group-hover:text-white'
              }`}>
                PRODUCTS
              </span>
              {activeSection === 'products' && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full"></div>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onWishlistClick}
              className="relative p-2 text-white transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <i className="far fa-heart text-xl"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full ring-2 ring-black shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-white transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <i className="fas fa-shopping-bag text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full ring-2 ring-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={onAdminClick}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] transition-all duration-300 shadow-2xl ${
                  isAdmin 
                  ? 'bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-50' 
                  : 'bg-white text-gray-900 hover:bg-gray-100 active:scale-95'
                }`}
              >
                <i className={`fas ${isAdmin ? 'fa-user-cog' : 'fa-user-shield'} text-xs sm:text-sm`}></i>
                <span className="hidden sm:inline">
                  {isAdmin ? 'Dashboard' : 'Admin'}
                </span>
              </button>
              
              {isAdmin && (
                <button 
                  onClick={onLogout}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all duration-300 border border-red-500/20 shadow-lg"
                  title="Logout"
                >
                  <i className="fas fa-sign-out-alt text-xs sm:text-sm"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-md transition-opacity duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-gray-900 z-[120] transition-transform duration-500 transform lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="space-y-8">
            <button 
              onClick={() => handleNav('home')}
              className={`block w-full text-left text-sm font-black uppercase tracking-[0.3em] ${activeSection === 'home' ? 'text-blue-500' : 'text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('products')}
              className={`block w-full text-left text-sm font-black uppercase tracking-[0.3em] ${activeSection === 'products' ? 'text-blue-500' : 'text-white'}`}
            >
              Products
            </button>
            <button 
              onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left text-sm font-black uppercase tracking-[0.3em] ${activeSection === 'admin' ? 'text-blue-500' : 'text-white'}`}
            >
              Admin Portal
            </button>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4">Contact Support</p>
            <a href="https://wa.me/917871947562" className="flex items-center gap-3 text-white text-sm font-bold">
              <i className="fab fa-whatsapp text-green-500 text-lg"></i>
              +91 78719 47562
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;