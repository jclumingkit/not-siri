import { Container } from "@mantine/core";
import Chatbox from "./component/Chatbox";

export default function Home() {
  return (
    <Container h="100vh" fluid>
      <Chatbox />
    </Container>
  );
}
