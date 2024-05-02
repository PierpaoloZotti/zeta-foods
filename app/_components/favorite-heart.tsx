import { HeartIcon } from "lucide-react";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

type FavoriteIconProps = {
  className?: string;
};
const FavoriteIcon = ({ className }: FavoriteIconProps) => {
  return (
    <Button
      className={cn(
        "size-fit rounded-full bg-neutral-400 p-2 text-foreground shadow-md transition-all duration-200 ease-in-out hover:text-white hover:shadow-inner",
        className,
      )}
      size="icon"
    >
      <HeartIcon className="" />
    </Button>
  );
};

export default FavoriteIcon;
