import type { ProposalParty } from "./ProposalParty.js";

/**
 * AppointmentProposal
 */
export interface AppointmentProposal {
  Start?: string;
  End?: string;
  SiteId?: string;
  SiteName?: string;
  ProposalParties?: ProposalParty[];
}
