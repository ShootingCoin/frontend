import { atom } from "recoil";

export const uuidState = atom<string>({
  key: `uuid-${Math.random()}`,
  default: undefined,
});
