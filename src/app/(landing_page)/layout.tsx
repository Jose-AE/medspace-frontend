import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard guestOnly redirectPath="/main">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </AuthGuard>
  );
}
