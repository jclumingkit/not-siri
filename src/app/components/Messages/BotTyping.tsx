import { Avatar, Card, Flex, Loader } from "@mantine/core";
import { IconBrandGithubCopilot } from "@tabler/icons-react";

const BotTyping = () => {
  return (
    <Flex direction="row" gap={4} justify="flex-start" align="center">
      <Avatar variant="transparent" radius="sm" color="grape" src="">
        <IconBrandGithubCopilot size={28} />
      </Avatar>
      <Card withBorder radius="lg" py={0} px="md" shadow="none">
        <Loader type="dots" size="xs" my="auto" />
      </Card>
    </Flex>
  );
};

export default BotTyping;
