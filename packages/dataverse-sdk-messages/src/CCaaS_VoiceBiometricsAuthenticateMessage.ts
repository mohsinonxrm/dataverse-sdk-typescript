import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsAuthenticate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsAuthenticateRequestParameters {
  RequestedFactors?: string[];
  CCaaSProvider?: string;
  CallId?: string;
  ApiVersion: string;
  CustomerUniqueId?: string;
}

/**
 * CCaaS_VoiceBiometricsAuthenticate request message
 *
 * Web API Action: CCaaS_VoiceBiometricsAuthenticate
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsAuthenticateRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsAuthenticateResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsAuthenticateRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_VoiceBiometricsAuthenticateRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsAuthenticate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsAuthenticate`;

    const body = requestBody({
      RequestedFactors: this.Parameters.RequestedFactors,
      CCaaSProvider: this.Parameters.CCaaSProvider,
      CallId: this.Parameters.CallId,
      ApiVersion: this.Parameters.ApiVersion,
      CustomerUniqueId: this.Parameters.CustomerUniqueId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsAuthenticateResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsAuthenticateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsAuthenticate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsAuthenticateResult {
  "@odata.context"?: string;
  operationId: string;
}

/**
 * CCaaS_VoiceBiometricsAuthenticate response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsAuthenticate action returns (see {@link CCaaS_VoiceBiometricsAuthenticateResult}).
 */
export class CCaaS_VoiceBiometricsAuthenticateResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsAuthenticateResult) {
    super("CCaaS_VoiceBiometricsAuthenticate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsAuthenticateResponse {
    return new CCaaS_VoiceBiometricsAuthenticateResponse(
      data as CCaaS_VoiceBiometricsAuthenticateResult
    );
  }
}
