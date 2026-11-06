import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PostRetrieveRealTimeSuggestedActivities action
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
  RetrievedRealTimeSuggestedActivitiesCount: number;
}

/**
 * Parameters of the msdyn_PostRetrieveRealTimeSuggestedActivities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesActionParameters {
  entityId: string;
  entityName: string;
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities action
 *
 * Unbound action
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesAction implements Executable<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse> {
  constructor(
    public readonly parameters: msdyn_PostRetrieveRealTimeSuggestedActivitiesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostRetrieveRealTimeSuggestedActivities`;

    const body = requestBody({
      entityId: this.parameters.entityId,
      entityName: this.parameters.entityName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse;
    return (await response.json()) as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse;
  }
}
