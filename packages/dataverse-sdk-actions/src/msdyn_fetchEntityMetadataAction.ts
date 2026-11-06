import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_fetchEntityMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchEntityMetadataResponse {
  "@odata.context"?: string;
  fetchEntityMetadataResponse: string;
}

/**
 * Parameters of the msdyn_fetchEntityMetadata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchEntityMetadataActionParameters {
  fetchEntityMetadataRequest: string;
}

/**
 * msdyn_fetchEntityMetadata action
 *
 * Unbound action
 */
export class msdyn_fetchEntityMetadataAction implements Executable<msdyn_fetchEntityMetadataResponse> {
  constructor(public readonly parameters: msdyn_fetchEntityMetadataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchEntityMetadata`;

    const body = requestBody({
      fetchEntityMetadataRequest: this.parameters.fetchEntityMetadataRequest,
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

  async parseResponse(response: Response): Promise<msdyn_fetchEntityMetadataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_fetchEntityMetadataResponse;
  }
}
