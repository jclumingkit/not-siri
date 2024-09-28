import { SHARED_CHAT_ID } from "@/utils/constant";
import { ActionIcon, Avatar, Flex, Menu } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconBrandGithubCopilot, IconDots } from "@tabler/icons-react";
import { useChat } from "ai/react";

const ChatBoxHeader = () => {
  const { setMessages } = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
  });
  const removeMessageHistory = useLocalStorage({
    key: "not-siri-message-history",
  })[2];

  const handleClearMessages = () => {
    setMessages([]);
    removeMessageHistory();
  };

  return (
    <Flex bg="grape" justify="space-between" align="center" p="sm">
      <Avatar variant="transparent" radius="sm" size="md" src="">
        <IconBrandGithubCopilot size={40} />
      </Avatar>
      <Flex gap="sm">
        <Menu position="bottom-end" offset={1}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handleClearMessages}>Clear messages</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default ChatBoxHeader;
