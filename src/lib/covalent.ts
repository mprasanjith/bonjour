import { useMemo } from "react";
import useSWR from "swr";

export type CovalentResponse = {
  data: {
    address: string;
    chain_id: number;
    chain_name: string;
    items: CovalentWalletBalanceResult[];
  };
  error: boolean;
  error_message: string;
  error_code: number;
};

export type CovalentWalletBalanceResult = {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: any;
  logo_url: string;
  last_transferred_at: any;
  native_token: boolean;
  type: string;
  balance: string;
  balance_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote: number;
  quote_24h: number;
  nft_data: any;
};

const apiKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
if (!apiKey) {
  throw new Error("Missing NEXT_PUBLIC_COVALENT_API_KEY env var");
}

export function useBalance(chainId: number, address: string | undefined) {
  const url = address
    ? `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${apiKey}`
    : null;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR<CovalentResponse>(url, fetcher);

  const total = useMemo(() => {
    if (!data) return 0;
    return data.data.items.reduce(
      (acc: number, item: CovalentWalletBalanceResult) => {
        return acc + Number(item.quote);
      },
      0
    );
  }, [data]);

  return { data, total };
}
