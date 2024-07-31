import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "@/api/SearchRestaurantApi";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultCard from "@/components/SearchResultCard";
import { useState } from "react";
import SearchBar, { SeachForm } from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisinesFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";

export type searchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

function SearchPage() {
  const { city } = useParams();

  // state to handle queries.
  const [searchState, setSearchState] = useState<searchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const { results } = useSearchRestaurants(searchState, city as string);

  // handle searchQuery
  const setSearchQuery = (searchFormData: SeachForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  // handle pagination
  const onPageChange = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // handle cuisines
  const onCuisineChange = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  // handle sortOption
  const onSortOptionChange = (value: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption: value,
      page: 1,
    }));
  };

  // handle reset search form
  const onReset = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (!results?.data || !city) {
    return <h3>Sorry!! No restaurants found</h3>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div id="cuisines-list">
        <CuisineFilter
          isExpanded={isExpanded}
          onChange={onCuisineChange}
          selectedCuisines={searchState.selectedCuisines}
          onExpandClick={() => setIsExpanded((prevState) => !prevState)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by restaurant or cuisine"
          onReset={onReset}
        />
        <div className="flex justify-between items-center flex-col gap-3 lg:flex-row ">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            onChange={onSortOptionChange}
            sortOption={searchState.sortOption}
          />
        </div>

        {results?.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default SearchPage;
