import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

// api for getOrders of user.

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch("/api/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response) {
      throw new Error("order not found");
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery("fetchMyOrders", getOrders, {
    refetchInterval: 5000,
  });
  return { orders, isLoading };
};

// api for checkout session request.
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(checkoutSessionRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to create checkout session");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    createCheckoutSession,
    isLoading,
  };
};
