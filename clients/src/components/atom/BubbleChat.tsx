import React from "react";
import 'tailwindcss/tailwind.css';


interface BubbleChatProps {
    type: 'sent' | 'received';
    children: React.ReactNode;
}
const BubbleChat: React.FC<BubbleChatProps> = ({ type, children}) => {
    const bgColorClass = type === 'sent' ? 'bg-gray-200' : 'bg-blue-600';
    const textColorClass = type === 'sent' ? 'text-black' : 'text-white';
    const alignClass = type === 'sent' ? 'justify-end' : 'justify-start';
    
    return (
      <div className={`p-3 rounded-lg ${bgColorClass} ${textColorClass} ${alignClass}` } style={{ maxWidth: '18rem', maxHeight: 'auto', overflow: 'auto'}}>
        {children}
      </div>
    );
  }
  
  
  export default BubbleChat;
  