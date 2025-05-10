import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Navbar from "@/components/Navbar";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard redirectPath="/">
      <Navbar />
      {children}
    </AuthGuard>
  );
}
