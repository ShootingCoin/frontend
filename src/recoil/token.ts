import { atom } from "recoil";

export const tokenPriceState = atom<any>({
  key: `tokenPrice-${Math.random()}`,
  default: undefined,
});