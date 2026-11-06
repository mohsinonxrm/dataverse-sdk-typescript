import type { ProposalParty } from './ProposalParty.js';

/**
 * AppointmentProposal complex type
 */
export interface AppointmentProposal {
  End?: string;
  ProposalParties?: ProposalParty[];
  SiteId?: string;
  SiteName?: string;
  Start?: string;
}
