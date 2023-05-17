import { atom } from "recoil";

export const uuidState = atom<string>({
  key: `uuid-${Math.random()}`,
  default: undefined,
});


export const matchIdState = atom<string>({
  key: `match_id-${Math.random()}`,
  default: undefined,
});

export const webSocketState = atom<any>({
  key: `webSocket-${Math.random()}`,
  default: () => {}
});
