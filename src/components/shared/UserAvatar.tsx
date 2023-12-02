import { FC } from "react";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { UserAvatarProps } from "@/interface/components/UserAvatarProps";
import { cn } from "@/lib/utils";

const UserAvatar: FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
