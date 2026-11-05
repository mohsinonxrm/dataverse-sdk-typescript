import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msft_LabelAttributeMapping action
 */
export interface msft_LabelAttributeMappingResponse {
  value: EntityReference[];
}

/**
 * msft_LabelAttributeMapping action
 *
 * Unbound action
 */
export class msft_LabelAttributeMappingAction implements Executable<msft_LabelAttributeMappingResponse> {
  constructor(public readonly entityId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_LabelAttributeMapping`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
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

  async parseResponse(response: Response): Promise<msft_LabelAttributeMappingResponse> {
    const data = await response.json();
    return data as msft_LabelAttributeMappingResponse;
  }
}
