import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponseData } from "./types/index.js";

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities request message
 *
 * Web API Action: msdyn_PostRetrieveRealTimeSuggestedActivities
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse>
{
  constructor(
    public entityId: string,
    public entityName: string
  ) {
    super("msdyn_PostRetrieveRealTimeSuggestedActivities");
  }

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
    return msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse.fromResponse(data);
  }
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities response message
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PostRetrieveRealTimeSuggestedActivitiesResponseData) {
    super("msdyn_PostRetrieveRealTimeSuggestedActivities");
  }

  static fromResponse(data: unknown): msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
    return new msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse(
      responseObject<msdyn_PostRetrieveRealTimeSuggestedActivitiesResponseData>(data)
    );
  }
}
