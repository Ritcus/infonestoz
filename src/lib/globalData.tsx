"use client";
import useSWR, { SWRConfig, BareFetcher, SWRConfiguration } from "swr";
import { client } from "../../sanity/lib/client";

type SanityFetcher<T = unknown> = BareFetcher<T>;

const fetcher = <T,>(query: string): Promise<T> =>
  client.fetch(query) as Promise<T>;

export function useGlobalData<T = unknown>(
  query: string | null,
  options?: SWRConfiguration<T>
) {
  return useSWR<T>(query, fetcher as SanityFetcher<T>, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    ...options,
  });
}

interface GlobalDataProviderProps {
  children: React.ReactNode;
}

export function GlobalDataProvider({ children }: GlobalDataProviderProps) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher: fetcher as SanityFetcher<unknown>,
        dedupingInterval: 10000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
