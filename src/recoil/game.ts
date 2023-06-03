import { atom } from "recoil";
import { defaultChips } from "src/dummy";
import { Chip } from "src/types";

export const chipsState = atom<Array<Chip>>({
  key: `chips-${Math.random()}`,
  default: defaultChips,
});

export const eggsState = atom<Array<any>>({
  key: `eggs-${Math.random()}`,
  default: undefined,
});

export const opponentEggsState = atom<Array<any>>({
  key: `opponent-eggs-state-${Math.random()}`,
  default: undefined,
});

export const currentSituationState = atom<Array<any>>({
  key: `current-situation-${Math.random()}`,
  default: undefined,
});

export const isFirstState = atom<boolean>({
  key: `is-first-${Math.random()}`,
  default: true,
});

export const isMyTurnState = atom<boolean>({
  key: `is-my-turn-${Math.random()}`,
  default: false,
});

export const isLoadingState = atom<boolean>({
  key: `is-loading-${Math.random()}`,
  default: true,
});

export const timeState = atom<number>({
  key: `time-${Math.random()}`,
  default: 45,
});
