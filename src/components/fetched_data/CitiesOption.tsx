import React, { useEffect } from "react";
import axios from "axios";
import { City } from "@/types/listing";

interface CityOptionProps {
  citiesData: City[];
  setCitiesData: (data: City[]) => void;
  selectedRegionId: number | null;
}

const CitiesOption: React.FC<CityOptionProps> = ({
  citiesData,
  setCitiesData,
  selectedRegionId,
}) => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}cities`;

  useEffect(() => {
    if (!API_URL || !API_TOKEN) {
      console.error("API_URL or API_TOKEN is undefined");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<City[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setCitiesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL, API_TOKEN]);

  const filteredCities = citiesData.filter(
    (city) => Number(city.region_id) === Number(selectedRegionId)
  );

  return (
    <>
      {filteredCities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </>
  );
};

export default CitiesOption;
