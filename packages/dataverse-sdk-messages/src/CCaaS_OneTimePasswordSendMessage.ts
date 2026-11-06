import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_OneTimePasswordSendResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_OneTimePasswordSend action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_OneTimePasswordSendResult {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * CCaaS_OneTimePasswordSend response message
 *
 * `result` is the value the CCaaS_OneTimePasswordSend action returns (see {@link CCaaS_OneTimePasswordSendResult}).
 */
export class CCaaS_OneTimePasswordSendResponse extends OrganizationResponse {
  constructor(public result: CCaaS_OneTimePasswordSendResult) {
    super("CCaaS_OneTimePasswordSend");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_OneTimePasswordSendResponse {
    return new CCaaS_OneTimePasswordSendResponse(data as CCaaS_OneTimePasswordSendResult);
  }
}
