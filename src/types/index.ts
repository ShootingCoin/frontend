export enum CardTypeEnum {
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
