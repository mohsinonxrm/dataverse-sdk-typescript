/**
 * CCaaS_ResetAgentNextPresenceResponse complex type
 */
export interface CCaaS_ResetAgentNextPresenceResponse {
  ActiveBrowserSessions?: number;
  AgentId?: string;
  AgentName?: string;
  AllowedChannels?: string[];
  CurrentPresenceStatusInfo?: string;
  DisabledChannels?: string[];
  PresenceId?: string;
  Timestamp?: number;
}
