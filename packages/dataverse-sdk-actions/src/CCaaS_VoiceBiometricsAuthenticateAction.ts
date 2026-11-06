import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceBiometricsAuthenticate action
 */
export interface CCaaS_VoiceBiometricsAuthenticateResponse {
  operationId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsAuthenticate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsAuthenticateActionParameters {
  RequestedFactors?: string[];
  CCaaSProvider?: string;
  CallId?: string;
  ApiVersion: string;
  CustomerUniqueId?: string;
}

/**
 * CCaaS_VoiceBiometricsAuthenticate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsAuthenticateAction implements Executable<CCaaS_VoiceBiometricsAuthenticateResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_VoiceBiometricsAuthenticateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsAuthenticate`;

    const body = requestBody({
      RequestedFactors: this.parameters.RequestedFactors,
      CCaaSProvider: this.parameters.CCaaSProvider,
      CallId: this.parameters.CallId,
      ApiVersion: this.parameters.ApiVersion,
      CustomerUniqueId: this.parameters.CustomerUniqueId,
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
    if (response.status === 204) return {} as CCaaS_VoiceBiometricsAuthenticateResponse;
    return (await response.json()) as CCaaS_VoiceBiometricsAuthenticateResponse;
  }
}
