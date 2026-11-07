import type { AppointmentProposal } from "./AppointmentProposal.js";
import type { TraceInfo } from "./TraceInfo.js";

/**
 * SearchResults complex type
 */
export interface SearchResults {
  Proposals?: AppointmentProposal[];
  TraceInfo?: TraceInfo;
}
