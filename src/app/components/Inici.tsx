import { Search, SlidersHorizontal, Heart } from 'lucide-react';
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
  { id: 2, title: 'Tractor Compacte Usat', price: 8500.00, location: 'Girona - Alt Empordà', image: 'src/img/tractor.jpg' },
  { id: 3, title: 'Sistema de Reg Automàtic', price: 320.00, location: 'Tarragona - Baix Camp', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
  { id: 4, title: 'Fertilitzant Orgànic 50kg', price: 28.90, location: 'Barcelona - Bages', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' },
  { id: 5, title: 'Eines de Jardineria', price: 75.00, location: 'Lleida - Noguera', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
  { id: 6, title: 'Llavors de Gira-sol 10kg', price: 35.00, location: 'Girona - Selva', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400' },
  { id: 7, title: 'Arada Manual', price: 120.00, location: 'Tarragona - Ribera d\'Ebre', image: 'src/img/arada.jpg' },
  { id: 8, title: 'Hivernacle 20m²', price: 890.00, location: 'Barcelona - Maresme', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
  { id: 9, title: 'Adob Compost Natural', price: 22.50, location: 'Lleida - Urgell', image: 'src/img/compost.jpg' },
  { id: 10, title: 'Motoserra Professional', price: 280.00, location: 'Girona - Ripollès', image: 'src/img/motosierra.jpg' },
  { id: 11, title: 'Cistella de Recollida', price: 15.00, location: 'Barcelona - Vallès Occidental', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400' },
  { id: 12, title: 'Collita d\'Oliveres', price: 450.00, location: 'Tarragona - Terra Alta', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
];

const categories = [
  { id: 1, name: 'Eines', icon: '🔧' },
  { id: 2, name: 'Cultius', icon: '🌾' },
  { id: 3, name: 'Forratges', icon: '🌿' },
  { id: 4, name: 'Fertilitzants', icon: '🧪' },
  { id: 5, name: 'Tractor', icon: '🚜' },
  { id: 6, name: 'Reg', icon: '💧' },
];

interface IniciProps {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

export default function Inici({ favorites, toggleFavorite }: IniciProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header with status bar spacing */}
      <div className="pt-safe">
        <div className="bg-gradient-to-br from-primary to-primary/90 px-5 pt-3 pb-8">
          <h1 className="text-white mb-1">Benvingut/da!</h1>
          <p className="text-white/90 text-[15px]">Marketplace de Dones del Món Rural</p>
        </div>

        {/* Search Bar */}
        <div className="px-4 -mt-6 mb-4">
          <div className="bg-white rounded-xl shadow-lg flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Cercar productes agrícoles..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button className="ml-2 p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl active:scale-95 transition-transform">
                  {category.icon}
                </div>
                <span className="text-xs text-foreground">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm active:scale-98 transition-transform cursor-pointer relative"
              onClick={() => navigate(`/producte/${product.id}`)}
            >
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md z-10 active:scale-90 transition-transform"
              >
                <Heart
                  className={`w-[18px] h-[18px] ${
                    favorites.has(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-500'
                  }`}
                  strokeWidth={2}
                />
              </button>

              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <p className="text-[20px] text-primary mb-1">{product.price.toFixed(2)}€</p>
                <h3 className="text-[15px] mb-1 line-clamp-2 text-foreground leading-snug">{product.title}</h3>
                <p className="text-[13px] text-muted-foreground">{product.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
