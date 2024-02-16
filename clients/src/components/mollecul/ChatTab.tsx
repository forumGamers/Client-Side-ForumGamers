// ChatTab.js
"use client";
import React, { useState } from 'react';
import ChatList from './ChatList';
import TypeMsg from './TypeMsg';
import "@/styles/components/cardmsg.css";

interface Chat {
  id: number;
  senderName: string;
  senderAvatar: string;
  messagePreview: string;
  time: string;
}

interface ChatTabProps {
  chats: Chat[];
  onChatClick: (chat: Chat | null) => void; 
}

const ChatTab: React.FC<ChatTabProps>  = ({ chats, onChatClick }) => {
  const [currentTab, setCurrentTab] = useState<'chat' | 'group'>('chat');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);


  const handleTabChange = (tab: 'chat' | 'group') => {
    setCurrentTab(tab);
    setSelectedChat(null); // Reset selected chat when changing the tab
  };

  const handleChatClick =  (chat: Chat | null)  => {
    setSelectedChat(chat);
    onChatClick(chat); // Panggil properti onChatClick saat chat diklik
  };

  return (
    <div className="tab-container">
      <div className={`tab-bar ${currentTab === 'chat' ? 'active' : ''}`} onClick={() => handleTabChange('chat')}>
        Chat
      </div>
      <div className={`tab-bar ${currentTab === 'group' ? 'active' : ''}`} onClick={() => handleTabChange('group')}>
        Group
      </div>
      <ChatList chats={chats} onChatClick={handleChatClick} />
      {/* {selectedChat && <RoomCht chat={selectedChat} />} */}
    </div>
  );
};

export default ChatTab;;
