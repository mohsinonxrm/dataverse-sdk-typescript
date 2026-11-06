import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetIoTCommandMetadata action
 */
export interface msdyn_GetIoTCommandMetadataResponse {
  CommandMetadata: string;
}

/**
 * Parameters of the msdyn_GetIoTCommandMetadata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTCommandMetadataActionParameters {
  IoTCommandDefinition: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetIoTCommandMetadata action
 *
 * Unbound action
 */
export class msdyn_GetIoTCommandMetadataAction implements Executable<msdyn_GetIoTCommandMetadataResponse> {
  constructor(public readonly parameters: msdyn_GetIoTCommandMetadataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTCommandMetadata`;

    const body = requestBody({
      IoTCommandDefinition: this.parameters.IoTCommandDefinition,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTCommandMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetIoTCommandMetadataResponse;
    return (await response.json()) as msdyn_GetIoTCommandMetadataResponse;
  }
}
