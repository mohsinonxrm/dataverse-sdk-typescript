/**
 * CCaaS_GetPresenceResponse complex type
 */
export interface CCaaS_GetPresenceResponse {
  AgentName: string;
  AgentId: string;
  DisabledChannels: string[];
  PresenceId: string;
  ActiveBrowserSessions: number;
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  Timestamp: number;
}
