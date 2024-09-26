"use client";

import {
  ActionIcon,
  Card,
  Center,
  Flex,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useChat } from "ai/react";
import Message from "./Message";

const Chatbox = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Center h="100%">
      <Card radius="lg" w="90vw" maw={600} h="90vh" mah={800} withBorder>
        <Flex
          h="100%"
          p="sm"
          direction="column"
          justify="space-between"
          gap="sm"
        >
          <Title order={4} ta="center">
            Chat with Not-Siri
          </Title>
          <Flex flex={1} h="100%" direction="column" gap="sm">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Flex>
          <form onSubmit={handleSubmit}>
            <TextInput
              value={input}
              onChange={handleInputChange}
              radius="xl"
              size="xl"
              placeholder="Something bugging you today?"
              rightSection={
                <ActionIcon
                  variant="transparent"
                  color="blue"
                  size="lg"
                  mr="xs"
                  loaderProps={{ type: "dots" }}
                  type="submit"
                >
                  <IconSend size={32} />
                </ActionIcon>
              }
              required
            />
          </form>
        </Flex>
      </Card>
    </Center>
  );
};

export default Chatbox;
