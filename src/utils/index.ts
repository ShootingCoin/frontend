export function reduceHashString(address: string, reduceStart?: number, reduceEnd?: number) {
  return `${address.slice(0, reduceStart || 5)}...${address.slice((reduceEnd || 3) * -1, )}`;
};