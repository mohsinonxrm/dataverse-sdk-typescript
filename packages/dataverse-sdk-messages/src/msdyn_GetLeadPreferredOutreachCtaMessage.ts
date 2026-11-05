import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLeadPreferredOutreachCta request message
 *
 * Web API Action: msdyn_GetLeadPreferredOutreachCta
 */
export class msdyn_GetLeadPreferredOutreachCtaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse>
{
  constructor(public msdyn_leadid: string) {
    super("msdyn_GetLeadPreferredOutreachCta");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body: Record<string, unknown> = {
      msdyn_leadid: this.msdyn_leadid,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    const data = await response.json();
    return msdyn_GetLeadPreferredOutreachCtaResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_leadid: this.msdyn_leadid,
    };
  }
}

/**
 * msdyn_GetLeadPreferredOutreachCta response message
 */
export class msdyn_GetLeadPreferredOutreachCtaResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadPreferredOutreachCtaResponse) {
    super("msdyn_GetLeadPreferredOutreachCta");
  }

  static fromResponse(data: unknown): msdyn_GetLeadPreferredOutreachCtaResponse {
    return new msdyn_GetLeadPreferredOutreachCtaResponse((data as any).value);
  }
}
