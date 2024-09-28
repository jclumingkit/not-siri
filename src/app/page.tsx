import { Container } from "@mantine/core";
import ChatBox from "./components/ChatBox/ChatBox";

export default function Home() {
  return (
    <Container h="100vh" fluid>
      <ChatBox />
    </Container>
  );
}
