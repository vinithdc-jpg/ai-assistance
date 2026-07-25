"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import TicketList from "@/components/tickets/TicketList";
import TicketFilters from "@/components/tickets/TicketFilters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Pagination from "@/components/ui/Pagination";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  priority: "",
  category: "",
  assignedAgent: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [agents, setAgents] = useState([]);
  const [userRole, setUserRole] = useState("customer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val && key !== "page") params.set(key, val);
    });
    params.set("page", String(filters.page));
    params.set("limit", String(ITEMS_PER_PAGE));

    try {
      const res = await fetch(`/api/tickets?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load tickets.");
        return;
      }
      setTickets(data.data);
      setPagination(data.pagination);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success) {
          setUserRole(data.user.role);
          if (data.user.role !== "customer") {
            const agentsRes = await fetch("/api/users/agents");
            const agentsData = await agentsRes.json();
            if (agentsData.success) setAgents(agentsData.agents);
          }
        }
      } catch {
        // silently fail — filters will work without agent list
      }
    }
    loadUser();
  }, []);

  // Debounce search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const displayFilters = { ...filters, search: searchInput };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Tickets</h1>
          <p className="mt-1 text-sm text-muted">
            View and manage your support requests
          </p>
        </div>
        <Link href="/tickets/new" className="btn-primary">
          New Ticket
        </Link>
      </div>

      <div className="rounded-xl2 border border-line bg-white p-5 shadow-card">
        <TicketFilters
          filters={displayFilters}
          onChange={(next) => {
            if (next.search !== searchInput) setSearchInput(next.search);
            setFilters(next);
          }}
          showAgentFilter={userRole !== "customer"}
          agents={agents}
        />
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchTickets} />}

      {loading ? (
        <LoadingSpinner label="Loading tickets..." />
      ) : tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          description="Create a new ticket to get help from our support team."
          action={
            <Link href="/tickets/new" className="btn-primary">
              Create Ticket
            </Link>
          }
        />
      ) : (
        <>
          <TicketList tickets={tickets} />
          <Pagination
            pagination={pagination}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
}
