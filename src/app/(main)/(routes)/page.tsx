import { FC } from "react";
import { UserButton } from "@clerk/nextjs";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { Button } from "@/components/ui/Button";

const HomePage: FC = () => {
  return (
    <div className="container">
      <UserButton afterSignOutUrl="/" />
      <ToggleTheme />
      <hr className="my-4" />
      <Button>Click Me</Button>
    </div>
  );
};

export default HomePage;
