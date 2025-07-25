import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "src/utils/axios";
import { fetcher2, endpoints2 } from "src/utils/axios2";

// ----------------------------------------------------------------------

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating],
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = productId
    ? [endpoints.product.details, { params: { productId } }]
    : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useGetToday() {
  const URL = endpoints.dcs.today;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      dcsToday: data?.dcsToday || [],
      dcsTodayLoading: isLoading,
      dcsTodayError: error,
      pdcsTodayValidating: isValidating,
      dcsTodayEmpty: !isLoading && !data?.dcsToday.length,
    }),
    [data?.dcsToday, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useGetTodayEvents() {
  const URL = endpoints2.dcs.today;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher2);

  const memoizedValue = useMemo(
    () => ({
      dcsToday2: data?.dcsToday2 || [],
      dcsTodayLoading: isLoading,
      dcsTodayError: error,
      dcsTodayValidating: isValidating,
      dcsTodayEmpty: !isLoading && !data?.dcsToday2.length,
    }),
    [data?.dcsToday2, error, isLoading, isValidating],
  );

  return memoizedValue;
}
