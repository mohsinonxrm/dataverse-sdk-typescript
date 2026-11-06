import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { sitemap } from "./types/index.js";

/**
 * Parameters of the msdyn_SiteMapDiagnosis message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SiteMapDiagnosisRequestParameters {
  IssueType: string;
  ComponentInstance: EntityReference | EntityPayload<sitemap>;
}

/**
 * msdyn_SiteMapDiagnosis request message
 *
 * Web API Action: msdyn_SiteMapDiagnosis
 */
export class msdyn_SiteMapDiagnosisRequest
  extends OrganizationRequest
  implements Executable<msdyn_SiteMapDiagnosisResponse>
{
  declare readonly Parameters: Readonly<msdyn_SiteMapDiagnosisRequestParameters>;

  constructor(parameters: msdyn_SiteMapDiagnosisRequestParameters) {
    super("msdyn_SiteMapDiagnosis", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapDiagnosis`;

    const body = requestBody({
      IssueType: this.Parameters.IssueType,
      ComponentInstance: this.Parameters.ComponentInstance,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SiteMapDiagnosisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SiteMapDiagnosis action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SiteMapDiagnosisResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  RepairIssueType: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_SiteMapDiagnosis response message
 *
 * `result` is the value the msdyn_SiteMapDiagnosis action returns (see {@link msdyn_SiteMapDiagnosisResult}).
 */
export class msdyn_SiteMapDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapDiagnosisResult) {
    super("msdyn_SiteMapDiagnosis");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SiteMapDiagnosisResponse {
    return new msdyn_SiteMapDiagnosisResponse(data as msdyn_SiteMapDiagnosisResult);
  }
}
