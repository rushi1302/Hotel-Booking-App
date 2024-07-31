import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImage = watch("imageUrl");

  return (
    <div className="space-y-2 flex flex-col gap-3 items-center ">
      <div>
        <h2 className="text-2xl font-bold text-center uppercase">Image</h2>
        <FormDescription className="text-center mt-4">
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center md:w-[50%]">
        {existingImage && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImage}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white flex-grow-1"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
