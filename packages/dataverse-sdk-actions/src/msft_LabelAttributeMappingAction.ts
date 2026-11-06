import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msft_LabelAttributeMapping action
 */
export interface msft_LabelAttributeMappingResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msft_LabelAttributeMapping action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_LabelAttributeMappingActionParameters {
  EntityId: string;
}

/**
 * msft_LabelAttributeMapping action
 *
 * Unbound action
 */
export class msft_LabelAttributeMappingAction implements Executable<msft_LabelAttributeMappingResponse> {
  constructor(public readonly parameters: msft_LabelAttributeMappingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_LabelAttributeMapping`;

    const body = requestBody({
      EntityId: this.parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msft_LabelAttributeMappingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msft_LabelAttributeMappingResponse;
    return (await response.json()) as msft_LabelAttributeMappingResponse;
  }
}
