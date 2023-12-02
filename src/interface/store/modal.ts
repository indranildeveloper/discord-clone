import { Server } from "@prisma/client";

export type ModalType = "createServer" | "invite" | "editServer";

export interface ModalData {
  server?: Server;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
