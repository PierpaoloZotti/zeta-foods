import { ArrowDown } from "lucide-react";
import { cn } from "../_lib/utils";

type DiscountBadgeProps = {
  discountPercentage: number;
  className?: string;
};

const DiscountBadge = ({
  discountPercentage,
  className,
}: DiscountBadgeProps) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-primary px-1.5 py-0.5 text-xs text-neutral-100",
        className,
      )}
    >
      <ArrowDown className="size-3" />
      <p>{discountPercentage}%</p>
    </div>
  );
};

export default DiscountBadge;
