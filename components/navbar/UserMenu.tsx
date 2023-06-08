"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal()

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleMenu}
          className="hidden font-semibold md:block text-sm py-3 px-4 rounded-full
            hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 md:p-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
        >
          <AiOutlineMenu />
          <div className="hideen md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[48vw] bg-white md:w-3/4 overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer ">
            <>
              <MenuItem onClick={registerModal.onClose} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
