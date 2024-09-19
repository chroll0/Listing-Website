import { AddAgentProps } from "@/types/listing";
import Button from "./Button";

const AddAgent: React.FC<AddAgentProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-background-gray bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-[10px] z-10 flex flex-col gap-6">
        <h1 className="text-center text-2xl font-bold mb-4">
          აგენტის დამატება
        </h1>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block mb-2 text-[14px] font-medium leading-[16.8px]"
          >
            სახელი
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            title="გაუქმება"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[14px] px-[18px] text-button-tomato bg-text-white border border-button-tomato"
            link="/"
            action={onClose}
          />
          <Button
            type="button"
            title="დაამატე აგენტი"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[14px] px-[18px] bg-button-tomato text-white"
            link="/"
            action={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
