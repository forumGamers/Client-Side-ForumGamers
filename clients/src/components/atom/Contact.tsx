import React from "react";

interface Contactprops {
    senderName: string;
    senderAvatar: string;
    // onClick: () => void;
  }

const Contact: React.FC<Contactprops> = ({senderName, senderAvatar }) => {
    return (
        <div className="chat-preview">
        <div className="sender-info gap-3">
         <img className="sender-avatar w-8 h-8 rounded-full" src={senderAvatar} alt={`${senderName}'s Avatar`} />
          <p className="sender-name h-8">{senderName}</p>
        </div>
      </div>
    )
}

export default Contact;