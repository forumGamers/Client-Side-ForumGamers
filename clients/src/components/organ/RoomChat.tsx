"use client";
import { Card, CardHeader, CardFooter, Typography, CardBody } from "@/components/material-tailwind";
import ChatTab from "../mollecul/ChatTab";
import Contact from "../atom/Contact";
import ButtonIcon from "../atom/ButtonIcon";
import Chat from "../mollecul/Chat";
import TypeMsg from "../mollecul/TypeMsg";
import { blankProfile } from "@/constants";
import {XMarkIcon} from "@/components/icon";
import { CustomSession } from "@/interfaces/global";
import "@/styles/components/cardmsg.css";
import React, { useState } from 'react'; // Import useState
import 'tailwindcss/tailwind.css';

export default function RoomChat({
  session,
}: {
  session: CustomSession | null;
}): JSX.Element {

  // interface Chat {
  //   id: number;
  //   senderName: string;
  //   senderAvatar: string;
  //   messagePreview: string;
  //   time: string;
  // }
  
  // const [selectedChat, setSelectedChat] = useState < Chat | null>(null);

  const [isExpanded, setExpanded] = useState(false);

  const toggleSize = () => {
    setExpanded(prevState => !prevState);
  };
  
  
  return (
    <>
     {!isExpanded && (
    <div className="w-full relative max-w-[25rem] h-[33rem] p-5 pt-2 bg-[#030712] rounded-tl-lg rounded-tr-lg border border-white/50">
    <div className="flex flex-1 flex-row justify-between">
          <Contact
            senderAvatar={blankProfile}
            senderName="Nurul"
           />
           <ButtonIcon icon={<XMarkIcon className="text-white h-6 w-6" />} onClick={toggleSize} >
           </ButtonIcon>
    </div>
          <div className="w-full mt-5 mb-5">
            <Chat/>
          </div>
          <div className="absolute bottom-0 w-full left-0 p-3">
              <TypeMsg/>
          </div>
    </div>
    )}
    </>
  );
}
