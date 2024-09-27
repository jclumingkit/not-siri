"use client";

import { SHARED_CHAT_ID, SUGGESTED_PROMPTS } from "@/utils/constant";
import {
  Affix,
  Box,
  Card,
  Center,
  Flex,
  Notification,
  rem,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import SuggestedPrompt from "./SuggestedPrompt";

const ChatBox = () => {
  const [receivedErrorResponse, setReceivedErrorResponse] = useState(false);
  const { messages } = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
    onError: () => setReceivedErrorResponse(true),
  });
  const hasMessages = messages.length > 0;
  const messageListContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageListContainer = messageListContainerRef.current;
    if (messageListContainer) {
      messageListContainer.scrollTo(0, messageListContainer.scrollHeight);
    }
  }, [messages]);

  return (
    <Center h="100%">
      <Card radius="lg" w="90vw" maw={600} h="90vh" mah={800} withBorder>
        <Flex
          h="100%"
          p="sm"
          direction="column"
          justify="space-between"
          gap="md"
        >
          <Title order={4} ta="center">
            Chat with Not-Siri
          </Title>
          <Box
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
            </Flex>
          </Box>
          <ChatInput />
        </Flex>
      </Card>
      {receivedErrorResponse && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <Notification
            radius="md"
            icon={<IconX style={{ width: rem(20), height: rem(20) }} />}
            color="red"
            title="Bummer!"
            onClose={() => setReceivedErrorResponse(false)}
          >
            Something went wrong
          </Notification>
        </Affix>
      )}
    </Center>
  );
};

export default ChatBox;
