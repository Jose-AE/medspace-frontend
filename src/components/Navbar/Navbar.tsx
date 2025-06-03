import Link from "next/link";
import Logo from "../Logo/Logo";
import GuestRightSection from "./components/GuestRightSection";
import UserRightSection from "./components/UserRightSection";
import { getUserServerSide } from "../AuthGuard/AuthGuard";

const navbarLinks = {
  tenant: [
    { name: "Clinics", href: "/main/tenant/clinics" },
    { name: "Sent Requests", href: "/main/tenant/my-requests" },
    { name: "Rent Calendar", href: "/main/calendar" },
    { name: "Past Rents", href: "/main/tenant/past-rents" }

    // { name: "Notifications", href: "/notifications" }
  ],
  landlord: [
    { name: "Metrics", href: "/metrics" },
    { name: "Rent Requests", href: "/main/landlord/rent-requests" },
    { name: "My Clinics", href: "/main/landlord/my-clinics" },
    { name: "Rent Calendar", href: "/main/calendar" },
    { name: "Past tenants", href: "/main/landlord/past-tenants" }
    // { name: "Notifications", href: "/notifications" }
  ],
  analyst: [
    { name: "Metrics", href: "/main/analyst/metrics" }
    // { name: "Notifications", href: "/notifications" }
  ],
  guest: [
    // { name: "Home", href: "/" },
    // { name: "About", href: "/about" },
    // { name: "Contact", href: "/contact" }
  ]
};

export default async function Navbar() {
  const user = await getUserServerSide();
  const variant = user?.userType.toLocaleLowerCase() || "guest";

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
        {variant === "guest" ? (
          <GuestRightSection />
        ) : (
          <UserRightSection pfpPath={user?.pfpPath || ""} />
        )}
      </div>
    </nav>
  );
}
