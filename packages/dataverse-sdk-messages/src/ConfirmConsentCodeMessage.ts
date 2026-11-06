import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ConfirmConsentCode message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConfirmConsentCodeRequestParameters {
  code: string;
}

/**
 * ConfirmConsentCode request message
 *
 * Web API Action: ConfirmConsentCode
 *
 * The first argument is the id of the connectioninstance record to call it on.
 */
export class ConfirmConsentCodeRequest
  extends OrganizationRequest
  implements Executable<ConfirmConsentCodeResponse>
{
  declare readonly Parameters: Readonly<ConfirmConsentCodeRequestParameters>;

  constructor(
    public connectioninstanceId: string,
    parameters: ConfirmConsentCodeRequestParameters
  ) {
    super("ConfirmConsentCode", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.ConfirmConsentCode`;

    const body = requestBody({
      code: this.Parameters.code,
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

  parseResponse(_response: Response): Promise<ConfirmConsentCodeResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ConfirmConsentCodeResponse());
  }
}

/**
 * ConfirmConsentCode response message
 */
export class ConfirmConsentCodeResponse extends OrganizationResponse {
  constructor() {
    super("ConfirmConsentCode");
  }

  static fromResponse(_data?: unknown): ConfirmConsentCodeResponse {
    return new ConfirmConsentCodeResponse();
  }
}
