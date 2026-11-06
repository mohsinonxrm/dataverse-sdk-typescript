import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAdditionalPropertiesMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAdditionalPropertiesMetadataResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAdditionalPropertiesMetadataResponse;
  }
}
