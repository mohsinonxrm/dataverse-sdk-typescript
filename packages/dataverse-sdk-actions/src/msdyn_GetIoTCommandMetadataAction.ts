import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetIoTCommandMetadata action
 */
export interface msdyn_GetIoTCommandMetadataResponse {
  CommandMetadata: string;
}

/**
 * msdyn_GetIoTCommandMetadata action
 *
 * Unbound action
 */
export class msdyn_GetIoTCommandMetadataAction implements Executable<msdyn_GetIoTCommandMetadataResponse> {
  constructor(public readonly ioTCommandDefinition: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTCommandMetadata`;

    const body: Record<string, unknown> = {
      IoTCommandDefinition: this.ioTCommandDefinition,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTCommandMetadataResponse> {
    const data = await response.json();
    return data as msdyn_GetIoTCommandMetadataResponse;
  }
}
