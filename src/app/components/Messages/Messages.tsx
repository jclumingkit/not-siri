import useChatService from "@/hooks/useChatService";
import { SUGGESTED_PROMPTS } from "@/utils/constant";
import { Box, Flex } from "@mantine/core";
import { useEffect, useRef } from "react";
import SuggestedPrompt from "../SuggestedPrompt";
import BotTyping from "./BotTyping";
import Message from "./Message";

const Messages = () => {
  const { isInitialized } = useChatService();
  const messageListContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useChatService();

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
        {isInitialized &&
          (hasMessages
            ? messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            : SUGGESTED_PROMPTS.map((prompt, index) => (
                <SuggestedPrompt key={index} prompt={prompt} />
              )))}
        {botIsTyping && <BotTyping />}
      </Flex>
    </Box>
  );
};

export default Messages;
