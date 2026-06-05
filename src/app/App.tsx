import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Inici from './components/Inici';
import Favorits from './components/Favorits';
import Vendre from './components/Vendre';
import Buzon from './components/Buzon';
import Perfil from './components/Perfil';
import ProducteDetall from './components/ProducteDetall';
import Chat from './components/Chat';
import BottomNav from './components/BottomNav';

export default function App() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 5]));

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <BrowserRouter>
      <div className="size-full flex flex-col bg-background max-w-[430px] mx-auto">
        <Routes>
          <Route path="/" element={<Inici favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorits" element={<Favorits favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/vendre" element={<Vendre />} />
          <Route path="/buzon" element={<Buzon />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/producte/:id" element={<ProducteDetall favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
