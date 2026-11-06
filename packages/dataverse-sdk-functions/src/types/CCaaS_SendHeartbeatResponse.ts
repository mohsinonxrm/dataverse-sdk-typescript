/**
 * CCaaS_SendHeartbeatResponse complex type
 */
export interface CCaaS_SendHeartbeatResponse {
  ActiveBrowserSessions?: number;
  AgentId?: string;
  AgentName?: string;
  AllowedChannels?: string[];
  CurrentPresenceStatusInfo?: string;
  DisabledChannels?: string[];
  PresenceId?: string;
  Timestamp?: number;
}
