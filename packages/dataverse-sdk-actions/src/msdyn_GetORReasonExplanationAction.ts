import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetORReasonExplanation action
 */
export interface msdyn_GetORReasonExplanationResponse {
  ExplanationResult: string;
}

/**
 * msdyn_GetORReasonExplanation action
 *
 * Unbound action
 */
export class msdyn_GetORReasonExplanationAction implements Executable<msdyn_GetORReasonExplanationResponse> {
  constructor(
    public readonly entityType: number,
    public readonly explanationObject: string,
    public readonly entityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetORReasonExplanation`;

    const body: Record<string, unknown> = {
      EntityType: this.entityType,
      ExplanationObject: this.explanationObject,
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

  async parseResponse(response: Response): Promise<msdyn_GetORReasonExplanationResponse> {
    const data = await response.json();
    return data as msdyn_GetORReasonExplanationResponse;
  }
}
