import { BikeIcon, Clock } from "lucide-react";
import { formatPrice } from "../_helpers/price";

type DeliveryDetailsProps = {
  deliveryFee: number;
  deliveryTimeMinutes: number;
};
const DeliveryDetails = ({
  deliveryFee,
  deliveryTimeMinutes,
}: DeliveryDetailsProps) => {
  return (
    <div className="mx-5 my-6 flex justify-between rounded-md border border-muted-foreground/40 px-12 py-2.5 shadow">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 ">
          <BikeIcon size={18} />
          <span className="text-xs text-muted-foreground">Entrega</span>
        </div>
        {Number(deliveryFee) > 0 ? (
          <span className="text-sm font-semibold">
            {formatPrice(Number(deliveryFee))}
          </span>
        ) : (
          <span className="text-sm font-semibold">Grátis</span>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 ">
          <Clock size={18} />
          <span className="text-xs text-muted-foreground">Entrega</span>
        </div>
        <span className="text-sm font-semibold">{deliveryTimeMinutes} min</span>
      </div>
    </div>
  );
};

export default DeliveryDetails;
