"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { IoIosCheckmark } from "react-icons/io";

import Button from "@/components/Button";
import { City, ListingInfo, listingProps, Region } from "@/types/listing";
import { listingSchema } from "@/components/validations";
import RegionsOption from "@/components/fetched_data/RegionsOption";
import CitiesOption from "@/components/fetched_data/CitiesOption";
import AgentOption from "@/components/fetched_data/AgentOption";

const AddListing = () => {
  const [regionsData, setRegionsData] = useState<Region[]>([]);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);

  const [listInfo, setListInfo] = useState<ListingInfo>({
    listingType: 0,
    address: "",
    postIndex: 0,
    region: "",
    city: "",
    price: 0,
    area: 0,
    bed: 0,
    description: "",
    image: "",
    agent: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(listingSchema),
  });
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: listingProps = (field, value) => {
    const formattedValue = value.toString();

    setListInfo((prevProfile) => ({
      ...prevProfile,
      [field]: formattedValue.trim(),
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setListInfo((prevProfile) => ({
        ...prevProfile,
        image: fileURL,
      }));

      setValue("image", file);
      trigger("image");
    }
  };

  const onSubmit = async (data: ListingInfo) => {
    console.log(data);
    const formData = new FormData();

    // Append fields to FormData
    if (data.image) {
      formData.append("image", String(data.image));
    } else {
      console.error("image is missing.");
      return;
    }
    formData.append("address", String(data.address));
    formData.append("region_id", String(data.region));
    formData.append("description", String(data.description));
    formData.append("zip_code", String(data.postIndex));
    formData.append("price", String(data.price));
    formData.append("area", String(data.area));
    formData.append("is_rental", String(data.listingType ? 1 : 0));
    formData.append("agent_id", String(1305));
    formData.append("bedrooms", String(2));
    formData.append("city_id", String(data.city));

    try {
      const response = await axios.post(`${API_URL}real-estates`, formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Listing added successfully:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Error adding listing:", error);
      // if (error.response) {
      //   console.error("API Error Response:", error.response.data);
      // }
    }
  };

  return (
    <div className="flex flex-col items-center paddingX paddingY gap-14">
      <h1 className="text-[32px] font-medium leading-[38.4px]">
        ლისტინგის დამატება
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 2xl:w-[790px]"
      >
        {/* listing Type */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-8 items-center">
            <h2 className="text-[16px] font-medium">ᲒᲐᲠᲘᲒᲔᲑᲘᲡ ᲢᲘᲞᲘ</h2>
            {errors.listingType && (
              <div className="flex text-button-tomato">
                <IoIosCheckmark className="text-[22px]" />
                <span className="text-[14px]">
                  {errors.listingType.message}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-20">
            <label>
              <input
                type="radio"
                value={1}
                className="mr-2"
                {...register("listingType")}
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                value={0}
                className="mr-2"
                {...register("listingType")}
              />
              ქირავდება
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-medium">ᲛᲓᲔᲑᲐᲠᲔᲝᲑᲐ</h2>
          <div className="flex justify-between gap-8">
            {/* address */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">მისამართი*</label>
              <input
                type="text"
                id="address"
                {...register("address", {
                  onChange: (e) => handleChange("address", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.address
                    ? "border-button-tomato"
                    : watch("address")
                    ? "border-button-green"
                    : ""
                } `}
              />
              {errors.address ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.address.message}</span>
                </div>
              ) : watch("address") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მინიმუმ ორი სიმბოლო</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მინიმუმ ორი სიმბოლო </span>
                </div>
              )}
            </div>

            {/* postIndex */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">
                საფოსტო ინდექსი*
              </label>
              <input
                type="number"
                id="postIndex"
                {...register("postIndex", {
                  onChange: (e) => handleChange("postIndex", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.postIndex
                    ? "border-button-tomato"
                    : watch("postIndex")
                    ? "border-button-green"
                    : ""
                } `}
              />
              {errors.postIndex ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">
                    {errors.postIndex.message}
                  </span>
                </div>
              ) : watch("postIndex") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-8">
            {/* region */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">რეგიონი*</label>
              <select
                {...register("region", {
                  onChange: (e) => {
                    const value = e.target.value;
                    handleChange("region", value);
                    setSelectedRegionId(value);
                  },
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.region
                    ? "border-button-tomato"
                    : watch("region")
                    ? "border-button-green"
                    : ""
                }`}
              >
                <option value="" className="bg-slate-100"></option>
                <RegionsOption
                  regionsData={regionsData}
                  setRegionsData={setRegionsData}
                />
              </select>
              {errors.region ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.region.message}</span>
                </div>
              ) : watch("region") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              )}
            </div>

            {/* city */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">ქალაქი*</label>
              <select
                {...register("city", {
                  onChange: (e) => handleChange("city", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.city
                    ? "border-button-tomato"
                    : watch("city")
                    ? "border-button-green"
                    : ""
                }`}
              >
                <option className="bg-slate-100" value=""></option>
                <CitiesOption
                  citiesData={citiesData}
                  setCitiesData={setCitiesData}
                  selectedRegionId={selectedRegionId}
                />
              </select>
              {errors.city ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.city.message}</span>
                </div>
              ) : watch("city") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-medium">ᲑᲘᲜᲘᲡ ᲓᲔᲢᲐᲚᲔᲑᲘ</h2>
          <div className="flex justify-between gap-8">
            {/* price */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">ფასი*</label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  onChange: (e) => handleChange("price", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.price
                    ? "border-button-tomato"
                    : watch("price")
                    ? "border-button-green"
                    : ""
                } `}
              />
              {errors.price ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.price.message}</span>
                </div>
              ) : watch("price") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              )}
            </div>

            {/* area */}
            <div className="flex-1">
              <label className="text-[14px] font-medium">ფართობი*</label>
              <input
                type="number"
                id="area"
                {...register("area", {
                  onChange: (e) => handleChange("area", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.area
                    ? "border-button-tomato"
                    : watch("area")
                    ? "border-button-green"
                    : ""
                } `}
              />
              {errors.area ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.area.message}</span>
                </div>
              ) : watch("area") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              )}
            </div>
          </div>

          {/* bed */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-[14px] font-medium">
                საძინებლების რაოდენობა*
              </label>
              <input
                type="number"
                id="bed"
                {...register("bed", {
                  onChange: (e) => handleChange("bed", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.bed
                    ? "border-button-tomato"
                    : watch("bed")
                    ? "border-button-green"
                    : ""
                } `}
              />
              {errors.bed ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.bed.message}</span>
                </div>
              ) : watch("bed") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">მხოლოდ რიცხვები</span>
                </div>
              )}
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col mt-4">
            <label className="text-[14px] font-medium">აღწერა*</label>
            <textarea
              id="description"
              {...register("description", {
                onChange: (e) => handleChange("description", e.target.value),
              })}
              className={`w-full p-2 border border-text-slate rounded text-[16px] min-h-[135px] ${
                errors.description
                  ? "border-button-tomato"
                  : watch("description")
                  ? "border-button-green"
                  : ""
              } `}
            />
            {errors.description ? (
              <div className="flex justify-start items-center text-button-tomato">
                <IoIosCheckmark className="text-[22px]" />
                <span className="text-[14px]">
                  {errors.description.message}
                </span>
              </div>
            ) : watch("description") ? (
              <div className="flex justify-start items-center text-button-green">
                <IoIosCheckmark className="text-[22px]" />
                <span className="text-[14px]">მინიმუმ ხუთი სიტყვა</span>
              </div>
            ) : (
              <div className="flex justify-start items-center text-text-black">
                <IoIosCheckmark className="text-[22px]" />
                <span className="text-[14px]">მინიმუმ ხუთი სიტყვა</span>
              </div>
            )}
          </div>

          {/* image */}
          <div className="flex flex-col gap-1 w-full mt-4">
            <label className="text-[14px] font-medium">ატვირთეთ ფოტო*</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={handleButtonClick}
              className="cursor-pointer flex justify-center items-center w-full p-2 rounded text-[16px] h-[120px] border border-dashed border-[#2D3648]"
            >
              {!listInfo.image ? (
                <Image
                  src="/icons/plus.png"
                  alt="plus"
                  width={24}
                  height={24}
                />
              ) : (
                <div className="relative">
                  <Image
                    src={
                      typeof listInfo.image === "string"
                        ? listInfo.image
                        : "Image"
                    }
                    alt={
                      typeof listInfo.image === "string"
                        ? listInfo.image
                        : "Image"
                    }
                    width={92}
                    height={82}
                    className="w-auto h-[82px] rounded-[6px]"
                  />
                  <button
                    onClick={() =>
                      setListInfo((prevProfile) => ({
                        ...prevProfile,
                        image: "",
                      }))
                    }
                    className="absolute bottom-[-8px] right-[-8px] p-1"
                  >
                    <Image
                      src="/icons/trash.png"
                      alt="trash"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              )}
            </div>
            {errors.image ? (
              <span className="text-[14px] text-button-tomato">
                {errors.image.message}
              </span>
            ) : watch("image") ? (
              <span className="text-[14px] text-button-green">
                სავალდებულოა
              </span>
            ) : (
              <span className="text-[14px] text-text-black">სავალდებულოა</span>
            )}
          </div>
        </div>

        {/* agent */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-medium">ᲐᲒᲔᲜᲢᲘ</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex-1">
              <label className="text-[14px] font-medium">აირჩიე</label>
              <select
                {...register("agent", {
                  onChange: (e) => handleChange("agent", e.target.value),
                })}
                className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                  errors.agent
                    ? "border-button-tomato"
                    : watch("agent")
                    ? "border-button-green"
                    : ""
                }`}
              >
                <option className="bg-slate-100" value=""></option>
                {/* <option>+ დაამატე აგენტი</option> */}
                <AgentOption />
              </select>
              {errors.agent ? (
                <div className="flex justify-start items-center text-button-tomato">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">{errors.agent.message}</span>
                </div>
              ) : watch("agent") ? (
                <div className="flex justify-start items-center text-button-green">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              ) : (
                <div className="flex justify-start items-center text-text-black">
                  <IoIosCheckmark className="text-[22px]" />
                  <span className="text-[14px]">სავალდებულოა</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button
            type="button"
            title="გაუქმება"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[11.5px] px-[24.5px] text-button-tomato bg-text-white border border-button-tomato"
            link="/"
          />
          <Button
            type="submit"
            title="დაამატე ლისტინგი"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
            action={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddListing;
