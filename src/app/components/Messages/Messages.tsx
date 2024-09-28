import { SHARED_CHAT_ID, SUGGESTED_PROMPTS } from "@/utils/constant";
import { TMessage } from "@/utils/types";
import { Box, Flex } from "@mantine/core";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import SuggestedPrompt from "../SuggestedPrompt";
import BotTyping from "./BotTyping";
import Message from "./Message";

type Props = {
  initialMessages: TMessage[];
};

const Messages = ({ initialMessages }: Props) => {
  const messageListContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
    initialMessages,
  });

  const hasMessages = messages.length > 0;
  const userLatestMessage = messages[messages.length - 1];
  const botIsTyping =
    isLoading && userLatestMessage && userLatestMessage.role === "user";

  useEffect(() => {
    const messageListContainer = messageListContainerRef.current;
    if (messageListContainer) {
      messageListContainer.scrollTo(0, messageListContainer.scrollHeight);
    }
  }, [messages]);

  return (
    <Box
      p="sm"
      ref={messageListContainerRef}
      flex={1}
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        "::WebkitScrollbar": {
          width: 0,
          height: 0,
        },
      }}
    >
      <Flex
        h="100%"
        direction="column"
        align={!hasMessages ? "flex-end" : undefined}
        justify={!hasMessages ? "flex-end" : undefined}
        gap="sm"
      >
        {hasMessages
          ? messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          : SUGGESTED_PROMPTS.map((prompt, index) => (
              <SuggestedPrompt key={index} prompt={prompt} />
            ))}

        {botIsTyping && <BotTyping />}
      </Flex>
    </Box>
  );
};

export default Messages;
