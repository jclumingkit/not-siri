import useChatService from "@/hooks/useChatService";
import {
  ActionIcon,
  Affix,
  Box,
  Notification,
  rem,
  Textarea,
} from "@mantine/core";
import { IconPlayerStopFilled, IconSend2, IconX } from "@tabler/icons-react";

const ChatInput = () => {
  const {
    input,
    isLoading,
    receivedErrorResponse,
    handleInputChange,
    handleSubmit,
    stop,
    setReceivedErrorResponse,
  } = useChatService();

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
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
