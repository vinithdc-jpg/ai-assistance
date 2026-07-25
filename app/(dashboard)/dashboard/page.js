import WelcomeHeader from "@/components/WelcomeHeadher";
import StatsCards from "@/components/StatsCards";
import RecentConversations from "@/components/RecentConversation";
import RecentActivity from "@/components/RecentActivity";
import InsightsBanner from "@/components/InsignBanner";
import DashboardFooter from "@/components/DashBoardFooter";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
