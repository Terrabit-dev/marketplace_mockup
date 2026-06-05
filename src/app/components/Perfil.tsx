import { Settings, Package, ShoppingBag, Heart, ChevronRight, LogOut, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

const menuItems = [
  { icon: Settings, label: 'Configuració del Compte', color: 'text-primary' },
  { icon: Package, label: 'Les meves Vendes (Anuncis Actius)', badge: '3', color: 'text-secondary' },
  { icon: TrendingUp, label: 'Les meves Vendes (Venuts)', color: 'text-primary' },
  { icon: ShoppingBag, label: 'Les meves Compres (Negociacions Actives)', badge: '2', color: 'text-secondary' },
  { icon: Heart, label: 'Llista de Favorits', color: 'text-primary' },
];

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe">
        <div className="bg-gradient-to-br from-primary to-primary/90 px-5 pt-3 pb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[32px] text-primary">
              M
            </div>
            <div className="text-white flex-1">
              <h1 className="text-[28px] mb-1">Maria Soler</h1>
              <p className="text-[15px] opacity-90">Dones del Món Rural</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[28px] text-white mb-1">8</p>
              <p className="text-[13px] text-white/80">Venuts</p>
            </div>
            <div className="text-center border-l border-r border-white/20">
              <p className="text-[28px] text-white mb-1">5</p>
              <p className="text-[13px] text-white/80">Compres</p>
            </div>
            <div className="text-center">
              <p className="text-[28px] text-white mb-1">12</p>
              <p className="text-[13px] text-white/80">Favorits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-3 -mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm active:scale-98 transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl ${
                index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'
              } flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${item.color}`} strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[17px]">{item.label}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-secondary text-white text-[13px] min-w-[22px] h-5 px-2 rounded-full flex items-center justify-center font-semibold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-4 mt-3">
        <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm text-destructive active:scale-98 transition-transform">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-6 h-6 text-destructive" strokeWidth={2} />
          </div>
          <span className="text-[17px]">Tancar Sessió</span>
        </button>
      </div>

      {/* App Version */}
      <div className="text-center pt-6 pb-4">
        <p className="text-[13px] text-muted-foreground">Versió 1.0.0</p>
      </div>
    </div>
  );
}
