import { ChevronLeft, Send, Paperclip, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Hola, encara està disponible el producte?', sender: 'me', time: '10:15' },
  { id: 2, text: 'Sí, encara està disponible', sender: 'other', time: '10:18' },
  { id: 3, text: 'Quan puc venir a veure\'l?', sender: 'me', time: '10:20' },
  { id: 4, text: 'Demà a la tarda estaré a la granja', sender: 'other', time: '10:25' },
  { id: 5, text: 'A partir de quina hora?', sender: 'me', time: '10:27' },
  { id: 6, text: 'Des de les 16:00h', sender: 'other', time: '10:30' },
  { id: 7, text: 'Perfecte, ens veiem demà doncs!', sender: 'me', time: '10:32' },
];

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages] = useState(mockMessages);

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* iOS Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border/50 pt-safe sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 h-11">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary active:opacity-60 transition-opacity -ml-2"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-[17px] font-semibold">
            J
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] truncate font-semibold">Joan Martínez</h3>
            <p className="text-[13px] text-muted-foreground">Actiu fa 5 min</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="text-[13px] text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            Avui
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-[20px] ${
                msg.sender === 'me'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-white rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="text-[17px] leading-snug">{msg.text}</p>
              <p
                className={`text-[13px] mt-1 ${
                  msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-border/50 p-3 pb-safe">
        <div className="flex gap-2 items-end">
          <div className="flex gap-2">
            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground active:opacity-60 transition-opacity">
              <Paperclip className="w-5 h-5" strokeWidth={2} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground active:opacity-60 transition-opacity">
              <MapPin className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 bg-input-background rounded-[20px] px-4 py-2 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Missatge..."
              className="flex-1 bg-transparent outline-none text-[17px]"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
