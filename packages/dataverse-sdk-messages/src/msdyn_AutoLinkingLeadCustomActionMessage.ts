import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AutoLinkingLeadCustomActionResponse as msdyn_AutoLinkingLeadCustomActionResponseData } from "./types/index.js";

/**
 * msdyn_AutoLinkingLeadCustomAction request message
 *
 * Web API Action: msdyn_AutoLinkingLeadCustomAction
 */
export class msdyn_AutoLinkingLeadCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoLinkingLeadCustomActionResponse>
{
  constructor(public autoLinkRequest?: string) {
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    const data = await response.json();
    return msdyn_AutoLinkingLeadCustomActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_AutoLinkingLeadCustomAction response message
 */
export class msdyn_AutoLinkingLeadCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutoLinkingLeadCustomActionResponseData) {
    super("msdyn_AutoLinkingLeadCustomAction");
  }

  static fromResponse(data: unknown): msdyn_AutoLinkingLeadCustomActionResponse {
    return new msdyn_AutoLinkingLeadCustomActionResponse(
      responseObject<msdyn_AutoLinkingLeadCustomActionResponseData>(data)
    );
  }
}
