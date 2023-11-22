import { useEffect, useState } from "react";

export const useOrigin = (): string => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const origin = window?.location.origin ? window.location.origin : "";

  if (!mounted) {
    return "";
  }

  return origin;
};
