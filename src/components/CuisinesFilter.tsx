import { cuisineList } from "@/config/restaurant-options-menu";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { link } from "fs";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandClick,
}: Props) => {
  //
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };

  // to reset the filters
  const handleCuisineReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>Filter By Cuisine</div>
        <div
          className=" underline text-blue-500 cursor-pointer"
          onClick={handleCuisineReset}>
          reset filter
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={cuisine}>
                <input
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  type="checkbox"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  className={`flex flex-row flex-1 rounded-full py-2 px-4 text-sm font-semibold border border-black cursor-pointer ${
                    isSelected
                      ? "border border-green-500 text-green-500"
                      : "border-gray-400"
                  }`}
                  htmlFor={`cuisine_${cuisine}`}>
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
      </div>
      <Button variant="link" className="" onClick={onExpandClick}>
        {isExpanded ? (
          <span className="flex flex-row gap-2">
            View Less <ChevronUp />
          </span>
        ) : (
          <span className="flex flex-row gap-2">
            View More <ChevronDown />
          </span>
        )}
      </Button>
    </>
  );
};

export default CuisineFilter;
