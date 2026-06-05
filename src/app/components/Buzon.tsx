import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ChatPreview {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

const mockChats: ChatPreview[] = [
  {
    id: 1,
    name: 'Joan Martínez',
    lastMessage: 'Sí, encara està disponible',
    time: '10:30',
    unread: 2,
    avatar: 'J',
  },
  {
    id: 2,
    name: 'Maria García',
    lastMessage: 'Puc venir demà al matí?',
    time: 'Ahir',
    unread: 0,
    avatar: 'M',
  },
  {
    id: 3,
    name: 'Granja Els Olivers',
    lastMessage: 'Puc fer una rebaixa si véns avui',
    time: 'Dl',
    unread: 1,
    avatar: 'G',
  },
  {
    id: 4,
    name: 'Carles Ruiz',
    lastMessage: 'Perfecte, ens veiem demà',
    time: 'Dg',
    unread: 0,
    avatar: 'C',
  },
  {
    id: 5,
    name: 'Anna Soler',
    lastMessage: 'Quin és el preu final?',
    time: 'Ds',
    unread: 0,
    avatar: 'A',
  },
];

export default function Buzon() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe">
        <div className="bg-gradient-to-br from-primary to-primary/90 px-5 pt-3 pb-8">
          <h1 className="text-white mb-4">Buzón</h1>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Cercar conversacions..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 bg-white -mt-4 rounded-t-3xl">
        <div className="pt-2">
          {mockChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className={`px-4 py-3 flex gap-3 active:bg-muted/30 transition-colors cursor-pointer ${
                index < mockChats.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-[20px] font-semibold">
                {chat.avatar}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[17px] truncate font-semibold">{chat.name}</h3>
                  <span className="text-[15px] text-muted-foreground flex-shrink-0 ml-2">
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[15px] text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="bg-secondary text-white text-[13px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center flex-shrink-0 ml-2 font-semibold">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
