import { SHARED_CHAT_ID } from "@/utils/constant";
import { TMessageHistory } from "@/utils/types";
import {
  ActionIcon,
  Affix,
  Box,
  Notification,
  rem,
  Textarea,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconPlayerStopFilled, IconSend2, IconX } from "@tabler/icons-react";
import { useChat } from "ai/react";
import { useState } from "react";

const ChatInput = () => {
  const [receivedErrorResponse, setReceivedErrorResponse] = useState(false);
  const setMessageHistory = useLocalStorage({
    key: "not-siri-message-history",
    defaultValue: null as TMessageHistory,
  })[1];
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      id: SHARED_CHAT_ID,
      api: "/api/chat",
      onFinish: () => {
        setMessageHistory(messages);
      },
      onError: () => {
        setReceivedErrorResponse(true);
      },
    });

  return (
    <Box p="sm">
      <form onSubmit={handleSubmit}>
        <Textarea
          required
          autosize
          rows={1}
          variant="filled"
          value={input}
          onChange={handleInputChange}
          radius="xl"
          size="lg"
          placeholder={isLoading ? "Sending..." : "Got a question?"}
          readOnly={isLoading}
          rightSection={
            <ActionIcon
              variant="transparent"
              color={isLoading ? "red" : "blue"}
              size="lg"
              radius="lg"
              mr="sm"
              type={isLoading ? "button" : "submit"}
              onClick={() => {
                if (isLoading) {
                  stop();
                }
              }}
            >
              {isLoading ? (
                <IconPlayerStopFilled size={32} />
              ) : (
                <IconSend2 size={32} />
              )}
            </ActionIcon>
          }
        />
      </form>
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
    </Box>
  );
};

export default ChatInput;
