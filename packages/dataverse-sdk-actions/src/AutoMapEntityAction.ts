import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AutoMapEntity action
 */
export interface AutoMapEntityResponse {
  // No content returned
}

/**
 * Parameters of the AutoMapEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AutoMapEntityActionParameters {
  EntityMapId: string;
}

/**
 * AutoMapEntity action
 *
 * Unbound action
 */
export class AutoMapEntityAction implements Executable<AutoMapEntityResponse> {
  constructor(public readonly parameters: AutoMapEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AutoMapEntity`;

    const body = requestBody({
      EntityMapId: this.parameters.EntityMapId,
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

  async parseResponse(response: Response): Promise<AutoMapEntityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AutoMapEntityResponse;
  }
}
