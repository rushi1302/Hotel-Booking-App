import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required.",
  }),
});

export type SeachForm = z.infer<typeof formSchema>;

type Props = {
  searchQuery: string;
  onSubmit: (formData: SeachForm) => void;
  placeHolder: string;
  onReset?: () => void;
};
const SearchBar = ({ searchQuery, onSubmit, onReset, placeHolder }: Props) => {
  const form = useForm<SeachForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  items-center justify-between gap-3 border-gray-600 border-2 p-3 rounded-full sm">
        <Search className="hidden md:block" />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeHolder}
                  className="border-none shadow-none md:text-xl focus-visible:bg-none focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-2 md:text-xl">
          <Button
            type="button"
            onClick={handleReset}
            variant="outline"
            className="rounded-full">
            Reset
          </Button>
          <Button
            type="submit"
            className="rounded-full hover:bg-white hover:text-black">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
