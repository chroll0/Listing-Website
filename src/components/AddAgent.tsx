"use client";

import Button from "./Button";
import { agentSchema } from "./validations";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddAgentProps, handleChangeProps } from "@/types/agent";
import Image from "next/image";

const AddAgent: React.FC<AddAgentProps> = ({ isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    number: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agentSchema),
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange: handleChangeProps = (field, value) => {
    let formattedValue = value.toString();

    if (field === "number") {
      // Remove non-digit characters
      formattedValue = formattedValue.replace(/\D/g, "");
      // Format the phone number as "+995 XXX XX XX XX"
      if (formattedValue.length > 0) {
        formattedValue = "+995 " + formattedValue.slice(3);
      }
      if (formattedValue.length > 6) {
        formattedValue =
          formattedValue.slice(0, 8) + " " + formattedValue.slice(8);
      }
      if (formattedValue.length > 9) {
        formattedValue =
          formattedValue.slice(0, 11) + " " + formattedValue.slice(11);
      }
      if (formattedValue.length > 12) {
        formattedValue =
          formattedValue.slice(0, 14) + " " + formattedValue.slice(14);
      }
      if (formattedValue.length >= 17) {
        formattedValue = formattedValue.slice(0, 17);
      }
      setValue(field, formattedValue.trim());
    }

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: formattedValue.trim(),
    }));
  };

  const onSubmit = () => {
    // console.log("Form submitted:", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-background-gray bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-[10px] z-10 flex flex-col gap-12 2xl:w-[1009px] p-24">
        <h1 className="text-center text-2xl font-bold mb-4">
          აგენტის დამატება
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              {/* სახელი */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="firstName"
                  className="block text-[14px] font-medium leading-[16.8px]"
                >
                  სახელი*
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    onChange: (e) => handleChange("firstName", e.target.value),
                  })}
                  className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                    errors.firstName
                      ? "border-button-tomato"
                      : watch("firstName")
                      ? "border-button-green"
                      : ""
                  } `}
                />
                {errors.firstName ? (
                  <div className="flex justify-start items-center text-button-tomato">
                    <IoIosCheckmark />
                    <span className="text-[14px]">
                      {errors.firstName.message}
                    </span>
                  </div>
                ) : watch("firstName") ? (
                  <div className="flex justify-start items-center text-button-green">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მინიმუმ ორი სიმბოლო</span>
                  </div>
                ) : (
                  <div className="flex justify-start items-center text-text-black">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მინიმუმ ორი სიმბოლო</span>
                  </div>
                )}
              </div>
              {/* გვარი */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="lastName"
                  className="block text-[14px] font-medium leading-[16.8px]"
                >
                  გვარი*
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    onChange: (e) => handleChange("lastName", e.target.value),
                  })}
                  className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                    errors.lastName
                      ? "border-button-tomato"
                      : watch("lastName")
                      ? "border-button-green"
                      : ""
                  } `}
                />
                {errors.lastName ? (
                  <div className="flex justify-start items-center text-button-tomato">
                    <IoIosCheckmark />
                    <span className="text-[14px]">
                      {errors.lastName.message}
                    </span>
                  </div>
                ) : watch("lastName") ? (
                  <div className="flex justify-start items-center text-button-green">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მინიმუმ ორი სიმბოლო</span>
                  </div>
                ) : (
                  <div className="flex justify-start items-center text-text-black">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მინიმუმ ორი სიმბოლო</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-8">
              {/* მეილი */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="email"
                  className="block text-[14px] font-medium leading-[16.8px]"
                >
                  ელ-ფოსტა*
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    onChange: (e) => handleChange("email", e.target.value),
                  })}
                  className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                    errors.email
                      ? "border-button-tomato"
                      : watch("email")
                      ? "border-button-green"
                      : ""
                  } `}
                />
                {errors.email ? (
                  <div className="flex justify-start items-center text-button-tomato">
                    <IoIosCheckmark />
                    <span className="text-[14px]">{errors.email.message}</span>
                  </div>
                ) : watch("email") ? (
                  <div className="flex justify-start items-center text-button-green">
                    <IoIosCheckmark />
                    <span className="text-[14px]">
                      გამოიყენეთ @redberry.ge ფოსტა
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-start items-center text-text-black">
                    <IoIosCheckmark />
                    <span className="text-[14px]">
                      გამოიყენეთ @redberry.ge ფოსტა
                    </span>
                  </div>
                )}
              </div>
              {/* ნომერი */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="number"
                  className="block text-[14px] font-medium leading-[16.8px]"
                >
                  ტელეფონის ნომერი*
                </label>
                <input
                  type="tel"
                  id="number"
                  {...register("number", {
                    onChange: (e) => handleChange("number", e.target.value),
                  })}
                  className={`w-full p-2 border border-text-slate rounded text-[16px] ${
                    errors.number
                      ? "border-button-tomato"
                      : watch("number")
                      ? "border-button-green"
                      : ""
                  } `}
                />
                {errors.number ? (
                  <div className="flex justify-start items-center text-button-tomato">
                    <IoIosCheckmark />
                    <span className="text-[14px]">{errors.number.message}</span>
                  </div>
                ) : watch("number") ? (
                  <div className="flex justify-start items-center text-button-green">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მხოლოდ რიცხვები</span>
                  </div>
                ) : (
                  <div className="flex justify-start items-center text-text-black">
                    <IoIosCheckmark />
                    <span className="text-[14px]">მხოლოდ რიცხვები</span>
                  </div>
                )}
              </div>
            </div>

            {/* სურათი */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[14px] font-medium leading-[16.8px]">
                ატვირთეთ ფოტო*
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="flex justify-center items-center w-full p-2 rounded text-[16px] h-[120px] border border-dashed border-[#2D3648]"
              >
                {!userProfile.image ? (
                  <Image
                    src="/icons/plus.png"
                    alt="plus"
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className="relative">
                    <Image
                      src={userProfile.image}
                      alt={userProfile.image}
                      width={92}
                      height={82}
                      className="w-auto h-[82px] rounded-[6px]"
                    />
                    <button
                      onClick={() =>
                        setUserProfile((prevProfile) => ({
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
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            title="გაუქმება"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[13px] px-[18px] text-button-tomato bg-text-white border border-button-tomato"
            action={onClose}
          />
          <Button
            type="submit"
            title="დაამატე აგენტი"
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[14px] px-[18px] bg-button-tomato text-white"
            action={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
