import { atom } from "recoil";

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
