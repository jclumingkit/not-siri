import useChatService from "@/hooks/useChatService";
import { Card, Text } from "@mantine/core";

type Props = {
  prompt: string;
};

const SuggestedPrompt = ({ prompt }: Props) => {
  const { handleAppendChat } = useChatService();

  return (
    <Card
      shadow="none"
      withBorder
      radius="lg"
      p="md"
      style={{ cursor: "pointer" }}
      onClick={() => handleAppendChat(prompt)}
    >
      <Text>{prompt}</Text>
    </Card>
  );
};

export default SuggestedPrompt;
