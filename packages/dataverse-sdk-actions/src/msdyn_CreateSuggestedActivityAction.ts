import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateSuggestedActivity action
 */
export interface msdyn_CreateSuggestedActivityResponse {
  id: string;
  failedRecordCount: string;
}

/**
 * msdyn_CreateSuggestedActivity action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedActivityAction implements Executable<msdyn_CreateSuggestedActivityResponse> {
  constructor(
    public readonly suggestedActivityId: string,
    public readonly regardingObjectId: string,
    public readonly regardingObjectEntity: string,
    public readonly isAdminConsented: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedActivity`;

    const body: Record<string, unknown> = {
      SuggestedActivityId: this.suggestedActivityId,
      RegardingObjectId: this.regardingObjectId,
      RegardingObjectEntity: this.regardingObjectEntity,
      IsAdminConsented: this.isAdminConsented,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedActivityResponse> {
    const data = await response.json();
    return data as msdyn_CreateSuggestedActivityResponse;
  }
}
