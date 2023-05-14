import { atom } from "recoil";

export const uuidState = atom<string>({
  key: 'uuid',
  default: undefined,
});
