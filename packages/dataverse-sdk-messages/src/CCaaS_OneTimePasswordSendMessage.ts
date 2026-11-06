import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_OneTimePasswordSendResponse as CCaaS_OneTimePasswordSendResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_OneTimePasswordSend message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_OneTimePasswordSendRequestParameters {
  ApiVersion: string;
  CustomerUniqueId: string;
  CallId?: string;
}

/**
 * CCaaS_OneTimePasswordSend request message
 *
 * Web API Action: CCaaS_OneTimePasswordSend
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_OneTimePasswordSendRequest
  extends OrganizationRequest
  implements Executable<CCaaS_OneTimePasswordSendResponse>
{
  declare readonly Parameters: Readonly<CCaaS_OneTimePasswordSendRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_OneTimePasswordSendRequestParameters
  ) {
    super("CCaaS_OneTimePasswordSend", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_OneTimePasswordSend`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      CustomerUniqueId: this.Parameters.CustomerUniqueId,
      CallId: this.Parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_OneTimePasswordSendResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_OneTimePasswordSendResponse.fromResponse({});
    return CCaaS_OneTimePasswordSendResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_OneTimePasswordSend response message
 */
export class CCaaS_OneTimePasswordSendResponse extends OrganizationResponse {
  constructor(public result: CCaaS_OneTimePasswordSendResponseData) {
    super("CCaaS_OneTimePasswordSend");
  }

  static fromResponse(data: unknown): CCaaS_OneTimePasswordSendResponse {
    return new CCaaS_OneTimePasswordSendResponse(
      responseObject<CCaaS_OneTimePasswordSendResponseData>(data)
    );
  }
}
