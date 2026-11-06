import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotdevicecategory } from "./types/index.js";

/**
 * Response from msdyn_IoTGetEditablePropertiesMetadata action
 */
export interface msdyn_IoTGetEditablePropertiesMetadataResponse {
  Metadata: string;
}

/**
 * Parameters of the msdyn_IoTGetEditablePropertiesMetadata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetEditablePropertiesMetadataActionParameters {
  DeviceCategory: EntityReference | EntityPayload<msdyn_iotdevicecategory>;
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata action
 *
 * Unbound action
 */
export class msdyn_IoTGetEditablePropertiesMetadataAction implements Executable<msdyn_IoTGetEditablePropertiesMetadataResponse> {
  constructor(public readonly parameters: msdyn_IoTGetEditablePropertiesMetadataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetEditablePropertiesMetadata`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTGetEditablePropertiesMetadataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IoTGetEditablePropertiesMetadataResponse;
  }
}
