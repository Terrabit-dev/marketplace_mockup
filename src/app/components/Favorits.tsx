import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
}

const mockProducts: Product[] = [
  { id: 1, title: 'Llavors de Blat de Moro Premium', price: 45.50, location: 'Lleida - Segrià', image: 'src/img/maiz.jpg' },
  { id: 5, title: 'Eines de Jardineria', price: 75.00, location: 'Lleida - Noguera', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
];

interface FavoritsProps {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

export default function Favorits({ favorites, toggleFavorite }: FavoritsProps) {
  const navigate = useNavigate();

  const favoriteProducts = mockProducts.filter(p => favorites.has(p.id));

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe">
        <div className="bg-gradient-to-br from-primary to-primary/90 px-5 pt-3 pb-8">
          <h1 className="text-white mb-1">Els meus Favorits</h1>
          <p className="text-white/90 text-[15px]">{favorites.size} productes guardats</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-xl overflow-hidden shadow-sm active:scale-98 transition-transform cursor-pointer relative"
                onClick={() => navigate(`/producte/${product.id}`)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md z-10 active:scale-90 transition-transform"
                >
                  <Heart className="w-[18px] h-[18px] fill-red-500 text-red-500" strokeWidth={2} />
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <p className="text-[20px] text-primary mb-1">{product.price.toFixed(2)}€</p>
                  <h3 className="text-[15px] mb-1 line-clamp-2 leading-snug">{product.title}</h3>
                  <p className="text-[13px] text-muted-foreground">{product.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" strokeWidth={2} />
            </div>
            <h3 className="text-[22px] mb-2">No tens favorits</h3>
            <p className="text-[15px] text-muted-foreground mb-6">
              Guarda productes per veure'ls aquí
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-3 rounded-xl active:scale-98 transition-transform"
            >
              Explorar productes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
