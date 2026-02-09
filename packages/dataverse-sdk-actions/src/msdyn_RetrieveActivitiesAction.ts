import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveActivities action
 */
export interface msdyn_RetrieveActivitiesResponse {
  ActivityList: string;
}

/**
 * msdyn_RetrieveActivities action
 *
 * Unbound action
 */
export class msdyn_RetrieveActivitiesAction implements Executable<msdyn_RetrieveActivitiesResponse> {
  constructor(
    public readonly fetchXml: string,
    public readonly clientType: number
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveActivitiesResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveActivitiesResponse;
  }
}
