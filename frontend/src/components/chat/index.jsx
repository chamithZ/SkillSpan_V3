import React from "react";
import {
    useMultiChatLogic,
    MultiChatSocket,
    MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";
import AiAssist from "../customMessageForms/AiAssist";

const Chat = () => {
    const chatProps = useMultiChatLogic(
        "24054874-56d4-4802-9b8d-7c03d6d8cfff",
        "testuser",
        "1234"
    );

    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <Header chat={chat} />}
                renderMessageForm={(props) => {
                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />;
                    }
                    if (chatProps.chat?.title.startsWith("AiCode_")) {
                        return (
                            <AiCode props={props} activeChat={chatProps.chat} />
                        );
                    }
                    if (chatProps.chat?.title.startsWith("AiAssist_")) {
                        return (
                            <AiAssist
                                props={props}
                                activeChat={chatProps.chat}
                            />
                        );
                    }

                    return (
                        <StandardMessageForm
                            props={props}
                            activeChat={chatProps.chat}
                        />
                    );
                }}
            />
        </div>
    );
};

export default Chat;
