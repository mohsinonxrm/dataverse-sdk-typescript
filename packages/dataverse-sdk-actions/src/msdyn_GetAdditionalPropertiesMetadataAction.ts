import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAdditionalPropertiesMetadata action
 */
export interface msdyn_GetAdditionalPropertiesMetadataResponse {
  Metadata: string;
}

/**
 * Parameters of the msdyn_GetAdditionalPropertiesMetadata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAdditionalPropertiesMetadataActionParameters {
  Type: number;
}

/**
 * msdyn_GetAdditionalPropertiesMetadata action
 *
 * Unbound action
 */
export class msdyn_GetAdditionalPropertiesMetadataAction implements Executable<msdyn_GetAdditionalPropertiesMetadataResponse> {
  constructor(public readonly parameters: msdyn_GetAdditionalPropertiesMetadataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAdditionalPropertiesMetadata`;

    const body = requestBody({
      Type: this.parameters.Type,
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

  async parseResponse(response: Response): Promise<msdyn_GetAdditionalPropertiesMetadataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetAdditionalPropertiesMetadataResponse;
  }
}
