import { SHARED_CHAT_ID } from "@/utils/constant";
import { ActionIcon, Loader, Textarea } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { useChat } from "ai/react";

const ChatInput = () => {
  const { input, handleInputChange, handleSubmit, isLoading } = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
  });

  return (
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
          <>
            {isLoading ? (
              <Loader type="dots" />
            ) : (
              <ActionIcon
                variant="transparent"
                color="blue"
                size="lg"
                mr="sm"
                loaderProps={{ type: "dots" }}
                type="submit"
              >
                <IconSend2 size={32} />
              </ActionIcon>
            )}
          </>
        }
      />
    </form>
  );
};

export default ChatInput;
