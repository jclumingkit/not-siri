import { dateFromNow } from "@/utils/parsers";
import { Avatar, Box, Card, Flex, Text } from "@mantine/core";
import { IconBrandGithubCopilot, IconUserCircle } from "@tabler/icons-react";
import { Message as TMessage } from "ai";
import ReactMarkdown from "react-markdown";

type Props = {
  message: TMessage;
};

const Message = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <Flex direction="column" gap={4} align={isUser ? "flex-end" : "flex-start"}>
      <Avatar
        variant="transparent"
        radius="sm"
        color={isUser ? "blue" : "grape"}
        src=""
      >
        {isUser ? (
          <IconUserCircle size={32} />
        ) : (
          <IconBrandGithubCopilot size={32} />
        )}
      </Avatar>

      <Card withBorder radius="lg" py={0} px="md">
        <Box>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </Box>
      </Card>
      <Text c="dimmed" size="xs">
        {dateFromNow(message.createdAt as Date)}
      </Text>
    </Flex>
  );
};

export default Message;
