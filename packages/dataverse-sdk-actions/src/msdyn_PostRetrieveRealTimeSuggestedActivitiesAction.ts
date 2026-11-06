import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PostRetrieveRealTimeSuggestedActivities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse;
  }
}
