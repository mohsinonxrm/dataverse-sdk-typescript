import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveActivitiesResponse as msdyn_RetrieveActivitiesResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveActivities request message
 *
 * Web API Action: msdyn_RetrieveActivities
 */
export class msdyn_RetrieveActivitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveActivitiesResponse>
{
  constructor(
    public fetchXml: string,
    public clientType: number
  ) {
    super("msdyn_RetrieveActivities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivities`;

    const body: Record<string, unknown> = {
      FetchXml: this.fetchXml,
      ClientType: this.clientType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveActivitiesResponse> {
    const data = await response.json();
    return msdyn_RetrieveActivitiesResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveActivities response message
 */
export class msdyn_RetrieveActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivitiesResponseData) {
    super("msdyn_RetrieveActivities");
  }

  static fromResponse(data: unknown): msdyn_RetrieveActivitiesResponse {
    return new msdyn_RetrieveActivitiesResponse(
      responseObject<msdyn_RetrieveActivitiesResponseData>(data)
    );
  }
}
