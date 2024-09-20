import { AddAgentProps } from "@/types/agent";
import Button from "./Button";
import Image from "next/image";

const DeleteListing = ({ isOpen, onClose }: AddAgentProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-background-gray bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[10px] z-10 flex flex-col gap-12 2xl:w-[623px] p-[51px]">
        <h2 className="text-[20px] leading-[24px] text-center">
          გსურთ წაშალოთ ლისტინგი?
        </h2>
        <div className="flex justify-center items-center gap-4">
          <Button
            type="button"
            title="გაუქმება"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[13px] px-[18px] text-button-tomato bg-text-white border border-button-tomato"
            action={onClose}
          />
          <Button
            type="submit"
            title="დადასტურება"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[14px] px-[18px] bg-button-tomato text-white"
            link="/"
            // action={handleSubmit(onSubmit)}
          />
        </div>
        <div
          className="absolute top-6 right-7 cursor-pointer p-1"
          onClick={onClose}
        >
          <Image src="/icons/close.png" alt="close" width={12} height={12} />
        </div>
      </div>
    </div>
  );
};

export default DeleteListing;
