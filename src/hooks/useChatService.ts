import { createChatFromUserInput } from "@/utils/chatHelpers";
import { SHARED_CHAT_ID } from "@/utils/constant";
import { TMessageHistory } from "@/utils/types";
import { useLocalStorage } from "@mantine/hooks";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

const useChatService = () => {
  const [messageHistory, setMessageHistory] = useLocalStorage({
    key: "not-siri-message-history",
    defaultValue: [] as TMessageHistory,
  });
  const [triggerSaveToLocalState, setTriggerSaveToLocalState] = useLocalStorage(
    {
      key: "not-siri-trigger-save",
      defaultValue: false,
    },
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [receivedErrorResponse, setReceivedErrorResponse] = useState(false);

  const defaultReturns = useChat({
    id: SHARED_CHAT_ID,
    api: "/api/chat",
    initialMessages: messageHistory,
    onFinish: () => setTriggerSaveToLocalState(true),
    onError: () => handleChatError(),
  });

  const { input, messages, setMessages, append } = defaultReturns;

  const handleChatError = () => {
    const tempUserMessage = createChatFromUserInput(input);
    const updatedMessageHistory = [...messageHistory, tempUserMessage];
    setMessages(updatedMessageHistory);
    setReceivedErrorResponse(true);
  };

  const handleAppendChat = (input: string) => {
    const newChat = createChatFromUserInput(input);
    append(newChat);
  };

  useEffect(() => {
    // temp solution:
    // better to use onFinish when updating local/database state
    // encountered timing issue with setState and onFinish
    if (triggerSaveToLocalState) {
      setMessageHistory(messages);
      setTriggerSaveToLocalState(false);
    }
  }, [messages, triggerSaveToLocalState]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsInitialized(true);
    }
  }, []);

  return {
    ...defaultReturns,
    receivedErrorResponse,
    setReceivedErrorResponse,
    isInitialized,
    setIsInitialized,
    handleAppendChat,
  };
};

export default useChatService;
