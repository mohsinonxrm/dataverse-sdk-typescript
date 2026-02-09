/**
 * CCaaS_ResetAgentPresenceResponse
 */
export interface CCaaS_ResetAgentPresenceResponse {
  ActiveBrowserSessions?: number;
  DisabledChannels?: string[];
  AllowedChannels?: string[];
  AgentId?: string;
  AgentName?: string;
  CurrentPresenceStatusInfo?: string;
  PresenceId?: string;
  Timestamp?: number;
}
