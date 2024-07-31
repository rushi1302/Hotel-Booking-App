import { OrderStatus, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant details.");
    }
    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );
  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response) {
      throw new Error("Not able to update the restaurant");
    }
    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("restaurant updated successfully");
  }
  if (error) {
    toast.error("failed to update an restaurant");
  }
  return {
    updateRestaurant,
    isLoading,
  };
};

export const useMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const myRestaurantOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch("/api/my/restaurant/order", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchRestaurantOrders",
    myRestaurantOrders
  );
  return { orders, isLoading };
};

// to update the order status.

type orderStatusUpdate = {
  status: string;
  orderId: string;
};

export const useupdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateOrderStatus = async (orderStatus: orderStatusUpdate) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `/api/my/restaurant/order/${orderStatus.orderId}/status`,

      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: orderStatus.status }),
      }
    );
    if (!response.ok) {
      throw new Error("unable to update order status");
    }
    return response.json();
  };
  const {
    mutateAsync: updateMyOrder,
    error,
    isSuccess,
    isLoading,
  } = useMutation(updateOrderStatus);

  if (isSuccess) {
    toast.success("Updated order status successfully");
  }
  if (error) {
    toast.error("Failed to update order status");
  }

  return {
    updateMyOrder,
    isLoading,
  };
};
