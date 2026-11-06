import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsAuthenticateResponse as CCaaS_VoiceBiometricsAuthenticateResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_VoiceBiometricsAuthenticateResponse.fromResponse({});
    return CCaaS_VoiceBiometricsAuthenticateResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsAuthenticate response message
 */
export class CCaaS_VoiceBiometricsAuthenticateResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsAuthenticateResponseData) {
    super("CCaaS_VoiceBiometricsAuthenticate");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsAuthenticateResponse {
    return new CCaaS_VoiceBiometricsAuthenticateResponse(
      responseObject<CCaaS_VoiceBiometricsAuthenticateResponseData>(data)
    );
  }
}
