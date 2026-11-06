/**
 * CCaaS_ResetAgentPresenceResponse
 */
export interface CCaaS_ResetAgentPresenceResponse {
  ActiveBrowserSessions?: number;
  AgentId?: string;
  AgentName?: string;
  AllowedChannels?: string[];
  CurrentPresenceStatusInfo?: string;
  DisabledChannels?: string[];
  PresenceId?: string;
  Timestamp?: number;
}
