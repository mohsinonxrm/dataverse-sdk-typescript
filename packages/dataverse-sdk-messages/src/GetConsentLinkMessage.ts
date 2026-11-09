import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/connectioninstances(${odataLiteral.guid(this.connectioninstanceId)})/Microsoft.Dynamics.CRM.GetConsentLink`;

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
    // The body is the complex value, with its @odata.context
    return GetConsentLinkResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetConsentLink action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetConsentLinkResult {
  "@odata.context"?: string;
  consentLink: string;
  customParameters: string;
  firstPartyLoginUri: string;
  parameterConsentLinks: string;
  principalId: string;
  principalType: string;
  redirectUrl: string;
  tenantId: string;
}

/**
 * GetConsentLink response message
 *
 * `result` is the value the GetConsentLink action returns (see {@link GetConsentLinkResult}).
 */
export class GetConsentLinkResponse extends OrganizationResponse {
  constructor(public result: GetConsentLinkResult) {
    super("GetConsentLink");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetConsentLinkResponse {
    return new GetConsentLinkResponse(data as GetConsentLinkResult);
  }
}
