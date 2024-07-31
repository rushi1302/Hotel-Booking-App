import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusInfo = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex md:flex-row flex-col gap-20">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">Delivering to </h2>
          <span>{order.deliveryDetails.name}</span>
          <span>{order.deliveryDetails.addressLine1}</span>
          <span>{order.deliveryDetails.city}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">Your Order</h2>
          {order.cartItems.map((item) => (
            <span key={item._id}>
              {item.name} x {item.quantity}
            </span>
          ))}
        </div>
      </div>

      <Separator />
      <div className="flex md:flex-row gap-4 items-center flex-col">
        <h2 className="font-bold text-xl">Total : </h2>
        <span className="font-bold text-xl">
          ${(order.totalAmount / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderStatusInfo;
