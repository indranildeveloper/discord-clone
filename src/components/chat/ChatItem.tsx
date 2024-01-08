"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberRole } from "@prisma/client";
import { useModal } from "@/hooks/useModalStore";
import UserAvatar from "../shared/UserAvatar";
import ActionTooltip from "../shared/ActionTooltip";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ChatItemProps } from "@/interface/components/ChatItemProps";
import { Edit, File, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChatInputPayload,
  ChatInputSchema,
} from "@/validators/chatInputValidator";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-primary" />,
  ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

const ChatItem: FC<ChatItemProps> = ({
  id,
  content,
  member,
  timeStamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();

  const { onOpen } = useModal();

  const form = useForm<ChatInputPayload>({
    resolver: zodResolver(ChatInputSchema),
    defaultValues: {
      content,
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    form.reset({
      content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: ChatInputPayload): Promise<void> => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });
      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMemberClick = (): void => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(
      `/servers/${params?.serverId.toString()}/conversations/${member.id}`,
    );
  };

  return (
    <div className="group relative flex w-full items-center p-4 transition hover:bg-background/10">
      <div className="group flex w-full items-start gap-x-2">
        <div
          className="cursor-pointer transition hover:drop-shadow-md"
          onClick={handleMemberClick}
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                className="cursor-pointer text-sm font-semibold hover:underline"
                onClick={handleMemberClick}
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timeStamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-2 flex aspect-square h-48 w-48 items-center overflow-hidden rounded-md border bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}

          {isPDF && (
            <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
              <File className="h-10 w-10 fill-primary/20 stroke-primary" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-primary hover:underline"
              >
                PDF File
              </a>
            </div>
          )}

          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-400",
                deleted &&
                  "mt-1 text-xs italic text-zinc-500 dark:text-zinc-300",
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-xs text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}

          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full items-center gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            className="border-none bg-zinc-200/90 p-2 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                            placeholder="Edited message"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button size="sm" disabled={isLoading}>
                  Save
                </Button>
              </form>
              <span className="mt-2 text-xs text-zinc-400">
                Press <kbd className="rounded bg-background p-1">ESC</kbd> to
                cancel, <kbd className="rounded bg-background p-1">Enter</kbd>{" "}
                to save.
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border bg-white p-1 group-hover:flex dark:bg-zinc-600">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                className="ml-auto h-4 w-4 cursor-pointer text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-300"
                onClick={() => setIsEditing(true)}
              />
            </ActionTooltip>
          )}

          <ActionTooltip label="Delete">
            <Trash
              className="ml-auto h-4 w-4 cursor-pointer text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-300"
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
