import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsOptOutResponse as CCaaS_VoiceBiometricsOptOutResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_VoiceBiometricsOptOutResponse.fromResponse({});
    return CCaaS_VoiceBiometricsOptOutResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsOptOut response message
 */
export class CCaaS_VoiceBiometricsOptOutResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsOptOutResponseData) {
    super("CCaaS_VoiceBiometricsOptOut");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsOptOutResponse {
    return new CCaaS_VoiceBiometricsOptOutResponse(
      responseObject<CCaaS_VoiceBiometricsOptOutResponseData>(data)
    );
  }
}
