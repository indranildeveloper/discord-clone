"use client";

import { FC, useEffect, useState } from "react";
import CreateServer from "../modals/CreateServer";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <CreateServer />
      </>
    )
  );
};

export default ModalProvider;
