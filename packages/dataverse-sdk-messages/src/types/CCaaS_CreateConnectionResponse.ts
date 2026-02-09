/**
 * CCaaS_CreateConnectionResponse complex type
 */
export interface CCaaS_CreateConnectionResponse {
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  ActiveBrowserSessions: number;
  AgentId: string;
  Timestamp: number;
  DisabledChannels: string[];
  PresenceId: string;
  AgentName: string;
}
