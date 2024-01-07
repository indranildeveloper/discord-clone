import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/SocketProvider";
import { ChatSocketProps } from "@/interface/components/ChatSocketProps";
import { MessageWithMemberWithProfile } from "@/types/server";

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps): void => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData([queryKey], (oldData: any) => {
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData([queryKey], (oldData: any) => {
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
