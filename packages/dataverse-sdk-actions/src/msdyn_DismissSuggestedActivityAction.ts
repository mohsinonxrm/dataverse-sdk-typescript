import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DismissSuggestedActivity action
 */
export interface msdyn_DismissSuggestedActivityResponse {
  // No content returned
}

/**
 * msdyn_DismissSuggestedActivity action
 *
 * Unbound action
 */
export class msdyn_DismissSuggestedActivityAction implements Executable<msdyn_DismissSuggestedActivityResponse> {
  constructor(
    public readonly suggestedActivityId: string,
    public readonly dismissActivity: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedActivity`;

    const body: Record<string, unknown> = {
      SuggestedActivityId: this.suggestedActivityId,
      DismissActivity: this.dismissActivity,
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

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedActivityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
