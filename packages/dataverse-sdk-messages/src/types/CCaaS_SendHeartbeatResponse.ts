/**
 * CCaaS_SendHeartbeatResponse complex type
 */
export interface CCaaS_SendHeartbeatResponse {
  AgentId: string;
  ActiveBrowserSessions: number;
  DisabledChannels: string[];
  PresenceId: string;
  CurrentPresenceStatusInfo: string;
  Timestamp: number;
  AgentName: string;
  AllowedChannels: string[];
}
