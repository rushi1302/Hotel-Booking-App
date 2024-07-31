import { Order, OrderStatus } from "@/types";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useupdateOrderStatus } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  // to update the status of order.

  const { updateMyOrder, isLoading } = useupdateOrderStatus();

  // state to hold the record of status.
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const onStatusChange = async (newStatus: OrderStatus) => {
    await updateMyOrder({ orderId: order._id as string, status: newStatus });
    setStatus(newStatus);
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const getTime = () => {
    const time = new Date(order.createdAt);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const paddedMinuts = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours} : ${paddedMinuts}`;
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-4 gap-4 justify-between mb-3">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Customer Name</span>
          <span>{order.deliveryDetails.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold"> Address</span>
          <span>
            {order.deliveryDetails.addressLine1} {order.deliveryDetails.city}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Delivery Time </span>
          <span>{getTime()}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Cost </span>
          <span>${(order.totalAmount / 100).toFixed()}</span>
        </div>
      </div>
      {order.cartItems.map((item) => (
        <div key={item._id} className="flex flex-col gap-1">
          <span>
            <Badge variant="outline" className="mr-2">
              {item.quantity}
            </Badge>
            {item.name}
          </span>
        </div>
      ))}
      <Separator />
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold" htmlFor="status">
          What is the status of this order?
        </label>
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as OrderStatus)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUS.map((value) => (
              <SelectItem value={value.value}>{value.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderItemCard;
