import useChatService from "@/hooks/useChatService";
import { ActionIcon, Avatar, Flex, Menu } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";

const ChatBoxHeader = () => {
  const { setMessages } = useChatService();
  const removeMessageHistory = useLocalStorage({
    key: "not-siri-message-history",
  })[2];

  const handleClearMessages = () => {
    setMessages([]);
    removeMessageHistory();
  };

  return (
    <Flex bg="grape" justify="space-between" align="center" p="sm">
      <Avatar variant="transparent" radius="sm" size="md" src="favicon.ico" />
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
