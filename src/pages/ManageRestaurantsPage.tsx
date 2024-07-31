import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";
import {
  useGetMyRestaurant,
  useCreateMyRestaurant,
  useUpdateMyRestaurant,
  useMyRestaurantOrders,
  useupdateOrderStatus,
} from "@/api/MyRestaurantApi";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";
import { OrderStatus } from "@/types";

const ManageRestaurantsPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { restaurant } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders, isLoading: isOrderLoading } = useMyRestaurantOrders();

  const isEditing = !!restaurant;
  console.log(isEditing);

  return (
    <>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">
            Manage Restaurants
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="bg-gray-50 rounded-md space-y-5 p-10">
          <h2 className="text-xl font-bold capitalize text-red-400">
            You have {orders?.length} active{" "}
            {orders?.length === 1 ? "Order" : "Orders"}
          </h2>
          {orders?.map((order) => (
            <div className="flex flex-col gap-5">
              <OrderItemCard key={order._id} order={order} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageRestaurantsPage;
