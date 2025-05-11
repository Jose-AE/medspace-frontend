"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar/Avatar";

interface Props {
  pfpPath: string;
}

export default function UserRightSection({ pfpPath }: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function onLogout() {
    await AuthService.signOut();
    router.push("/");
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center space-x-4 border border-gray-300 rounded-full p-2 hover:bg-gray-50 cursor-pointer"
      >
        <RxHamburgerMenu className="size-7 p-1 mr-2 ml-1" />
        <Avatar imageUrl={pfpPath} className="size-7" />
      </button>

      {/* Dropdown with transition */}
      <div
        className={`overflow-hidden absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50 transform transition-all duration-200 ease-out
              ${menuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
            `}
      >
        <ul className="flex flex-col text-sm text-gray-700">
          <li>
            <Link
              href="/main/user/edit-profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
