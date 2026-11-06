import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { sitemap } from "./types/index.js";

/**
 * Response from msdyn_SiteMapDiagnosis action
 */
export interface msdyn_SiteMapDiagnosisResponse {
  HelpLink: string;
  Message: string;
  RepairIssueType: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_SiteMapDiagnosis action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SiteMapDiagnosisActionParameters {
  IssueType: string;
  ComponentInstance: EntityReference | EntityPayload<sitemap>;
}

/**
 * msdyn_SiteMapDiagnosis action
 *
 * Unbound action
 */
export class msdyn_SiteMapDiagnosisAction implements Executable<msdyn_SiteMapDiagnosisResponse> {
  constructor(public readonly parameters: msdyn_SiteMapDiagnosisActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapDiagnosis`;

    const body = requestBody({
      IssueType: this.parameters.IssueType,
      ComponentInstance: this.parameters.ComponentInstance,
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

  async parseResponse(response: Response): Promise<msdyn_SiteMapDiagnosisResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SiteMapDiagnosisResponse;
    return (await response.json()) as msdyn_SiteMapDiagnosisResponse;
  }
}
