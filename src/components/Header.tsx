"use client";

import Image from "next/image";

const Header = () => {
  return (
    <div className="paddingX py-[37.5px] border-b-[1px] border-[#DBDBDB]">
      <div onClick={() => window.location.reload()} className="cursor-pointer">
        <Image src="/logo.png" alt="logo" width={150} height={24} />
      </div>
    </div>
  );
};

export default Header;
