import LeftNavigation from "@/components/leftNavigation";
import RightNavigation from "@/components/rightNavigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  setTimeout(() => {
    if (!isAuthenticated && !user) {
      router.push("/auth/login");
    }
  }, 1000);

  return (
    <div className="flex h-screen">
      {isAuthenticated && (
        <aside className="w-72">
          <LeftNavigation />
        </aside>
      )}
      <main className="flex-1 p-4">{children}</main>
      {isAuthenticated &&
        !(router.pathname == "/settings") &&
        !(router.pathname == "/messages") && (
          <aside>
            <RightNavigation />
          </aside>
        )}
    </div>
  );
};

export default Layout;
