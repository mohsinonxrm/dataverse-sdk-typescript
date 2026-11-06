import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_PerformChecksForEnrichRecord action
 */
export interface msdyn_PerformChecksForEnrichRecordResponse {
  msdyn_ShouldPerformEnrichRecord: boolean;
}

/**
 * Parameters of the msdyn_PerformChecksForEnrichRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PerformChecksForEnrichRecordActionParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_PerformChecksForEnrichRecord action
 *
 * Unbound action
 */
export class msdyn_PerformChecksForEnrichRecordAction implements Executable<msdyn_PerformChecksForEnrichRecordResponse> {
  constructor(public readonly parameters: msdyn_PerformChecksForEnrichRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformChecksForEnrichRecord`;

    const body = requestBody({
      msdyn_Target: this.parameters.msdyn_Target,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PerformChecksForEnrichRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PerformChecksForEnrichRecordResponse;
    return (await response.json()) as msdyn_PerformChecksForEnrichRecordResponse;
  }
}
