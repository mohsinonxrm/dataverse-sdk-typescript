import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsOptIn message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsOptInRequestParameters {
  CCaaSProvider?: string;
  CustomerUniqueId: string;
  ApiVersion: string;
  CallId?: string;
}

/**
 * CCaaS_VoiceBiometricsOptIn request message
 *
 * Web API Action: CCaaS_VoiceBiometricsOptIn
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsOptInRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsOptInResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsOptInRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_VoiceBiometricsOptInRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsOptIn", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsOptIn`;

    const body = requestBody({
      CCaaSProvider: this.Parameters.CCaaSProvider,
      CustomerUniqueId: this.Parameters.CustomerUniqueId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsOptInResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsOptInResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsOptIn action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsOptInResult {
  "@odata.context"?: string;
  operationId: string;
}

/**
 * CCaaS_VoiceBiometricsOptIn response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsOptIn action returns (see {@link CCaaS_VoiceBiometricsOptInResult}).
 */
export class CCaaS_VoiceBiometricsOptInResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsOptInResult) {
    super("CCaaS_VoiceBiometricsOptIn");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsOptInResponse {
    return new CCaaS_VoiceBiometricsOptInResponse(data as CCaaS_VoiceBiometricsOptInResult);
  }
}
