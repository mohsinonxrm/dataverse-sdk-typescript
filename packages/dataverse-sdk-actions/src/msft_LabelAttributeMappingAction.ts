import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msft_LabelAttributeMapping action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msft_LabelAttributeMappingResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msft_LabelAttributeMappingResponse }).value;
  }
}
