import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceBiometricsOptOut action
 */
export interface CCaaS_VoiceBiometricsOptOutResponse {
  decision: string;
  errorCode: string;
  message: string;
  operationId: string;
  subCode: number;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsOptOut action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsOptOutActionParameters {
  CustomerUniqueId: string;
  CallId?: string;
  CCaaSProvider?: string;
  OptOutReason: string;
  ApiVersion: string;
}

/**
 * CCaaS_VoiceBiometricsOptOut action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsOptOutAction implements Executable<CCaaS_VoiceBiometricsOptOutResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_VoiceBiometricsOptOutActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsOptOut`;

    const body = requestBody({
      CustomerUniqueId: this.parameters.CustomerUniqueId,
      CallId: this.parameters.CallId,
      CCaaSProvider: this.parameters.CCaaSProvider,
      OptOutReason: this.parameters.OptOutReason,
      ApiVersion: this.parameters.ApiVersion,
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
    if (response.status === 204) return {} as CCaaS_VoiceBiometricsOptOutResponse;
    return (await response.json()) as CCaaS_VoiceBiometricsOptOutResponse;
  }
}
