import { ButtonProps } from "@/types/button";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Button = ({ type, title, icon, variant, link, action }: ButtonProps) => {
  const renderTitle = (title: string | ReactNode) => {
    if (typeof title === "string") {
      return title;
    }
    return null;
  };

  return (
    <Link href={link || "#"} prefetch={false}>
      <button
        className={`transition-all ${variant}`}
        type={type}
        onClick={action}
      >
        {icon && (
          <div className="mr-3">
            <Image
              src={icon}
              alt={renderTitle(title) || "icon"}
              width={20}
              height={20}
            />
          </div>
        )}
        {title}
      </button>
    </Link>
  );
};

export default Button;
