import React, { useEffect } from "react";
import axios from "axios";
import { Region } from "@/types/listing";

interface RegionsOptionProps {
  regionsData: Region[];
  setRegionsData: (data: Region[]) => void;
}

const RegionsOption: React.FC<RegionsOptionProps> = ({
  regionsData,
  setRegionsData,
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL, API_TOKEN]);

  return (
    <>
      {regionsData.map((region) => (
        <option key={region.id} value={region.id}>
          {region.name}
        </option>
      ))}
    </>
  );
};

export default RegionsOption;
