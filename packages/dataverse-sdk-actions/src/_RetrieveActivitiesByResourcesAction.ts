import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _RetrieveActivitiesByResources action
 */
export interface _RetrieveActivitiesByResourcesResponse {
  Result: string;
  ExceptionMessage: string;
}

/**
 * _RetrieveActivitiesByResources action
 *
 * Unbound action
 */
export class _RetrieveActivitiesByResourcesAction implements Executable<_RetrieveActivitiesByResourcesResponse> {
  constructor(
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly resourceIds: string,
    public readonly activityType: number
  ) {}

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
    return data as _RetrieveActivitiesByResourcesResponse;
  }
}
