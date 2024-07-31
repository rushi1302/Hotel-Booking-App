import landing from "../assets/landing.png";
import applanding from "../assets/appDownload.png";
import SearchBar, { SeachForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useGetMyOrders } from "@/api/OrderApi";

export default function HomePage() {
  const navigate = useNavigate();
  const { orders } = useGetMyOrders();
  console.log(orders);
  const handleSearchSubmit = (searchFormValue: SeachForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-10 ">
      <div className="bg-white md:px-32 py-8 px-4 flex flex-col gap-5 border-green-300 rounded-lg shadow-lg -mt-16">
        <h1 className="text-center text-green-600 text-5xl tracking-tight">
          Taste at its Best
        </h1>
        <span className="text-green-700 text-center text-2xl tracking-tighter">
          Your Food Is Just One Click Away
        </span>
        <SearchBar
          onSubmit={handleSearchSubmit}
          placeHolder="Search Your Restaurant"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <img src={landing} alt="landing image" />
        <div className="flex flex-col gap-5 justify-center items-center">
          <span className="font-bold text-black text-center ">
            Order Take Away Even Faster
          </span>
          <span className="text-center capitalize">
            Download the City In app for personalised recommendation
          </span>
          <img src={applanding} alt="" />
        </div>
      </div>
    </div>
  );
}
