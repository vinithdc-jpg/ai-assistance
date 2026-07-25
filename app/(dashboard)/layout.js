import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <SideBar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
