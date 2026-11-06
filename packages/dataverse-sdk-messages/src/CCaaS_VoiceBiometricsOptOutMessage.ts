import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsOptOut message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsOptOutRequestParameters {
  CustomerUniqueId: string;
  CallId?: string;
  CCaaSProvider?: string;
  OptOutReason: string;
  ApiVersion: string;
}

/**
 * CCaaS_VoiceBiometricsOptOut request message
 *
 * Web API Action: CCaaS_VoiceBiometricsOptOut
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsOptOutRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsOptOutResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsOptOutRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_VoiceBiometricsOptOutRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsOptOut", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsOptOut`;

    const body = requestBody({
      CustomerUniqueId: this.Parameters.CustomerUniqueId,
      CallId: this.Parameters.CallId,
      CCaaSProvider: this.Parameters.CCaaSProvider,
      OptOutReason: this.Parameters.OptOutReason,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsOptOutResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsOptOutResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsOptOut action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsOptOutResult {
  "@odata.context"?: string;
  decision: string;
  errorCode: string;
  message: string;
  operationId: string;
  subCode: number;
}

/**
 * CCaaS_VoiceBiometricsOptOut response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsOptOut action returns (see {@link CCaaS_VoiceBiometricsOptOutResult}).
 */
export class CCaaS_VoiceBiometricsOptOutResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsOptOutResult) {
    super("CCaaS_VoiceBiometricsOptOut");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsOptOutResponse {
    return new CCaaS_VoiceBiometricsOptOutResponse(data as CCaaS_VoiceBiometricsOptOutResult);
  }
}
