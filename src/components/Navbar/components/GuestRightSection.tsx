import Link from "next/link";

export default function GuestRightSection() {
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
