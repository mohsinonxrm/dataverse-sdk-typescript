import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOrCreateLinkedActivity action
 */
export interface msdyn_GetOrCreateLinkedActivityResponse {
  LinkedActivityId: string;
  IsLinkedActivityCreated: boolean;
}

/**
 * msdyn_GetOrCreateLinkedActivity action
 *
 * Unbound action
 */
export class msdyn_GetOrCreateLinkedActivityAction implements Executable<msdyn_GetOrCreateLinkedActivityResponse> {
  constructor(
    public readonly sequenceStepId: string,
    public readonly createLinkedActivity: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateLinkedActivity`;

    const body: Record<string, unknown> = {
      SequenceStepId: this.sequenceStepId,
      CreateLinkedActivity: this.createLinkedActivity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    const data = await response.json();
    return data as msdyn_GetOrCreateLinkedActivityResponse;
  }
}
