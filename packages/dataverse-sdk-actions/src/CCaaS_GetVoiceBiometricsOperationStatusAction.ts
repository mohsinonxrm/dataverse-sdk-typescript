import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetVoiceBiometricsOperationStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetVoiceBiometricsOperationStatusResponse {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * Parameters of the CCaaS_GetVoiceBiometricsOperationStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetVoiceBiometricsOperationStatusActionParameters {
  OperationId: string;
  Operation: string;
}

/**
 * CCaaS_GetVoiceBiometricsOperationStatus action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetVoiceBiometricsOperationStatusAction implements Executable<CCaaS_GetVoiceBiometricsOperationStatusResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_GetVoiceBiometricsOperationStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetVoiceBiometricsOperationStatus`;

    const body = requestBody({
      OperationId: this.parameters.OperationId,
      Operation: this.parameters.Operation,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetVoiceBiometricsOperationStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetVoiceBiometricsOperationStatusResponse;
  }
}
