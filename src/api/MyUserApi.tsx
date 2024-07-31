import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type createUser1 = {
  auth0Id: string;
  email: string;
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUser = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get User.");
    }
    return response.json();
  };

  const {
    data: currentUser,
    error,
    isLoading,
  } = useQuery("currentUser", getUser);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: createUser1) => {
    const accesToken = await getAccessTokenSilently();
    const response = await fetch(`/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User Profile Updated Successfully!");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};
