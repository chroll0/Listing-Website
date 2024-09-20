import React, { useEffect, useState } from "react";
import axios from "axios";

const RegionsOption = () => {
  const [regionsData, setRegionsData] = useState<any[]>([]);
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

  return (
    <>
      {regionsData.map((region) => (
        <option key={region.id} value={region.name}>
          {region.name}
        </option>
      ))}
    </>
  );
};

export default RegionsOption;
