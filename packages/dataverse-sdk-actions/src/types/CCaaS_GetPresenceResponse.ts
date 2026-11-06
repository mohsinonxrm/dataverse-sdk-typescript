/**
 * CCaaS_GetPresenceResponse complex type
 */
export interface CCaaS_GetPresenceResponse {
  ActiveBrowserSessions?: number;
  AgentId?: string;
  AgentName?: string;
  AllowedChannels?: string[];
  CurrentPresenceStatusInfo?: string;
  DisabledChannels?: string[];
  PresenceId?: string;
  Timestamp?: number;
}
