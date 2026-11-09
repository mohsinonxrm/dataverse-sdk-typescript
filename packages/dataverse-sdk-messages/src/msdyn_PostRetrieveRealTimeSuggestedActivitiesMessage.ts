import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PostRetrieveRealTimeSuggestedActivities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesRequestParameters {
  entityId: string;
  entityName: string;
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities request message
 *
 * Web API Action: msdyn_PostRetrieveRealTimeSuggestedActivities
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_PostRetrieveRealTimeSuggestedActivitiesRequestParameters>;

  constructor(parameters: msdyn_PostRetrieveRealTimeSuggestedActivitiesRequestParameters) {
    super("msdyn_PostRetrieveRealTimeSuggestedActivities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostRetrieveRealTimeSuggestedActivities`;

    const body = requestBody({
      entityId: this.Parameters.entityId,
      entityName: this.Parameters.entityName,
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
    return msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_PostRetrieveRealTimeSuggestedActivities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PostRetrieveRealTimeSuggestedActivitiesResult {
  "@odata.context"?: string;
  RetrievedRealTimeSuggestedActivitiesCount: number;
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities response message
 *
 * `result` is the value the msdyn_PostRetrieveRealTimeSuggestedActivities action returns (see {@link msdyn_PostRetrieveRealTimeSuggestedActivitiesResult}).
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PostRetrieveRealTimeSuggestedActivitiesResult) {
    super("msdyn_PostRetrieveRealTimeSuggestedActivities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
    return new msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse(
      data as msdyn_PostRetrieveRealTimeSuggestedActivitiesResult
    );
  }
}
