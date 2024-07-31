import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  menu: MenuItem;
  addToCard: () => void;
};

const MenuItems = ({ menu, addToCard }: Props) => {
  return (
    <Card className="cursor-pointer border-slate-400" onClick={addToCard}>
      <CardHeader className="text-xl">{menu.name}</CardHeader>
      <CardContent className="font-bold">${menu.price / 100}</CardContent>
    </Card>
  );
};

export default MenuItems;
