import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetCallStateResponse as CCaaS_GetCallStateResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetCallState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetCallStateRequestParameters {
  ApiVersion: string;
  CallId: string;
  CommandContext?: string;
  SessionId: string;
}

/**
 * CCaaS_GetCallState request message
 *
 * Web API Action: CCaaS_GetCallState
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetCallStateRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetCallStateResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetCallStateRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_GetCallStateRequestParameters
  ) {
    super("CCaaS_GetCallState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetCallState`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      CallId: this.Parameters.CallId,
      CommandContext: this.Parameters.CommandContext,
      SessionId: this.Parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_GetCallStateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_GetCallStateResponse.fromResponse({});
    return CCaaS_GetCallStateResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_GetCallState response message
 */
export class CCaaS_GetCallStateResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetCallStateResponseData) {
    super("CCaaS_GetCallState");
  }

  static fromResponse(data: unknown): CCaaS_GetCallStateResponse {
    return new CCaaS_GetCallStateResponse(responseObject<CCaaS_GetCallStateResponseData>(data));
  }
}
