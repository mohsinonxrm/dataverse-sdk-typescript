import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_PerformChecksForEnrichRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PerformChecksForEnrichRecordResponse {
  "@odata.context"?: string;
  msdyn_MatchingRuleId: string;
  msdyn_ShouldPerformEnrichRecord: boolean;
}

/**
 * Parameters of the msdyn_PerformChecksForEnrichRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PerformChecksForEnrichRecordActionParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_IncludeShadowRule?: boolean;
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
      msdyn_IncludeShadowRule: this.parameters.msdyn_IncludeShadowRule,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_PerformChecksForEnrichRecordResponse;
  }
}
