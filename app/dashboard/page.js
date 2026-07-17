import SideBar from "@/components/SideBar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <SideBar />
      <main className="flex-1 p-8">
        <h1 className="font-display text-2xl font-bold text-ink">
          Conversations
        </h1>
        <p className="mt-1 text-sm text-muted">
          Everything the agent is handling right now.
        </p>

        <div className="mt-6 rounded-xl2 border border-line bg-white p-8 shadow-card">
          <p className="text-sm text-muted">
            Drop your conversation list, table, or chat view here — the
            sidebar stays fixed alongside it.
          </p>
        </div>
      </main>
    </div>
  );
}
