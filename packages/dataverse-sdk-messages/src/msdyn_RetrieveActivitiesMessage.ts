import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      FetchXml: this.fetchXml,
      ClientType: this.clientType,
    };
  }
}

/**
 * msdyn_RetrieveActivities response message
 */
export class msdyn_RetrieveActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivitiesResponse) {
    super("msdyn_RetrieveActivities");
  }

  static fromResponse(data: unknown): msdyn_RetrieveActivitiesResponse {
    return new msdyn_RetrieveActivitiesResponse((data as any).value);
  }
}
