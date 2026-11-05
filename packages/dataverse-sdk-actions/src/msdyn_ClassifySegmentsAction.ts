import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ClassifySegments action
 */
export interface msdyn_ClassifySegmentsResponse {
  // No content returned
}

/**
 * msdyn_ClassifySegments action
 *
 * Unbound action
 */
export class msdyn_ClassifySegmentsAction implements Executable<msdyn_ClassifySegmentsResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ClassifySegments`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_ClassifySegmentsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
