import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceBiometricsOptIn action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsOptInResponse {
  "@odata.context"?: string;
  operationId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsOptIn action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsOptInActionParameters {
  CCaaSProvider?: string;
  CustomerUniqueId: string;
  ApiVersion: string;
  CallId?: string;
}

/**
 * CCaaS_VoiceBiometricsOptIn action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_VoiceBiometricsOptInAction implements Executable<CCaaS_VoiceBiometricsOptInResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_VoiceBiometricsOptInActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsOptIn`;

    const body = requestBody({
      CCaaSProvider: this.parameters.CCaaSProvider,
      CustomerUniqueId: this.parameters.CustomerUniqueId,
      ApiVersion: this.parameters.ApiVersion,
      CallId: this.parameters.CallId,
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
    return (await response.json()) as CCaaS_VoiceBiometricsOptInResponse;
  }
}
