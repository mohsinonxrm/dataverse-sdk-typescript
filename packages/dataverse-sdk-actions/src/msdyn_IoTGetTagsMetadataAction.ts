import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_iotdevicecategory } from "./types/index.js";

/**
 * Response from msdyn_IoTGetTagsMetadata action
 */
export interface msdyn_IoTGetTagsMetadataResponse {
  Metadata: string;
}

/**
 * msdyn_IoTGetTagsMetadata action
 *
 * Unbound action
 */
export class msdyn_IoTGetTagsMetadataAction implements Executable<msdyn_IoTGetTagsMetadataResponse> {
  constructor(public readonly deviceCategory: msdyn_iotdevicecategory) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetTagsMetadata`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTGetTagsMetadataResponse> {
    const data = await response.json();
    return data as msdyn_IoTGetTagsMetadataResponse;
  }
}
