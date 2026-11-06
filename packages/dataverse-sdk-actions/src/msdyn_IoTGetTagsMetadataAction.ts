import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotdevicecategory } from "./types/index.js";

/**
 * Response from msdyn_IoTGetTagsMetadata action
 */
export interface msdyn_IoTGetTagsMetadataResponse {
  Metadata: string;
}

/**
 * Parameters of the msdyn_IoTGetTagsMetadata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetTagsMetadataActionParameters {
  DeviceCategory: EntityReference | EntityPayload<msdyn_iotdevicecategory>;
}

/**
 * msdyn_IoTGetTagsMetadata action
 *
 * Unbound action
 */
export class msdyn_IoTGetTagsMetadataAction implements Executable<msdyn_IoTGetTagsMetadataResponse> {
  constructor(public readonly parameters: msdyn_IoTGetTagsMetadataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetTagsMetadata`;

    const body = requestBody({
      DeviceCategory: this.parameters.DeviceCategory,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetTagsMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTGetTagsMetadataResponse;
    return (await response.json()) as msdyn_IoTGetTagsMetadataResponse;
  }
}
