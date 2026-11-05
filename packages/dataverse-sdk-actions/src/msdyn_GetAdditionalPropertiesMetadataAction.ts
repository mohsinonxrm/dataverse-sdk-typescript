import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAdditionalPropertiesMetadata action
 */
export interface msdyn_GetAdditionalPropertiesMetadataResponse {
  Metadata: string;
}

/**
 * msdyn_GetAdditionalPropertiesMetadata action
 *
 * Unbound action
 */
export class msdyn_GetAdditionalPropertiesMetadataAction implements Executable<msdyn_GetAdditionalPropertiesMetadataResponse> {
  constructor(public readonly type: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAdditionalPropertiesMetadata`;

    const body: Record<string, unknown> = {
      Type: this.type,
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

  async parseResponse(response: Response): Promise<msdyn_GetAdditionalPropertiesMetadataResponse> {
    const data = await response.json();
    return data as msdyn_GetAdditionalPropertiesMetadataResponse;
  }
}
