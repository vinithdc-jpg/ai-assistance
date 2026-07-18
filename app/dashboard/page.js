import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import WelcomeHeader from "@/components/WelcomeHeadher";
import StatsCards from "@/components/StatsCards";
import RecentConversations from "@/components/RecentConversation";
import RecentActivity from "@/components/RecentActivity";
import InsightsBanner from "@/components/InsignBanner";
import DashboardFooter from "@/components/DashBoardFooter";

export default function DashboardPage() {
  return (

    < div className="flex h-screen bg-surface overflow-hidden" >
      <SideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        {/* 2. Allow only the main panel to scroll if content overflows */}
        <main className="flex-1 space-y-6 px-6 py-6 overflow-y-auto">
          <WelcomeHeader name="Alex" />
          <StatsCards />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentConversations />
            </div>
            <RecentActivity />
          </div>

          <InsightsBanner />
          <DashboardFooter />
        </main>
      </div>
    </div >
  );
}
