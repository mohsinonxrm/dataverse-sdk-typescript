import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_InvokeGetNextSuggestion action
 */
export interface msdyn_InvokeGetNextSuggestionResponse {
  Result: string;
}

/**
 * msdyn_InvokeGetNextSuggestion action
 *
 * Unbound action
 */
export class msdyn_InvokeGetNextSuggestionAction implements Executable<msdyn_InvokeGetNextSuggestionResponse> {
  constructor(
    public readonly entity: EntityReference,
    public readonly customAgentResponse: string,
    public readonly sourceContextEntity: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeGetNextSuggestion`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      CustomAgentResponse: this.customAgentResponse,
      SourceContextEntity: this.sourceContextEntity,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeGetNextSuggestionResponse> {
    const data = await response.json();
    return data as msdyn_InvokeGetNextSuggestionResponse;
  }
}
