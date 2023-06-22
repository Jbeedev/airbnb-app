"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/libs/hooks/useRegisterModal";
import useLoginModal from "@/libs/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/libs/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();

  const useRent = useCallback(() => {
    if(!currentUser){ return loginModal.onOpen()};

    // open rentModal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={useRent}
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[48vw] bg-white md:w-3/4 overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer ">
            {currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Trips" />
                <MenuItem onClick={registerModal.onOpen} label="My favourite" />
                <MenuItem onClick={registerModal.onOpen} label="My reservations" />
                <MenuItem onClick={registerModal.onOpen} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Sign out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
