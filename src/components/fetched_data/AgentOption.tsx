import React, { useEffect, useState } from "react";
import axios from "axios";

interface Agent {
  id: number;
  name: string;
  surname: string;
}

const AgentOption: React.FC = () => {
  const [agentData, setAgentData] = useState<Agent[]>([]);
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}agents`;

  useEffect(() => {
    if (!API_URL || !API_TOKEN) {
      console.error("API_URL or API_TOKEN is undefined");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<Agent[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setAgentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL, API_TOKEN]);

  return (
    <>
      {agentData.map((agent) => (
        <option key={agent.id} value={agent.name}>
          {agent.name} {agent.surname}
        </option>
      ))}
    </>
  );
};

export default AgentOption;
