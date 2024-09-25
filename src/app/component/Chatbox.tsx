import {
  ActionIcon,
  Card,
  Center,
  Flex,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

const Chatbox = () => {
  return (
    <Center h="100%">
      <Card radius="lg" w="90vw" maw={600} h="90vh" mah={800} withBorder>
        <Flex h="100%" p="sm" direction="column" justify="space-between">
          <Title order={4} ta="center">
            Chat with Not-Siri
          </Title>
          <TextInput
            radius="xl"
            size="xl"
            placeholder="Something bugging you today?"
            rightSection={
              <ActionIcon
                variant="transparent"
                color="blue"
                size="lg"
                mr="xs"
                loaderProps={{ type: "dots" }}
              >
                <IconSend size={32} />
              </ActionIcon>
            }
          />
        </Flex>
      </Card>
    </Center>
  );
};

export default Chatbox;
