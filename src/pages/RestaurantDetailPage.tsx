import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurnt } from "@/api/SearchRestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItems from "@/components/MenuItem";
import OrderSummery from "@/components/OrderSummery";
import RestaurantInfo from "@/components/RestaurantInfo";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { useState } from "react";
import { useParams } from "react-router-dom";

export type cardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurnt(restaurantId as string);

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  // state to manipulate card order
  const [cardItems, setCardItems] = useState<cardItem[]>(() => {
    const storedCardItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCardItems ? JSON.parse(storedCardItems) : [];
  });

  //   function for userFormData.

  const onSave = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    console.log("userFormData", userFormData);
    const checkoutData = {
      cartItems: cardItems.map((cardItem) => ({
        menuItemId: cardItem._id,
        name: cardItem.name,
        quantity: cardItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  // logic to add item in card.

  const addToCard = (menuItem: MenuItem) => {
    setCardItems((prevCardItems) => {
      //1. weathet the item is present in card or not.
      const existingItem = prevCardItems.find(
        (item) => item._id === menuItem._id
      );

      let updatedCardItem;
      if (existingItem) {
        updatedCardItem = prevCardItems.map((item) =>
          item._id === existingItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCardItem = [
          ...prevCardItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCardItem)
      );
      return updatedCardItem;
    });
  };

  // function to remove from card.
  const removeFromCard = (cardItem: cardItem) => {
    setCardItems((prevCardItems) => {
      const updatedCardItems = prevCardItems.filter(
        (item) => cardItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCardItems)
      );
      return updatedCardItems;
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt="restaurant image"
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="tracking-tight text-xl md:text-2xl font-semibold">
            Menu
          </span>
          {restaurant?.menuItems.map((menu) => (
            <MenuItems
              key={menu._id}
              menu={menu}
              addToCard={() => addToCard(menu)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <OrderSummery
            restaurant={restaurant}
            cardItems={cardItems}
            removeCardItem={removeFromCard}
          />
          <CheckoutButton
            onSave={onSave}
            disabled={cardItems.length === 0}
            isLoading={isCheckoutLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
