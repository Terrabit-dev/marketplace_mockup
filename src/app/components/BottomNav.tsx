import { useNavigate, useLocation } from 'react-router';
import { Home, Heart, Camera, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Inici' },
    { path: '/favorits', icon: Heart, label: 'Favorits' },
    { path: '/vendre', icon: Camera, label: 'Vendre' },
    { path: '/buzon', icon: MessageCircle, label: 'Buzón' },
    { path: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-t border-border/50 fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="flex justify-around items-center h-20 pt-2 max-w-[430px] mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === '/buzon' && location.pathname.startsWith('/chat'));
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-105' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
