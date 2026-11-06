import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CreateOperation action
 */
export interface CCaaS_CreateOperationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_CreateOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateOperationActionParameters {
  ApiVersion: string;
  ProactiveEngagementConfigId?: string;
  DeliveryId?: string;
  Operation: string;
}

/**
 * CCaaS_CreateOperation action
 *
 * Unbound action
 */
export class CCaaS_CreateOperationAction implements Executable<CCaaS_CreateOperationResponse> {
  constructor(public readonly parameters: CCaaS_CreateOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateOperation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      DeliveryId: this.parameters.DeliveryId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateOperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CreateOperationResponse;
    return (await response.json()) as CCaaS_CreateOperationResponse;
  }
}
