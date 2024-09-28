"use client";

import { TMessageHistory } from "@/utils/types";
import { Card, Center, Flex, LoadingOverlay } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Messages from "../Messages/Messages";
import ChatInput from "./ChatInput";
import ChatBoxHeader from "./Header";

const ChatBox = () => {
  const [initialMessages] = useLocalStorage({
    key: "not-siri-message-history",
    defaultValue: null as TMessageHistory,
  });

  return (
    <Center h="100%">
      <Card p={0} radius="lg" w="90vw" maw={600} h="90vh" mah={800} shadow="sm">
        <LoadingOverlay
          visible={!initialMessages}
          loaderProps={{ type: "dots" }}
        />
        <Flex h="100%" direction="column" justify="space-between">
          <ChatBoxHeader />
          {initialMessages ? (
            <Messages initialMessages={initialMessages} />
          ) : null}
          <ChatInput />
        </Flex>
      </Card>
    </Center>
  );
};

export default ChatBox;
