import { useEffect, useState } from 'react';
import { api } from './api';
import { Toaster, toast } from 'react-hot-toast';
import { useCart } from './store/cart';
import './styles/tokens.css';
import './index.css';

function ImageCarousel({ images, productName, theme }) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((err) => {
        console.warn('Error precargando imágenes:', err);
        setImageError(true);
        setImagesLoaded(true);
      });
  }, [images]);

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        height: 280, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1c1c1e 0%, #28282a 100%)' 
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)', 
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        userSelect: 'none',
        padding: '20px',
        border: theme === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.08)' 
          : '1px solid rgba(0, 0, 0, 0.06)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageError ? '/iphone-placeholder.svg' : images[currentIndex]} 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          padding: '20px',
          transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          opacity: imagesLoaded ? 1 : 0.3
        }}
        alt={`${productName} - imagen ${currentIndex + 1}`}
        onError={() => setImageError(true)}
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '20px',
              color: '#3b82f6',
              fontWeight: '400',
              zIndex: 2,
              opacity: 0.9
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.25)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.opacity = '0.9';
            }}
          >
            ‹
          </button>
          
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '20px',
              color: '#3b82f6',
              fontWeight: '400',
              zIndex: 2,
              opacity: 0.9
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.25)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.opacity = '0.9';
            }}
          >
            ›
          </button>

          <div style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 7,
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '6px 10px',
            borderRadius: 12
          }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                style={{
                  width: currentIndex === index ? 26 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: currentIndex === index 
                    ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' 
                    : 'rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: currentIndex === index 
                    ? '0 2px 8px rgba(96, 165, 250, 0.4)' 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.35)';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              />
            ))}
          </div>
        </>
      )}

      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: 10,
          fontSize: 11,
          fontWeight: '600',
          backdropFilter: 'blur(10px)',
          zIndex: 2,
          letterSpacing: '0.3px'
        }}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

function GroupedProductCard({ product, theme, colors, onAdd }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'Standard');
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacities[0] || 128);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  const availableProducts = product.products.filter(p => 
    p.variant === selectedVariant &&
    p.capacity === selectedCapacity &&
    p.color === selectedColor
  );

  const availableProduct = availableProducts[0];
  const price = availableProduct ? availableProduct.price : product.minPrice;
  const stock = availableProducts.length;
  
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant, selectedCapacity, selectedColor]);

  return (
    <article 
      style={{ 
        background: colors.cardBg, 
        padding: 24, 
        borderRadius: 16, 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: colors.shadow,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        height: 'fit-content'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
        e.currentTarget.style.boxShadow = colors.shadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = colors.shadow;
      }}
    >
      <ImageCarousel 
        images={product.images} 
        productName={product.baseModel}
        theme={theme}
      />
      
      <div style={{ 
        marginBottom: 12, 
        fontWeight: 600, 
        fontSize: '19px',
        color: colors.text,
        letterSpacing: '-0.019em',
        lineHeight: '1.2',
        transition: 'color 0.3s ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
      }}>
        {product.baseModel}
      </div>

      {product.variants.length > 1 && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontSize: '12px', 
            fontWeight: '600', 
            color: colors.textMuted,
            letterSpacing: '-0.01em'
          }}>
            Modelo
          </label>
          <select 
              value={selectedVariant} 
              onChange={(e) => setSelectedVariant(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 14px', 
                borderRadius: 10, 
                border: `1px solid ${colors.border}`,
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: colors.inputBg,
                transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontWeight: '400',
                color: colors.text,
                letterSpacing: '-0.01em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '14px',
                paddingRight: '36px'
              }}
          >
            {product.variants.map(variant => (
              <option key={variant} value={variant}>{variant}</option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 6, 
          fontSize: '12px', 
          fontWeight: '600', 
          color: colors.textMuted,
          letterSpacing: '-0.01em'
        }}>
          Almacenamiento
        </label>
        <select 
          value={selectedCapacity} 
          onChange={(e) => setSelectedCapacity(Number(e.target.value))}
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            borderRadius: 12, 
            border: `1.5px solid ${colors.border}`,
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            background: colors.inputBg,
            transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
            fontWeight: '400',
            color: colors.text,
            letterSpacing: '-0.01em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            paddingRight: '40px'
          }}
        >
          {product.capacities.map(capacity => (
            <option key={capacity} value={capacity}>{capacity} GB</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 6, 
          fontSize: '12px', 
          fontWeight: '600', 
          color: colors.textMuted,
          letterSpacing: '-0.01em'
        }}>
          Color
        </label>
        <select 
          value={selectedColor} 
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            borderRadius: 12, 
            border: `1.5px solid ${colors.border}`,
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            background: colors.inputBg,
            transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
            fontWeight: '400',
            color: colors.text,
            letterSpacing: '-0.01em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            paddingRight: '40px'
          }}
        >
          {product.colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>
      
      <div style={{ 
        fontSize: '28px', 
        fontWeight: '700',
        color: colors.text,
        marginBottom: 8,
        letterSpacing: '-0.03em',
        transition: 'color 0.3s ease'
      }}>
        USD {price}
      </div>
      
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12
      }}>
        <div style={{ 
          fontSize: '13px', 
          color: colors.textMuted, 
          fontWeight: '500',
          letterSpacing: '-0.01em',
          transition: 'color 0.3s ease'
        }}>
          {stock > 0 ? `${stock} disponibles` : 'Sin stock'}
        </div>

        {stock > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            borderRadius: 8,
            padding: '4px'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              disabled={quantity <= 1}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: quantity > 1 ? colors.text : colors.textMuted,
                cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: quantity > 1 ? 1 : 0.3
              }}
              onMouseEnter={(e) => {
                if (quantity > 1) {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              −
            </button>

            <div style={{
              minWidth: 24,
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: colors.text,
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease'
            }}>
              {quantity}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.min(stock, quantity + 1));
              }}
              disabled={quantity >= stock}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: quantity < stock ? colors.text : colors.textMuted,
                cursor: quantity < stock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: quantity < stock ? 1 : 0.3
              }}
              onMouseEnter={(e) => {
                if (quantity < stock) {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => {
          if (availableProduct && stock > 0) {
            for (let i = 0; i < quantity; i++) {
              const productToAdd = availableProducts[i];
              if (productToAdd) {
                onAdd(productToAdd);
              }
            }
          }
        }} 
        disabled={!availableProduct || stock === 0}
        style={{ 
          padding: '11px 20px', 
          borderRadius: 10, 
          border: 'none',
          background: availableProduct && stock > 0 
            ? colors.accent
            : colors.inputBg,
          color: '#fff',
          fontWeight: '500',
          cursor: availableProduct && stock > 0 ? 'pointer' : 'not-allowed',
          transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
          fontSize: '15px',
          letterSpacing: '-0.011em',
          opacity: availableProduct && stock > 0 ? 1 : 0.5,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
        }}
        onMouseEnter={(e) => {
          if (availableProduct && stock > 0) {
            e.currentTarget.style.background = colors.accentHover;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (availableProduct && stock > 0) {
            e.currentTarget.style.background = colors.accent;
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {availableProduct && stock > 0 
          ? (quantity > 1 ? `Agregar ${quantity} unidades` : 'Agregar') 
          : 'No disponible'}
      </button>
    </article>
  );
}

const toQuery = (f) => Object.entries(f)
  .filter(([, v]) => v != null && v !== '')
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
  .join('&');

export default function App() {
  const [filters, setFilters] = useState({ brand: 'Apple' });
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  const { totalItems, set: setBadge } = useCart();

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'dark' ? {
    bg: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
    bgSolid: '#000000',
    headerBg: 'rgba(0, 0, 0, 0.8)',
    cardBg: 'rgba(29, 29, 31, 0.85)',
    sidebarBg: 'rgba(29, 29, 31, 0.85)',
    text: '#f5f5f7',
    textMuted: '#8e8e93',
    border: 'rgba(255, 255, 255, 0.06)',
    inputBg: 'rgba(255, 255, 255, 0.06)',
    accent: '#0a84ff',
    accentHover: '#409cff',
    shadow: '0 1px 4px 0 rgba(0, 0, 0, 0.5)',
    shadowHover: '0 8px 24px 0 rgba(0, 132, 255, 0.2)',
  } : {
    bg: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
    bgSolid: '#ffffff',
    headerBg: 'rgba(255, 255, 255, 0.9)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    sidebarBg: 'rgba(255, 255, 255, 0.85)',
    text: '#1d1d1f',
    textMuted: '#8e8e93',
    border: 'rgba(0, 0, 0, 0.04)',
    inputBg: 'rgba(0, 0, 0, 0.03)',
    accent: '#0071e3',
    accentHover: '#0077ed',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
    shadowHover: '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
  };

  function getModelReleaseOrder(name) {
    const modelMap = {
      'iPhone 16 Pro Max': 16.4,
      'iPhone 16 Pro': 16.3,
      'iPhone 16 Plus': 16.2,
      'iPhone 16': 16.1,
      'iPhone 15 Pro Max': 15.4,
      'iPhone 15 Pro': 15.3,
      'iPhone 15 Plus': 15.2,
      'iPhone 15': 15.1,
      'iPhone 14 Pro Max': 14.4,
      'iPhone 14 Pro': 14.3,
      'iPhone 14 Plus': 14.2,
      'iPhone 14': 14.1,
      'iPhone 13 Pro Max': 13.4,
      'iPhone 13 Pro': 13.3,
      'iPhone 13 mini': 13.2,
      'iPhone 13': 13.1,
      'iPhone 12 Pro Max': 12.4,
      'iPhone 12 Pro': 12.3,
      'iPhone 12 mini': 12.2,
      'iPhone 12': 12.1,
      'iPhone 11 Pro Max': 11.3,
      'iPhone 11 Pro': 11.2,
      'iPhone 11': 11.1,
      'iPhone SE (3rd generation)': 10.3,
      'iPhone SE (2nd generation)': 10.2,
      'iPhone XS Max': 10.1,
      'iPhone XS': 10.0,
      'iPhone XR': 9.9,
      'iPhone X': 9.8,
    };
    
    return modelMap[name] || 0;
  }

  async function load() {
    setLoading(true);
    try {
      const qs = toQuery(filters);
      const { data } = await api.get(`/products/grouped${qs ? `?${qs}` : ''}`);
      
      // Ordenar los productos según sortBy
      let sortedItems = [...data.items];
      switch (sortBy) {
        case 'newest':
          // Ordenar por modelo más reciente (iPhone 15 antes que iPhone 14)
          sortedItems.sort((a, b) => getModelReleaseOrder(b.baseModel) - getModelReleaseOrder(a.baseModel));
          break;
        case 'oldest':
          // Ordenar por modelo más antiguo (iPhone 11 antes que iPhone 12)
          sortedItems.sort((a, b) => getModelReleaseOrder(a.baseModel) - getModelReleaseOrder(b.baseModel));
          break;
        case 'cheapest':
          sortedItems.sort((a, b) => a.minPrice - b.minPrice);
          break;
        case 'expensive':
          sortedItems.sort((a, b) => b.minPrice - a.minPrice);
          break;
      }
      
      setItems(sortedItems);
      setTotal(data.total);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [JSON.stringify(filters), sortBy]);

  async function add(p) {
    if (p.condition === 'USADO') {
      if (!confirm(`Agregar "${p.fullName}" (USADO) al pedido?`)) return;
    }

    try {
      const { data } = await api.post('/orders/current/items', { 
        productId: p.imei, 
        qty: 1 
      });
      
      toast.success(data.message);
      
      // Recargar productos para actualizar stock
      await load();

      const sum = (await api.get('/orders/current/summary')).data.totalItems;
      setBadge(sum);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Error al agregar producto');
    }
  }

  function clear() {
    setFilters({});
  }

  return (
    <div style={{ 
      background: colors.bg, 
      minHeight: '100vh',
      transition: 'background 0.4s cubic-bezier(0.28, 0.11, 0.32, 1)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      position: 'relative'
    }}>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: colors.cardBg,
            color: colors.text,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '16px 24px',
          },
        }}
      />
      
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: colors.headerBg,
        backdropFilter: 'saturate(180%) blur(40px)',
        WebkitBackdropFilter: 'saturate(180%) blur(40px)',
        borderBottom: `0.5px solid ${colors.border}`,
        transition: 'all 0.4s cubic-bezier(0.28, 0.11, 0.32, 1)'
      }}>
        <div style={{
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          padding: '14px 40px',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginRight: 16
          }}>
            <img 
              src="/logo-ipro.png" 
              alt="iPro Logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                filter: theme === 'dark' ? 'drop-shadow(0 2px 8px rgba(0, 113, 227, 0.3))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              width: 44,
              height: 44,
              background: colors.accent,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              letterSpacing: '-0.5px'
            }}>
              iP
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setFilters(f => ({ ...f, brand: 'Apple' }))} 
              style={{ 
                padding: '9px 20px', 
                borderRadius: 980, 
                background: filters.brand === 'Apple' 
                  ? theme === 'dark' ? '#ffffff' : '#000000'
                  : colors.inputBg, 
                color: filters.brand === 'Apple' 
                  ? theme === 'dark' ? '#000000' : '#ffffff'
                  : colors.text,
                border: 'none',
                cursor: 'pointer',
                fontWeight: '400',
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
              onMouseEnter={(e) => {
                if (filters.brand !== 'Apple') {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (filters.brand !== 'Apple') {
                  e.currentTarget.style.background = colors.inputBg;
                }
              }}
            >
              Apple
            </button>
            
            <button 
              onClick={() => setFilters(f => ({ ...f, brand: 'Samsung' }))} 
              style={{ 
                padding: '9px 20px', 
                borderRadius: 980, 
                background: filters.brand === 'Samsung' 
                  ? theme === 'dark' ? '#ffffff' : '#000000'
                  : colors.inputBg, 
                color: filters.brand === 'Samsung' 
                  ? theme === 'dark' ? '#000000' : '#ffffff'
                  : colors.text,
                border: 'none',
                cursor: 'pointer',
                fontWeight: '400',
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
              onMouseEnter={(e) => {
                if (filters.brand !== 'Samsung') {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (filters.brand !== 'Samsung') {
                  e.currentTarget.style.background = colors.inputBg;
                }
              }}
            >
              Samsung
            </button>
          </div>
          
          <input 
            placeholder="Buscar productos..." 
            value={filters.q || ''} 
            onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
            style={{ 
              flex: 1, 
              padding: '10px 20px', 
              borderRadius: 980, 
              border: 'none',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
              background: colors.inputBg,
              color: colors.text,
              fontWeight: '400',
              letterSpacing: '-0.01em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
            onFocus={(e) => {
              e.target.style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.background = colors.inputBg;
            }}
          />
          
          <div style={{ 
            color: colors.textMuted, 
            fontSize: '14px', 
            fontWeight: '400',
            padding: '10px 18px',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
          }}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </div>

          <button
            onClick={() => setShowSettings(true)}
            title="Configuración"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: colors.inputBg,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
              color: colors.text
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'scale(1.05) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.inputBg;
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
            </svg>
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px 6px 6px',
            background: colors.inputBg,
            borderRadius: 980,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.inputBg;
          }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: '#fff'
            }}>
              U
            </div>
            <div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: '500', 
                color: colors.text,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}>
                Usuario Mayorista
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: colors.textMuted,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}>
                Activo
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('¿Desea salir de la interfaz?')) {
                toast.success('Sesión cerrada exitosamente');
                setTimeout(() => {
                  window.location.href = '/';
                }, 1000);
              }
            }}
            title="Salir del sistema"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `1px solid ${colors.border}`,
              background: colors.inputBg,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
              color: colors.textMuted
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff3b30';
              e.currentTarget.style.borderColor = '#ff3b30';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.inputBg;
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.color = colors.textMuted;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
          
          <button 
            title="Lista de pedidos" 
            style={{ 
              padding: '10px 20px', 
              borderRadius: 980, 
              border: 'none',
              background: theme === 'dark' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              position: 'relative',
              color: theme === 'dark' ? '#000000' : '#ffffff',
              fontWeight: '400',
              fontSize: '14px',
              transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Pedidos
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: colors.accent,
                color: '#fff',
                borderRadius: '50%',
                minWidth: '20px',
                height: '20px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                padding: '0 6px',
                border: `2px solid ${colors.bgSolid}`
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <section style={{
        padding: '24px 20px 20px',
        maxWidth: '1600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          letterSpacing: '-0.04em',
          margin: '0',
          lineHeight: '1.05',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          color: colors.text,
          transition: 'color 0.3s ease'
        }}>
          IphoneCBA
        </h1>
      </section>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '280px 1fr', 
        gap: 28, 
        padding: '0 20px 40px',
        maxWidth: '1600px',
        margin: '0 auto',
        minHeight: '600px'
      }}>
        <aside style={{ 
          background: colors.sidebarBg, 
          padding: 20, 
          borderRadius: 16,
          height: 'fit-content',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          boxShadow: colors.shadow,
          border: `1px solid ${colors.border}`,
          position: 'sticky',
          top: 90,
          backdropFilter: 'saturate(180%) blur(40px)',
          WebkitBackdropFilter: 'saturate(180%) blur(40px)',
          transition: 'all 0.35s cubic-bezier(0.28, 0.11, 0.32, 1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: colors.text, 
            fontSize: '19px', 
            fontWeight: '600',
            letterSpacing: '-0.019em',
            transition: 'color 0.3s ease',
            paddingBottom: 16,
            borderBottom: `1px solid ${colors.border}`,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Filtros
          </h3>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: '13px', 
              fontWeight: '600', 
              color: colors.text,
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease'
            }}>
              Ordenar por
            </label>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '10px 14px', 
                borderRadius: 10, 
                border: `1px solid ${colors.border}`,
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: colors.inputBg,
                transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontWeight: '400',
                color: colors.text,
                letterSpacing: '-0.01em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '14px',
                paddingRight: '36px'
              }}
            >
              <option value="newest">Más nuevo</option>
              <option value="oldest">Más antiguo</option>
              <option value="cheapest">Más barato</option>
              <option value="expensive">Más caro</option>
            </select>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: '13px', 
              fontWeight: '600', 
              color: colors.text,
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease'
            }}>
              Color
            </label>
            <select 
              value={filters.color || ''} 
              onChange={e => setFilters(f => ({ ...f, color: e.target.value || undefined }))} 
              style={{ 
                width: '100%', 
                padding: '10px 14px', 
                borderRadius: 10, 
                border: `1px solid ${colors.border}`,
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: colors.inputBg,
                transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontWeight: '400',
                color: colors.text,
                letterSpacing: '-0.01em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '14px',
                paddingRight: '36px'
              }}
            >
              <option value="">Todos los colores</option>
              <option value="morado">Morado</option>
              <option value="blanco">Blanco</option>
              <option value="grafito">Grafito</option>
              <option value="azul">Azul</option>
              <option value="negro">Negro</option>
              <option value="amarillo">Amarillo</option>
            </select>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: '13px', 
              fontWeight: '600',
              color: colors.text,
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease'
            }}>
              Estado
            </label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '14px', 
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: 10,
                background: filters.condition === 'NUEVO' 
                  ? theme === 'dark' ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 113, 227, 0.08)'
                  : colors.inputBg,
                border: `1px solid ${filters.condition === 'NUEVO' ? colors.accent : colors.border}`,
                transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontWeight: '400',
                color: filters.condition === 'NUEVO' ? colors.accent : colors.text,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}>
                <input 
                  type="radio" 
                  name="cond" 
                  checked={filters.condition === 'NUEVO'}
                  onChange={() => setFilters(f => ({ ...f, condition: 'NUEVO' }))}
                  style={{ 
                    marginRight: 10,
                    accentColor: colors.accent
                  }}
                />
                Nuevo
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '14px', 
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: 10,
                background: filters.condition === 'USADO' 
                  ? theme === 'dark' ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 113, 227, 0.08)'
                  : colors.inputBg,
                border: `1px solid ${filters.condition === 'USADO' ? colors.accent : colors.border}`,
                transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
                fontWeight: '400',
                color: filters.condition === 'USADO' ? colors.accent : colors.text,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}>
                <input 
                  type="radio" 
                  name="cond" 
                  checked={filters.condition === 'USADO'}
                  onChange={() => setFilters(f => ({ ...f, condition: 'USADO' }))}
                  style={{ 
                    marginRight: 10,
                    accentColor: colors.accent
                  }}
                />
                Usado
              </label>
              {filters.condition && (
                <button 
                  onClick={() => setFilters(f => ({ ...f, condition: undefined }))} 
                  style={{ 
                    marginTop: 2, 
                    fontSize: 12, 
                    background: 'none',
                    border: 'none',
                    color: colors.textMuted,
                    cursor: 'pointer',
                    fontWeight: '500',
                    textAlign: 'left',
                    padding: '6px 0',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
          
          <button 
            onClick={clear} 
            style={{ 
              marginTop: 20, 
              padding: '10px 16px', 
              borderRadius: 10, 
              border: `1px solid ${colors.border}`,
              background: colors.inputBg,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              width: '100%',
              transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
              color: colors.textMuted,
              letterSpacing: '-0.01em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.accent;
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.inputBg;
              e.currentTarget.style.color = colors.textMuted;
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            Limpiar filtros
          </button>
        </aside>

        <main style={{ 
          display: 'grid', 
          gap: 24, 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          alignItems: 'start',
          justifyContent: 'center',
          paddingBottom: 20
        }}>
          {loading ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '80px 40px',
              color: colors.textMuted,
              fontSize: '17px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}>
              Cargando productos...
            </div>
          ) : items.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '80px 40px',
              color: colors.textMuted,
              fontSize: '17px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}>
              No se encontraron productos
            </div>
          ) : (
            items.map(p => (
              <GroupedProductCard
                key={p.baseModel}
                product={p}
                theme={theme}
                colors={colors}
                onAdd={add}
              />
            ))
          )}
        </main>
      </div>

      {showSettings && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setShowSettings(false)}
        >
          <div 
            style={{
              background: colors.cardBg,
              borderRadius: 24,
              padding: 32,
              maxWidth: 500,
              width: '90%',
              boxShadow: theme === 'dark' 
                ? '0 24px 48px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.2)' 
                : '0 24px 48px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border}`,
              animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 32,
              paddingBottom: 24,
              borderBottom: `1px solid ${colors.border}`
            }}>
              <h2 style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '-0.02em'
              }}>
                Preferencias
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: 'none',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  color: colors.text
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Opciones de Configuración */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Opción: Tema */}
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: 12,
                  letterSpacing: '-0.01em'
                }}>
                  Apariencia
                </div>
                
                {/* Toggle de Tema */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12
                }}>
                  <button
                    onClick={() => setTheme('light')}
                    style={{
                      padding: '14px 20px',
                      borderRadius: 12,
                      border: `1px solid ${theme === 'light' ? '#3b82f6' : colors.border}`,
                      background: theme === 'light' 
                        ? theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      color: theme === 'light' ? '#3b82f6' : colors.text
                    }}
                    onMouseEnter={(e) => {
                      if (theme !== 'light') {
                        e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (theme !== 'light') {
                        e.currentTarget.style.borderColor = colors.border;
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    Claro
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    style={{
                      padding: '14px 20px',
                      borderRadius: 12,
                      border: `1px solid ${theme === 'dark' ? '#3b82f6' : colors.border}`,
                      background: theme === 'dark' 
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      color: theme === 'dark' ? '#3b82f6' : colors.text
                    }}
                    onMouseEnter={(e) => {
                      if (theme !== 'dark') {
                        e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (theme !== 'dark') {
                        e.currentTarget.style.borderColor = colors.border;
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    Oscuro
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
