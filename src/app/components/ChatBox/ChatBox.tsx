"use client";

import useChatService from "@/hooks/useChatService";
import { Card, Center, Flex, LoadingOverlay } from "@mantine/core";
import Messages from "../Messages/Messages";
import ChatInput from "./ChatInput";
import ChatBoxHeader from "./Header";

const ChatBox = () => {
  const { isInitialized } = useChatService();

  return (
    <Center h="100%">
      <Card p={0} radius="lg" w="90vw" maw={600} h="90vh" mah={800} shadow="sm">
        <LoadingOverlay
          visible={!isInitialized}
          loaderProps={{ type: "dots" }}
        />
        <Flex h="100%" direction="column" justify="space-between">
          <ChatBoxHeader />
          {isInitialized ? <Messages /> : null}
          <ChatInput />
        </Flex>
      </Card>
    </Center>
  );
};

export default ChatBox;
