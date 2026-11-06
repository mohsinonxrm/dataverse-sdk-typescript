import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SiteMapRepair action
 */
export interface msdyn_SiteMapRepairResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
  HelpLink: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SiteMapRepairResponse;
  }
}
