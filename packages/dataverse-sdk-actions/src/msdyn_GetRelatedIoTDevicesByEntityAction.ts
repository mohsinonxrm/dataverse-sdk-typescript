import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRelatedIoTDevicesByEntity action
 */
export interface msdyn_GetRelatedIoTDevicesByEntityResponse {
  RelatedIoTDevicesByEntityOutput: string;
}

/**
 * Parameters of the msdyn_GetRelatedIoTDevicesByEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRelatedIoTDevicesByEntityActionParameters {
  EntityLogicalName: string;
  EntityId: string;
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity action
 *
 * Unbound action
 */
export class msdyn_GetRelatedIoTDevicesByEntityAction implements Executable<msdyn_GetRelatedIoTDevicesByEntityResponse> {
  constructor(public readonly parameters: msdyn_GetRelatedIoTDevicesByEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedIoTDevicesByEntity`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      EntityId: this.parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetRelatedIoTDevicesByEntityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRelatedIoTDevicesByEntityResponse;
  }
}
