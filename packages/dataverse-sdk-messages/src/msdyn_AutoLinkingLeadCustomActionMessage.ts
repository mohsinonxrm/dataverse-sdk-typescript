import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AutoLinkingLeadCustomActionResponse as msdyn_AutoLinkingLeadCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AutoLinkingLeadCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoLinkingLeadCustomActionRequestParameters {
  AutoLinkRequest?: string;
}

/**
 * msdyn_AutoLinkingLeadCustomAction request message
 *
 * Web API Action: msdyn_AutoLinkingLeadCustomAction
 */
export class msdyn_AutoLinkingLeadCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoLinkingLeadCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutoLinkingLeadCustomActionRequestParameters>;

  constructor(parameters: msdyn_AutoLinkingLeadCustomActionRequestParameters = {}) {
    super("msdyn_AutoLinkingLeadCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoLinkingLeadCustomAction`;

    const body = requestBody({
      AutoLinkRequest: this.Parameters.AutoLinkRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AutoLinkingLeadCustomActionResponse.fromResponse({});
    return msdyn_AutoLinkingLeadCustomActionResponse.fromResponse(await response.json());
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
