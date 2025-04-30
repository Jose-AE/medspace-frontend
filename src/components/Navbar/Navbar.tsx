"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";

interface Props {
  variant: "tenant" | "landlord" | "analyst" | "guest";
}

const navbarLinks = {
  tenant: [
    { name: "Clinics", href: "/main/tenant/clinics" },
    { name: "Rent Requests", href: "/rent-requests" },
    { name: "Rent Calendar", href: "/rent-calendar" },
    { name: "Notifications", href: "/notifications" }
  ],
  landlord: [
    { name: "Metrics", href: "/metrics" },
    { name: "Rent Requests", href: "/main/landlord/rent-requests" },
    { name: "My Clinics", href: "/my-clinics" },
    { name: "New Clinic", href: "/main/landlord/create-clinic" },
    { name: "Past tenants", href: "/past-tenants" },
    { name: "Notifications", href: "/notifications" }
  ],
  analyst: [
    { name: "Metrics", href: "/main/analyst/metrics" },
    { name: "Notifications", href: "/notifications" }
  ],
  guest: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]
};

export default function Navbar({ variant }: Props) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="w-32" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-primary font-medium">
          {navbarLinks[variant as keyof typeof navbarLinks].map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section */}
        {variant === "guest" ? <GuestRightSection /> : <UserRightSection />}
      </div>
    </nav>
  );
}

function GuestRightSection() {
  return (
    <div className="flex items-center space-x-4">
      <Link
        className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-primary transition-all"
        href="/auth/login"
      >
        Log in
      </Link>
      <Link
        href={"/auth/register"}
        className="font-medium tracking-wide py-2 px-4 border-2 border-primary text-primary bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-primary hover:text-white transition-all "
      >
        Sign up
      </Link>
    </div>
  );
}

function UserRightSection() {
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
        <Avatar imageUrl="/pfp_placeholder.png" className="size-7" />
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
              href="/edit-profile"
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
