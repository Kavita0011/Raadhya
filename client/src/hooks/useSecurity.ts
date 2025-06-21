import { useQuery } from "@tanstack/react-query";
import type { SecurityStatus, SecurityEvent } from "@/lib/types";

export function useSecurity(sessionId: string | null) {
  const statsQuery = useQuery({
    queryKey: ["/api/security/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const eventsQuery = useQuery({
    queryKey: ["/api/security/events", sessionId],
    enabled: !!sessionId,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const securityStatus: SecurityStatus = {
    threatsBlocked: statsQuery.data?.threatsBlocked || 0,
    safeSessions: statsQuery.data?.safeSessions || 0,
    isProtected: true,
    lastThreatDetected: eventsQuery.data?.[0]?.timestamp 
      ? new Date(eventsQuery.data[0].timestamp) 
      : undefined,
  };

  return {
    securityStatus,
    securityEvents: eventsQuery.data || [],
    isLoading: statsQuery.isLoading || eventsQuery.isLoading,
  };
}
