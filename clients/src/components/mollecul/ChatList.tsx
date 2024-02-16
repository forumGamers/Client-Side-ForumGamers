// ChatList.js
import React from 'react';
import ChatPreview from '../atom/ChatPreview';
import "@/styles/components/cardmsg.css";
import { blankProfile } from '@/constants';

interface Chat {
  id: number;
  senderName: string;
  senderAvatar: string;
  messagePreview: string;
  time: string;
}

interface ChatListProps {
  chats: Chat[]; 
  onChatClick: (chat: Chat) => void;
}

const truncateMessagePreview = (messagePreview: string): string => {
  const words = messagePreview.split(' ');
  if (words.length > 5) {
    return words.slice(0, 5).join(' ') + '...';
  } else {
    return messagePreview;
  }
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatClick }) => {
  // Data dummy untuk chat preview
  const dummyChats: Chat[] = [
    {
      id: 1,
      senderName: "John Doe",
      senderAvatar: blankProfile,
      messagePreview: "Hello, how are you?",
      time: "10:00 AM"
    },
    {
      id: 2,
      senderName: "Alice Smith",
      senderAvatar: blankProfile,
      messagePreview: "Hi, I'm doing fine. What about you?",
      time: "10:15 AM"
    },
    {
      id: 3,
      senderName: "Bob Johnson",
      senderAvatar: blankProfile,
      messagePreview: "I'm good too, thanks for asking!",
      time: "10:30 AM"
    }
  ];

  return (
    <div className="chat-list">
      {dummyChats.map(chat => (
        <ChatPreview
          key={chat.id}
          senderName={chat.senderName}
          senderAvatar={chat.senderAvatar}
          messagePreview={truncateMessagePreview(chat.messagePreview)}
          time={chat.time}
          onClick={() => onChatClick(chat)}
        />
      ))}
    </div>
  );
};

export default ChatList;
