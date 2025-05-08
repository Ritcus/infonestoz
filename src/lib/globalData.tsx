"use client";
import useSWR, { SWRConfig, BareFetcher, SWRConfiguration } from "swr";
import { client } from "../../sanity/lib/client";

// Define a type for the fetcher function
type SanityFetcher<T = unknown> = BareFetcher<T>;

// Create a typed fetcher instance
const fetcher = <T,>(query: string): Promise<T> =>
  client.fetch(query) as Promise<T>;

// Typed hook for global data access
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

// Provider props type
interface GlobalDataProviderProps {
  children: React.ReactNode;
}

// Cache provider component
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
