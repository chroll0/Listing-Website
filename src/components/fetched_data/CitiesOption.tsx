import React, { useEffect, useState } from "react";
import axios from "axios";

const CitiesOption = () => {
  const [citiesData, setCitiesData] = useState<any[]>([]);
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}cities`;

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
        setCitiesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL, API_TOKEN]);

  return (
    <>
      {citiesData.map((city) => (
        <option key={city.id} value={city.name}>
          {city.name}
        </option>
      ))}
    </>
  );
};

export default CitiesOption;
