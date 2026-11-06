import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SiteMapRepair action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SiteMapRepairResponse {
  "@odata.context"?: string;
  HelpLink: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * Parameters of the msdyn_SiteMapRepair action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SiteMapRepairActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SiteMapRepair action
 *
 * Unbound action
 */
export class msdyn_SiteMapRepairAction implements Executable<msdyn_SiteMapRepairResponse> {
  constructor(public readonly parameters: msdyn_SiteMapRepairActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapRepair`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_SiteMapRepairResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SiteMapRepairResponse;
  }
}
