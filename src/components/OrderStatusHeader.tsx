import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const expectedDeliveryTime = () => {
    const createdAt = new Date(order.createdAt);
    console.log(order.status);

    createdAt.setMinutes(
      createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours} : ${paddedMinutes}`;
  };
  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status);
  };
  return (
    <div className="flex flex-col">
      <div className="md:text-xl font-bold flex flex-col gap-5">
        <div className="flex md:flex-row justify-between flex-col">
          <h2>Order Status : {getOrderStatusInfo()?.label}</h2>
          <h2>Expected Delivery Time : {expectedDeliveryTime()}</h2>
        </div>
        <Progress value={getOrderStatusInfo()?.progressValue} />
      </div>
    </div>
  );
};

export default OrderStatusHeader;
