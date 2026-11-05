import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PostRetrieveRealTimeSuggestedActivities action
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
  RetrievedRealTimeSuggestedActivitiesCount: number;
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities action
 *
 * Unbound action
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesAction implements Executable<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse> {
  constructor(
    public readonly entityId: string,
    public readonly entityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostRetrieveRealTimeSuggestedActivities`;

    const body: Record<string, unknown> = {
      entityId: this.entityId,
      entityName: this.entityName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse> {
    const data = await response.json();
    return data as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse;
  }
}
