import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/SocketProvider";
import { ChatQueryProps } from "@/interface/components/ChatQueryProps";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchMessages = async ({ pageParam = undefined }): Promise<any> => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    );
    const response = await fetch(url);
    return await response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
      initialPageParam: undefined,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
