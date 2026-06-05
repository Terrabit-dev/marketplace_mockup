import { ArrowLeft, Heart, Share2, MessageCircle, Phone, MapPin, Star, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

const mockProductDetails = {
  1: {
    title: 'Llavors de Blat de Moro Premium',
    price: 45.50,
    location: 'Lleida - Segrià',
    seller: 'Joan Martínez',
    sellerRating: 4.8,
    sellerAds: 12,
    description: 'Llavors de blat de moro d\'alta qualitat, varietat híbrida resistent a sequera. Perfectes per a sembra a primavera. Rendiment excel·lent i adaptabilitat a diferents tipus de sòl. Sac de 25kg.',
    shipping: 'Recollida en persona obligatòria',
    images: [
      'https://images.unsplash.com/photo-1617450365226-5e0c6b6e8c9a?w=800',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    ],
  },
  2: {
    title: 'Tractor Compacte Usat',
    price: 8500.00,
    location: 'Girona - Alt Empordà',
    seller: 'Granja Els Olivers',
    sellerRating: 5.0,
    sellerAds: 8,
    description: 'Tractor compacte en excel·lent estat. 1200 hores d\'ús. Motor dièsel. Inclou pala frontal i rotavator. Revisió recent completada. Ideal per a finques petites i mitjanes.',
    shipping: 'Només recollida presencial',
    images: [
      'https://images.unsplash.com/photo-1530267981375-f0d9572e6a6e?w=800',
      'https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800',
    ],
  },
};

interface ProducteDetallProps {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

export default function ProducteDetall({ favorites, toggleFavorite }: ProducteDetallProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = mockProductDetails[productId as keyof typeof mockProductDetails] || mockProductDetails[1];

  return (
    <div className="flex-1 flex flex-col pb-32 overflow-y-auto bg-background">
      {/* iOS Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-20 pt-safe">
        <div className="flex items-center justify-between px-4 h-11">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary active:opacity-60 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-[17px]">Enrere</span>
          </button>
          <div className="flex gap-4">
            <button className="active:opacity-60 transition-opacity">
              <Share2 className="w-[22px] h-[22px] text-primary" strokeWidth={2} />
            </button>
            <button
              onClick={() => toggleFavorite(productId)}
              className="active:opacity-60 transition-opacity"
            >
              <Heart
                className={`w-[22px] h-[22px] ${
                  favorites.has(productId)
                    ? 'fill-red-500 text-red-500'
                    : 'text-primary'
                }`}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative bg-black">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Price & Title */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h1 className="text-[22px] mb-2 leading-tight">{product.title}</h1>
          <p className="text-[32px] text-primary">{product.price.toFixed(2)}€</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[17px] mb-2">Descripció</h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Location & Shipping */}
        <div className="bg-white rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
            <div className="flex-1">
              <p className="text-[13px] text-muted-foreground mb-1">Ubicació de recollida</p>
              <p className="text-[15px] mb-3">{product.location}</p>
              <div className="bg-muted/50 rounded-xl p-3 text-[15px] text-foreground">
                {product.shipping}
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[13px] text-muted-foreground mb-3">Venedor</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[20px] text-primary">{product.seller[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-[17px] mb-1">{product.seller}</p>
              <div className="flex items-center gap-2 text-[15px]">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="text-muted-foreground">{product.sellerRating}</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{product.sellerAds} anuncis</span>
              </div>
            </div>
          </div>
          <button className="w-full py-3 text-[17px] text-primary font-semibold active:opacity-60 transition-opacity">
            Veure més anuncis
          </button>
        </div>

        {/* Trust Note */}
        <div className="bg-muted/30 rounded-2xl p-4 text-[13px] text-muted-foreground text-center leading-relaxed">
          Tots els acords i pagaments es realitzen directament entre comprador i venedor
        </div>
      </div>

      {/* Bottom Action Buttons - iOS style */}
      <div className="fixed bottom-0 left-0 right-0 pb-safe z-30">
        <div className="bg-white/80 backdrop-blur-xl border-t border-border/50 p-4 max-w-[430px] mx-auto">
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/chat/${productId}`)}
              className="flex-1 bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[17px]">Xatejar</span>
            </button>
            <button className="flex-1 bg-white text-secondary border-2 border-secondary py-4 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-transform">
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[17px]">Trucar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
