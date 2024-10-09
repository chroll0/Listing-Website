import { Listing } from "@/types/listing";
import Image from "next/image";

const AgentInfo = ({ agent }: { agent: Listing["agent"] }) => {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/(\d{3})(\d{3})(\d{3})/);
    return match ? `${match[1]} ${match[2]} ${match[3]}` : cleaned || "";
  };

  return (
    <div className="flex flex-col gap-2 border rounded-[8px] border-background-lightGray px-4 py-6">
      <div className="flex gap-4 items-center">
        <Image
          src={agent.avatar}
          alt={agent.avatar}
          width={72}
          height={72}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-[16px] leading-[19.2px] text-text-black font-medium">
            {agent.name} {agent.surname}
          </p>
          <span className="text-button-gray text-[14px]">აგენტი</span>
        </div>
      </div>
      <div className="flex flex-col text-button-gray gap-1">
        <div className="flex items-center gap-3">
          <Image src="/icons/email.png" alt="email" width={20} height={20} />
          <span>{agent.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/icons/phone.png" alt="phone" width={20} height={20} />
          <span>{formatPhoneNumber(agent.phone)}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentInfo;
