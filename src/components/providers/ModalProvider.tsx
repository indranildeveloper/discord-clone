"use client";

import { FC, useEffect, useState } from "react";
import CreateServer from "../modals/CreateServer";
import InviteModal from "../modals/InviteModal";
import EditServer from "../modals/EditServer";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <CreateServer />
        <InviteModal />
        <EditServer />
      </>
    )
  );
};

export default ModalProvider;
