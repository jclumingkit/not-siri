import { SHARED_CHAT_ID } from "@/utils/constant";
import { TMessage } from "@/utils/types";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  CopyButton,
  Flex,
  Loader,
  Tooltip,
} from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconCopy,
  IconReload,
  IconUserCircle,
} from "@tabler/icons-react";
import { useChat } from "ai/react";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  message: TMessage;
};

const Message = ({ message }: Props) => {
  const { reload } = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
  });
  const isUser = message.role === "user";
  const markdownRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      direction={isUser ? "row-reverse" : "row"}
      gap={4}
      justify="flex-start"
      mr={isUser ? 0 : 42}
      ml={isUser ? 42 : 0}
    >
      <Avatar
        variant="transparent"
        radius="sm"
        color={isUser ? "blue" : "grape"}
        src=""
      >
        {isUser ? (
          <IconUserCircle size={28} />
        ) : (
          <IconBrandGithubCopilot size={28} />
        )}
      </Avatar>

      <Flex
        direction="column"
        gap={4}
        align={isUser ? "flex-end" : "flex-start"}
      >
        <Card withBorder radius="lg" py={0} px="md" shadow="none">
          {message.content ? (
            <Box ref={markdownRef}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </Box>
          ) : (
            <Loader type="dots" size="xs" />
          )}
        </Card>

        {!isUser && (
          <Flex gap={8}>
            <Tooltip label="Copy">
              <Box>
                <CopyButton value={markdownRef.current?.textContent || ""}>
                  {({ copy }) => (
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="gray.5"
                      onClick={copy}
                    >
                      <IconCopy stroke={1.5} />
                    </ActionIcon>
                  )}
                </CopyButton>
              </Box>
            </Tooltip>

            <Tooltip label="Regenerate Response">
              <Box>
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray.5"
                  onClick={() =>
                    reload({ options: { body: { isRegenerate: true } } })
                  }
                >
                  <IconReload stroke={1.5} />
                </ActionIcon>
              </Box>
            </Tooltip>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Message;
