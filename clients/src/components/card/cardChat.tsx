"use client";
import { Card, CardHeader, CardFooter, Typography, CardBody } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import RoomCht from "../organ/RoomCht";
import { timeLine } from "@/interfaces/post";
import { CustomSession } from "@/interfaces/global";
import { useRouter } from "next/navigation";
// import "@/styles/components/roomcht.css";
import React, { useState } from 'react'; // Import useState

// interface Chat {
//     id: number;
//     senderName: string;
//     senderAvatar: string;
//     messagePreview: string;
//     time: string;
//   }
  
//   const CardChat: React.FC<{ chat: Chat }> = ({ chat }) => {
//     return (
//       <Card
//         color="transparent"
//         shadow={false}
//         className="block w-full max-w-[20rem] h-[35rem] p-3 mt-12 bg-[#030712] border border-white/50 fixed bottom-0"
//       >
//         <CardHeader
//           color="transparent"
//           floated={false}
//           shadow={false}
//           className="relative mx-0 flex-col items-start mt-1 p-2"
//         >
//           <div className="flex items-center">
//           <div className="chat-room"> {/* Gunakan kelas .chat-room */}
//             <div className="chat-container"> {/* Gunakan kelas .chat-container */}
//              <div className="room-chat"> {/* Gunakan kelas .room-chat */}
//             <div className="chat-header"> {/* Gunakan kelas .chat-header */}
//             <div className="sender-info"> {/* Gunakan kelas .sender-info */}
//               <img className="sender-avatar" src={chat.senderAvatar} alt={`${chat.senderName}'s Avatar`} /> {/* Gunakan kelas .sender-avatar */}
//               <span className="sender-name">{chat.senderName}</span> {/* Gunakan kelas .sender-name */}
//             </div>
//             <span className="message-time">{chat.time}</span> {/* Gunakan kelas .message-time */}
//             </div>
//           <div className="chat-body"> {/* Gunakan kelas .chat-body */}
//             <p className="message-preview">{chat.messagePreview}</p> {/* Gunakan kelas .message-preview */}
//           </div>
//         </div>
//       </div>
//     </div>
//           </div>
//         </CardHeader>
//       </Card>
//     );
//   };


//   export default function CardChatWrapper({
//     session,
//   }: {
//     session: CustomSession | null;
//   }): JSX.Element {
//     const initialChat: Chat = {
//       id: 0,
//       senderName: "siapa aja",
//       senderAvatar: "",
//       messagePreview: "apa kabar",
//       time: "",
//     };
    
//     const [selectedChat, setSelectedChat] = useState<Chat>(initialChat);
  
//     return (
//       <div>
//         {/* Render the CardChat component */}
//         <CardChat chat={selectedChat} />
//       </div>
//     );
//   }

export default function CardCht({
    session,
  }: {
    session: CustomSession | null;
  }): JSX.Element {
  
    interface Chat {
      id: number;
      senderName: string;
      senderAvatar: string;
      messagePreview: string;
      time: string;
    }
    
    const [selectedChat, setSelectedChat] = useState < Chat | null>(null);
    
    return (
      <>
        <Card
          color="transparent"
          shadow={false}
          className="block w-full max-w-[45rem] h-[35rem] p-3 mt-12 bg-[#030712] border border-white/50 fixed bottom-0"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="relative mx-0 flex-col items-start mt-1 p-2"
          >
            <div className="flex flex-1 flex-row space-between">
            <Typography className="text-white text-base font-medium">
              Messages
            </Typography>
            <div className="flex flex-1 flex-row justify-end gap-2">
            </div>
            </div>
            <div className="items-center mt-5">
            {/* <button className="btn btn-ghost flex justify-start gap-1 text-white/50 bg-[#16181C] w-full rounded-2xl">
              <MagnifyingGlassIcon className="h-6 w-6 text-white/50" /> 
              <span className="text-left" style={{ textTransform: "none"}}>Search Message</span>
            </button> */}
            </div>
          </CardHeader>
        </Card>
      </>
    );
  }