import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetConsentLinkResponse as GetConsentLinkResponseData } from "./types/index.js";

/**
 * Parameters of the GetConsentLink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetConsentLinkRequestParameters {
  redirectUrl: string;
}

/**
 * GetConsentLink request message
 *
 * Web API Action: GetConsentLink
 *
 * The first argument is the id of the connectioninstance record to call it on.
 */
export class GetConsentLinkRequest
  extends OrganizationRequest
  implements Executable<GetConsentLinkResponse>
{
  declare readonly Parameters: Readonly<GetConsentLinkRequestParameters>;

  constructor(
    public connectioninstanceId: string,
    parameters: GetConsentLinkRequestParameters
  ) {
    super("GetConsentLink", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.GetConsentLink`;

    const body = requestBody({
      redirectUrl: this.Parameters.redirectUrl,
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

  async parseResponse(response: Response): Promise<GetConsentLinkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetConsentLinkResponse.fromResponse({});
    return GetConsentLinkResponse.fromResponse(await response.json());
  }
}

/**
 * GetConsentLink response message
 */
export class GetConsentLinkResponse extends OrganizationResponse {
  constructor(public result: GetConsentLinkResponseData) {
    super("GetConsentLink");
  }

  static fromResponse(data: unknown): GetConsentLinkResponse {
    return new GetConsentLinkResponse(responseObject<GetConsentLinkResponseData>(data));
  }
}
