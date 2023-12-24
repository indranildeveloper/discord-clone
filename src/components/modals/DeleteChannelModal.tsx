"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks/useModalStore";

const DeleteChannelModal: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { type, isOpen, onClose, data } = useModal();
  const { server, channel } = data;

  const isModalOpen = isOpen && type === "deleteChannel";

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);
      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this <br />
            <span className="font-semibold text-primary">
              #{channel?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-end gap-4">
            <Button disabled={isLoading} onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
