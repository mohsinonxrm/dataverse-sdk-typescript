import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_EndCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndCallRequestParameters {
  ForEveryone?: boolean;
  SessionId: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_EndCall request message
 *
 * Web API Action: CCaaS_EndCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_EndCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_EndCallRequestParameters
  ) {
    super("CCaaS_EndCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndCall`;

    const body = requestBody({
      ForEveryone: this.Parameters.ForEveryone,
      SessionId: this.Parameters.SessionId,
      CallId: this.Parameters.CallId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_EndCallResponse> {
    // No return value (204 No Content)
    return new CCaaS_EndCallResponse();
  }
}

/**
 * CCaaS_EndCall response message
 */
export class CCaaS_EndCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndCall");
  }

  static fromResponse(_data: unknown): CCaaS_EndCallResponse {
    return new CCaaS_EndCallResponse();
  }
}
