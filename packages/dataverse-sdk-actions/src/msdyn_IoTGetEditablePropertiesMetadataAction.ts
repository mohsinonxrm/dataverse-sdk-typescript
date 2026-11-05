import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_iotdevicecategory } from "./types/index.js";

/**
 * Response from msdyn_IoTGetEditablePropertiesMetadata action
 */
export interface msdyn_IoTGetEditablePropertiesMetadataResponse {
  Metadata: string;
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata action
 *
 * Unbound action
 */
export class msdyn_IoTGetEditablePropertiesMetadataAction implements Executable<msdyn_IoTGetEditablePropertiesMetadataResponse> {
  constructor(public readonly deviceCategory: msdyn_iotdevicecategory) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetEditablePropertiesMetadata`;

    const body: Record<string, unknown> = {
      DeviceCategory: this.deviceCategory,
    };

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
    const data = await response.json();
    return data as msdyn_IoTGetEditablePropertiesMetadataResponse;
  }
}
