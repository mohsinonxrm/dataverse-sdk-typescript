import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutoLinkingLeadCustomAction request message
 *
 * Web API Action: msdyn_AutoLinkingLeadCustomAction
 */
export class msdyn_AutoLinkingLeadCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoLinkingLeadCustomActionResponse>
{
  constructor(public autoLinkRequest: string) {
    super("msdyn_AutoLinkingLeadCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoLinkingLeadCustomAction`;

    const body: Record<string, unknown> = {
      AutoLinkRequest: this.autoLinkRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    const data = await response.json();
    return msdyn_AutoLinkingLeadCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AutoLinkRequest: this.autoLinkRequest,
    };
  }
}

/**
 * msdyn_AutoLinkingLeadCustomAction response message
 */
export class msdyn_AutoLinkingLeadCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutoLinkingLeadCustomActionResponse) {
    super("msdyn_AutoLinkingLeadCustomAction");
  }

  static fromResponse(data: unknown): msdyn_AutoLinkingLeadCustomActionResponse {
    return new msdyn_AutoLinkingLeadCustomActionResponse((data as any).value);
  }
}
