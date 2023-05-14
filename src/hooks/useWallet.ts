import { getDefaultProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { createClient, useAccount } from "wagmi";

export const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function useWallet() {
  const { 
    address: addressWagmi, 
  } = useAccount();
  const [address, setAddress] = useState<string|null>(null);

  useEffect(() => {
    setAddress(addressWagmi);
  }, [
    addressWagmi,
  ])

  return useMemo(() => ({
    address,
  }), [
    address,
  ]);
};
