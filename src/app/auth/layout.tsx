import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard guestOnly redirectPath="/main">
      <Navbar />
      {children}
    </AuthGuard>
  );
}
