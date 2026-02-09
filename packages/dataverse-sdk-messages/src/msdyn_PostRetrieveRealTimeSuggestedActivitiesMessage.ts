import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      entityId: this.entityId,
      entityName: this.entityName,
    };
  }
}

/**
 * msdyn_PostRetrieveRealTimeSuggestedActivities response message
 */
export class msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse) {
    super("msdyn_PostRetrieveRealTimeSuggestedActivities");
  }

  static fromResponse(data: unknown): msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse {
    return new msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse((data as any).value);
  }
}
