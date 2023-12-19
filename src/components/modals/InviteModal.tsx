"use client";

import { FC, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";
import { Check, Copy, RefreshCw } from "lucide-react";

const InviteModal: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { type, isOpen, onOpen, onClose, data } = useModal();
  const { server } = data;
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      onOpen("invite", { server: response.data });
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
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Share the link of the server to your friends!
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary">
            Server Invite Link
          </Label>
          <div className="my-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              onChange={() => {}}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleCopy} disabled={isLoading}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            size="sm"
            className="text-xs"
            onClick={generateNewLink}
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
