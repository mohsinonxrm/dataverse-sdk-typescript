import type { ProposalParty } from "./ProposalParty.js";

/**
 * AppointmentProposal complex type
 */
export interface AppointmentProposal {
  Start: string;
  End: string;
  SiteId: string;
  SiteName: string;
  ProposalParties: ProposalParty[];
}
