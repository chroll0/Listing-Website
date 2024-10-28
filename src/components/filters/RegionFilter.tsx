import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import { RegionsOptionProps } from "@/types/filters";

const RegionFilter: React.FC<RegionsOptionProps> = ({
  regionsData,
  setRegionsData,
  filters,
  setFilters,
  toggleFilter,
}) => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}regions`;

  useEffect(() => {
    if (!API_URL || !API_TOKEN) {
      console.error("API_URL or API_TOKEN is undefined");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setRegionsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL, API_TOKEN]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    filters.region || null
  );

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedRegion(value);
  };

  const handleButtonClick = () => {
    setFilters({ ...filters, region: selectedRegion });
    toggleFilter("region");
  };

  return (
    <div className="absolute top-20 left-0 border border-[#DBDBDB] rounded-[10px] p-[24px] bg-white flex flex-col gap-5 z-10 w-full">
      <p className="text-[16px] font-semibold">რეგიონის მიხედვით</p>

      <div className="grid grid-cols-3 gap-3">
        {regionsData.map((region) => (
          <div className="flex gap-2 items-center w-full" key={region.id}>
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                name={region.name}
                id={region.name}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-[#DBDBDB] checked:bg-green-600 checked:border-transparent"
                value={region.name}
                checked={selectedRegion === region.name}
                onChange={handleChange}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <p className="text-[14px] font-normal leading-[16.8px]">
              {region.name}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          title="არჩევა"
          variant="text-[14px] font-medium leading-[16.8px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
          action={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default RegionFilter;
