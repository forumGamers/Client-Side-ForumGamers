import React from "react";
import BubbleChat from "../atom/BubbleChat";

const Chat = () => {
    return (
        <div className="flex flex-col gap-5">
            <div style={{ marginRight: 0 }}>
                <BubbleChat type="sent">
                    Hello, I'm interested in your product.
                </BubbleChat>
            </div>
            <div style={{ marginLeft: 0 }}>
                <BubbleChat type="received">
                    Sure, please provide more details.
                    I'm working on it.
                </BubbleChat>
            </div>
        </div>
    )
}

export default Chat;