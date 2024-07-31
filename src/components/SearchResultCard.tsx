import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/details/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt="restaurant"
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-xl text-center lg:text-start lg:text-2xl font-bold tracking-tight group-hover:underline mb-2">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex lg:flex-row flex-wrap justify-center lg:justify-start">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Clock />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <Banknote />
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
