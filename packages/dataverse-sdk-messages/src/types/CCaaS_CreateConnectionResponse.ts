/**
 * CCaaS_CreateConnectionResponse complex type
 */
export interface CCaaS_CreateConnectionResponse {
  ActiveBrowserSessions?: number;
  AgentId?: string;
  AgentName?: string;
  AllowedChannels?: string[];
  CurrentPresenceStatusInfo?: string;
  DisabledChannels?: string[];
  PresenceId?: string;
  Timestamp?: number;
}
