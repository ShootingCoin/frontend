import { useEffect, useMemo, useState } from "react";
import { polygonMumbai } from "viem/chains";
import { configureChains, createClient, useAccount } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
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
