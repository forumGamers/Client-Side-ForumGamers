"use client";
import { Card, CardHeader, CardFooter, Typography, CardBody } from "@/components/material-tailwind";
import ChatTab from "../mollecul/ChatTab";
import ButtonIcon from "../atom/ButtonIcon";
import { blankProfile } from "@/constants";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon
} from "@/components/icon";import { Avatar } from "@/components/material-tailwind";

import { timeLine } from "@/interfaces/post";
import { CustomSession } from "@/interfaces/global";
import { useRouter } from "next/navigation";
import "@/styles/components/cardmsg.css";
import React, { useState } from 'react'; // Import useState
import 'tailwindcss/tailwind.css';

export default function CardMsg({
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

  const [isExpanded, setExpanded] = useState(false);

  const toggleSize = () => {
    setExpanded(prevState => !prevState);
  };
  
  const [selectedChat, setSelectedChat] = useState < Chat | null>(null);
  
  return (
    <>
    <div className={`w-full relative max-w-[20rem] ${isExpanded ? 'h-33rem' : 'h-5rem'} p-5 pt-6 bg-[#030712] rounded-tl-lg rounded-tr-lg border border-white/50 `}>
    <div className="flex flex-1 flex-row space-between">
          <Typography className="text-white text-base font-medium">
            Messages
          </Typography>
          <div className="flex flex-1 flex-row justify-end gap-2">
          <ButtonIcon icon={<PencilSquareIcon className="text-white h-6 w-6" />}>
          </ButtonIcon>
          <ButtonIcon icon={isExpanded ? <ChevronUpIcon className="text-white h-6 w-6" /> : <ChevronDownIcon className="text-white h-6 w-6" />} onClick={toggleSize}>
          </ButtonIcon>
          </div>
          </div>
          {!isExpanded && (
            <>
              <div className="items-center mt-5">
                <div className="form-control relative">
                  <input type="text" placeholder="Search Message" className="input in5put-bordered w-24 bg-[#16181C] md:w-auto pl-8" />
                  <MagnifyingGlassIcon className="h-6 w-6 text-white/50 absolute left-2 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              <div className="mt-3">
                  <ChatTab onChatClick={setSelectedChat} chats={[]} /> 
              </div>
            </>
          )}
    </div>
    </>
  );
}
