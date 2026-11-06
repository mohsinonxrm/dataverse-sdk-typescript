import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_MarkAgreementAsExpiredResponse as msdyn_MarkAgreementAsExpiredResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_MarkAgreementAsExpired message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MarkAgreementAsExpiredRequestParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_MarkAgreementAsExpired request message
 *
 * Web API Action: msdyn_MarkAgreementAsExpired
 */
export class msdyn_MarkAgreementAsExpiredRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarkAgreementAsExpiredResponse>
{
  declare readonly Parameters: Readonly<msdyn_MarkAgreementAsExpiredRequestParameters>;

  constructor(parameters: msdyn_MarkAgreementAsExpiredRequestParameters) {
    super("msdyn_MarkAgreementAsExpired", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkAgreementAsExpired`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_MarkAgreementAsExpiredResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_MarkAgreementAsExpiredResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_MarkAgreementAsExpired response message
 */
export class msdyn_MarkAgreementAsExpiredResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarkAgreementAsExpiredResponseData) {
    super("msdyn_MarkAgreementAsExpired");
  }

  static fromResponse(data: unknown): msdyn_MarkAgreementAsExpiredResponse {
    return new msdyn_MarkAgreementAsExpiredResponse(
      responseObject<msdyn_MarkAgreementAsExpiredResponseData>(data)
    );
  }
}
