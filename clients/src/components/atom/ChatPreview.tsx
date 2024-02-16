// ChatPreview.js
import React from 'react';

interface ChatPreviewProps {
  senderName: string;
  senderAvatar: string;
  messagePreview: string;
  time: string;
  onClick: () => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ senderName, senderAvatar, messagePreview, time, onClick }) => (
  <div className="chat-preview" onClick={onClick}>
    <div className="sender-info gap-3">
     <img className="sender-avatar w-10 h-10 rounded-full" src={senderAvatar} alt={`${senderName}'s Avatar`} />
      <p className="sender-name h-10">{senderName}</p>
    </div>
    <div className="message-info mt-3">
      <p className="message-preview">{messagePreview}</p>
      <p className="message-time">{time}</p>
    </div>
  </div>
);

export default ChatPreview;
