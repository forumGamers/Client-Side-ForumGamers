import React from "react";
import ButtonIcon from "../atom/ButtonIcon";
import {
    PhotoIcon,
    FaceSmileIcon,
    PaperAirplaneIcon
  } from "@/components/icon";

const TypeMsg = () => {
    return (
        <div className="flex flex-row gap-3">
        <ButtonIcon icon={<PhotoIcon className="text-blue-600 h-6 w-6"/>}/>
        <ButtonIcon icon={<FaceSmileIcon className="text-blue-600 h-6 w-6"/>}/>
        <div className="form-control relative">
            <input type="text" placeholder="Type Your Message" className="input input-bordered text-gray-600 w-24 bg-gray-300 md:w-auto pl-8" />
        </div>
        <ButtonIcon icon={<PaperAirplaneIcon className="text-blue-600 h-6 w-6"/>}/>
        </div>
    )
}

export default TypeMsg;