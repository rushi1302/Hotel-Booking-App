import { Restaurant } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cardItem } from "@/pages/RestaurantDetailPage";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cardItems: cardItem[];
  removeCardItem: (cardItem: cardItem) => void;
};

const OrderSummery = ({ restaurant, cardItems, removeCardItem }: Props) => {
  // calculate total card price with delivery charges.
  const totalCardPrice = () => {
    const ItemPrice = cardItems.reduce(
      (total, item) => (total = total + item.price * item.quantity),
      0
    );
    const totalWithDelivery = ItemPrice + restaurant?.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <Card>
      <CardHeader className="text-2xl font-bold tracking-tight flex flex-row justify-between items-center">
        <span>Your Order</span>
        <span>${totalCardPrice()}</span>
      </CardHeader>
      <CardContent>
        {cardItems.map((item) => (
          <div key={item._id} className="flex justify-between m-4">
            <span className="flex gap-3">
              <Badge variant={"outline"}>{item.quantity}</Badge>
              <span>{item.name}</span>
            </span>

            <span className="flex gap-2">
              <Trash
                size={20}
                color="red"
                className="cursor-pointer"
                onClick={() => removeCardItem(item)}
              />
              ${((item.quantity * item.price) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between m-4">
          <span>delivery charges</span>$
          {(restaurant?.deliveryPrice / 100).toFixed(2)}
        </div>
        <Separator />
        {cardItems.length > 0 && (
          <div className="flex justify-between m-4 font-bold text-red-500 text-2xl">
            <span>total</span>
            <span>${totalCardPrice()}</span>
          </div>
        )}
        <Separator />
      </CardContent>
    </Card>
  );
};

export default OrderSummery;
