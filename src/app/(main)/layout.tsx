import { FC } from "react";
import { MainLayoutProps } from "@/interface/layout/MainLayoutInterface";
import NavigationSidebar from "@/components/navigation/NavigationSidebar";

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-20 flex-col md:flex">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-20">{children}</main>
    </div>
  );
};

export default MainLayout;
