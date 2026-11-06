import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_SiteMapDiagnosisResponse as msdyn_SiteMapDiagnosisResponseData,
  sitemap,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SiteMapDiagnosisResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SiteMapDiagnosis response message
 */
export class msdyn_SiteMapDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapDiagnosisResponseData) {
    super("msdyn_SiteMapDiagnosis");
  }

  static fromResponse(data: unknown): msdyn_SiteMapDiagnosisResponse {
    return new msdyn_SiteMapDiagnosisResponse(
      responseObject<msdyn_SiteMapDiagnosisResponseData>(data)
    );
  }
}
