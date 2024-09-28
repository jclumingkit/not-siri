import { SHARED_CHAT_ID } from "@/utils/constant";
import { Card, Text } from "@mantine/core";
import { useChat } from "ai/react";

type Props = {
  prompt: string;
};

const SuggestedPrompt = ({ prompt }: Props) => {
  const { append } = useChat({ id: SHARED_CHAT_ID, api: "/api/chat" });
  return (
    <Card
      shadow="none"
      withBorder
      radius="lg"
      p="md"
      style={{ cursor: "pointer" }}
      onClick={() =>
        append({
          role: "user",
          content: prompt,
        })
      }
    >
      <Text>{prompt}</Text>
    </Card>
  );
};

export default SuggestedPrompt;
