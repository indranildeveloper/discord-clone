import { FC } from "react";
import { UserButton } from "@clerk/nextjs";
import ToggleTheme from "@/components/shared/ToggleTheme";

const HomePage: FC = () => {
  return (
    <div className="container">
      <UserButton afterSignOutUrl="/" />
      <ToggleTheme />
    </div>
  );
};

export default HomePage;
