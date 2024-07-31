import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col justify-between gap-5 lg:flex-row lg:items-center lg:mb-4">
      <span className="flex flex-col lg:flex-row items-center gap-2">
        {total} restaurant found in {city}
        <Link
          to={"/"}
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
