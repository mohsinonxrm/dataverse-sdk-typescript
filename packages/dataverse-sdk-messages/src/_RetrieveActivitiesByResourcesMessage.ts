import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _RetrieveActivitiesByResources request message
 *
 * Web API Action: _RetrieveActivitiesByResources
 */
export class _RetrieveActivitiesByResourcesRequest
  extends OrganizationRequest
  implements Executable<_RetrieveActivitiesByResourcesResponse>
{
  constructor(
    public startDate: string,
    public endDate: string,
    public resourceIds: string,
    public activityType: number
  ) {
    super("_RetrieveActivitiesByResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RetrieveActivitiesByResources`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      ResourceIds: this.resourceIds,
      ActivityType: this.activityType,
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

  async parseResponse(response: Response): Promise<_RetrieveActivitiesByResourcesResponse> {
    const data = await response.json();
    return _RetrieveActivitiesByResourcesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      StartDate: this.startDate,
      EndDate: this.endDate,
      ResourceIds: this.resourceIds,
      ActivityType: this.activityType,
    };
  }
}

/**
 * _RetrieveActivitiesByResources response message
 */
export class _RetrieveActivitiesByResourcesResponse extends OrganizationResponse {
  constructor(public result: _RetrieveActivitiesByResourcesResponse) {
    super("_RetrieveActivitiesByResources");
  }

  static fromResponse(data: unknown): _RetrieveActivitiesByResourcesResponse {
    return new _RetrieveActivitiesByResourcesResponse((data as any).value);
  }
}
