import { customAlphabet } from "nanoid/non-secure";
import { TMessage } from "./types";

export const createChatId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const createChatFromUserInput = (input: string) => {
  const newChat: TMessage = {
    id: createChatId(),
    role: "user",
    content: input,
    createdAt: new Date(),
  };
  return newChat;
};
