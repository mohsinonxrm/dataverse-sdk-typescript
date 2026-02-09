import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetConsentLink request message
 *
 * Web API Action: GetConsentLink
 */
export class GetConsentLinkRequest
  extends OrganizationRequest
  implements Executable<GetConsentLinkResponse>
{
  constructor(
    public connectioninstanceId: string,
    public redirectUrl: string
  ) {
    super("GetConsentLink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.GetConsentLink`;

    const body: Record<string, unknown> = {
      redirectUrl: this.redirectUrl,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetConsentLinkResponse> {
    const data = await response.json();
    return GetConsentLinkResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.connectioninstanceId,
      redirectUrl: this.redirectUrl,
    };
  }
}

/**
 * GetConsentLink response message
 */
export class GetConsentLinkResponse extends OrganizationResponse {
  constructor(public result: GetConsentLinkResponse) {
    super("GetConsentLink");
  }

  static fromResponse(data: unknown): GetConsentLinkResponse {
    return new GetConsentLinkResponse((data as any).value);
  }
}
