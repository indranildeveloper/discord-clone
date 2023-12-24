"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formSchema, formPayload } from "@/validators/createChannelValidator";
import { useModal } from "@/hooks/useModalStore";
import { ChannelType } from "@prisma/client";

const EditChannelModal: FC = () => {
  const router = useRouter();
  const { type, isOpen, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "editChannel";
  const { channel, server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type ?? ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name);
      form.setValue("type", channel.type);
    }
  }, [form, channel]);

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: formPayload): Promise<void> => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(url, values);
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Edit Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Edit the channel under the server
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      Channel Type
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
