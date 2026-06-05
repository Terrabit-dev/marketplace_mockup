import { ChevronLeft, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Vendre() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: 'Lleida - Segrià',
    shipping: '',
  });

  const handleImageUpload = () => {
    const mockImage = `https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&t=${Date.now()}`;
    if (images.length < 6) {
      setImages([...images, mockImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const canProceed = () => {
    if (step === 1) return images.length > 0;
    if (step === 2) return formData.title && formData.description && formData.price && formData.category;
    if (step === 3) return formData.location;
    return true;
  };

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto bg-background">
      {/* iOS Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10 pt-safe">
        <div className="flex items-center justify-between px-4 h-11">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary active:opacity-60 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-[17px]">Cancel·lar</span>
          </button>
          <h2 className="text-[17px] font-semibold">Vendre Producte</h2>
          <div className="w-20" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all ${
                  s === step
                    ? 'bg-primary text-white scale-110'
                    : s < step
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`w-8 h-0.5 transition-all ${
                    s < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-4">
        {/* Step 1: Photos */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[20px] mb-4">Afegeix fotos del producte</h3>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={img} alt={`Producte ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-[11px] px-2 py-1 rounded-md font-semibold">
                      Principal
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square bg-muted rounded-xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Camera className="w-7 h-7 text-muted-foreground" strokeWidth={2} />
                  <span className="text-[11px] text-muted-foreground font-medium">Afegir</span>
                </button>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground mt-3">
              Màxim 6 fotos. La primera imatge serà la principal.
            </p>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="title" className="block mb-2 text-[15px] text-muted-foreground">Títol</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Llavors de Blat de Moro Premium"
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px]"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="category" className="block mb-2 text-[15px] text-muted-foreground">Categoria</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px]"
              >
                <option value="">Seleccionar categoria</option>
                <option value="llavors">Llavors i Cultius</option>
                <option value="eines">Eines</option>
                <option value="maquinaria">Maquinària</option>
                <option value="fertilitzants">Fertilitzants</option>
                <option value="reg">Sistemes de Reg</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="price" className="block mb-2 text-[15px] text-muted-foreground">Preu (€)</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px]"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="description" className="block mb-2 text-[15px] text-muted-foreground">Descripció</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descriu el teu producte en detall..."
                rows={5}
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px] resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="location" className="block mb-2 text-[15px] text-muted-foreground">Ubicació</label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px]"
              >
                <option value="Lleida - Segrià">Lleida - Segrià</option>
                <option value="Girona - Alt Empordà">Girona - Alt Empordà</option>
                <option value="Tarragona - Baix Camp">Tarragona - Baix Camp</option>
                <option value="Barcelona - Bages">Barcelona - Bages</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label htmlFor="shipping" className="block mb-2 text-[15px] text-muted-foreground">
                Preferències de l'enviament o recollida
              </label>
              <textarea
                id="shipping"
                value={formData.shipping}
                onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                placeholder="Ex: Només recollida al cap de setmana, disponible entre 10h-18h"
                rows={3}
                className="w-full bg-input-background rounded-xl px-4 py-3 outline-none text-[17px] resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-[20px]">Revisió final</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Títol</p>
                <p className="text-[17px]">{formData.title}</p>
              </div>
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Preu</p>
                <p className="text-[24px] text-primary">{formData.price}€</p>
              </div>
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Categoria</p>
                <p className="text-[17px]">{formData.category}</p>
              </div>
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Ubicació</p>
                <p className="text-[17px]">{formData.location}</p>
              </div>
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Fotos</p>
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-white text-foreground py-4 rounded-xl active:scale-98 transition-transform shadow-sm"
            >
              Enrere
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-transform shadow-sm"
            >
              Següent
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-4 rounded-xl active:scale-98 transition-transform shadow-sm"
            >
              Publicar l'Anunci
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
