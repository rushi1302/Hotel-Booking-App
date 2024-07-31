import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderStatusInfo from "@/components/OrderStatusInfo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return "Loading....";
  }
  if (!orders || orders.length === 0) {
    return "No order found";
  }
  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-200 rounded-lg p-10">
          <OrderStatusHeader order={order} />
          <div className="grid md:grid-cols-2 gap-10">
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt="restaurantImage"
                className="h-full w-full object-cover rounded-md"
              />
            </AspectRatio>
            <OrderStatusInfo order={order} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
