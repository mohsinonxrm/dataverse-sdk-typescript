import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse as msdyn_PostRetrieveRealTimeSuggestedActivitiesResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
