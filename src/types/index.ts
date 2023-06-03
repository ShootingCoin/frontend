export enum CardTypeEnum {
  Challenger='challenger',
  Master='master',
  Diamond='diamond',
  Platinum='platinum',
  Gold='gold',
  Silver='silver',
  Bronze='bronze',
  Friend='friend',
}

export enum MypageNavigatorEnum {
  Assets="assets",
  History="history",
  NFT="nft",
}

export type Chip = {
  name: string;
  amount: number;
  unit: string;
  isSelected?: boolean;
  isOut?: boolean;
};

export type HistoryType = {
  gameId: number;
  user1: string;
  user1coinAddress: string;
  user1GetAmount: number;
  user2: string;
  user2coinAddress: string;
  user2GetAmount: number;
  timeStamp: number;
};
