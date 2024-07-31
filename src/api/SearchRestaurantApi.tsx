import { Restaurant, searchRestaurants } from "@/types";
import { useQuery } from "react-query";
import { searchState } from "@/pages/SearchPage";

// to get single restaurant detail.

export const useGetRestaurnt = (restaurantId?: string) => {
  const getRestaurantById = async (): Promise<Restaurant> => {
    const response = await fetch(`/api/restaurant/${restaurantId}`);
    if (!response.ok) {
      throw new Error("failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantById,
    {
      enabled: !!restaurantId,
    }
  );
  return { restaurant, isLoading };
};

// to get all resataurants.
export const useSearchRestaurants = (
  searchState: searchState,
  city: string
) => {
  const searchRestaurants = async (): Promise<searchRestaurants> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `/api/restaurant/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to search Restaurant");
    }
    return response.json();
  };

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(["searchRestaurants", searchState], searchRestaurants, {
    enabled: !!city, // only execute function when city is true.
  });
  return {
    results,
    isLoading,
  };
};

// bydefalut when this component mount city value is undefined. so we want to only fetch the data when the city has some value. thats why we have used enabled property.
