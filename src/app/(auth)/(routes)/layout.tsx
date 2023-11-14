import { FC } from "react";
import { AuthLayoutProps } from "@/interface/layout/AuthLayoutInterface";

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
