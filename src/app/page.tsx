import { FC } from "react";
import { Button } from "@/components/ui/button";

const HomePage: FC = () => {
  return (
    <div className="container">
      <h2 className="text-2xl">Home Page</h2>
      <Button>Click Me</Button>
    </div>
  );
};

export default HomePage;
