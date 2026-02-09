import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_PerformChecksForEnrichRecord action
 */
export interface msdyn_PerformChecksForEnrichRecordResponse {
  msdyn_ShouldPerformEnrichRecord: boolean;
}

/**
 * msdyn_PerformChecksForEnrichRecord action
 *
 * Unbound action
 */
export class msdyn_PerformChecksForEnrichRecordAction implements Executable<msdyn_PerformChecksForEnrichRecordResponse> {
  constructor(public readonly msdyn_Target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformChecksForEnrichRecord`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PerformChecksForEnrichRecordResponse> {
    const data = await response.json();
    return data as msdyn_PerformChecksForEnrichRecordResponse;
  }
}
