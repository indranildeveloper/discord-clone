import { FC } from "react";
import { UserButton } from "@clerk/nextjs";

const HomePage: FC = () => {
  return (
    <div className="container">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
