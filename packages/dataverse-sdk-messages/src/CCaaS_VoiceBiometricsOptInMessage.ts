import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsOptInResponse as CCaaS_VoiceBiometricsOptInResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_VoiceBiometricsOptInResponse.fromResponse({});
    return CCaaS_VoiceBiometricsOptInResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsOptIn response message
 */
export class CCaaS_VoiceBiometricsOptInResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsOptInResponseData) {
    super("CCaaS_VoiceBiometricsOptIn");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsOptInResponse {
    return new CCaaS_VoiceBiometricsOptInResponse(
      responseObject<CCaaS_VoiceBiometricsOptInResponseData>(data)
    );
  }
}
