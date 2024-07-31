import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div className="space-y-8">
      <div className="text-center uppercase">
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription className="m-3">
          create your menu and give each item a name and price
        </FormDescription>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <FormField
          control={control}
          name="menuItems"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <MenuItemInput
                  key={index}
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => append({ name: "", price: "" })}>
          Add Menu Item
        </Button>
      </div>
    </div>
  );
};

export default MenuSection;

// fields = [{name:"",price:""}]
