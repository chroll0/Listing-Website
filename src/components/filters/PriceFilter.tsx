import Button from "../Button";

interface PriceFilterProps {
  priceRange: { min: number; max: number }[];
}

const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange }) => {
  return (
    <div className="absolute top-20 left-[138px] border border-[#DBDBDB] rounded-[10px] p-[24px] bg-white flex flex-col gap-5 z-10 w-1/2">
      <p className="text-[16px] font-semibold">ფასის მიხედვით</p>

      <div className="flex gap-6">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="დან"
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            ₾
          </span>
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="მდე"
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            ₾
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-4 pb-4">
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მინ. ფასი
          </p>
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მაქს. ფასი
          </p>
        </div>
        <div>
          {priceRange.map((item, index) => (
            <div key={index} className="flex gap-4 text-[14px]">
              <p className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]">
                {item.min.toLocaleString()} ₾
              </p>
              <p className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]">
                {item.max.toLocaleString()} ₾
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          title="არჩევა"
          variant="text-[14px] font-medium leading-[16.8px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
