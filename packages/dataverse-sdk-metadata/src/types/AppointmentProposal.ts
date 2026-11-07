import type { ProposalParty } from "./ProposalParty.js";

/**
 * AppointmentProposal
 */
export interface AppointmentProposal {
  End?: string;
  ProposalParties?: ProposalParty[];
  SiteId?: string;
  SiteName?: string;
  Start?: string;
}
